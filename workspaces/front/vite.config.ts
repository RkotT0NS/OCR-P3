import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'

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
    plugins: [
        react(),
        laravel(['src/main.tsx']),
    ],
})
