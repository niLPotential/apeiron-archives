import { imagekit } from "../db/index.ts";
import type { Wallpaper } from "../db/wallpapers.ts";

export default function Wallpaper({ wp }: { wp: Wallpaper }) {
  return (
    <>
      <div>
        <img
          src={imagekit.url({
            path: `/raw/${wp.id}.jpg`,
            transformation: [{
              "height": 360,
            }],
            signed: true,
            expireSeconds: 300,
          })}
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
