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

const file = await Deno.create("data.json");
const writer = file.writable.getWriter();
await writer.write(new TextEncoder().encode("{"));
for (let i = 1; i < 40; i++) {
  const resp = await fetchData(i);
  await writer.write(
    new TextEncoder().encode(`"${i}": ${JSON.stringify(await resp.json())}`),
  );
  setTimeout(() => console.log(i, "th page fetched"), 500);
}
await writer.write(new TextEncoder().encode("}"));

await writer.close();
