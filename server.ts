import { Hono } from "@hono/hono";

import api from "./src/api.ts";

const app = new Hono();

app.route("/api", api);

export default app;
