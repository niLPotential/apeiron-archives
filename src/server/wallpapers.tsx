import { Hono } from "@hono/hono";

import { sql, WallpaperData } from "./db.ts";
import { WallpapersList } from "../app/wallpaper.tsx";

const app = new Hono();

app.get("/", async (c) => {
  const version = c.req.query("version");
  const name = c.req.query("name");

  const condition = version && name
    ? sql`WHERE ${version} = version AND ${name} = ANY (arcanists)`
    : version
    ? sql`WHERE ${version} = version`
    : name
    ? sql`WHERE ${name} = ANY (arcanists)`
    : sql`ORDER BY RANDOM() LIMIT 3`;

  const data =
    await sql`SELECT * FROM pictures ${condition}` as WallpaperData[];

  return c.render(
    <WallpapersList list={data} />,
  );
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const data =
    await sql`SELECT * FROM pictures WHERE id = ${id}` as WallpaperData[];
  return c.render(
    <WallpapersList list={data} />,
  );
});

export default app;
