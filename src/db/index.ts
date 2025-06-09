import ImageKit from "imagekit";
import { neon } from "@neon/serverless";

export const imagekit = new ImageKit({
  publicKey: "public_56NZQIPYQ7+R8+dnXjwBbFV90XM=",
  privateKey: Deno.env.get("IMAGEKIT_PRIVATE_KEY")!,
  urlEndpoint: "https://ik.imagekit.io/apeironarchives/",
});

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const sql = neon(databaseUrl);

export const kv = await Deno.openKv();
