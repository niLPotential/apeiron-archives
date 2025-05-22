import { useLoaderData } from "react-router";
import { createListCollection } from "./components/ui/combobox.tsx";
import { WallpaperSearch } from "./components/wallpaper-search.tsx";

export async function loader() {
  const versions = ["1.1"];
  const arcanists = await (await fetch("/api/arcanists")).json();
  return {
    listCollection: createListCollection({
      "items": [...versions, ...arcanists],
      "itemToString": (item) => {
        switch (item.type) {
          case "version":
            return `${item.version}: ${
              (item as typeof versions[number]).versionName
            }`;
          case "arcanist":
            return (item as typeof arcanists[number]).krName;
          default:
            return "unknown type";
        }
      },
      "itemToValue": (item) => {
        switch (item.type) {
          case "version":
            return item.version;
          case "arcanist":
            return (item as typeof arcanists[number]).name;
          default:
            return "unknown type";
        }
      },
      "groupBy": (item) => item.type,
      "groupSort": ["version", "arcanist"],
    }),
  };
}

export default function Home() {
  const { listCollection } = useLoaderData();

  return <WallpaperSearch initialCollection={listCollection} />;
}
