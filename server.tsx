import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

import wallpapers from "./src/routes/wallpapers/index.tsx";

const app = new Hono();

app.use(jsxRenderer(({ children }) => (
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Apeiron Archives</title>
    </head>
    <body>
      {children}
    </body>
  </html>
)));

app.get("/", (c) => c.redirect("/wallpapers"));
app.route("/wallpapers", wallpapers);

export default app;
