import { css } from "@hono/hono/css";

import { imagekit, WallpaperData } from "../db.ts";

export function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({ signed: true, path: `./raw/${id}.jpg` });
  return <img src={src} alt={`wallpaper-${id}`} />;
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
