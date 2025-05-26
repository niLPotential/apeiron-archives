import type { Wallpaper } from "../db/wallpapers.ts";

export default function Wallpaper({ wp }: { wp: Wallpaper }) {
  return (
    <>
      <div>
        <img src={wp.pictureUrl} alt="" />
      </div>
      <div>
        <div id="version">{wp.version}</div>
        <div id="src">{wp.pictureUrl}</div>
        <div id="characters">{wp.characters}</div>
      </div>
    </>
  );
}
