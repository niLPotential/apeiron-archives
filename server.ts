import { Hono } from "@hono/hono";

import routes from "./src/routes.ts";
import api from "./src/api.ts";

const app = new Hono();

app.route("/", routes);
app.route("/api", api);

export default app;
