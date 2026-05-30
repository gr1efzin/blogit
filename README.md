# BlogIt

Full‑stack minimalistic blogging app.

- **Frontend**: React + TypeScript + Vite + Tailwind + shadcn in `frontend/`
- **Backend**: Cloudflare Workers (Wrangler) + Hono + Prisma Accelerate in `backend/`

## Requirements

- Node.js
- Cloudflare Wrangler (installed via `backend` devDependencies)

## Project structure

- `frontend/`: SPA (React Router)
- `backend/`: Worker API

## Environment variables

### Frontend (Vercel / local)

- **`VITE_BACKEND_URL`**: base URL of the deployed backend

### Backend (Wrangler)

Backend expects these bindings:

- **`DATABASE_URL`**
- **`DIRECT_DATABASE_URL`** (used by Prisma config)
- **`JWT_SECRET`**

Wrangler will load secrets from `backend/.env` when running locally (do not commit secrets).

## Run locally (pnpm)

Start backend:

```bash
cd backend
pnpm install
pnpm dev
```

Start frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

## Deployment notes

### Vercel (frontend)

This is a client-side routed SPA. To prevent 404s on refresh for routes like `/blogs`, `/blog/:id`, `/login`, etc., the frontend includes:

- `frontend/vercel.json`: rewrite all paths to `/` (SPA fallback)

### Backend

Deploy the Worker from `backend/`:

```bash
cd backend
pnpm deploy
```

