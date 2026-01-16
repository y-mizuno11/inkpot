import { Hono } from "hono"
import { registerAuthRoutes } from "./routes/auth"

export const app = new Hono()

registerAuthRoutes(app)
