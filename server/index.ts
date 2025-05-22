import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { handler } from "../entry.server.tsx";
import { kv } from "./db/index.ts";
import { getWallpaper } from "./db/wallpapers.ts";

const app = new Hono();

app.use(
  "/**/*.js",
  serveStatic({
    root: "./dist",
  }),
);
app.post(
  "/api/wallpapers/:id",
  async (c) => {
    const id = parseInt(c.req.param("id"));
    return c.json(await getWallpaper(kv, id));
  },
);
app.use("/*", (c) => handler(c.req.raw));

Deno.serve(app.fetch);
