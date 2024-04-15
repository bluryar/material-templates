// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'pnpm-lock.yaml',
    ],
  },
)
