import { adapter } from "@domcojs/deno";
import { domco } from "domco";
import deno from "@deno/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    deno(),
    domco({
      adapter: adapter(),
    }),
  ],
});
