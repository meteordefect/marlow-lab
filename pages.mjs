const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>{{title}}</title>
  <style>
    :root { --ink: #111; --muted: #6f6f6f; --line: #e6e6e6; --paper: #fff; --hero: #f4e6e3; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font: 15px/1.45 "Helvetica Neue", Helvetica, Arial, sans-serif; }
    a { color: inherit; }
    .top { position: sticky; top: 0; z-index: 2; background: #fff; border-bottom: 1px solid var(--line); }
    .bar { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; min-height: 68px; padding: 0 22px; }
    .side.end { justify-self: end; display: flex; align-items: center; gap: 16px; }
    .mark { text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.48em; padding-left: 0.48em; }
    .nav { display: flex; justify-content: center; flex-wrap: wrap; gap: 28px; padding: 0 22px 14px; }
    .nav a { text-decoration: none; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    .nav a.on { box-shadow: inset 0 -1px 0 var(--ink); }
    .signin, .who { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none; }
    .who { letter-spacing: 0.06em; text-transform: none; max-width: 9em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #444; }
    button, .button { font: inherit; background: var(--ink); color: #fff; border: 0; min-height: 44px; padding: 0 18px; letter-spacing: 0.14em; text-transform: uppercase; font-size: 12px; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; }
    button.quiet { background: transparent; color: var(--ink); padding: 0; min-height: 0; letter-spacing: 0.16em; font-size: 11px; }
    .wrap { max-width: 1120px; margin: 0 auto; padding: 48px 28px 88px; }
    .wrap.tight { max-width: 680px; }
    h1 { font-size: clamp(40px, 6vw, 64px); font-weight: 500; letter-spacing: -0.04em; line-height: 0.95; margin: 0 0 12px; }
    h2 { margin: 0; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
    .lede { color: var(--muted); margin: 0 0 28px; max-width: 36em; }
    .kicker { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }
    .muted, .price { color: var(--muted); }
    .hero { position: relative; display: block; min-height: calc(100vh - 97px); background: var(--hero); color: var(--ink); text-decoration: none; overflow: hidden; }
    .still { display: flex; align-items: flex-end; justify-content: center; gap: 1.2vw; height: calc(100vh - 97px); padding: 0 0 16vh; }
    .piece svg { width: 18vh; height: auto; display: block; }
    .piece:nth-child(1) svg { width: 15vh; }
    .piece:nth-child(2) svg { width: 24vh; }
    .piece:nth-child(3) svg { width: 19vh; }
    .piece.lead svg { width: 34vh; }
    .piece:nth-child(5) svg { width: 21vh; }
    .piece:nth-child(6) svg { width: 26vh; }
    .piece:nth-child(7) svg { width: 16vh; }
    .hero-copy { position: absolute; left: 0; right: 0; bottom: 0; text-align: center; padding: 96px 24px 42px; background: linear-gradient(to top, var(--hero) 42%, transparent); }
    .hero h1 { font-size: clamp(52px, 8vw, 96px); margin: 8px 0; }
    .line { display: block; font-size: 18px; }
    .account { margin: 0 0 28px; font-size: 14px; }
    .account a { text-underline-offset: 3px; white-space: nowrap; }
    .section-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin: 0 0 22px; }
    .section-head p { margin: 0; color: var(--muted); font-size: 13px; }
    .goods { display: grid; grid-template-columns: repeat(4, 1fr); gap: 36px 18px; }
    .good { display: block; text-decoration: none; color: inherit; }
    .good strong { display: block; margin-top: 10px; font-weight: 500; font-size: 14px; }
    .good .kicker { display: block; margin-top: 12px; }
    .good .price { display: block; margin-top: 2px; font-size: 13px; }
    .good:hover strong { text-decoration: underline; text-underline-offset: 3px; }
    .stage { display: grid; place-items: center; aspect-ratio: 1; }
    .stage svg { height: 78%; width: auto; }
    .product { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
    .product .stage { aspect-ratio: 1; }
    .product .price { margin: 8px 0 0; font-size: 18px; color: var(--ink); }
    .back { color: var(--muted); text-decoration: none; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 14px 0; border-bottom: 1px solid var(--line); font-size: 15px; }
    th { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; color: var(--muted); }
    .spec { margin-top: 28px; }
    .pill { display: inline-block; border: 1px solid currentColor; padding: 2px 8px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
    .done { color: var(--ink); }
    .wait { color: #8a3a3a; }
    .row { display: flex; gap: 14px; align-items: center; }
    .row h1 { margin: 0; }
    .fact { font-size: 22px; line-height: 1.35; margin: 18px 0; }
    .earlier p { margin: 0 0 12px; }
    .who-line { color: var(--muted); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
    .links { margin: 18px 0 0; }
    .links a { text-underline-offset: 3px; }
    .login { max-width: 420px; }
    label { display: block; margin: 0 0 16px; color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; }
    input, textarea { width: 100%; margin-top: 6px; font: inherit; color: var(--ink); background: #fff; border: 1px solid #ddd; padding: 10px 12px; min-height: 44px; }
    textarea { min-height: 52px; resize: vertical; }
    .error { color: #9a2b2b; text-transform: none; letter-spacing: 0; font-size: 14px; }
    .transcript { min-height: 120px; }
    article.you, article.desk { padding: 14px 16px; margin: 0 0 12px; }
    article.you { margin-left: 18%; background: var(--ink); color: #fff; }
    article.desk { margin-right: 8%; border: 1px solid var(--line); }
    article p { margin: 0; }
    .tool { color: var(--muted); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px; }
    article.you .tool { color: #cfcfcf; }
    article.wait p { color: var(--muted); }
    .dots { display: inline-flex; gap: 4px; margin-left: 8px; vertical-align: middle; }
    .dots i { width: 5px; height: 5px; border-radius: 50%; background: currentColor; display: block; animation: blink 1.2s infinite; }
    .dots i:nth-child(2) { animation-delay: 0.2s; }
    .dots i:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink { 0%, 80%, 100% { opacity: 0.25; } 40% { opacity: 1; } }
    .quote { margin-top: 10px; padding-left: 12px; border-left: 2px solid var(--ink); font-size: 20px; line-height: 1.35; }
    .composer { display: flex; gap: 8px; align-items: end; margin-top: 8px; }
    .composer textarea { flex: 1; }
    .foot { margin-top: 56px; color: var(--muted); font-size: 12px; letter-spacing: 0.04em; }
    a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
    @media (prefers-reduced-motion: reduce) {
      .dots i { animation: none; opacity: 1; }
    }
    @media (max-width: 900px) {
      .goods, .product { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 720px) {
      .who { display: none; }
      .nav { gap: 16px; }
      .mark { letter-spacing: 0.32em; font-size: 13px; }
      .hero { min-height: 0; }
      .still { height: auto; gap: 6px; padding: 28px 12px 0; }
      .hero-copy { position: relative; background: none; padding: 8px 16px 32px; }
      .piece:nth-child(n) svg { width: 40px; }
      .piece.lead svg { width: 76px; }
      .goods, .product { grid-template-columns: 1fr; }
      .goods { grid-template-columns: 1fr 1fr; }
      article.you { margin-left: 0; }
      .bar { padding: 0 14px; }
    }
  </style>
</head>
<body>
  {{header}}
  {{body}}
</body>
</html>`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shade(hex) {
  return /^#[0-9a-f]{6}$/i.test(hex) ? hex : "#111111";
}

function wash(hex) {
  const n = Number.parseInt(shade(hex).slice(1), 16);
  const mix = (channel) => Math.round(channel * 0.22 + 255 * 0.78);
  return `#${[mix((n >> 16) & 255), mix((n >> 8) & 255), mix(n & 255)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function tube(hex) {
  const color = shade(hex);
  return `<svg viewBox="0 0 100 240" aria-hidden="true"><ellipse cx="50" cy="222" rx="18" ry="4" fill="#000" opacity=".07"/><path d="M34 108 L66 108 L66 70 L34 42 Z" fill="${color}"/><path d="M50 56 L66 70 L66 108 L50 108 Z" fill="#000" opacity=".18"/><rect x="32" y="104" width="36" height="12" fill="#d5d5d5"/><rect x="34" y="116" width="32" height="92" fill="#161616"/><rect x="38" y="196" width="24" height="6" fill="#0d0d0d"/></svg>`;
}

function header(customer, section) {
  const items = [
    ["shop", "Shop", "/"],
    ["shades", "Lipstick", "/#lipstick"],
  ];
  if (customer) {
    items.push(["orders", "Orders", "/orders"], ["support", "Support", "/support"], ["ask", "Ask", "/ask"]);
  }
  const links = items
    .map(([key, label, href]) => `<a href="${href}"${section === key ? ' class="on"' : ""}>${label}</a>`)
    .join("");
  const end = customer
    ? `<span class="who">${esc(customer.name)}</span><form method="post" action="/logout"><button class="quiet" type="submit">Sign out</button></form>`
    : `<a class="signin" href="/login">Sign in</a>`;
  return `<header class="top"><div class="bar"><div class="side"></div><a class="mark" href="/">MARLOW</a><div class="side end">${end}</div></div><nav class="nav">${links}</nav></header>`;
}

function document(title, body, customer, section) {
  return PAGE.replace("{{title}}", esc(title))
    .replace("{{header}}", header(customer, section))
    .replace("{{body}}", body);
}

function frame(title, inner, customer, section, tight = false) {
  return document(title, `<main class="wrap${tight ? " tight" : ""}">${inner}</main>`, customer, section);
}

function pill(text, tone) {
  return `<span class="pill ${tone}">${esc(text)}</span>`;
}

function money(price) {
  return `$${esc(price)}`;
}

const GOODS = [
  { slug: "soft-film", name: "Soft Film", price: "28", sku: "ML2104", finish: "Matte", hex: "#c48984", blurb: "A brown-pink that sits close to the lip. Matte, one pass." },
  { slug: "fig-skin", name: "Fig Skin", price: "26", sku: "ML1881", finish: "Velvet", hex: "#7d3e4a", blurb: "Dried fig. It reads as a stain more than a full lipstick." },
  { slug: "cold-brew", name: "Cold Brew", price: "24", sku: "ML1740", finish: "Matte", hex: "#6a3b32", blurb: "A muted brown for the days you skip the rest of the face." },
  { slug: "rose-milk", name: "Rose Milk", price: "22", sku: "ML2218", finish: "Shine", hex: "#e4b4b6", blurb: "Sheer milk-rose. The shine stays even after coffee." },
  { slug: "oxblood", name: "Oxblood", price: "30", sku: "ML0904", finish: "Velvet", hex: "#5c1a24", blurb: "A deep red-brown. The studio holds this one for pickup." },
  { slug: "coral-tape", name: "Coral Tape", price: "24", sku: "ML2311", finish: "Shine", hex: "#e15b4c", blurb: "A clean coral. It looks brighter in daylight than in the tin." },
  { slug: "brick", name: "Brick", price: "24", sku: "ML1188", finish: "Matte", hex: "#9a3a30", blurb: "Red clay. Matte, and it does not travel once it sets." },
  { slug: "mauve-room", name: "Mauve Room", price: "26", sku: "ML2560", finish: "Velvet", hex: "#a86d78", blurb: "A gray mauve. Quiet until you stand near a window." },
  { slug: "ink", name: "Ink", price: "28", sku: "ML0419", finish: "Matte", hex: "#3a1820", blurb: "Near-black plum. Use a lip pencil or it feathers." },
  { slug: "petal", name: "Petal", price: "20", sku: "ML3002", finish: "Shine", hex: "#f0c9cc", blurb: "The palest pink in the tray. More balm than color." },
  { slug: "night-plum", name: "Night Plum", price: "30", sku: "ML0777", finish: "Matte", hex: "#43243c", blurb: "Plum gone almost brown in low light." },
  { slug: "bare", name: "Bare", price: "22", sku: "ML1544", finish: "Matte", hex: "#c99286", blurb: "A nude that is actually nude, not pink." },
  { slug: "cherry", name: "Cherry", price: "24", sku: "ML2688", finish: "Shine", hex: "#c41634", blurb: "Straight cherry. It will mark a glass." },
  { slug: "ash", name: "Ash", price: "26", sku: "ML1320", finish: "Velvet", hex: "#7c564c", blurb: "A brown with ash in it. Velvet, short wear." },
  { slug: "shell", name: "Shell", price: "20", sku: "ML2891", finish: "Shine", hex: "#edd5cc", blurb: "A clear-pink shine. The color comes from you." },
  { slug: "red-pencil", name: "Red Pencil", price: "24", sku: "ML0166", finish: "Matte", hex: "#b11f2d", blurb: "The classic red, slightly blue. It photographs darker." },
];

const HERO = ["petal", "rose-milk", "coral-tape", "soft-film", "oxblood", "night-plum", "ink"];

export function goodBySlug(slug) {
  return GOODS.find((good) => good.slug === slug) || null;
}

function goodCard(good) {
  return `<a class="good" href="/shop/${good.slug}"><span class="stage" style="background:${wash(good.hex)}">${tube(good.hex)}</span><span class="kicker">${esc(good.finish)}</span><strong>${esc(good.name)}</strong><span class="price">${money(good.price)}</span></a>`;
}

function still(goods) {
  return `<span class="still">${goods
    .map((good, index) => `<span class="piece${index === 3 ? " lead" : ""}">${tube(good.hex)}</span>`)
    .join("")}</span>`;
}

export function home(customer) {
  const heroGoods = HERO.map((slug) => goodBySlug(slug));
  const account = customer
    ? `<p class="account">Signed in as ${esc(customer.name)}. <a href="/orders/${customer.order.id}">Order ${esc(customer.order.id)}</a> · <a href="/support/${customer.ticket.id}">Ticket ${esc(customer.ticket.id)}</a></p>`
    : "";
  return document(
    "Marlow",
    `<a class="hero" href="/shop/soft-film">${still(heroGoods)}<span class="hero-copy"><span class="kicker">New</span><h1>Soft Film</h1><span class="line">&lt; a brown-pink, on purpose &gt;</span></span></a><main class="wrap">${account}<div class="section-head"><h2 id="lipstick">Lipstick</h2><p>${GOODS.length} shades</p></div><div class="goods">${GOODS.map(goodCard).join("")}</div><p class="foot">Marlow Lip Studio. Orders and tickets stay on the signed-in account.</p></main>`,
    customer,
    "shop",
  );
}

export function productPage(customer, good) {
  const next = customer
    ? `<a class="button" href="/orders">See your orders</a>`
    : `<a class="button" href="/login">Sign in to order</a>`;
  return frame(
    good.name,
    `<p><a class="back" href="/">Shop</a></p><div class="product"><div class="stage" style="background:${wash(good.hex)}">${tube(good.hex)}</div><div><p class="kicker">${esc(good.finish)} · ${esc(good.sku)}</p><h1>${esc(good.name)}</h1><p class="price">${money(good.price)}</p><p class="lede">${esc(good.blurb)}</p><div class="actions">${next}</div><table class="spec"><tbody><tr><td>Finish</td><td>${esc(good.finish)}</td></tr><tr><td>Form</td><td>Lipstick</td></tr><tr><td>Price</td><td>${money(good.price)}</td></tr></tbody></table></div></div>`,
    customer,
    "shop",
  );
}

export function catalogMiss(customer) {
  return frame(
    "Not on the shelf",
    '<h1>Not on the shelf</h1><p class="lede">That shade is not in the studio.</p><a class="button" href="/">Back to the shop</a>',
    customer,
    "shop",
  );
}

export function loginPage(failed) {
  const error = failed ? '<p class="error">That email and password do not match.</p>' : "";
  return frame(
    "Sign in",
    `<h1>Sign in</h1><p class="lede">Use the account for the order you want to see.</p><form class="login" method="post" action="/login">${error}<label>Email <input name="email" type="email" autocomplete="username" required></label><label>Password <input name="password" type="password" autocomplete="current-password" required></label><button type="submit">Sign in</button></form>`,
    null,
    "",
  );
}

export function ordersPage(customer) {
  const order = customer.order;
  return frame(
    "Orders",
    `<h1>Orders</h1><p class="lede">Your orders.</p><table><thead><tr><th>Order</th><th>Shade</th><th>Status</th></tr></thead><tbody><tr><td><a href="/orders/${order.id}">${esc(order.id)}</a></td><td>${esc(order.item)}</td><td>${pill(order.status, order.tone)}</td></tr></tbody></table>`,
    customer,
    "orders",
  );
}

export function orderPage(customer) {
  const order = customer.order;
  return frame(
    order.id,
    `<p><a class="back" href="/orders">Orders</a></p><div class="row"><h1>${esc(order.id)}</h1>${pill(order.status, order.tone)}</div><p class="lede">${esc(order.detail)}</p><table><thead><tr><th>Shade</th><th>Qty</th><th>Amount</th></tr></thead><tbody><tr><td>${esc(order.item)}</td><td>${esc(order.qty)}</td><td>${esc(order.amount)}</td></tr></tbody></table><p class="muted">${esc(order.when)}</p><p class="links"><a href="/invoices/${order.id}.pdf">Invoice PDF</a></p>`,
    customer,
    "orders",
  );
}

export function supportPage(customer) {
  const ticket = customer.ticket;
  return frame(
    "Support",
    `<h1>Support</h1><p class="lede">Your tickets.</p><table><thead><tr><th>Ticket</th><th>Subject</th><th>Status</th></tr></thead><tbody><tr><td><a href="/support/${ticket.id}">${esc(ticket.id)}</a></td><td>${esc(ticket.subject)}</td><td>${pill(ticket.status, ticket.tone)}</td></tr></tbody></table>`,
    customer,
    "support",
  );
}

export function ticketPage(customer) {
  const ticket = customer.ticket;
  const lines = customer.earlier
    .map(([who, said]) => `<p><span class="who-line">${esc(who)}</span><br>${esc(said)}</p>`)
    .join("");
  return frame(
    ticket.id,
    `<p><a class="back" href="/support">Support</a></p><div class="row"><h1>${esc(ticket.subject)}</h1>${pill(ticket.status, ticket.tone)}</div><p class="muted">${esc(ticket.id)} · ${esc(ticket.when)}</p><p class="fact">${esc(ticket.body)}</p><div class="earlier"><h2>Earlier</h2>${lines}</div><p class="links"><a href="/invoices/${customer.order.id}.pdf">Invoice PDF</a></p>`,
    customer,
    "support",
  );
}

function renderMessage(message) {
  const parts = [];
  if (message.tool) parts.push(`<p class="tool">${esc(message.tool)}</p>`);
  if (message.text) parts.push(`<p>${esc(message.text)}</p>`);
  if (message.quote) parts.push(`<p class="quote">${esc(message.quote)}</p>`);
  return `<article class="${esc(message.role)}">${parts.join("")}</article>`;
}

export function askPage(customer, messages) {
  const log = messages.map(renderMessage).join("") || '<p class="lede">Ask about an order, a pickup, or a shade.</p>';
  return frame(
    "Ask",
    `<h1>Ask</h1><div class="transcript" id="log">${log}</div><form class="composer" id="ask" method="post" action="/ask"><textarea name="text" required placeholder="Ask Marlow"></textarea><button type="submit">Send</button></form><script>
const form = document.querySelector("#ask");
const log = document.querySelector("#log");
const input = form.querySelector("textarea");
function add(role, text, tool, quote) {
  const empty = log.querySelector(".lede");
  if (empty) empty.remove();
  const item = document.createElement("article");
  item.className = role;
  if (tool) { const line = document.createElement("p"); line.className = "tool"; line.textContent = tool; item.appendChild(line); }
  if (text) { const paragraph = document.createElement("p"); paragraph.textContent = text; item.appendChild(paragraph); }
  if (quote) { const quoted = document.createElement("p"); quoted.className = "quote"; quoted.textContent = quote; item.appendChild(quoted); }
  log.appendChild(item);
  item.scrollIntoView({ block: "nearest" });
  return item;
}
function waiting() {
  const item = add("desk wait", "", "", "");
  const line = document.createElement("p");
  line.textContent = "Looking that up";
  const dots = document.createElement("span");
  dots.className = "dots";
  dots.setAttribute("aria-hidden", "true");
  dots.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
  line.appendChild(dots);
  item.appendChild(line);
  return item;
}
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
});
const send = form.querySelector("button");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text || send.disabled) return;
  input.value = "";
  add("you", text, "", "");
  const pending = waiting();
  send.disabled = true;
  input.disabled = true;
  try {
    const response = await fetch("/ask", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ text }) });
    pending.remove();
    if (!response.ok) add("desk", "Support is not answering.", "", "");
    else {
      const data = await response.json();
      add("desk", data.text, data.tool, data.quote);
    }
  } catch {
    pending.remove();
    add("desk", "Support is not answering.", "", "");
  } finally {
    send.disabled = false;
    input.disabled = false;
    input.focus();
  }
});
</script>`,
    customer,
    "ask",
    true,
  );
}

export function missing(customer) {
  return frame(
    "Not on this account",
    '<h1>Not on this account</h1><p class="lede">That page is not on the signed-in account.</p>',
    customer,
    "",
  );
}
