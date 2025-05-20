import type { Version } from "./versions.ts";

export const afflatuses = [
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

export const damages = ["real", "mental"] as const;
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
  await kv.atomic().check({ key: primaryKey, versionstamp: null })
    .set(primaryKey, arcanist)
    .set(byVersionKey, arcanist)
    .commit();
}

export async function getArcanist(kv: Deno.Kv, name: string) {
  return (await kv.get(["arcanists", name])).value as Arcanist;
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
