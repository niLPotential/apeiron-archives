import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import type { ArcanistData, WallpaperData } from "./db.ts";
import { sql } from "./db.ts";
import { WallpaperImage, WallpapersList } from "../app/wallpaper.tsx";
import CharacterList from "../components/CharacterList.tsx";

const app = new Hono();

app.use(jsxRenderer(async ({ children, Layout }) => {
  const arcanists = await sql`SELECT * FROM arcanists` as ArcanistData[];

  return (
    <Layout>
      <div class="flex flex-row">
        <nav class="sticky left-0 h-screen shrink-0 flex flex-col w-80 gap-5">
          <CharacterList list={arcanists} />
        </nav>
        <main class="w-full">
          {children}
        </main>
      </div>
    </Layout>
  );
}));

app.get("/", async (c) => {
  const data =
    await sql`SELECT * FROM pictures ORDER BY RANDOM()` as WallpaperData[];

  return c.render(
    <WallpapersList list={data} />,
  );
});

app.get("/characters/:id", async (c) => {
  const id = c.req.param("id");
  const data =
    await sql`SELECT * FROM pictures WHERE ${id} = ANY (arcanists)` as WallpaperData[];
  return c.render(
    <WallpapersList list={data} />,
  );
});

export default app;
