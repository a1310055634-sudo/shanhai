(()=>{
  const texts=[...document.querySelectorAll('svg text')]
  const out=[]
  for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){
    const a=texts[i].getBoundingClientRect(),b=texts[j].getBoundingClientRect()
    if(a.left<b.right&&b.left<a.right&&a.top<b.bottom&&b.top<a.bottom)out.push({a:texts[i].textContent,b:texts[j].textContent,ax:Math.round(a.x),ay:Math.round(a.y),bx:Math.round(b.x),by:Math.round(b.y)})
  }
  return out
})()