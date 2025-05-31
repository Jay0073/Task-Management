import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// Plugin to copy index.html to 404.html
function copy404Plugin() {
  return {
    name: "copy-index-to-404",
    closeBundle: () => {
      fs.copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Task-Management/',
  plugins: [
    react(),
    tailwindcss(),
    copy404Plugin()
  ],
});
