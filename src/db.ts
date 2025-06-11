import "jsr:@std/dotenv/load"; // dev only

import { neon } from "@neon/serverless";
import ImageKit from "imagekit";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const sql = neon(databaseUrl);

export const imagekit = new ImageKit({
  publicKey: "",
  privateKey: "",
  urlEndpoint: "",
});

export interface WallpaperData {
  id: number;
  version: string;
  arcanists: string[];
  portrait: boolean;
}
