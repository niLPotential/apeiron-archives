import data from "../src/data/data.json" with { type: "json" };

let i = 0;
for (const wallpaper of data) {
  const resp = await fetch(wallpaper.pictureUrl);
  if (!resp.ok) break;
  await Deno.writeFile(`./raw/${wallpaper.id}.jpg`, resp.body!);
  setTimeout(() => console.log(`${++i} / ${data.length}`), 1000);
}
