import { Hono } from "hono";
import { kv } from "./index.ts";
import { Version } from "./versions.ts";

const app = new Hono();

app.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  c.json(await getWallpaper(kv, id));
});

type Size = "desktop" | "mobile";

export function isSize(str: string): str is Size {
  return str === "desktop" || str === "mobile";
}

export interface Wallpaper {
  id: number;
  pictureUrl: string;
  version: Version;
  // characters: string[]; // TODO: Configure characters as constant type
  // size: Size;
}

export async function insertWallpaper(kv: Deno.Kv, wallpaper: Wallpaper) {
  const primaryKey = ["wallpapers", wallpaper.id];
  const byVersionKey = [
    "wallpapers_by_version",
    wallpaper.version,
    wallpaper.id,
  ];
  await kv.atomic().check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, wallpaper)
    .set(byVersionKey, wallpaper)
    .commit();
}

export async function getWallpaper(kv: Deno.Kv, id: number) {
  return (await kv.get(["wallpapers", id])).value as Wallpaper;
}

export async function getWallpapersByVersion(kv: Deno.Kv, version: Version) {
  const iter = kv.list<Wallpaper>({
    prefix: ["wallpapers_by_version", version],
  });
  const wallpapers = [];
  for await (const { value } of iter) {
    wallpapers.push(value);
  }
  return wallpapers;
}

export default app;
