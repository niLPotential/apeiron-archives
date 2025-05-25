import "jsr:@std/dotenv/load";
import { insertWallpaper, type Wallpaper } from "../src/db/wallpapers.ts";

export const kv = await Deno.openKv(
  "https://api.deno.com/databases/5d7523de-bbac-4268-9be8-83ae501789ec/connect",
);

const wallpapers: Wallpaper[] = [];

for (const wallpaper of wallpapers) {
  await insertWallpaper(kv, wallpaper);
}
