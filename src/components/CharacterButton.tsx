// import { imagekit } from "../server/db.ts";

export default function CharacterButton(
  { id, name }: { id: string; name: string },
) {
  // const src = imagekit.url({ signed: true, path: `./avatar/${id}.jpg` });
  return (
    <a href={`/wallpapers/characters/${id}`} class="border rounded-full p-5">
      {/* <img src={src} alt={id.at(0)} /> */}
      <span>{name}</span>
    </a>
  );
}
