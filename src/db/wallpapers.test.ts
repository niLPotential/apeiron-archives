import { assertEquals } from "@std/assert";
import {
  getWallpaper,
  getWallpapersByCharcter,
  getWallpapersByMobile,
  getWallpapersByVersion,
  insertWallpaper,
  type Wallpaper,
} from "./wallpapers.ts";

Deno.test("Wallpapers", async (t) => {
  const examples: Wallpaper[] = [{
    id: 6,
    "pictureUrl":
      "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20230325/Rock'n'roll!-1125x2436_69c37999272740aeb905e5d98d3efd68.jpg",
    version: "1.0",
    mobile: true,
    charcters: ["regulus", "apple"],
  }, {
    "id": 7,
    "pictureUrl":
      "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20230328/2 Rock'n'roll!-2560x1440_87c42147d39a482896123a52630936bd.jpg",
    version: "1.0",
    mobile: false,
    charcters: ["regulus", "apple"],
  }, {
    id: 543,
    "pictureUrl":
      "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250507/20_c964b8347e684fe9bf7cc3e364a23185.jpg",
    version: "1.9", // TODO: Add 2.x versions
    mobile: false,
    charcters: [],
  }];
  const kv = await Deno.openKv(":memory:");

  await t.step("can insert and get wallpaper", async () => {
    assertEquals(await getWallpaper(kv, 6), null);

    await insertWallpaper(kv, examples[0]);

    assertEquals(await getWallpaper(kv, 6), examples[0]);

    await insertWallpaper(kv, examples[2]);
    await insertWallpaper(kv, examples[1]);

    assertEquals(await getWallpaper(kv, 543), examples[2]);
    assertEquals(await getWallpaper(kv, 6), examples[0]);
  });

  await t.step("can get wallpapers by version", async () => {
    assertEquals(await getWallpapersByVersion(kv, "1.0"), [
      examples[0],
      examples[1],
    ]);
    assertEquals(await getWallpapersByVersion(kv, "1.9"), [examples[2]]);
  });

  await t.step("can get wallpapers by character", async () => {
    assertEquals(await getWallpapersByCharcter(kv, "apple"), [
      examples[0],
      examples[1],
    ]);
    assertEquals(await getWallpapersByCharcter(kv, "regulus"), [
      examples[0],
      examples[1],
    ]);
  });

  await t.step("can get wallpapers by mobile", async () => {
    assertEquals(await getWallpapersByMobile(kv, true), [examples[0]]);
    assertEquals(await getWallpapersByMobile(kv, false), [
      examples[1],
      examples[2],
    ]);
  });

  kv.close();
});
