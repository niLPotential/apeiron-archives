import { WallpaperSearch } from "./components/wallpaper-search.tsx";

export async function loader() {
          const versions = Object.entries(versionNames).map(
            ([version, versionName]) => {
              return { version, versionName, type: version };
            },
          );
          const arcanists = (await getAllArcanists(kv)).map((arcanist) =>
            Object.assign(arcanist, { type: "arcanist" })
          );
        },

export default function Home() {
  return <WallpaperSearch />;
}
