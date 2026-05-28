# BlogIt Frontend

React + TypeScript + Vite SPA for BlogIt.

## Local development (pnpm)

```bash
pnpm install
pnpm dev
```

App runs on `http://localhost:5173`.

## Backend URL

- Production: set **`VITE_BACKEND_URL`** in your Vercel project env vars to your deployed backend base URL.
- Local dev: `vite.config.ts` proxies `/api/*` to `http://127.0.0.1:8787` (Wrangler), so `VITE_BACKEND_URL` is optional locally.

## Vercel routing (important)

This app uses React Router (`BrowserRouter`). To avoid 404 on refresh for routes like `/blogs`, `/blog/:id`, `/login`, `/publish`, etc., we ship:

- `vercel.json` (SPA rewrite)

