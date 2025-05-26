import { Hono } from "@hono/hono";

import { kv } from "./db/index.ts";
import { type Version } from "./db/versions.ts";
import {
  getWallpapersByCharcter,
  getWallpapersByVersion,
} from "./db/wallpapers.ts";

const app = new Hono();

app.post();

app.get("/", async (c) => {
  const version = c.req.query("version");
  const wallpapersByVersion = version
    ? await getWallpapersByVersion(
      kv,
      version as Version,
    )
    : null;

  const name = c.req.query("name");
  const wallpapersByCharcter = name
    ? await getWallpapersByCharcter(
      kv,
      name,
    )
    : null;

  console.log(version, name);

  if (!wallpapersByVersion && !wallpapersByCharcter) {
    return c.notFound();
  }

  const setByVersion = new Set(wallpapersByVersion);
  const setByCharacter = new Set(wallpapersByCharcter);

  const set = setByCharacter.size === 0
    ? setByVersion
    : setByVersion.size === 0
    ? setByCharacter
    : setByVersion.intersection(setByCharacter);

  const mobile = c.req.query("mobile");
  if (mobile !== "true" && mobile !== "false") return c.json(set);
  set.forEach((wallpaper) => {
    if (wallpaper.mobile.toString() !== mobile) {
      set.delete(wallpaper);
    }
  });
  return c.json(set);
});

export default app;
