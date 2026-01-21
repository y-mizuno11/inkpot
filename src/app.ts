import { Hono } from "hono"
import { registerAuthRoutes } from "./routes/auth"
import { registerPostRoutes } from "./routes/posts"

export const app = new Hono()

registerAuthRoutes(app)
registerPostRoutes(app)
