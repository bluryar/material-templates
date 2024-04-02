// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    formatters: true,
  },
  ...compat.config({
    extends: [
      'plugin:storybook/recommended',
    ],
  }),
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      'storybook-static/**/*',
      'pnpm-lock.yaml',
      '!.storybook',
    ],
  },
)
