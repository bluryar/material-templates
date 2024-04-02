# @bluryar/template-vue-sfc-unbuild

这是一个 [Appworks 的 Vue3 组件物料模板](https://appworks.site/materials/reference/custom.html)：

- `unbuild` 作为构建工具，
- `vite` 作为开发服务器。
- `vitest` 作为测试工具。

开发时，你可以使用 `my-library` 作为alias引用src下的文件。使用 `unbuild` 而不是用 `vite` 的原因是vite需要引入而外的plugin处理TS类型，并且默认做了minify，对于组件（与社区受欢迎的组件库相比 ）我更喜欢提供不经压缩混淆的组件，将压缩混淆交给使用者的 Bundler。

## 注意事项

1. 这套组件开发方案中，不会对 Vue SFC 进行编译，只是简单的拷贝文件到 dist 目录下，然后生成TS类型说明，也就是说，你需要自己保证 Vue SFC 的兼容性。
2. 组件API无法生成文档，需要自己编写文档。

- 你可以使用 [volar 提供的工具包](vue-component-meta) 对组件的API进行提取，然后自行编写 nodejs 脚本生成文档。

## 使用方法

```bash
appworks init material @bluryar/template-vue-sfc-unbuild
```

## 发布

```bash
pnpm publish --registry <YOU VERDACCIO HOST>
```
