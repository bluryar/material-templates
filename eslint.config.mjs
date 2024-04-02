// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
  },
  {
    ignores: [
      'node_modules/',
      'lib/',
      'dist/',
      'build/',
      'coverage/',
      'demo/',
      'es/',
      'esm/',
      'examples/',
      'pnpm-lock.yaml',

      'packages/*/template',
    ],
  },
)
