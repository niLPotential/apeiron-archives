import { html as page } from "client:page";
import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { html } from "@hono/hono/html";

const app = new Hono();

app.get((c) => c.html(page));
app.post("/clicked", (c) => c.text("Clicked!"));
app.get("/modal", (c) =>
  c.html(html`
    <close-modal></close-modal>
  `));
app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

export default app;
