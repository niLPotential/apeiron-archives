import { Version } from "./versions.ts";

type Size = "desktop" | "mobile";

export function isSize(str: string): str is Size {
  return str === "desktop" || str === "mobile";
}

interface Wallpaper {
  weight: number;
  pictureUrl: string;
  version: Version;
  characters: string[]; // TODO: Configure characters as constant type
  size: Size;
}

export const wallpapers: Wallpaper[] = [];
