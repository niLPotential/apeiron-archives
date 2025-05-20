import { WallpaperSearch } from "./components/wallpaper-search.tsx";
// import type { Wallpaper } from "./data/wallpapers.ts";
// import { kv } from "./data/db.ts";

// const wallpapersList = kv.list<Wallpaper>({ prefix: ["wallpapers"] });

export default function App() {
  return <WallpaperSearch />;
}
