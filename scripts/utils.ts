import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

export const __dirname = fileURLToPath(new URL('.', import.meta.url))
export const r = path => resolve(__dirname, path)
export const ENV_PATH = [r('../.env.local'), r('../.env')]

export function setupEnv() {
  dotenv.config({ path: ENV_PATH })
}
