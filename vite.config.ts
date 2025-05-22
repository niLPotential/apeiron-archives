import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./app/index.tsx",
      output: {
        entryFileNames: "js/index.js",
      },
    },
  },
  plugins: [react()],
});
