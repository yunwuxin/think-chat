import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({command}) => ({
    plugins: [react()],
    base   : command === "build" ? "/static/" : "/",
    build  : {
        outDir       : "../public/static",
        emptyOutDir  : true,
        assetsDir    : "assets",
        rollupOptions: {
            input : {
                main: resolve(__dirname, "index.html")
            },
            output: {
                manualChunks  : {
                    vendor: ["react", "react-dom"]
                },
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name]-[hash].js",
                assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
            }
        },
        sourcemap    : false,
        minify       : "terser",
        terserOptions: {
            compress: {
                drop_console : true,
                drop_debugger: true
            }
        }
    },
    server : {
        port : 3000,
        open : true,
        host : true,
        proxy: {
            "/api": {
                target      : "http://localhost:8000",
                changeOrigin: true,
                secure      : false,
                rewrite     : (path) => path.replace(/^\/api/, "/api")
            }
        }
    },
    preview: {
        port: 4173,
        host: true
    }
}));
