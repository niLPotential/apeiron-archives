import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";
import { domco } from "domco";
import unocss from "unocss/vite";

export default defineConfig({ plugins: [domco(), deno(), unocss()] });
