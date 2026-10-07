(()=>({
  path: location.pathname,
  xwm: document.body.textContent.includes('西王母'),
  badge: document.body.textContent.includes('待考证'),
  img: document.querySelector('img') ? document.querySelector('img').getAttribute('src') : ''
}))()