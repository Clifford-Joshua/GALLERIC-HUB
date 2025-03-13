import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.pexels.com/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api/freepik": {
        target: "https://api.freepik.com/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/freepik/, ""),
      },
    },
  },
});
