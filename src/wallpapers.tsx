import { Hono } from "@hono/hono";

import { kv } from "./db/index.ts";
import type { Version } from "./db/versions.ts";
import {
  getWallpapersByCharcter,
  getWallpapersByVersion,
} from "./db/wallpapers.ts";

import Wallpapers from "./components/wallpapers.tsx";

const app = new Hono();

app.get("/", async (c) => {
  const version = c.req.query("version");
  const wallpapersByVersion = version
    ? await getWallpapersByVersion(
      kv,
      version as Version,
    )
    : [];

  const name = c.req.query("name");
  const wallpapersByCharcter = name
    ? await getWallpapersByCharcter(
      kv,
      name,
    )
    : [];

  if (wallpapersByVersion.length === 0 && wallpapersByCharcter.length === 0) {
    return c.notFound();
  }
  const filteredList = wallpapersByCharcter.length === 0
    ? wallpapersByVersion
    : wallpapersByVersion.length === 0
    ? wallpapersByCharcter
    : wallpapersByCharcter.filter((wallpaper) =>
      wallpapersByVersion.includes(wallpaper)
    );

  const mobile = c.req.query("mobile");
  if (mobile && (mobile === "true" || mobile === "false")) {
    filteredList.filter((wallpaper) => wallpaper.mobile.toString() === mobile);
  }
  return c.render(<Wallpapers list={filteredList} />);
});

export default app;
