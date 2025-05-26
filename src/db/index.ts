import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: "public_56NZQIPYQ7+R8+dnXjwBbFV90XM=",
  privateKey: Deno.env.get("IMAGEKIT_PRIVATE_KEY")!,
  urlEndpoint: " https://ik.imagekit.io/apeironarchives/",
});

export const kv = await Deno.openKv();
