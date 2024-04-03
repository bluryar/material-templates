import { fileURLToPath } from "node:url";
import {  resolve} from "node:path";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const r = (input:string) => resolve(__dirname, input);

async function main() {
  // 1. 检查当前目录下的 `./dev/dist` 是否存在
  const cwd = r('../dev/dist')
  if (!existsSync(cwd)) {
    console.log('请先执行 `npm run dev:build`')
    return
  }

  execSync('npx screenshot -u /index.html -l ./ -o ../../screenshot.png', {
    cwd,
    stdio: 'inherit'
  })
}

main()
