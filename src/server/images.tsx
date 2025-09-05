import { Hono } from "@hono/hono";
import { jsxRenderer } from "@hono/hono/jsx-renderer";

const app = new Hono();

app.use(jsxRenderer(({ children, Layout }) => (
  <Layout>
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
  </Layout>
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

app.get("/ids/:id", (c) => {
  const id = c.req.param("id");
  return c.html(
    <div x-data x-ref="dialog" class="border-solid">
      <p>{id}</p>
      <button type="button" x-on:click="$refs.dialog.remove()">Close</button>
    </div>,
  );
});

export default app;

function ImagesList({ title }: { title: string }) {
  const data = [1, 2, 3, 4, 5];
  return (
    <>
      <p>User requested {title}.</p>
      <ol hx-target="body" hx-swap="beforeend">
        {data.map((id) => (
          <li>
            <button type="button" hx-get={`/images/ids/${id}`}>{id}</button>
          </li>
        ))}
      </ol>
    </>
  );
}
