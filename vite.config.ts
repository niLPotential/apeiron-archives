import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import build from "@hono/vite-build/deno";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
      build: {
        rollupOptions: {
          input: "./src/App.tsx",
          output: {
            entryFileNames: "static/App.js",
          },
        },
      },
    };
  }

  return {
    esbuild: {
      jsx: "automatic",
      jsxImportSource: "react",
    },
    plugins: [
      build({
        entry: "src/index.tsx",
      }),
      devServer({
        entry: "src/index.tsx",
      }),
      react(),
    ],
  };
});
