const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>{{title}}</title>
  <style>
    :root {
      --bg: #f3efe6; --paper: #fffdf8; --ink: #1e1a16; --muted: #5e564c;
      --line: #e2d9cc; --done: #1f6b45; --done-bg: #e5f2ea; --wait: #8a5a12; --wait-bg: #f8efdc;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--ink); font: 17px/1.45 "Avenir Next", "Segoe UI", sans-serif; }
    a { color: inherit; }
    .top { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 28px; background: var(--paper); border-bottom: 1px solid var(--line); }
    .mark { font-family: "Iowan Old Style", Palatino, Georgia, serif; font-size: 26px; letter-spacing: -0.03em; text-decoration: none; }
    .mark small { margin-left: 8px; font-family: "Avenir Next", "Segoe UI", sans-serif; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
    .nav { display: flex; align-items: center; gap: 22px; }
    .nav a { text-decoration: none; color: var(--muted); }
    .nav a.on { color: var(--ink); box-shadow: inset 0 -2px 0 var(--ink); }
    .who { color: var(--muted); }
    button, .button { font: inherit; background: var(--ink); color: var(--paper); border: 0; border-radius: 8px; min-height: 44px; padding: 0 16px; text-decoration: none; display: inline-flex; align-items: center; cursor: pointer; }
    button.quiet { background: transparent; color: var(--ink); padding: 0; min-height: 0; }
    .wrap { max-width: 880px; margin: 0 auto; padding: 36px 28px 72px; }
    h1 { font-family: "Iowan Old Style", Palatino, Georgia, serif; font-size: 40px; line-height: 1.1; font-weight: 500; letter-spacing: -0.03em; margin: 0 0 8px; }
    h2 { font: 600 13px/1.2 "Avenir Next", "Segoe UI", sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin: 28px 0 12px; }
    .lede { color: var(--muted); margin: 0 0 28px; max-width: 38em; }
    .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { display: block; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 18px 18px 16px; text-decoration: none; }
    .card strong { display: block; font-size: 20px; margin: 10px 0 4px; }
    .card span, .muted { color: var(--muted); }
    .pill { display: inline-block; border-radius: 999px; padding: 2px 10px; font-size: 13px; }
    .done { background: var(--done-bg); color: var(--done); }
    .wait { background: var(--wait-bg); color: var(--wait); }
    table { width: 100%; border-collapse: collapse; background: var(--paper); }
    th, td { text-align: left; padding: 12px 0; border-bottom: 1px solid var(--line); }
    th { color: var(--muted); font-weight: 500; }
    .sheet { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 22px 22px 8px; }
    .back { color: var(--muted); text-decoration: none; }
    .fact { font-size: 22px; line-height: 1.35; margin: 18px 0; }
    .earlier p { margin: 0 0 10px; }
    .who-line { color: var(--muted); font-size: 13px; }
    .login { max-width: 380px; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 22px; }
    label { display: block; margin: 0 0 14px; color: var(--muted); font-size: 14px; }
    input, textarea { width: 100%; margin-top: 6px; font: inherit; color: var(--ink); background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; min-height: 44px; }
    textarea { min-height: 52px; resize: vertical; }
    .error { color: #8d2b2b; }
    .transcript { min-height: 120px; }
    article.you, article.desk { border-radius: 12px; padding: 14px 16px; margin: 0 0 12px; }
    article.you { margin-left: 16%; background: var(--ink); color: var(--paper); }
    article.desk { margin-right: 8%; background: var(--paper); border: 1px solid var(--line); }
    article p { margin: 0; }
    .tool { color: var(--muted); font-size: 14px; margin-bottom: 8px; }
    .quote { margin-top: 10px; padding-left: 12px; border-left: 2px solid var(--ink); font-size: 20px; line-height: 1.35; }
    .composer { display: flex; gap: 8px; align-items: end; margin-top: 8px; }
    .composer textarea { flex: 1; }
    .row { display: flex; justify-content: flex-start; gap: 14px; align-items: center; }
    .row h1 { margin: 0; }
    .links { margin: 18px 0 8px; }
    .links a { color: var(--ink); }
    h1, .good strong, .feature strong { text-wrap: balance; }
    .lede, .good span, .feature p { text-wrap: pretty; }
    a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }
    .hero { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px; align-items: end; margin-bottom: 48px; }
    .hero h1 { font-size: 48px; line-height: 1; max-width: 680px; }
    .actions { display: flex; gap: 12px; align-items: center; margin-top: 24px; }
    .actions .quiet { background: transparent; color: var(--ink); border: 1px solid var(--ink); }
    .feature, .good { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; text-decoration: none; transition: background-color 300ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1); }
    .feature { display: block; padding: 0; overflow: hidden; }
    .feature:hover, .good:hover { background: #f7f1e6; }
    .feature:active, .good:active { transform: scale(0.98); }
    .good img, .feature img, .shot { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; background: var(--bg); }
    .shot { width: min(100%, 420px); border: 1px solid var(--line); border-radius: 12px; margin: 0 0 24px; }
    .pad { padding: 16px; display: flex; flex-direction: column; flex: 1; }
    .kicker { margin: 0 0 8px; color: var(--muted); font-size: 14px; line-height: 20px; letter-spacing: 0.04em; text-transform: uppercase; }
    .price { margin: 16px 0 0; font-size: 24px; line-height: 32px; }
    .shelf { margin-top: 8px; font: 600 24px/32px "Avenir Next", "Segoe UI", sans-serif; letter-spacing: 0; text-transform: none; color: var(--ink); }
    .goods { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
    .good { display: flex; flex-direction: column; min-height: 180px; padding: 0; overflow: hidden; }
    .good strong { display: block; margin: 8px 0 4px; font-size: 18px; line-height: 28px; font-weight: 600; }
    .good .price { margin-top: auto; padding-top: 16px; }
    .account { background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin: 0 0 32px; }
    .account a { color: var(--ink); }
    .spec { margin-top: 24px; }
    .foot { margin-top: 48px; color: var(--muted); font-size: 14px; line-height: 20px; }
    @media (prefers-reduced-motion: reduce) {
      .feature, .good { transition: none; }
    }
    @media (max-width: 720px) {
      .cards, .goods, .hero { grid-template-columns: 1fr; }
      .hero h1 { font-size: 36px; line-height: 40px; }
      .top { align-items: flex-start; flex-direction: column; }
      article.you { margin-left: 0; }
    }
  </style>
</head>
<body>
  {{header}}
  <main class="wrap">{{body}}</main>
</body>
</html>`;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function header(customer, section) {
  const mark = '<a class="mark" href="/">Marlow <small>Supply</small></a>';
  const shop = `<a href="/"${section === "shop" ? ' class="on"' : ""}>Shop</a>`;
  if (!customer) {
    return `<header class="top">${mark}<nav class="nav">${shop}<a class="button" href="/login">Sign in</a></nav></header>`;
  }
  const links = [
    ["orders", "Orders", "/orders"],
    ["support", "Support", "/support"],
    ["ask", "Ask", "/ask"],
  ].map(([key, label, href]) => `<a href="${href}"${section === key ? ' class="on"' : ""}>${label}</a>`).join("");
  return `<header class="top">${mark}<nav class="nav">${shop}${links}<span class="who">${esc(customer.name)}</span><form method="post" action="/logout"><button class="quiet" type="submit">Sign out</button></form></nav></header>`;
}

function document(title, body, customer, section) {
  return PAGE.replace("{{title}}", esc(title))
    .replace("{{header}}", header(customer, section))
    .replace("{{body}}", body);
}

function pill(text, tone) {
  return `<span class="pill ${tone}">${esc(text)}</span>`;
}

const GOODS = [
  { slug: "clamp", name: "Brass hose clamp, 12 mm", price: "12.00", sku: "MS1042", group: "Clamps", blurb: "For fuel and water hose. Sold each. Four of these are the 48.00 box on the invoice." },
  { slug: "collar", name: "Replacement collar", price: "126.00", sku: "MS2210", group: "Fittings", blurb: "A machined collar for the dockside coupling. Pickup is at the counter once the order is ready." },
  { slug: "screw", name: "Stainless screw clamp, 20 mm", price: "8.45", sku: "MS2088", group: "Clamps", blurb: "A screw clamp for 20 mm hose. The band is stainless and the screw housing is plated." },
  { slug: "hose", name: "Bilge hose, 19 mm", price: "6.75", sku: "MS1906", group: "Hose", blurb: "Smooth bore hose, sold by the metre. It sits on a 19 mm barb." },
  { slug: "cap", name: "Deck fill cap", price: "34.50", sku: "MS4412", group: "Deck", blurb: "A flush cap for a water fill. The chain stays on the neck so it does not go overboard." },
  { slug: "zinc", name: "Hull zinc, 0.7 kg", price: "19.80", sku: "MS0701", group: "Anodes", blurb: "A hull anode with two mounting holes. Replace it when the metal is half gone." },
  { slug: "barb", name: "Fuel barb, 8 mm", price: "4.15", sku: "MS0815", group: "Fittings", blurb: "A straight brass barb for 8 mm fuel hose. Use it with the 12 mm clamp on the other end of a reducer." },
  { slug: "tape", name: "PTFE thread tape", price: "3.40", sku: "MS0312", group: "Sealants", blurb: "One roll for pipe threads at the counter. It is not a substitute for a proper seal on fuel." },
];

function money(price) {
  return `$${esc(price)}`;
}

function photo(good, className) {
  const cls = className ? ` class="${className}"` : "";
  return `<img${cls} src="/media/${good.slug}.webp" alt="${esc(good.name)}" width="800" height="800">`;
}

function goodCard(good) {
  return `<a class="good" href="/shop/${good.slug}">${photo(good)}<span class="pad"><span class="kicker">${esc(good.group)}</span><strong>${esc(good.name)}</strong><span>${esc(good.sku)}</span><p class="price">${money(good.price)}</p></span></a>`;
}

function storefront(customer) {
  const account = customer
    ? `<p class="account">Signed in as ${esc(customer.name)}. <a href="/orders/${customer.order.id}">Order ${esc(customer.order.id)}</a> · <a href="/support/${customer.ticket.id}">Ticket ${esc(customer.ticket.id)}</a></p>`
    : "";
  const featured = GOODS[1];
  const actions = customer
    ? `<a class="button" href="#goods">Browse the counter</a><a class="button quiet" href="/orders">Your orders</a>`
    : `<a class="button" href="#goods">Browse the counter</a><a class="button quiet" href="/login">Sign in</a>`;
  return document(
    "Marlow Supply",
    `${account}<section class="hero"><div><p class="kicker">14 Dock Street</p><h1>Parts for boats and the dock</h1><p class="lede">Hose, clamps, and fittings from the counter. Sign in to see an order already placed.</p><div class="actions">${actions}</div><p class="muted">Counter open 7 to 4, weekdays.</p></div><a class="feature" href="/shop/${featured.slug}">${photo(featured)}<span class="pad"><p class="kicker">On the bench</p><strong>${esc(featured.name)}</strong><p>${esc(featured.blurb)}</p><p class="price">${money(featured.price)}</p></span></a></section><h2 class="shelf" id="goods">At the counter</h2><div class="goods">${GOODS.map(goodCard).join("")}</div><p class="foot">Marlow Supply, 14 Dock Street. Orders and tickets stay on the signed in account.</p>`,
    customer,
    "shop",
  );
}

export function goodBySlug(slug) {
  return GOODS.find((good) => good.slug === slug) || null;
}

export function home(customer) {
  return storefront(customer);
}

export function productPage(customer, good) {
  const next = customer
    ? `<a class="button" href="/orders">See your orders</a>`
    : `<a class="button" href="/login">Sign in to order</a>`;
  return document(
    good.name,
    `<p><a class="back" href="/">Shop</a></p>${photo(good, "shot")}<p class="kicker">${esc(good.group)} · ${esc(good.sku)}</p><h1>${esc(good.name)}</h1><p class="lede">${esc(good.blurb)}</p><p class="price">${money(good.price)}</p><div class="actions">${next}</div><div class="sheet spec"><table><thead><tr><th>Detail</th><th>Value</th></tr></thead><tbody><tr><td>SKU</td><td>${esc(good.sku)}</td></tr><tr><td>Group</td><td>${esc(good.group)}</td></tr><tr><td>Price</td><td>${money(good.price)}</td></tr></tbody></table></div>`,
    customer,
    "shop",
  );
}

export function catalogMiss(customer) {
  return document(
    "Not in the counter",
    '<h1>Not in the counter</h1><p class="lede">That part is not on the shelf.</p><a class="button" href="/">Browse the counter</a>',
    customer,
    "shop",
  );
}

export function loginPage(failed) {
  const error = failed ? '<p class="error">That email and password do not match.</p>' : "";
  return document(
    "Sign in",
    `<h1>Sign in</h1><p class="lede">Use the account for the order you want to see.</p><form class="login" method="post" action="/login">${error}<label>Email <input name="email" type="email" autocomplete="username" required></label><label>Password <input name="password" type="password" autocomplete="current-password" required></label><button type="submit">Sign in</button></form>`,
    null,
    "",
  );
}

export function ordersPage(customer) {
  const order = customer.order;
  return document(
    "Orders",
    `<h1>Orders</h1><p class="lede">Your orders.</p><div class="sheet"><table><thead><tr><th>Order</th><th>Item</th><th>Status</th></tr></thead><tbody><tr><td><a href="/orders/${order.id}">${esc(order.id)}</a></td><td>${esc(order.item)}</td><td>${pill(order.status, order.tone)}</td></tr></tbody></table></div>`,
    customer,
    "orders",
  );
}

export function orderPage(customer) {
  const order = customer.order;
  return document(
    order.id,
    `<p><a class="back" href="/orders">Orders</a></p><div class="row"><h1>${esc(order.id)}</h1>${pill(order.status, order.tone)}</div><p class="lede">${esc(order.detail)}</p><div class="sheet"><table><thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead><tbody><tr><td>${esc(order.item)}</td><td>${esc(order.qty)}</td><td>${esc(order.amount)}</td></tr></tbody></table></div><p class="muted">${esc(order.when)}</p><p class="links"><a href="/invoices/${order.id}.pdf">Invoice PDF</a></p>`,
    customer,
    "orders",
  );
}

export function supportPage(customer) {
  const ticket = customer.ticket;
  return document(
    "Support",
    `<h1>Support</h1><p class="lede">Your tickets.</p><div class="sheet"><table><thead><tr><th>Ticket</th><th>Subject</th><th>Status</th></tr></thead><tbody><tr><td><a href="/support/${ticket.id}">${esc(ticket.id)}</a></td><td>${esc(ticket.subject)}</td><td>${pill(ticket.status, ticket.tone)}</td></tr></tbody></table></div>`,
    customer,
    "support",
  );
}

export function ticketPage(customer) {
  const ticket = customer.ticket;
  const lines = customer.earlier
    .map(([who, said]) => `<p><span class="who-line">${esc(who)}</span><br>${esc(said)}</p>`)
    .join("");
  return document(
    ticket.id,
    `<p><a class="back" href="/support">Support</a></p><div class="row"><h1>${esc(ticket.subject)}</h1>${pill(ticket.status, ticket.tone)}</div><p class="muted">${esc(ticket.id)} · ${esc(ticket.when)}</p><p class="fact">${esc(ticket.body)}</p><div class="earlier"><h2>Earlier chat</h2>${lines}</div><p class="links"><a href="/invoices/${customer.order.id}.pdf">Invoice PDF</a></p>`,
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
  const log = messages.map(renderMessage).join("") || '<p class="lede">Ask about a delivery, a ticket, or an invoice.</p>';
  return document(
    "Support",
    `<h1>Support</h1><div class="transcript" id="log">${log}</div><form class="composer" id="ask" method="post" action="/ask"><textarea name="text" required placeholder="Ask support"></textarea><button type="submit">Send</button></form><script>
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
}
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); form.requestSubmit(); }
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  add("you", text, "", "");
  const response = await fetch("/ask", { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ text }) });
  if (!response.ok) { add("desk", "Support is not answering.", "", ""); return; }
  const data = await response.json();
  add("desk", data.text, data.tool, data.quote);
});
</script>`,
    customer,
    "ask",
  );
}

export function missing(customer) {
  return document(
    "Not on this account",
    '<h1>Not on this account</h1><p class="lede">That page is not on the signed-in account.</p>',
    customer,
    "",
  );
}
