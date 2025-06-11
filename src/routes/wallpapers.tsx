import { Hono } from "@hono/hono";

import { sql } from "../db.ts";
import WallpaperImage from "../components/wallpaper.tsx"

const app = new Hono();

app.get("/", async (c) => {
  const data = await sql`SELECT * FROM pictures ORDER BY RANDOM() LIMIT 1`;
  return c.render(
    <WallpaperImage id={data.at(0)?.id}/>
  );
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const data = await sql`SELECT * FROM pictures WHERE id=${id}`;
  if (data.length === 0) {
    return c.redirect("/");
  }
  return c.json(data);
});

export default app;
