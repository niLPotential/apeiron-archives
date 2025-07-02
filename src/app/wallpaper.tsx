import { imagekit, WallpaperData } from "../server/db.ts";

export function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({ signed: true, path: `./raw/${id}.jpg` });
  return (
    <a href={`/wallpapers/${id}`}>
      <img src={src} alt={`wallpaper-${id}`} />
    </a>
  );
}

export function WallpapersList({ list }: { list: WallpaperData[] }) {
  return (
    <ul class="flex flex-col">
      {list.map((wallpaper) => (
        <li key={wallpaper.id}>
          <WallpaperImage {...wallpaper} />
        </li>
      ))}
    </ul>
  );
}
