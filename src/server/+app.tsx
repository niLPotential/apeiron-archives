import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";
import { serveStatic } from "@hono/hono/deno";

import wallpapers from "./wallpapers.tsx";
import Layout from "../app/layout.tsx";

const app = new Hono();

app.use(jsxRenderer(({ children }) => (
  <Layout>
    {children}
  </Layout>
)));

app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

app.get("/", (c) => c.redirect("/wallpapers"));
app.route("/wallpapers", wallpapers);

export default app;
