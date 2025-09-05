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
    <ImagesList title="random images" />,
  ));

app.get("/favorites", (c) =>
  c[c.req.header("HX-Request") ? "html" : "render"](
    <ImagesList title="favorite images" />,
  ));

app.get("/characters", (c) =>
  c[c.req.header("HX-Request") ? "html" : "render"](
    <div>User requested list of charcters.</div>,
  ));
app.get("/characters/:id", (c) => {
  const id = c.req.param("id");
  return c[c.req.header("HX-Request") ? "html" : "render"](
    <ImagesList title={`images of ${id}`} />,
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
    <ImagesList title={`images of ${id}`} />,
  );
});

export default app;

function ImagesList({ title }: { title: string }) {
  return (
    <>
      <p>User requested {title}.</p>
      <ol>
        <li>
          <button type="button">1</button>
        </li>
        <li>
          <button type="button">2</button>
        </li>
        <li>
          <button type="button">3</button>
        </li>
        <li>
          <button type="button">4</button>
        </li>
        <li>
          <button type="button">5</button>
        </li>
      </ol>
    </>
  );
}
