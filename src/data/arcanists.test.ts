import { assertEquals } from "@std/assert";
import {
  type Arcanist,
  getArcanist,
  getArcanistByAfflatus,
  getArcanistByRarity,
  getArcanistByVersion,
  insertArcanist,
} from "./arcanists.ts";

Deno.test("Arcanists", async (t) => {
  const examples: Arcanist[] = [
    {
      name: "Vertin",
      krName: "버틴",
      version: "1.0",
      rarity: 0,
      afflatus: "none",
      damage: "none",
      tags: [],
    },
    {
      name: "37",
      krName: "37",
      version: "1.4",
      rarity: 6,
      afflatus: "star",
      damage: "mental",
      tags: ["공격", "추격", "보조"],
    },
  ];
  const kv = await Deno.openKv(":memory:");

  await t.step("can insert and get arcanists", async () => {
    assertEquals(await getArcanist(kv, "Vertin"), null);

    await insertArcanist(kv, examples[0]);
    assertEquals(await getArcanist(kv, "Vertin"), examples[0]);

    await insertArcanist(kv, examples[1]);
    assertEquals(await getArcanist(kv, "37"), examples[1]);
    assertEquals(await getArcanist(kv, "Vertin"), examples[0]);
  });

  await t.step("can get arcanists by version", async () => {
    assertEquals(await getArcanistByVersion(kv, "1.0"), [examples[0]]);
    assertEquals(await getArcanistByVersion(kv, "1.4"), [examples[1]]);
  });

  await t.step("can get arcanist by rarity", async () => {
    assertEquals(await getArcanistByRarity(kv, 6), [examples[1]]);
  });

  await t.step("can get arcanist by afflatus", async () => {
    assertEquals(await getArcanistByAfflatus(kv, "star"), [examples[1]]);
  });

  kv.close();
});
