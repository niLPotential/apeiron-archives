import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import type { ArcanistData, WallpaperData } from "./db.ts";
import { sql } from "./db.ts";
import { WallpapersList } from "../app/wallpaper.tsx";
import CharacterList from "../components/CharacterList.tsx";

const app = new Hono();

app.use(jsxRenderer(async ({ children }) => {
  const arcanists = await sql`SELECT * FROM arcanists` as ArcanistData[];

  return (
    <>
      <CharacterList list={arcanists} />
      {children}
    </>
  );
}));

app.get("/", async (c) => {
  const data =
    await sql`SELECT * FROM pictures ORDER BY RANDOM() LIMIT 3` as WallpaperData[];

  return c.render(
    <WallpapersList list={data} />,
  );
});

// app.get("/:id", async (c) => {
//   const id = c.req.param("id");
//   const data =
//     await sql`SELECT * FROM pictures WHERE id = ${id}` as WallpaperData[];
//   return c.render(
//     <WallpapersList list={data} />,
//   );
// });

app.get("/characters/:id", async (c) => {
  const id = c.req.param("id");
  const data =
    await sql`SELECT * FROM pictures WHERE ${id} = ANY (arcanists)` as WallpaperData[];
  return c.render(
    <WallpapersList list={data} />,
  );
});

export default app;
