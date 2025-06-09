import { Hono } from "@hono/hono";

import { db } from "../../db.ts";
import { versions } from "../../schema.ts";
import { eq, sql } from "drizzle-orm";

const app = new Hono();

app.get("/", async(c) => {
  const data = await db.select().from(versions).orderBy(sql`RANDOM()`).limit(1);
  return c.json(data);
})

app.get("/:id", async (c) => {
  const id = c.req.query("id")!;
  const data = await db.select().from(versions).where(eq(versions.id, id));
  if (data.length === 0) {
    return c.redirect("/");
  }
  return c.json(data);
});

export default app;
