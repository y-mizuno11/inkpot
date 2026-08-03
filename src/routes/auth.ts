import type { Context, Hono } from "hono";
import { login } from "../services/auth";

async function handleLogin(c: Context) {
  const { email, password } = await c.req.json();
  const session = await login(email, password);
  return c.json({ sessionId: session.id });
}

export function registerAuthRoutes(app: Hono) {
  app.post("/login", handleLogin);
}
