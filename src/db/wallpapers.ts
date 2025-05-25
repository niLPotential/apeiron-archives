import type { Version } from "./versions.ts";

export interface Wallpaper {
  id: number;
  pictureUrl: string;
  version: Version;
  mobile: boolean;
  characters: string[];
}

export const sampleWallpaper = {
  version: "1.0",
  id: 6,
  pictureUrl:
    "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20230325/Rock'n'roll!-1125x2436_69c37999272740aeb905e5d98d3efd68.jpg",
};

export async function insertWallpaper(kv: Deno.Kv, wallpaper: Wallpaper) {
  const primaryKey = ["wallpapers", wallpaper.id];
  const byVersionKey = [
    "wallpapers_by_version",
    wallpaper.version,
    wallpaper.id,
  ];
  const byMobile = [
    "wallpapers_by_mobile",
    wallpaper.mobile,
    wallpaper.id,
  ];
  const atomic = kv.atomic().check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, wallpaper)
    .set(byVersionKey, wallpaper)
    .set(byMobile, wallpaper);

  for (const character of wallpaper.characters) {
    atomic.set(["wallpapers_by_character", character, wallpaper.id], wallpaper);
  }
  await atomic.commit();
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

export async function getWallpapersByMobile(kv: Deno.Kv, mobile: boolean) {
  const iter = kv.list<Wallpaper>({
    prefix: ["wallpapers_by_mobile", mobile],
  });
  const wallpapers = [];
  for await (const { value } of iter) {
    wallpapers.push(value);
  }
  return wallpapers;
}

export async function getWallpapersByCharcter(kv: Deno.Kv, character: string) {
  const iter = kv.list<Wallpaper>({
    prefix: ["wallpapers_by_character", character],
  });
  const wallpapers = [];
  for await (const { value } of iter) {
    wallpapers.push(value);
  }
  return wallpapers;
}
