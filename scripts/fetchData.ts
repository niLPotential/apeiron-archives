async function fetchData(current: number) {
  const body = { current, "pageSize": 15 };

  return await fetch(
    "https://re.bluepoch.com/activity/official/websites/picture/query",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    },
  );
}

const file = await Deno.create("./src/data/data.json");
const writer = file.writable.getWriter();
await writer.write(new TextEncoder().encode("["));
for (let i = 1; i < 40; i++) {
  const resp = await fetchData(i);
  const json = await resp.json();
  if (json.data.pageData.length === 0) break;
  for (const data of json.data.pageData) {
    await writer.write(
      new TextEncoder().encode(`${JSON.stringify(data)},`),
    );
  }
  setTimeout(() => console.log(i, "th page fetched"), 500);
}
await writer.write(new TextEncoder().encode("]"));

await writer.close();
