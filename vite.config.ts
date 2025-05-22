import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./entry.client.tsx",
      output: {
        entryFileNames: "js/entry.client.js",
      },
    },
  },
  plugins: [, react()],
});
