import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neon/serverless";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const sql = neon(databaseUrl);
export const db = drizzle({ client: sql });
