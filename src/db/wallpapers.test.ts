import { assertEquals } from "@std/assert";
import {
  getWallpaper,
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
    mobile: false,
  }, {
    id: 543,
    "pictureUrl":
      "https://gamecms-res.sl916.com/official_website_resource/50001/4/PICTURE/20250507/20_c964b8347e684fe9bf7cc3e364a23185.jpg",
    version: "1.9", // TODO: Add 2.x versions
    mobile: false,
  }];
  const kv = await Deno.openKv(":memory:");

  await t.step("can insert and get wallpaper", async () => {
    assertEquals(await getWallpaper(kv, 6), null);

    await insertWallpaper(kv, examples[0]);

    assertEquals(await getWallpaper(kv, 6), examples[0]);

    await insertWallpaper(kv, examples[1]);

    assertEquals(await getWallpaper(kv, 543), examples[1]);
    assertEquals(await getWallpaper(kv, 6), examples[0]);
  });

  await t.step("can get wallpapers by version", async () => {
    assertEquals(await getWallpapersByVersion(kv, "1.0"), [examples[0]]);
    assertEquals(await getWallpapersByVersion(kv, "1.9"), [examples[1]]);
  });

  kv.close();
});
