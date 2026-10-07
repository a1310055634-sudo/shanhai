// 部署前深链接渲染检查:无头 Chrome 直开子路径深链接,验证 React Router basename 匹配
import { spawn } from 'node:child_process'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--remote-debugging-port=9355',
  '--user-data-dir=' + mkdtempSync(join(tmpdir(), 'sgdep-')),
  '--no-first-run', '--disable-gpu',
  'http://localhost:4185/shanhai/catalog/xiwanmu',
], { stdio: 'ignore' })

setTimeout(async () => {
  try {
    const l = await (await fetch('http://127.0.0.1:9355/json/list')).json()
    const p = l.find(t => t.type === 'page' && t.webSocketDebuggerUrl)
    const ws = new WebSocket(p.webSocketDebuggerUrl)
    let id = 0; const pend = new Map()
    ws.onopen = () => ws.send(JSON.stringify({ id: ++id, method: 'Runtime.evaluate', params: { expression: `(()=>({path:location.pathname,xwm:document.body.textContent.includes('西王母'),badge:document.body.textContent.includes('待考证'),img:document.querySelector('img')?.getAttribute('src')||'',lazy:!!document.querySelector('img[loading=lazy]')}))()`, returnByValue: true } }))
    ws.onmessage = ev => {
      const g = JSON.parse(ev.data)
      if (g.id && pend.has(g.id)) { console.log('RENDER ' + JSON.stringify(g.result.result?.value)); ch.kill(); process.exit(0) }
    }
    setTimeout(() => { console.log('TIMEOUT'); ch.kill(); process.exit(1) }, 12000)
  } catch (e) { console.log('ERR ' + String(e).slice(0, 80)); ch.kill(); process.exit(1) }
}, 4000)
