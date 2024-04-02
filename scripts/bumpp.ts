import { execSync } from 'node:child_process'
import { argv, exit } from 'node:process'
import fg from 'fast-glob'
import { r, setupEnv } from './utils'
import { PKG_GLOB } from './constants'

const BUMP_TYPES = ['major', 'minor', 'patch'] as const
type BumpType = typeof BUMP_TYPES[number]

setupEnv()

const [,,type] = argv

async function main(type: BumpType = 'patch') {
  if (!BUMP_TYPES.includes(type)) {
    console.error(`❌ Invalid bump type: ${type}`)
    return exit(1)
  }

  // Check if the git repository is clean
  const status = execSync('git status --porcelain').toString()
  if (status) {
    console.error('❌ Please commit your changes before publishing')
    return exit(1)
  }

  // Bump the version of template module
  const pkgDirs = await fg(fg.convertPathToPattern(r(`../packages/${PKG_GLOB}`)), { onlyDirectories: true })
  const command = `pnpm run bump:${type}`

  for (const dir of pkgDirs) {
    console.log(`🚀 Bumping ${dir}`)
    execSync(command, { cwd: dir })
  }

  // Bump the version of the current project
  console.log(`🚀 Bumping root`)
  const rootPath = r('../')
  execSync(`npx bumpp ${type} --all --yes`, { cwd: rootPath })

  console.log('🎉 Bump completed')
  exit(0)
}

main(type as BumpType)
