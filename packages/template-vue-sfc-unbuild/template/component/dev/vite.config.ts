import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // puppeteer@1.x doesn't support ES modules
    legacy()
  ],
  resolve: {
    alias: {
      'my-library': path.resolve(__dirname, '../src'),
    },
  },
})
