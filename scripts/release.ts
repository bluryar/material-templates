import { env, exit } from 'node:process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { exec, execSync } from 'node:child_process'
import dotenv from 'dotenv'
import fg from 'fast-glob'
import { getVersions } from 'ice-npm-utils'

const PKG_GLOB = 'template-*'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const r = path => resolve(__dirname, path)
const ENV_PATH = [r('../.env.local'), r('../.env')]
dotenv.config({ path: ENV_PATH })

async function main() {
  const { MATERIALS_NPM_REGISTRY = '' } = env
  if (!MATERIALS_NPM_REGISTRY) {
    console.error('❌ `MATERIALS_NPM_REGISTRY` is required, please check your .env file. Or you can use `.env.local` instead.')
    return exit(1)
  }

  const pkgDirs = await fg(r(`../packages/${PKG_GLOB}`), { onlyDirectories: true })
  const command = `pnpm publish --registry ${MATERIALS_NPM_REGISTRY} --ignore-scripts`

  checkGitCommitted()

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

  const pkg = await import(pkgPath)
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
