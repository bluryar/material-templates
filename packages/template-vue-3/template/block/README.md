# @bluryar/template-vue-3/block

开发区块的前提：确保 `package.json` 声明好 `dependencies` 和 `peerDependencies`，并且确保 `dependencies` 中的依赖在 `peerDependencies` 中也有声明。然后，当使用物料时，使用者的项目也需要提供兼容的依赖，因为区块的代码是不会进行 `bundle` 的。

同时，开发区块时，区块的开发者也需要自己去搭建一个适合开发环境（fixture）。因此，区块需要尽可能的少依赖一些不确定的东西，比如接口请求。

## File Structure

> 如果你不关心单元测试和 storybook，可以删除 `test` 和 `stories` 目录及其相关配置。

```bash
\material-templates\packages\template-vue-3\template\block
├── build.config.ts
├── dist
|  ├── components
|  └── index.ts
├── lib
|  ├── components
|  └── index.ts
├── public
|  └── vite.svg
├── src
|  ├── App.vue
|  ├── assets
|  ├── main.ts
|  ├── style.css
|  └── vite-env.d.ts
├── stories
|  ├── assets
|  ├── Configure.mdx
|  └── HelloWorld.stories.ts
├── test
|  └── HelloWorld.vue.test.ts
├── vite.config.ts
└── vitest.config.ts
```

## Features

1. 🕹️ Vue3
2. 💻 TypeScript
3. 🧪 Vitest
4. 🚤 Unbuild
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


1. no bundle

两种发布方式，一种是使用unbuild集成的 mkdist 做 `transform`，而不进行 `bundle`，另一种则是直接修改 `package.json` 中的 `files` 字段，将 `lib` 目录下的文件发布。

  - Method 1
    ```json
    {
      "files": [
        "dist"
      ],
    }
    ```
  
    ```bash
    pnpm build
    ```
  - Method 2
    ```json
    {
      "files": [
        "lib"
      ],
    }
    ```

2. 发布

   ```bash
    pnpm publish --registry <YOUR_REGISTRY>
    ```

**注意**：物料需要先发布，才能通过 `appworks generate` 命令生成物料的元数据，物料的使用者需要使用这一份数据
