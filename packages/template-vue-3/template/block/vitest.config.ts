/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConf, { r } from './vite.config'

export default mergeConfig(
  baseConf,
  defineConfig({
    root: r('./'),
    test: { environment: 'happy-dom' },
  }),
)
