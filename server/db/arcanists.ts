import { Hono } from "hono";
import { kv } from "./index.ts";
import type { Version } from "./versions.ts";

const app = new Hono();

app.get("/", async (c) => {
  c.json(await getAllArcanists(kv));
});
app.get("/:name", async (c) => {
  const name = c.req.param("name");
  c.json(await getArcanist(kv, name));
});

export const afflatuses = [
  "none",
  "beast",
  "mineral",
  "plant",
  "star",
  "intellect",
  "spirit",
] as const;
export type Afflatus = typeof afflatuses[number];

export const rarities = [0, 2, 3, 4, 5, 6] as const;
export type Rarity = typeof rarities[number];

export const damages = ["none", "real", "mental"] as const;
export type Damage = typeof damages[number];

export interface Arcanist {
  name: string;
  krName: string;
  version: Version;
  rarity: Rarity;
  afflatus: Afflatus;
  damage: Damage;
  tags: string[]; // TODO: make tags its own type
}

export async function insertArcanist(kv: Deno.Kv, arcanist: Arcanist) {
  const primaryKey = ["arcanists", arcanist.name];
  const byVersionKey = [
    "arcanists_by_version",
    arcanist.version,
    arcanist.name,
  ];
  const byRarityKey = [
    "arcanists_by_rarity",
    arcanist.rarity,
    arcanist.name,
  ];
  const byAfflatusKey = [
    "arcanists_by_afflatus",
    arcanist.afflatus,
    arcanist.name,
  ];
  await kv.atomic().check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, arcanist)
    .set(byVersionKey, arcanist)
    .set(byRarityKey, arcanist)
    .set(byAfflatusKey, arcanist)
    .commit();
}

export async function getArcanist(kv: Deno.Kv, name: string) {
  return (await kv.get(["arcanists", name])).value as Arcanist;
}

export async function getAllArcanists(kv: Deno.Kv) {
  const iter = kv.list<Arcanist>({ prefix: ["arcanists"] });
  const arcanists = [];
  for await (const { value } of iter) {
    arcanists.push(value);
  }
  return arcanists;
}

export async function getArcanistByVersion(kv: Deno.Kv, version: Version) {
  const iter = kv.list<Arcanist>({
    prefix: ["arcanists_by_version", version],
  });
  const arcanists = [];
  for await (const { value } of iter) {
    arcanists.push(value);
  }
  return arcanists;
}

export async function getArcanistByRarity(kv: Deno.Kv, rarity: Rarity) {
  const iter = kv.list<Arcanist>({
    prefix: ["arcanists_by_rarity", rarity],
  });
  const arcanists = [];
  for await (const { value } of iter) {
    arcanists.push(value);
  }
  return arcanists;
}

export async function getArcanistByAfflatus(kv: Deno.Kv, afflatus: Afflatus) {
  const iter = kv.list<Arcanist>({
    prefix: ["arcanists_by_afflatus", afflatus],
  });
  const arcanists = [];
  for await (const { value } of iter) {
    arcanists.push(value);
  }
  return arcanists;
}

export default app;
