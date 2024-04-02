import { env, exit } from 'node:process'
import { existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'
import fg from 'fast-glob'
import { getVersions } from 'ice-npm-utils'
import { PKG_GLOB } from './constants'
import { r, setupEnv } from './utils'

setupEnv()

async function main() {
  const { MATERIALS_NPM_REGISTRY = '' } = env
  // MATERIALS_NPM_REGISTRY应该链接到npm镜像库的URL
  // 开发者如需要在私库发布，可以新增 `.env.local` 配置为私库的地址
  if (!MATERIALS_NPM_REGISTRY) {
    console.error('❌ `MATERIALS_NPM_REGISTRY` is required, please check your .env file. Or you can use `.env.local` instead.')
    return exit(1)
  }

  const pkgDirs = await fg(fg.convertPathToPattern(r(`../packages/${PKG_GLOB}`)), { onlyDirectories: true })
  const command = `pnpm publish --registry ${MATERIALS_NPM_REGISTRY} --ignore-scripts`

  // 检查当前没有提交的Git更改，如果有任何未提交的更改，将会给出错误提示并退出程序
  checkGitCommitted()

  // 遍历package目录
  // 检查package.json，获取包名和版本号
  // 判断是否需要跳过发布
  // 发布npm包
  for (const dir of pkgDirs) {
    const { name, version } = await getPkgJSON(dir)

    const isExit = await checkVersionExit(name, version, MATERIALS_NPM_REGISTRY)
    if (isExit) {
      console.log(`❌ ${name}@${version} has been published, skip`)
      continue
    }

    await publish(dir, command)
  }

  exit(0)
}

// 检查当前仓库的代码是否都已经commit来保证发布的代码是最新的
function checkGitCommitted() {
  const status = execSync('git status --porcelain').toString()
  if (status) {
    console.error('❌ Please commit your changes before publishing')
    exit(1)
  }
}

async function publish(dir: string, command: string) {
  console.log(`🚀 Publishing ${dir}`)

  console.log(`⚡ Executing ${command}`)

  execSync(command, {
    cwd: dir,
  })

  console.log(`✅ ${dir} published`)
}

async function getPkgJSON(pkgDir: string) {
  const pkgPath = r(`${pkgDir}/package.json`)

  if (!existsSync(pkgPath)) {
    console.error(`❌ ${pkgPath} not found`)
    return exit(1)
  }

  const pkg = await import(pathToFileURL(pkgPath).href)
  return pkg
}

async function checkVersionExit(name: string, version: string, registry?: string): Promise<boolean> {
  try {
    const versions = await getVersions(name, registry)
    return versions.includes(version)
  }
  catch (err) {
    console.error('checkVersionExit error', err)
    return false
  }
}

main()
