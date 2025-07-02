import { domco } from "domco";
import { adapter } from "@domcojs/deno";
import deno from "@deno/vite-plugin";
import unocss from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    domco({ adapter: adapter() }),
    deno(),
    unocss(),
  ],
});
