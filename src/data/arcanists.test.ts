import { assertEquals } from "@std/assert";
import {
  type Arcanist,
  getAllArcanists,
  getArcanist,
  getArcanistByAfflatus,
  getArcanistByRarity,
  getArcanistByVersion,
  insertArcanist,
} from "./arcanists.ts";

Deno.test("Arcanists", async (t) => {
  const examples: Arcanist[] = [
    {
      name: "37",
      krName: "37",
      version: "1.4",
      rarity: 6,
      afflatus: "star",
      damage: "mental",
      tags: ["공격", "추격", "보조"],
    },
    {
      name: "Vertin",
      krName: "버틴",
      version: "1.0",
      rarity: 0,
      afflatus: "none",
      damage: "none",
      tags: [],
    },
  ];
  const kv = await Deno.openKv(":memory:");

  await t.step("can insert and get arcanists", async () => {
    assertEquals(await getArcanist(kv, "Vertin"), null);

    await insertArcanist(kv, examples[1]);
    assertEquals(await getArcanist(kv, "Vertin"), examples[1]);

    await insertArcanist(kv, examples[0]);
    assertEquals(await getArcanist(kv, "37"), examples[0]);
    assertEquals(await getArcanist(kv, "Vertin"), examples[1]);
  });

  await t.step("can get all arcanists", async () => {
    assertEquals(await getAllArcanists(kv), examples);
  });

  await t.step("can get arcanists by version", async () => {
    assertEquals(await getArcanistByVersion(kv, "1.0"), [examples[1]]);
    assertEquals(await getArcanistByVersion(kv, "1.4"), [examples[0]]);
  });

  await t.step("can get arcanist by rarity", async () => {
    assertEquals(await getArcanistByRarity(kv, 6), [examples[0]]);
  });

  await t.step("can get arcanist by afflatus", async () => {
    assertEquals(await getArcanistByAfflatus(kv, "star"), [examples[0]]);
  });

  kv.close();
});
