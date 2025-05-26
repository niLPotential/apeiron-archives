import type { Wallpaper } from "../db/wallpapers.ts";

export default function Wallpaper({ wp }: { wp: Wallpaper }) {
  return (
    <>
      <div>
        <img
          src=""
          alt={`Wallpaper id: ${wp.id}`}
          loading="lazy"
        />
      </div>
      <div>
        <div>{wp.version}</div>
        <div>{wp.pictureUrl}</div>
        <div>{wp.characters}</div>
      </div>
    </>
  );
}
