import "jsr:@std/dotenv/load"; // dev only

import { neon } from "@neon/serverless";
import ImageKit from "imagekit";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const sql = neon(databaseUrl);

export const imagekit = new ImageKit({
  publicKey: Deno.env.get("IMAGEKIT_PUBLIC_KEY")!,
  privateKey: Deno.env.get("IMAGEKIT_PRIVATE_KEY")!,
  urlEndpoint: "https://ik.imagekit.io/apeironarchives/",
});

export interface WallpaperData {
  id: number;
  source: string;
  version: string;
  arcanists: string[];
  portrait: boolean;
}

export interface VersionData {
  id: string;
  en: string;
  kr: string;
}

export interface ArcanistData {
  id: string;
  en: string;
  kr: string;
  version: string;
}
