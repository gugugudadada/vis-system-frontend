import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => {
            path.replace(/^\/api/, "")
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
