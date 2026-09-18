// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { Hono } from "hono";
import { registerAuthRoutes } from "./routes/auth";
import { registerPostRoutes } from "./routes/posts";
import { registerTagRoutes } from "./routes/tags";
import { registerCommentRoutes } from "./routes/comments";
import { registerFeedRoutes } from "./routes/feed";
import { registerSearchRoutes } from "./routes/search";

export const app = new Hono();

registerAuthRoutes(app);
registerPostRoutes(app);
registerTagRoutes(app);
registerCommentRoutes(app);
registerFeedRoutes(app);
registerSearchRoutes(app);
