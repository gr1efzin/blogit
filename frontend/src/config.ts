const rawBackendUrl = (import.meta.env.VITE_BACKEND_URL ?? "").trim()

export const BACKEND_URL = rawBackendUrl.replace(/\/+$/, "")
