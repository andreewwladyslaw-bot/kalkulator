
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const isTauri = Boolean(process.env.TAURI_ENV_PLATFORM);

export default defineConfig({
  base: isTauri ? "./" : "/kalkulator/",

  plugins: [
    react(),

    ...(!isTauri
      ? [
          VitePWA({
            registerType: "autoUpdate",
            injectRegister: "auto",

            includeAssets: [
              "favicon.ico",
              "logo.svg",
              "apple-touch-icon-180x180.png"
            ],

            manifest: {
              name: "Kalkulator React",
              short_name: "Kalkulator",
              description: "Kalkulator działający offline",

              id: "/kalkulator/",
              start_url: "/kalkulator/",
              scope: "/kalkulator/",

              display: "standalone",
              background_color: "#101521",
              theme_color: "#202938",

              icons: [
                {
                  src: "pwa-192x192.png",
                  sizes: "192x192",
                  type: "image/png",
                  purpose: "any"
                },
                {
                  src: "pwa-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "any"
                },
                {
                  src: "maskable-icon-512x512.png",
                  sizes: "512x512",
                  type: "image/png",
                  purpose: "maskable"
                }
              ]
            },

            workbox: {
  globPatterns: [
    "**/*.{js,css,html,ico,png,svg,webmanifest}"
  ],

  navigateFallback: "index.html",

  cleanupOutdatedCaches: true,

  clientsClaim: true,
  skipWaiting: true
}
          })
        ]
      : [])
  ],

  server: {
    port: 5173,
    strictPort: true
  }
});

