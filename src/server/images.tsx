import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/random", (c) => {
  const count = c.req.query("q");
  return c.html(
    <div>User requested ${count} images.</div>,
  );
});

app.get("/favorites", (c) => {
  return c.html(
    <div>User requested favorite images.</div>,
  );
});

app.get("/characters", (c) => {
  return c.html(
    <div>User requested list of charcters.</div>,
  );
});
app.get("/characters/:id", (c) => {
  const id = c.req.param("id");
  return c.html(
    <div>User requested images of ${id}.</div>,
  );
});

app.get("/versions", (c) => {
  return c.html(
    <div>User requested list of versions.</div>,
  );
});
app.get("/versions/:id", (c) => {
  const id = c.req.param("id");
  return c.html(
    <div>User requested images of ${id}.</div>,
  );
});

export default app;
