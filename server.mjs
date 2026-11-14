import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { answer, assertScreen, classifyQuestion, screenQuestion } from "./agent.mjs";
import {
  addMessage,
  checkFixture,
  createSession,
  customerByEmail,
  deleteSession,
  getDesk,
  getScope,
  messagesFor,
  openDb,
  orderById,
  ordersForSession,
  present,
  sessionCustomer,
  setDesk,
  setScope,
  ticketFor,
} from "./db.mjs";
import { askPage, catalogMiss, goodBySlug, home, loginPage, missing, orderPage, ordersPage, productPage, supportPage, ticketPage } from "./pages.mjs";

const HOST = process.env.MARLOW_HOST || "127.0.0.1";
const PORT = Number(process.env.MARLOW_PORT || 8080);
const ROOT = dirname(fileURLToPath(import.meta.url));
const here = join(ROOT, "marlow.sqlite");

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
  }
}

loadEnv(join(ROOT, ".env"));

const { db, pdfs } = openDb(here);
checkFixture(db);
assertScreen();

function passwordOk(stored, given) {
  const a = createHash("sha256").update(stored).digest();
  const b = createHash("sha256").update(given).digest();
  return timingSafeEqual(a, b);
}

function cookieToken(header) {
  for (const part of (header || "").split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith("marlow=")) return trimmed.slice("marlow=".length);
  }
  return "";
}

function send(res, status, body, type, extra = []) {
  const payload = Buffer.isBuffer(body) ? body : Buffer.from(body);
  res.writeHead(status, [
    ["Content-Type", type],
    ["Content-Length", String(payload.length)],
    ["Cache-Control", "no-store"],
    ["X-Content-Type-Options", "nosniff"],
    ...extra,
  ]);
  res.end(payload);
}

function redirect(res, location, extra = []) {
  res.writeHead(303, [["Location", location], ["Content-Length", "0"], ["Cache-Control", "no-store"], ...extra]);
  res.end();
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 8000) {
        reject(new Error("too big"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function formFields(buffer) {
  const params = new URLSearchParams(buffer.toString("utf8"));
  return Object.fromEntries(params.entries());
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${HOST}`);
  const path = url.pathname;
  const token = cookieToken(req.headers.cookie);
  const customer = sessionCustomer(db, token);
  const view = customer ? present(db, customer) : null;

  try {
    const mediaMatch = path.match(/^\/media\/([a-z]+)\.webp$/);
    if (req.method === "GET" && mediaMatch) {
      const file = join(ROOT, "media", `${mediaMatch[1]}.webp`);
      if (!existsSync(file)) {
        send(res, 404, "missing\n", "text/plain; charset=utf-8");
        return;
      }
      send(res, 200, readFileSync(file), "image/webp");
      return;
    }
    if (req.method === "GET" && path === "/favicon.ico") {
      res.writeHead(204, [["Content-Length", "0"]]);
      res.end();
      return;
    }
    if (req.method === "GET" && path === "/robots.txt") {
      send(res, 200, "User-agent: *\nDisallow: /\n", "text/plain; charset=utf-8");
      return;
    }
    if (path === "/_lab/search-scope" && (req.method === "GET" || req.method === "POST")) {
      if (req.method === "POST") {
        const value = (await readBody(req)).toString("utf8").trim().toLowerCase();
        if (value !== "company" && value !== "session") {
          send(res, 400, "use company or session\n", "text/plain; charset=utf-8");
          return;
        }
        setScope(db, value);
        console.log(`search scope is now ${value}`);
      }
      send(res, 200, `${getScope(db)}\n`, "text/plain; charset=utf-8");
      return;
    }
    if (path === "/_lab/desk" && (req.method === "GET" || req.method === "POST")) {
      if (req.method === "POST") {
        const value = (await readBody(req)).toString("utf8").trim().toLowerCase();
        if (value !== "open" && value !== "guarded") {
          send(res, 400, "use open or guarded\n", "text/plain; charset=utf-8");
          return;
        }
        setDesk(db, value);
        console.log(`desk is now ${value}`);
      }
      send(res, 200, `${getDesk(db)}\n`, "text/plain; charset=utf-8");
      return;
    }
    if (req.method === "GET" && (path === "/" || path === "/shop")) {
      send(res, 200, home(view), "text/html; charset=utf-8");
      return;
    }
    const shopMatch = path.match(/^\/shop\/([a-z0-9-]+)$/);
    if (req.method === "GET" && shopMatch) {
      const good = goodBySlug(shopMatch[1]);
      send(res, good ? 200 : 404, good ? productPage(view, good) : catalogMiss(view), "text/html; charset=utf-8");
      return;
    }
    if (req.method === "GET" && path === "/login") {
      if (view) {
        redirect(res, "/");
        return;
      }
      send(res, 200, loginPage(url.searchParams.get("error") === "1"), "text/html; charset=utf-8");
      return;
    }
    if (req.method === "POST" && path === "/login") {
      const fields = formFields(await readBody(req));
      const person = customerByEmail(db, fields.email || "");
      if (!person || !passwordOk(person.password, fields.password || "")) {
        redirect(res, "/login?error=1");
        return;
      }
      const next = randomBytes(18).toString("base64url");
      createSession(db, next, person.id);
      redirect(res, "/", [["Set-Cookie", `marlow=${next}; HttpOnly; SameSite=Lax; Path=/`]]);
      return;
    }
    if (req.method === "POST" && path === "/logout") {
      deleteSession(db, token);
      redirect(res, "/", [["Set-Cookie", "marlow=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0"]]);
      return;
    }
    if (!view) {
      redirect(res, "/login");
      return;
    }
    if (req.method === "GET" && path === "/orders") {
      send(res, 200, ordersPage(view), "text/html; charset=utf-8");
      return;
    }
    if (req.method === "GET" && path === "/support") {
      send(res, 200, supportPage(view), "text/html; charset=utf-8");
      return;
    }
    if (req.method === "GET" && path === "/ask") {
      send(res, 200, askPage(view, messagesFor(db, token)), "text/html; charset=utf-8");
      return;
    }
    if (req.method === "GET" && path === "/api/orders") {
      send(res, 200, JSON.stringify({
        customer: view.name,
        orders: ordersForSession(db, view.id),
      }), "application/json");
      return;
    }
    const orderMatch = path.match(/^\/orders\/(NL-\d+)$/);
    if (req.method === "GET" && orderMatch) {
      const owner = orderById(db, orderMatch[1]);
      if (!owner || owner.customer_id !== view.id) {
        send(res, 404, missing(view), "text/html; charset=utf-8");
        return;
      }
      send(res, 200, orderPage(view), "text/html; charset=utf-8");
      return;
    }
    const ticketMatch = path.match(/^\/support\/(T-\d+)$/);
    if (req.method === "GET" && ticketMatch) {
      const ticket = ticketFor(db, view.id);
      if (ticket.id !== ticketMatch[1]) {
        send(res, 404, missing(view), "text/html; charset=utf-8");
        return;
      }
      send(res, 200, ticketPage(view), "text/html; charset=utf-8");
      return;
    }
    const invoiceMatch = path.match(/^\/invoices\/(NL-\d+)\.pdf$/);
    if (req.method === "GET" && invoiceMatch) {
      const owner = orderById(db, invoiceMatch[1]);
      if (!owner || owner.customer_id !== view.id) {
        send(res, 404, missing(view), "text/html; charset=utf-8");
        return;
      }
      send(res, 200, pdfs.get(invoiceMatch[1]), "application/pdf", [
        ["Content-Disposition", `inline; filename="${invoiceMatch[1]}.pdf"`],
      ]);
      return;
    }
    const apiOrder = path.match(/^\/api\/orders\/(NL-\d+)$/);
    if (req.method === "GET" && apiOrder) {
      const owner = orderById(db, apiOrder[1]);
      if (!owner || owner.customer_id !== view.id) {
        send(res, 404, '{"error":"not-on-this-account"}\n', "application/json");
        return;
      }
      send(res, 200, JSON.stringify(owner), "application/json");
      return;
    }
    if (req.method === "POST" && path === "/ask") {
      const type = req.headers["content-type"] || "";
      const raw = await readBody(req);
      const text = (type.startsWith("application/json")
        ? String(JSON.parse(raw.toString("utf8") || "{}").text || "")
        : formFields(raw).text || "").trim().slice(0, 500);
      if (!text) {
        if (type.startsWith("application/json")) send(res, 400, '{"error":"empty"}\n', "application/json");
        else redirect(res, "/ask");
        return;
      }
      const prior = messagesFor(db, token);
      addMessage(db, token, { role: "you", text, tool: "", quote: "" });
      let reply;
      try {
        const desk = getDesk(db);
        if (desk === "guarded") {
          const screened = screenQuestion(text);
          if (screened.stop) reply = { tool: screened.tool, text: screened.text, quote: "" };
          else {
            const judged = await classifyQuestion(text);
            reply = judged.stop
              ? { tool: judged.tool, text: judged.text, quote: "" }
              : await answer(db, view, prior, text, getScope(db));
          }
        } else {
          reply = await answer(db, view, prior, text, getScope(db));
        }
      } catch (error) {
        console.log(`desk failed: ${error.message}`);
        const text = /balance|resource package/i.test(error.message)
          ? "The model key has no balance."
          : "Support is not answering.";
        reply = { tool: "", text, quote: "" };
      }
      addMessage(db, token, { role: "desk", ...reply });
      if (type.startsWith("application/json")) send(res, 200, JSON.stringify(reply), "application/json");
      else redirect(res, "/ask");
      return;
    }
    send(res, 404, missing(view), "text/html; charset=utf-8");
  } catch (error) {
    console.log(`request failed: ${error.message}`);
    send(res, 500, "Support is not answering.\n", "text/plain; charset=utf-8");
  }
});

server.listen(PORT, HOST, () => {
  const key = process.env.MARLOW_API_KEY || process.env.GLM_API_KEY;
  console.log(`Marlow listening on http://${HOST}:${PORT}`);
  console.log(`Search scope: ${getScope(db)}`);
  console.log(`Desk: ${getDesk(db)}`);
  console.log(`Model: ${process.env.MARLOW_MODEL || "glm-5.3-flash"} (${key ? "key set" : "no key"})`);
  if (process.env.MARLOW_GUARD_MODEL) console.log(`Guard model: ${process.env.MARLOW_GUARD_MODEL}`);
  console.log("Avery Chen  avery@marlow.test  avery");
  console.log("Blake Okonkwo  blake@marlow.test  blake");
  console.log(`Bind search to the session: curl -s -X POST http://${HOST}:${PORT}/_lab/search-scope -d session`);
  console.log(`Guard the desk: curl -s -X POST http://${HOST}:${PORT}/_lab/desk -d guarded`);
});
