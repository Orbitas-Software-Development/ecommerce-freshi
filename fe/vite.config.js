import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_DEV": JSON.stringify(env.REACT_APP_DEV),
      "process.env.REACT_APP_PROD": JSON.stringify(env.REACT_APP_PROD),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate", //se actualiza cuando se construye
        manifest: {
          // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
          includeAssets: ["favicon.ico", "apple-touch-icon.jpeg", "assets/*"],
          name: "Uber-direct",
          short_name: "U-direct",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/icon-192x192.jpeg",
              sizes: "192x192",
              type: "image/jpeg",
            },
            {
              src: "/icon-256x256.jpeg",
              sizes: "256x256",
              type: "image/jpeg",
            },
            {
              src: "/icon-384x384.jpeg",
              sizes: "384x384",
              type: "image/jpeg",
            },
            {
              src: "/icon-512x512.jpeg",
              sizes: "512x512",
              type: "image/jpeg",
            },
            {
              src: "/icon-1024x1024.jpeg",
              sizes: "1024x1024",
              type: "image/jpeg",
            },
            {
              src: "/maskable-512x512.jpeg",
              type: "image/jpeg",
              sizes: "512x512",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
  };
});
