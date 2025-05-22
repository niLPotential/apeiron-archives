import { Hono } from "hono";
import { serveStatic } from "hono/deno";

const app = new Hono();

const routes = app.get("/api/clock", (c) => {
  return c.json({
    time: new Date().toLocaleTimeString(),
  });
});

export type AppType = typeof routes;

app.get("/", (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="stylesheet"
          href="https://cdn.simplecss.org/simple.min.css"
        />
        {
          // @ts-ignore TODO: merge interface
          import.meta.env.PROD
            ? <script type="module" src="/static/client.js" />
            : <script type="module" src="/src/client.tsx" />
        }
      </head>
      <body>
        <div id="root" />
      </body>
    </html>,
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
