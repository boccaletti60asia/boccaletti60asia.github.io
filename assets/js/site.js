(function(){
  // ---- photo fallback: if a person's image is missing, show initials instead
  document.querySelectorAll('.ph img').forEach(function(img){
    img.addEventListener('error',function(){
      var name=img.getAttribute('alt')||'';
      var ini=name.split(/\s+/).filter(Boolean).map(function(w){return w[0]}).slice(0,2).join('');
      img.parentNode.textContent=ini.toUpperCase();
    });
  });

  // ---- hero: oscillators on a random geometric graph, coupling ramps to sync, then restarts
  var cv=document.getElementById('kuramoto');
  if(!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cx=cv.getContext('2d'),W,H,nodes=[],edges=[],K=0,t0=0;
  function resize(){W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=cv.offsetHeight*devicePixelRatio}
  function init(){
    resize();nodes=[];edges=[];
    var N=Math.min(70,Math.max(36,Math.floor(cv.offsetWidth/16)));
    for(var i=0;i<N;i++)nodes.push({x:Math.random(),y:Math.random(),th:Math.random()*6.283,w:0.5+Math.random()});
    for(var i=0;i<N;i++)for(var j=i+1;j<N;j++){
      var dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y;
      if(dx*dx+dy*dy<0.035)edges.push([i,j]);
    }
    K=0;t0=performance.now();
  }
  function step(now){
    var dt=0.03;K=Math.min(2.2,(now-t0)/9000*2.2);
    if(now-t0>16000)init();
    var ds=nodes.map(function(n){return n.w});
    edges.forEach(function(e){
      var a=nodes[e[0]],b=nodes[e[1]],s=Math.sin(b.th-a.th)*K;
      ds[e[0]]+=s;ds[e[1]]-=s;
    });
    nodes.forEach(function(n,i){n.th+=ds[i]*dt});
    cx.clearRect(0,0,W,H);
    cx.lineWidth=devicePixelRatio*0.7;
    edges.forEach(function(e){
      var a=nodes[e[0]],b=nodes[e[1]],coh=0.5+0.5*Math.cos(a.th-b.th);
      cx.strokeStyle='rgba(120,150,220,'+(0.06+0.22*coh)+')';
      cx.beginPath();cx.moveTo(a.x*W,a.y*H);cx.lineTo(b.x*W,b.y*H);cx.stroke();
    });
    nodes.forEach(function(n){
      var l=40+35*(0.5+0.5*Math.cos(n.th));
      cx.fillStyle='hsl(45 80% '+l+'%)';
      cx.beginPath();cx.arc(n.x*W,n.y*H,devicePixelRatio*2.6,0,6.283);cx.fill();
    });
    requestAnimationFrame(step);
  }
  window.addEventListener('resize',resize);
  init();requestAnimationFrame(step);
})();
