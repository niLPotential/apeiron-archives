import "jsr:@std/dotenv/load";

export const kv = await Deno.openKv(
  "https://api.deno.com/databases/5d7523de-bbac-4268-9be8-83ae501789ec/connect",
);
