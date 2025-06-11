import { imagekit } from "../db.ts";

export default function WallpaperImage({ id }: { id: string }) {
  const src = imagekit.url({ signed: true, path: `./${id}.jpg` });
  return <img src={src} alt={`wallpaper-${id}`} />;
}
