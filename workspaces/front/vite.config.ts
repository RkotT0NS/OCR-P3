import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 8010,
        host: 'localhost',
        proxy: {
            '/api': {
                target: 'http://localhost:8011',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    // 🪷
    build: {
        rolldownOptions: {
            //
            output: {
                // 1. JS Entry file (e.g., main.js)
                entryFileNames: 'assets/[name].js',

                // 2. JS Chunk files (e.g., shared libraries or lazy loaded modules)
                chunkFileNames: 'assets/[name].js',

                // 3. CSS and other assets (images, fonts)
                assetFileNames: 'assets/[name].[ext]'
            }
        },
        outDir: '../../public/components',
        emptyOutDir: true,
        // target
    },
    plugins: [react()],
})
