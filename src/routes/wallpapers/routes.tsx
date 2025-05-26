import { Hono } from "@hono/hono";

import { kv } from "../../db/index.ts";
import type { Version } from "../../db/versions.ts";
import { getAllArcanists } from "../../db/arcanists.ts";
import {
  getWallpaper,
  getWallpapersByCharcter,
  getWallpapersByVersion,
} from "../../db/wallpapers.ts";

import Home from "./index.tsx";
import Wallpaper from "../../components/wallpaper.tsx";
import WallpaperList from "../../components/wallpaperList.tsx";

const app = new Hono();

app.get("/", async (c) => {
  const arcanists = await getAllArcanists(kv);
  return c.render(<Home arcanists={arcanists} />);
});

app.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  return c.render(<Wallpaper wp={await getWallpaper(kv, id)} />);
});

app.get("/versions/:version", async (c) => {
  const version = c.req.param("version") as Version;
  return c.render(
    <WallpaperList
      list={await getWallpapersByVersion(kv, version)}
      version={version}
    />,
  );
});

app.get("/characters/:name", async (c) => {
  const name = c.req.param("name");
  return c.render(
    <WallpaperList
      list={await getWallpapersByCharcter(kv, name)}
      name={name}
    />,
  );
});

export default app;
