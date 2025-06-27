import { domco } from "domco";
import deno from "@deno/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    domco(),
    deno(),
  ],
});
