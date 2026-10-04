
    import { spawn } from 'node:child_process'
    import { mkdtempSync } from 'node:fs'
    import { tmpdir } from 'node:os'
    import { join } from 'node:path'
    const ch = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--remote-debugging-port=9351','--user-data-dir='+mkdtempSync(join(tmpdir(),'fx-')),'--no-first-run','--disable-gpu','file:///D:/zcode/workspace/default/shanhai/dist/index.html'], {stdio:'ignore'})
    setTimeout(async()=>{
      try {
        const l=await (await fetch('http://127.0.0.1:9351/json/list')).json()
        const p=l.find(t=>t.type==='page'&&t.webSocketDebuggerUrl)
        const ws=new WebSocket(p.webSocketDebuggerUrl); let id=0; const pend=new Map()
        ws.onopen=()=>ws.send(JSON.stringify({id:++id,method:'Runtime.evaluate',params:{expression:'document.body.textContent.length',returnByValue:true}}))
        ws.onmessage=ev=>{const g=JSON.parse(ev.data); if(g.id&&pend.has(g.id)){console.log('FILE_BODY_LEN='+g.result.result?.value); ch.kill(); process.exit(0)}}
      } catch(e){ console.log('FILE_PROBE_ERR='+String(e).slice(0,80)); ch.kill(); process.exit(0) }
    },5000)
  