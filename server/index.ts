import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { handler } from "../entry.server.tsx";
import arcanists from "./db/arcanists.ts";
import wallpapers from "./db/wallpapers.ts";

const app = new Hono();

app.use(
  "/**/*.js",
  serveStatic({
    root: "./dist",
  }),
);
app.route("/api/arcanists", arcanists);
app.route("/api/wallpapers", wallpapers);
app.use("/*", (c) => handler(c.req.raw));

Deno.serve(app.fetch);
