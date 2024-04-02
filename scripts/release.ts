import { env, exit } from 'node:process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import dotenv from 'dotenv'
import fg from 'fast-glob'

const PKG_GLOB = 'template-*'
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const r = path => resolve(__dirname, path)
const ENV_PATH = [r('../.env.local'), r('../.env')]
dotenv.config({ path: ENV_PATH })

async function main() {
  const { MATERIALS_NPM_REGISTRY = '' } = env
  if (!MATERIALS_NPM_REGISTRY) {
    console.error('❌ `MATERIALS_NPM_REGISTRY` is required, please check your .env file. Or you can use `.env.local` instead.')
    exit(1)
  }

  const pkgDirs = await fg(r(`../packages/${PKG_GLOB}`), { onlyDirectories: true })
  const command = `npm publish --registry ${MATERIALS_NPM_REGISTRY}`

  checkGitCommitted()

  for (const dir of pkgDirs)
    await publish(dir, command)
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

  execSync(command, {
    cwd: dir,
  })

  console.log(`✅ ${dir} published`)
}

main()
