/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config'
import baseConf from './vite.config'

export default mergeConfig(
  baseConf,
  defineConfig({
    test: { environment: 'happy-dom' },
  }),
)
