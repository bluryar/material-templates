import type { UserConfig } from 'vite'
import { mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import baseConf, { r } from './vite.config'
import { name } from './package.json'

export default mergeConfig(baseConf, {
  plugins: [
    dts({
      insertTypesEntry: !!1,
      rollupTypes: !!1,
      tsconfigPath: r('./tsconfig.json'),
      include: [
        r('./lib'),
      ],
    }),
  ],

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: r('lib/index.ts'),
      name,
      // the proper extensions will be added
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: false,
  },
} satisfies UserConfig)
