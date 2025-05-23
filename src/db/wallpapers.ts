import { kv } from "./index.ts";

export interface Wallpaper {
  id: number;
  pictureUrl: string;
  version: string;
}

const sampleWallpaper = {
  version: "1.0",
  id: 6,
  pictureUrl:
    "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20230325/Rock'n'roll!-1125x2436_69c37999272740aeb905e5d98d3efd68.jpg",
};

await kv.set(["wallpapers", sampleWallpaper.id], sampleWallpaper);

export async function getWallpaper(id: number) {
  return (await kv.get(["wallpapers", id])).value as Wallpaper;
}
