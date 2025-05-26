import { Hono } from "@hono/hono";

import wallpapers from "./src/wallpapers.ts";
import api from "./src/api.ts";

const app = new Hono();

app.route("/wallpapers", wallpapers);
app.route("/api", api);

export default app;
