import type { Version } from "../db/versions.ts";
import type { Wallpaper } from "../db/wallpapers.ts";

import WallpaperComponent from "../components/wallpaper.tsx";

export default function WallpaperList(
  { list: wallpapers, version, name }: {
    list: Wallpaper[];
    version?: Version;
    name?: string;
  },
) {
  return (
    <>
      {version && version}
      {name && name}
      <ul>
        {wallpapers.map((wp) => (
          <li key={wp.id}>
            <WallpaperComponent wp={wp} />
          </li>
        ))}
      </ul>
    </>
  );
}
