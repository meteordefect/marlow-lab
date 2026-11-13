# Marlow

![Marlow lip studio](media/studio.svg)

A lipstick studio. Sixteen shades on the counter, two customer accounts, and a support desk.

This is a lab, and it is vulnerable on purpose. Do not put it on the public internet, and do not use it as a real store.

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

One browser is one signed-in customer. Orders and tickets belong to that customer.
