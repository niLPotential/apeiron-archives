import { html } from "client:page";
import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";

import images from "./images.ts";
import dialog from "./dialog.tsx";

const app = new Hono();

app.route("/images", images);

app.get((c) => c.html(html));
app.post("/clicked", (c) => c.text("Clicked!"));
app.route("/dialog", dialog);
app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

export default app;
