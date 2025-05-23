import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import { getWallpaper } from "./db/wallpapers.ts";

const app = new Hono();

const apiRoute = app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
}).get("/api/wallpapers/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  return c.json(await getWallpaper(id));
});

export type ApiType = typeof apiRoute;

app.get("/", (c) => {
  return c.html(
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://cdn.simplecss.org/simple.min.css"
        />
        <script type="module">
          import RefreshRuntime from '/@react-refresh'
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        </script>
        ${
      // @ts-ignore TODO: merge interface
      import.meta.env.PROD
        ? `<script type="module" src="/static/client.js"></script>`
        : `<script type="module" src="/src/client.tsx"></script>`}
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`,
  );
});

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
