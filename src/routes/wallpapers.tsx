import { Hono } from "hono";
import { css } from "hono/css";

import { ArcanistData, sql, VersionData, WallpaperData } from "../db.ts";
import { WallpapersList } from "../components/wallpaper.tsx";

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

  const versions = await sql`SELECT * FROM versions` as VersionData[];
  const arcanists = await sql`SELECT * FROM arcanists` as ArcanistData[];

  const formClass = css`
    display: flex;
    flex-direction: column;
  `;

  return c.render(
    <>
      <form class={formClass}>
        <select name="version">
          {versions.map((v) => (
            <option key={v.id} value={v.id}>{`${v.id}: ${v.kr}`}</option>
          ))}
        </select>
        <select name="name">
          {arcanists.map((a) => (
            <option key={a.id} value={a.id}>{a.kr}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      <WallpapersList list={data} />,
    </>,
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
