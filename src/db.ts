import "jsr:@std/dotenv/load"; // dev only

import { neon } from "@neon/serverless";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const sql = neon(databaseUrl);
