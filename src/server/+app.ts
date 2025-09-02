import { html } from "client:page";
import { Hono } from "@hono/hono";

const app = new Hono();

app.get((c) => c.html(html));

app.post("/clicked", (c) => c.text("Clicked!"));

export default app;
