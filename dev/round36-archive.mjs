/**
 * G36 存档重建脚本:直接从公开页面取原始 HTML,抽出待存档段落并**照原字符**打印。
 *
 * 起因(必须记档):先前经 web_fetch 工具取回的文本把源页面的 “ ” 归一成了 「 」,
 * 存档若照抄即与公开页面不一致——违反「逐字照录」。本脚本改走 Node 直连 fetch,
 * 只做最小 HTML 去标签与空白归一,不做任何标点转换;打印结果用于人工誊入
 * EDITION_EVIDENCE/liubian-guji-20261002.md,并由 dev/round36-verify.mjs 双向复核
 * (本地存档 + 在线页面)。
 *
 * 运行:node dev/round36-archive.mjs
 */
const SOURCES = [
  {
    tag: '一 · 吳越春秋/越王無余外傳第六',
    url: 'https://zh.wikisource.org/w/index.php?title=%E5%90%B3%E8%B6%8A%E6%98%A5%E7%A7%8B/%E8%B6%8A%E7%8E%8B%E7%84%A1%E4%BD%99%E5%A4%96%E5%82%B3&oldid=2178543',
    start: '禹三十未娶',
    end: '謂之女嬌。',
  },
  {
    tag: '二 · 呂氏春秋/卷二十二·察傳',
    url: 'https://zh.wikisource.org/w/index.php?title=%E5%91%82%E6%B0%8F%E6%98%A5%E7%A7%8B/%E5%8D%B7%E4%BA%8C%E5%8D%81%E4%BA%8C&oldid=2497183',
    start: '凡聞言必熟論',
    end: '非一足也。',
  },
  {
    tag: '三 · 陶淵明/讀《山海經》其十',
    url: 'https://zh.wikisource.org/w/index.php?title=%E8%AE%80%E3%80%8A%E5%B1%B1%E6%B5%B7%E7%B6%93%E3%80%8B&oldid=7939694',
    start: '精衛銜微木',
    end: '良晨詎可待？',
  },
]

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gu, '')
    .replace(/<style[\s\S]*?<\/style>/gu, '')
    .replace(/<\/(p|div|li|tr|h[1-6])>/gu, '\n')
    .replace(/<br\s*\/?>/gu, '\n')
    .replace(/<[^>]+>/gu, '')
    .replace(/&#(\d+);/gu, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
    .replace(/&quot;/gu, '"')
    .replace(/&amp;/gu, '&')
    .replace(/[ \t\u00a0]+/gu, ' ')

for (const s of SOURCES) {
  const res = await fetch(s.url, { headers: { 'User-Agent': 'shanhai-archive/1.0' } })
  const text = strip(await res.text()).replace(/\n{2,}/gu, '\n')
  const i = text.indexOf(s.start)
  const j = text.indexOf(s.end, i)
  const body = i >= 0 && j >= 0 ? text.slice(i, j + s.end.length) : `!! 未定位(${i}/${j})`
  console.log(`\n########## ${s.tag}  [HTTP ${res.status}]`)
  console.log(`URL: ${s.url}`)
  console.log('---------- 段落原文(原字符,含源页面标点) ----------')
  console.log(body.replace(/\n+/gu, '\n').trim())
  console.log('---------- 段落结束 ----------')
  const marks = [...new Set(body.match(/[“”‘’「」『』]/gu) ?? [])]
  console.log('本段出现的引号字符:', marks.map((m) => `${m}(U+${m.codePointAt(0).toString(16).toUpperCase()})`).join(' '))
}
