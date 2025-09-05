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
      {src.module.map((_src) => <script type="module" src={_src} key="" />)}
      {src.preload.map((href) => (
        <link rel="preload" crossorigin="" href={href} key="" />
      ))}
      {src.style.map((href) => <link rel="stylesheet" href={href} key="" />)}
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
