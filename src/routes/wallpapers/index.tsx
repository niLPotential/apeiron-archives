import { Hono } from "@hono/hono";

import { sql } from "../../db.ts";

const app = new Hono();

app.get("/", async (c) => {
  const list = await sql`SELECT * from versions`;
  return c.json(JSON.stringify(list));
});

export default app;
