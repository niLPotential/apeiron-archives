import { imagekit, WallpaperData } from "../server/db.ts";

function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({
    signed: true,
    path: `./raw/${id}.jpg`,
    transformation: [{ height: 200 }],
  });
  return <img src={src} alt={`wallpaper-${id}`} loading="lazy" />;
}

export function WallpapersList({ list }: { list: WallpaperData[] }) {
  return (
    <div>
      <div>
        <ul class="flex flex-col">
          {list.map((wallpaper) => (
            <li key={wallpaper.id}>
              <button
                type="button"
                hx-get={`/images/${wallpaper.id}`}
                hx-target="body"
                hx-swap="beforeend"
              >
                <WallpaperImage {...wallpaper} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
