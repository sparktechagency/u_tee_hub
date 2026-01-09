import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   plugins: [react()],
   build: {
      rollupOptions: {
         output: {
            entryFileNames: "assets/[name]-[hash].js",
            chunkFileNames: "assets/[name]-[hash].js",
            assetFileNames: "assets/[name]-[hash].[ext]",

            manualChunks: {
               vendor: ["react", "react-dom", "react-router-dom"],
               antd: ["antd"],
            },
         },
      },
      // Warning limit বাড়াও
      chunkSizeWarningLimit: 3000,
   },
   server: {
      host: true,
      strictPort: true,
      port: 5173,
      allowedHosts: ["uteehub.com", "www.uteehub.com", "dashboard.uteehub.com"],
   },
});
