import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** G34 构建版本戳:构建时刻注入当前 HEAD 短号与日期(页脚校讫记展示)。
 *  git 不可用时回退 unknown,不阻塞构建;两值皆为编译期常量,进 bundle。 */
function buildStamp() {
  try {
    const commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
    const date = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
    return { commit, date: dateStr }
  } catch {
    return { commit: 'unknown', date: 'unknown' }
  }
}

const stamp = buildStamp()

/** 部署形态:DEPLOY_TARGET=ghpages 时按 GitHub Pages 项目页子路径 /shanhai/ 构
 *  (Actions 部署用);缺省 '/' 保持本地 dev/preview 行为不变。 */
const isGhPages = process.env.DEPLOY_TARGET === 'ghpages'

export default defineConfig({
  base: isGhPages ? '/shanhai/' : '/',
  plugins: [react()],
  define: {
    __BUILD_COMMIT__: JSON.stringify(stamp.commit),
    __BUILD_DATE__: JSON.stringify(stamp.date),
  },
})
