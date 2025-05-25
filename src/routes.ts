import { Hono } from "@hono/hono";

import { kv } from "./db/index.ts";
import { type Version } from "./db/versions.ts";
import {
  // getWallpapersByCharcter,
  // getWallpapersByMobile,
  getWallpapersByVersion,
} from "./db/wallpapers.ts";

const app = new Hono();

// TODO: validation
app.get("/", async (c) => {
  const version = c.req.query("version");
  const wallpapersByVersion = await getWallpapersByVersion(
    kv,
    version as Version,
  );
  if (wallpapersByVersion.length === 0) return c.notFound();
  return c.json(wallpapersByVersion);
  // const setByVersion = new Set(wallpapersByVersion);

  // const name = c.req.query("name");
  // const wallpapersByCharcter = await getWallpapersByCharcter(
  //   kv,
  //   name as string,
  // );
  // const setByCharacter = new Set(wallpapersByCharcter);

  // const mobile = c.req.query("mobile");
  // const wallpapersByMobile = await getWallpapersByMobile(kv, mobile === "true");

  // const setByMobile = new Set(wallpapersByMobile);
});

export default app;
