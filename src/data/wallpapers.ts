import { Version } from "./versions.ts";

interface Wallpaper {
  id: number;
  src: string;
  version: Version;
  characters: string[]; // TODO: Configure characters as constant type
  size: "desktop" | "mobile";
}

export const wallpapers: Wallpaper[] = [];
