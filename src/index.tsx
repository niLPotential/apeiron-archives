import { Hono } from "@hono/hono";

import { kv } from "./db/index.ts";
import { getWallpaper } from "./db/wallpapers.ts";

const app = new Hono();

const apiRoute = app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
}).get("/api/wallpapers/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  return c.json(await getWallpaper(kv, id));
});

export type ApiType = typeof apiRoute;

export default app;
