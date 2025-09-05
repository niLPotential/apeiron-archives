import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import { src } from "client:script";
import images from "./images.tsx";

const app = new Hono();

app.use(jsxRenderer(({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {src.module.map((_src, i) => <script type="module" src={_src} key={i} />)}
      {src.preload.map((href, i) => (
        <link rel="preload" crossorigin="" href={href} key={i} />
      ))}
      {src.style.map((href, i) => (
        <link rel="stylesheet" href={href} key={i} />
      ))}
      <title>Apeiron Archives</title>
    </head>
    <body>
      {children}
    </body>
  </html>
)));

app.get("/", (c) => c.redirect("/images"));
app.route("/images", images);

app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

export default app;
