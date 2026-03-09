import { Hono } from "hono"
import { registerAuthRoutes } from "./routes/auth"
import { registerPostRoutes } from "./routes/posts"
import { registerTagRoutes } from "./routes/tags"

export const app = new Hono()

registerAuthRoutes(app)
registerPostRoutes(app)
registerTagRoutes(app)
