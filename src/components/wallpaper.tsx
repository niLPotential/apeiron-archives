import { css } from "@hono/hono/css";

import { imagekit, WallpaperData } from "../db.ts";

export function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({ signed: true, path: `./raw/${id}.jpg` });
  return (
    <a href={`/wallpapers/${id}`}>
      <img src={src} alt={`wallpaper-${id}`} />
    </a>
  );
}

export function WallpapersList({ list }: { list: WallpaperData[] }) {
  const wallpaperListClass = css`
    display: flex;
    flex-direction: column;
  `;

  return (
    <ul class={wallpaperListClass}>
      {list.map((wallpaper) => (
        <li key={wallpaper.id}>
          <WallpaperImage {...wallpaper} />
        </li>
      ))}
    </ul>
  );
}
