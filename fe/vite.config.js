import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_DEV": JSON.stringify(env.REACT_APP_DEV),
      "process.env.REACT_APP_PRO": JSON.stringify(env.REACT_APP_PRO),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate", //se actualiza cuando se construye
        manifest: {
          // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
          includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
          name: "Uber-direct",
          short_name: "U-direct",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icon-256x256.png",
              sizes: "256x256",
              type: "image/png",
            },
            {
              src: "/icon-384x384.png",
              sizes: "384x384",
              type: "image/png",
            },
            {
              src: "/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/icon-1024x1024.png",
              sizes: "1024x1024",
              type: "image/png",
            },
            {
              src: "/maskable-512x512.png",
              type: "image/png",
              sizes: "512x512",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
  };
});
