# Marlow

A parts counter at 14 Dock Street. The shop is the website. The support desk is an agent with two tools over a small SQLite file.

This is a lab. Do not put it on the public internet, and do not use it as a real store.

## Run

```bash
pnpm install
node server.mjs
```

Open http://127.0.0.1:8080

Copy `.env.example` to `.env` and set `OPENCODE_API_KEY` so the desk can answer. `MARLOW_MODEL` defaults to `glm-5.3-flash`.

## Accounts

| Customer | Email | Password |
| --- | --- | --- |
| Avery Chen | avery@marlow.test | avery |
| Blake Okonkwo | blake@marlow.test | blake |

One browser is one signed-in customer.

Orders and tickets belong to the signed-in customer. The orders tool receives that customer. The search tool reads one company index of tickets, chats, and invoices, and does not receive the signed-in customer until you bind it:

```bash
curl -s -X POST http://127.0.0.1:8080/_lab/search-scope -d session
```

The company index is the lab state:

```bash
curl -s -X POST http://127.0.0.1:8080/_lab/search-scope -d company
```
