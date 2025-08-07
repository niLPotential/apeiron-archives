import { imagekit, WallpaperData } from "../server/db.ts";

export function WallpaperImage({ id }: WallpaperData) {
  const src = imagekit.url({
    signed: true,
    path: `./raw/${id}.jpg`,
    transformation: [{ height: 200 }],
  });
  return <img src={src} alt={`wallpaper-${id}`} loading="lazy" />;
}

export function WallpapersList({ list }: { list: WallpaperData[] }) {
  return (
    <div
      x-data="{
        opened: false,
        active: null,
        index: null,
        open() {
        }
        close() {
        }
        next() {
        }
        prev() {
        }
      }"
      x-on:keyup="next"
    >
      <div>
        <ul class="flex flex-col">
          {list.map((wallpaper) => (
            <li key={wallpaper.id}>
              <WallpaperImage {...wallpaper} />
            </li>
          ))}
        </ul>
      </div>
      <template x-teleport="body">
        <div x-show="opened">
          <div>
            <img />
          </div>
        </div>
      </template>
    </div>
  );
}
