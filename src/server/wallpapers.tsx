import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import type { ArcanistData, WallpaperData } from "./db.ts";
import { imagekit, sql } from "./db.ts";
import { WallpapersList } from "../app/wallpaper.tsx";
import CharacterList from "../components/CharacterList.tsx";

const app = new Hono();

app.use(jsxRenderer(async ({ children, Layout }) => {
  const arcanists = await sql`SELECT * FROM arcanists` as ArcanistData[];

  return (
    <Layout>
      <div class="relative flex w-full">
        <nav class="fixed left-0 h-screen shrink-0 flex flex-col">
          <CharacterList list={arcanists} />
        </nav>
        <main>
          {children}
        </main>
      </div>
    </Layout>
  );
}));

app.get("/", async (c) => {
  const data =
    await sql`SELECT * FROM pictures ORDER BY RANDOM() LIMIT 7` as WallpaperData[];

  return c.render(
    <WallpapersList list={data} />,
  );
});

app.get("/characters/:id", async (c) => {
  const id = c.req.param("id");
  const data =
    await sql`SELECT * FROM pictures WHERE ${id} = ANY (arcanists)` as WallpaperData[];
  return c.html(
    <WallpapersList list={data} />,
  );
});

app.get("/images/:id", async (c) => {
  const id = c.req.param("id");
  const [data] =
    await sql`SELECT * FROM pictures WHERE ${id} = id` as WallpaperData[];
  const src = imagekit.url({
    signed: true,
    path: `./raw/${data.id}.jpg`,
  });
  return c.html(
    <div
      x-data
      class="fixed inset-0 bg-black/50 z-1000 flex flex-col items-center"
    >
      <div x-on:click="$el.parentNode.remove()" class="absolute -z-1 inset-0">
      </div>
      <img src={src} class="w-1/2" />
      <div class="flex bg-white">
        <div>{data.version}</div>
        <div>
          {data.arcanists.map((character) => (
            <button
              type="button"
              key={character}
              hx-get={`/wallpapers/characters/${character}`}
              hx-target="main"
            >
            </button>
          ))}
        </div>
        <a>{data.source}</a>
      </div>
    </div>,
  );
});

export default app;
