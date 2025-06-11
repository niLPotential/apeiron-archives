import { imagekit, WallpaperData } from "../db.ts";

export function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({ signed: true, path: `./${id}.jpg` });
  return <img src={src} alt={`wallpaper-${id}`} />;
}

export function WallpapersList({ list }: { list: WallpaperData[] }) {
  return (
    <ul>
      {list.map((wallpaper) => (
        <li key={wallpaper.id}>
          <WallpaperImage {...wallpaper} />
        </li>
      ))}
    </ul>
  );
}
