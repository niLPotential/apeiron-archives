import { Hono } from "@hono/hono";

import { sql } from "../../db.ts";

const app = new Hono();

app.get("/", async (c) => {
  const data = await sql`SELECT * FROM versions ORDER BY RANDOM() LIMIT (1)`;
  return c.json(data);
});

app.get("/:id", async (c) => {
  const id = c.req.query("id")!;
  const data = await sql`SELECT * FROM versions where id=${id}`;
  if (data.length === 0) {
    return c.redirect("/");
  }
  return c.json(data);
});

export default app;
