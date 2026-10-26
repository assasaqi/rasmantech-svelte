import { defineConfig, createLogger } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'node:url'

// Buat instans logger resmi dari Vite
const logger = createLogger()
const originalWarn = logger.warn

// Override method warn untuk menyaring peringatan tertentu
logger.warn = (msg, options) => {
  if (msg.includes('optimizeDeps.esbuildOptions')) return
  originalWarn(msg, options)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  customLogger: logger,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
