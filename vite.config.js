import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "log-requests",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          console.log(`Received request: ${req.method} ${req.url}`);
          next();
        });
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 9000,
    allowedHosts: ["investments-imperial-frequency-maker.trycloudflare.com"],
  },
});
