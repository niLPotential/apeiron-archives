import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

const app = new Hono();

app.use(jsxRenderer(({ children }) => (
  <>
    <nav hx-boost hx-push-url hx-target="main">
      <ul>
        <li>
          <a href="/images">Home</a>
        </li>
        <li>
          <a href="/images/random">Random</a>
        </li>
        <li>
          <a href="/images/favorites">Favorites</a>
        </li>
      </ul>
    </nav>
    <main>{children}</main>
  </>
)));

app.get("/", (c) => c.render(<div>Home</div>));

app.get("/random", (c) =>
  c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested random images.</div>,
  ));

app.get("/favorites", (c) =>
  c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested favorite images.</div>,
  ));

app.get("/characters", (c) =>
  c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested list of charcters.</div>,
  ));
app.get("/characters/:id", (c) => {
  const id = c.req.param("id");
  return c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested images of ${id}.</div>,
  );
});

app.get("/versions", (c) => {
  return c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested list of versions.</div>,
  );
});
app.get("/versions/:id", (c) => {
  const id = c.req.param("id");
  return c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested images of ${id}.</div>,
  );
});

export default app;
