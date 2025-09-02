import { html } from "client:page";
import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

const app = new Hono();

app.get((c) => c.html(html));
app.post("/clicked", (c) => c.text("Clicked!"));
app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

export default app;
