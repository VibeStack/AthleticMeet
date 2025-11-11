import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ⚙️ Optional but useful to remove the large file warning
  build: {
    chunkSizeWarningLimit: 1000, // raise warning limit to 1MB
    outDir: "dist", // ensure output folder is correct for Vercel
    sourcemap: false, // disable source maps in production for smaller build
  },

  // ⚙️ Server setup for local dev
  server: {
    port: 5173,
    open: true,
    proxy: {
      // Automatically forward API calls during local dev
      "/api": {
        target: "http://localhost:5000", // your Express backend
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ⚙️ Define global env vars (optional)
  define: {
    "process.env": process.env,
  },
});
