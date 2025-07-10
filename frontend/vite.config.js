import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy all /api requests to your AWS backend
      "/api": {
        target: "http://13.127.111.111:8080",
        changeOrigin: true,
        secure: false,
        // Don't rewrite the path - keep /api prefix
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("Proxy error:", err);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            console.log(
              "Proxying request:",
              req.method,
              req.url,
              "→",
              proxyReq.getHeader("host") + req.url
            );
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log("Proxy response:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: "/",
});
