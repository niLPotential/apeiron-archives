import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  presets: [presetMini()],
  content: {
    filesystem: ["**/*.tsx"],
  },
});
