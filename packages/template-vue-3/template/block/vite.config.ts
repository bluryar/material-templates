import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const r = (path: string) => resolve(__dirname, path)

// https://vitejs.dev/config/
export default defineConfig({
  root: r('./dev'),

  resolve: {
    alias: {
      '@': r('./src'),
    },
  },

  plugins: [vue(), vueJsx()],
})
