import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { stream } from "hono/streaming";
import { renderToReadableStream } from "react-dom/server";

import { kv } from "./db/index.ts";
import { getWallpaper } from "./db/wallpapers.ts";

const app = new Hono();

const apiRoute = app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
}).get("/api/wallpapers/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  return c.json(await getWallpaper(kv, id));
});

export type ApiType = typeof apiRoute;

app.get("/", (c) =>
  stream(c, async (stream) => {
    await stream.pipe(await renderToReadableStream(<Test />));
  }));

function Test() {
  return <div>test</div>;
}

app.use(
  "/.vite/*",
  serveStatic({
    mimes: {
      js: "text/javascript",
    },
  }),
);
app.use(
  "/static/*",
  serveStatic({
    root: "./dist",
    mimes: {
      js: "text/javascript",
    },
  }),
);

export default app;
