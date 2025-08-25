import { defineConfig } from "vite";
import path from "path";

// Detectar si estamos en producción (GitHub Pages) o desarrollo (dominio personalizado/local)
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/Buenavilla/" : "/";

export default defineConfig({
  base: basePath,
  // root: "public",
  // publicDir: false,
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "/src": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
