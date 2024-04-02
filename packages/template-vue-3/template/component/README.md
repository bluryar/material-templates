# @bluryar/template-vue-3/component

## Features

1. 🕹️ Vue3
2. 💻 TypeScript
3. 🧪 Vitest
4. 🚤 Vite
5. 🔍🚨 Eslint
6. 📖 Storybook

## Install

```bash
pnpm install
```

## Develop

- dev in `Vite`

  组件代码都在 `./lib` 下， 由于 `AppWorks` 的开源版本不支持 Monorepo，所以组件需要以default导出的方式在 `./lib/index.ts` 导出。

  **注意**：`./src` 目录仅仅是一个调试的入口，不会被打包到 `dist` 目录下。
  
  ```bash
  pnpm dev
  ```

- dev in "storybook"

  提供 storybook 作为另外一种playground，你也可以后续将 storybook 作为组件的文档展示平台。

  ```bash
  pnpm storybook
  ```

- test
  
  支持单元测试

  ```bash
  pnpm test
  ```

## Publish

1. 构建

   ```bash
   pnpm build
   ```

2. 发布

   ```bash
    pnpm publish --registry <YOUR_REGISTRY>
    ```

**注意**：物料需要先发布，才能通过 `appworks generate` 命令生成物料的元数据，物料的使用者需要使用这一份数据
