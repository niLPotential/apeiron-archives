import { type Arcanist, insertArcanist } from "./arcanists.ts";
import { insertWallpaper, type Wallpaper } from "./wallpapers.ts";

export const kv = await Deno.openKv();

export async function insertWallpapers(kv: Deno.Kv, wallpapers: Wallpaper[]) {
  for (const wallpaper of wallpapers) {
    await insertWallpaper(kv, wallpaper);
  }
}

export async function insertArcanists(kv: Deno.Kv, arcanists: Arcanist[]) {
  for (const arcanist of arcanists) {
    await insertArcanist(kv, arcanist);
  }
}
