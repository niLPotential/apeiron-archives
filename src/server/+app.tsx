import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import { src } from "client:script";
import images from "./images.tsx";

declare module "@hono/hono" {
  interface ContextRenderer {
    (
      content: string | Promise<string>,
      props: { title: string },
    ): Response;
  }
}

const app = new Hono();

app.use(jsxRenderer(({ children, title }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {src.module.map((_src) => <script type="module" src={_src} key="" />)}
      {src.preload.map((href) => (
        <link rel="preload" crossorigin="" href={href} key="" />
      ))}
      {src.style.map((href) => <link rel="stylesheet" href={href} key="" />)}
      <title>{title}</title>
    </head>
    <body>
      {children}
    </body>
  </html>
)));

app.get("/", (c) =>
  c.render(
    <main>
      <button
        type="button"
        hx-get="/dialog"
        hx-target="main"
        hx-swap="beforeend"
        hx-push-url
        class="bg-black text-white"
      >
        Open
      </button>
    </main>,
    { title: "main" },
  ));

app.route("/images", images);

app.get("/dialog", (c) => {
  if (!c.req.header("HX-Request")) {
    return c.redirect("/");
  }
  return c.html(
    <div x-data x-ref="dialog">
      <button type="button" x-on:click="$refs.dialog.remove()">Close</button>
    </div>,
  );
});
app.use("/_immutable/*", serveStatic({ root: "./dist/client/" }));

export default app;
