(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return document.querySelectorAll(s)};
var clamp=function(v){return Math.max(0,Math.min(1,v))},ss=function(x){x=clamp(x);return x*x*(3-2*x)};
/* hero title */
var t=$('#t'),n=0;
'Things move when you do.'.split(' ').forEach(function(w){var wr=document.createElement('span');wr.className='w';
 w.split('').forEach(function(c){var s=document.createElement('span');s.textContent=c;s.style.animationDelay=(1.1+n*.045)+'s';n++;wr.appendChild(s)});
 t.appendChild(wr);t.appendChild(document.createTextNode(' '))});
/* rows */
$$('.row button').forEach(function(b){b.addEventListener('click',function(){var r=b.parentNode,open=r.classList.contains('on');
 $$('.row').forEach(function(x){x.classList.remove('on');x.firstChild.setAttribute('aria-expanded','false')});
 if(!open){r.classList.add('on');b.setAttribute('aria-expanded','true')}})});
/* canvas lattice */
var cv=$('#cv'),cx=cv.getContext('2d'),W,H,dpr,gap,cols,rows,N=[],css=getComputedStyle(document.documentElement),fg,ptr={x:-999,y:-999},surge=null;
function colors(){fg=css.getPropertyValue('--fg').trim()||'#e4e8e2'}
function build(){
 dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
 gap=W<600?58:68;cols=Math.ceil(W/gap)+1;rows=Math.ceil(H/gap)+1;N=[];
 var ox=(W-(cols-1)*gap)/2,oy=(H-(rows-1)*gap)/2,tot=cols*rows,D=Math.hypot(W,H),R=Math.min(W,H)*.5;
 for(var j=0;j<rows;j++)for(var i=0;i<cols;i++){var k=j*cols+i,hx=ox+i*gap,hy=oy+j*gap,a=Math.random()*6.283,d=D*(.5+Math.random()*.6),
  an=k*2.39996,r=Math.sqrt(k/tot)*R*1.15;
  N.push({hx:hx,hy:hy,sx:hx+Math.cos(a)*d,sy:hy+Math.sin(a)*d,rx:W/2+Math.cos(an)*r,ry:H/2+Math.sin(an)*r,
   ix:W/2+Math.cos(a)*D*1.2,iy:H/2+Math.sin(a)*D*1.2,del:Math.hypot(hx-W/2,hy-H/2)/D*1.3+Math.random()*.3,e:0,x:hx,y:hy})}
}
colors();build();addEventListener('resize',build);
var TH=window.THREE,R3=null,sc3,cam3,ob=[],hw=1,hh=1,sz3=1,mq1=$('#m1'),mq2=$('#m2'),drs=[].slice.call($$('#sdraw path')),dsec=$('#sdraw'),hzS=$('#shz'),hzT=$('#tr'),opn=$('#s3d'),her=$('#s1');
var bk=function(x){var c=1.9;x=clamp(x)-1;return 1+(c+1)*x*x*x+c*x*x};
var LH=[[.5,.5,.42],[-.5,.62,.28],[.62,-.05,.3],[-.62,.12,.3],[.05,.2,.34]],LO=[[-.5,.62,.3],[.5,.55,.3],[0,.25,.36],[-.5,-.05,.28],[.5,-.1,.28]];
if(TH){try{R3=new TH.WebGLRenderer({canvas:$('#g3'),alpha:true,antialias:true})}catch(e){R3=null}}
if(R3){
 sc3=new TH.Scene();cam3=new TH.PerspectiveCamera(40,1,.1,100);cam3.position.z=10;
 sc3.add(new TH.AmbientLight(0xffffff,.75));var dl=new TH.DirectionalLight(0xffffff,.9);dl.position.set(3,5,6);sc3.add(dl);
 var GG=[new TH.TorusGeometry(.75,.3,10,18),new TH.IcosahedronGeometry(1,0),new TH.BoxGeometry(1.5,1.5,1.5),new TH.ConeGeometry(.9,1.8,6),new TH.SphereGeometry(1,14,10)],
 CG=[new TH.SphereGeometry(.5,12,8),new TH.OctahedronGeometry(.55),new TH.IcosahedronGeometry(.6,0),new TH.TetrahedronGeometry(.6),new TH.BoxGeometry(.8,.8,.8)],
 SCc=[0xe8472b,0xf2b705,0x1f7a6d,0xf0a6a0,new TH.Color(fg).getHex()],CCc=[0xf2b705,0xe8472b,0xf0a6a0,0xf2b705,0x1f7a6d];
 GG.forEach(function(g,i){var grp=new TH.Group(),m=new TH.MeshStandardMaterial({color:SCc[i],flatShading:true,roughness:.55,transparent:true}),sh=new TH.Mesh(g,m);
  sh.add(new TH.LineSegments(new TH.EdgesGeometry(g,i==4?10:20),new TH.LineBasicMaterial({color:fg})));
  var c=new TH.Mesh(CG[i],new TH.MeshStandardMaterial({color:CCc[i],flatShading:true,roughness:.5}));
  grp.add(sh);grp.add(c);sc3.add(grp);ob.push({g:grp,m:m,c:c})});
}
function r3(){if(!R3)return;R3.setPixelRatio(Math.min(devicePixelRatio||1,1.5));R3.setSize(innerWidth,innerHeight,false);cam3.aspect=innerWidth/innerHeight;cam3.updateProjectionMatrix();hh=Math.tan(20*Math.PI/180)*10;hw=hh*cam3.aspect;sz3=Math.min(hw,hh*.9)}
r3();addEventListener('resize',r3);
function mv(x,y){ptr.x=x;ptr.y=y;lastMove=performance.now()}
var lastMove=0;
addEventListener('pointermove',function(e){mv(e.clientX,e.clientY)});
addEventListener('touchmove',function(e){var q=e.touches[0];if(q)mv(q.clientX,q.clientY)},{passive:true});
addEventListener('pointerdown',function(e){surge={x:e.clientX,y:e.clientY,r:0}});
/* sections */
var secs=[].slice.call($$('section[data-n]')),stp=$('.steps'),brk=$('#s6'),ref=$('#s7'),mk=$('#mk'),lens=$('#s4'),lt=$('#lt'),
 gl=$('#gl'),sw=$$('.sw h2'),sd=$$('.sd')[0].querySelectorAll('p'),bar=$('#bar'),st=$('#st'),ph=$('#ph'),Es=0,Fs=0,t0=performance.now(),cur=-1,si=-1;
function top(el){return el.getBoundingClientRect().top}
var lastFrame=0, pageVisible=!document.hidden;
document.addEventListener('visibilitychange',function(){pageVisible=!document.hidden;if(pageVisible){lastFrame=0;requestAnimationFrame(loop)}});
function loop(now){
 if(!pageVisible)return;
 if(lastFrame && now-lastFrame<15){requestAnimationFrame(loop);return}
 var dt=lastFrame?Math.min((now-lastFrame)/1000,.05):1/60;lastFrame=now;
 var t=(now-t0)/1000,vh=innerHeight;
 /* targets from scroll */
 var a=clamp(1-top(brk)/vh),r=clamp(1-top(ref)/vh),m=clamp(1-top(mk)/vh);
 var E=a*(1-r),F=r*(1-m);var ease=1-Math.pow(.92,dt*60);Es+=(E-Es)*ease;Fs+=(F-Fs)*ease;
 /* idle pointer / lens wander */
 var idle=now-lastMove>2500;
 if(idle){ptr.x=W*(.5+.32*Math.sin(t*.7));ptr.y=H*(.5+.3*Math.sin(t*.53+1))}
 if(surge){surge.r+=12;if(surge.r>Math.hypot(W,H))surge=null}
 cx.clearRect(0,0,W,H);
 var R=140,o=1-Es*0+0;
 for(var i=0;i<N.length;i++){var p=N[i];
  var u=1-Math.pow(1-clamp((t-.4-p.del)/1.6),3);
  var tx=p.hx*(1-Es-Fs)+p.sx*Es+p.rx*Fs,ty=p.hy*(1-Es-Fs)+p.sy*Es+p.ry*Fs;
  var dx=tx-ptr.x,dy=ty-ptr.y,d=Math.hypot(dx,dy),pr=d<R?1-d/R:0;
  if(pr>0){tx+=dx/(d||1)*pr*pr*22;ty+=dy/(d||1)*pr*pr*22}
  if(surge){var sd2=Math.abs(Math.hypot(p.hx-surge.x,p.hy-surge.y)-surge.r);if(sd2<34)p.e=1}
  p.e=Math.max(p.e*Math.pow(.94,dt*60),pr);
  p.x=p.ix+(tx-p.ix)*u;p.y=p.iy+(ty-p.iy)*u}
 cx.lineWidth=1;
 for(i=0;i<N.length;i++){p=N[i];var nb=[(i%cols<cols-1)?N[i+1]:null,(i+cols<N.length)?N[i+cols]:null];
  for(var q=0;q<2;q++){var z=nb[q];if(!z)continue;var L=Math.hypot(p.x-z.x,p.y-z.y);if(L>gap*2.4)continue;
   var e=Math.max(p.e,z.e),al=(1-L/(gap*2.4))*.22;
   cx.strokeStyle=e>.12?'rgba(232,71,43,'+(.25+e*.7)+')':fg;cx.globalAlpha=e>.12?1:al;
   cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(z.x,z.y);cx.stroke()}}
 cx.globalAlpha=1;
 for(i=0;i<N.length;i++){p=N[i];var s=2+p.e*4;cx.fillStyle=p.e>.12?'#f2b705':fg;cx.globalAlpha=p.e>.12?1:.55;cx.fillRect(p.x-s/2,p.y-s/2,s,s)}
 cx.globalAlpha=1;
 cv.style.opacity=1-m*.6;
 /* lens */
 var lr=lens.getBoundingClientRect();
 if(lr.bottom>0&&lr.top<vh){lt.style.setProperty('--x',(ptr.x-lr.left)+'px');lt.style.setProperty('--y',(ptr.y-lr.top)+'px')}
 /* steps */
 var sr=stp.getBoundingClientRect(),sp=clamp(-sr.top/(sr.height-vh)),idx=Math.min(3,Math.floor(sp*4));
 if(idx!==si){si=idx;gl.setAttribute('data-i',idx);sw.forEach(function(e,k){e.classList.toggle('on',k===idx)});sd.forEach(function(e,k){e.classList.toggle('on',k===idx)})}
 /* hud */
 var h=document.documentElement,pg=scrollY/(h.scrollHeight-vh);bar.style.transform='scaleX('+clamp(pg)+')';
 var best=0;secs.forEach(function(e,k){var b=e.getBoundingClientRect();if(b.top<vh*.5)best=k});
 if(best!==cur){cur=best;st.textContent=(best<9?'0':'')+(best+1)+' / '+secs.length+' '+secs[best].dataset.n}
 if(top(mk)<vh*.7)ph.classList.add('in');
 mq1.style.transform='translateX('+(-scrollY*.35)+'px)';mq2.style.transform='translateX('+(scrollY*.35-W)+'px)';
 var dq=dsec.getBoundingClientRect(),dp=clamp(-dq.top/(dq.height-vh));
 drs.forEach(function(p,i){var k=clamp((dp-i*.12)/.7);p.style.strokeDasharray='1';p.style.strokeDashoffset=1-k});
 var hq=hzS.getBoundingClientRect(),hp=clamp(-hq.top/(hq.height-vh));hzT.style.transform='translateX('+(-hp*Math.max(0,hzT.scrollWidth-W))+'px)';
 if(R3){var hb=her.getBoundingClientRect(),o2=opn.getBoundingClientRect(),op3=clamp(-o2.top/(o2.height-vh)),
  vH=1-ss(-hb.top/(vh*.7)),vO=(o2.top<vh&&o2.bottom>0)?ss((vh-o2.top)/(vh*.6))*(1-ss((op3-.88)/.12)):0,
  uO=vO>vH,L=uO?LO:LH,vis=uO?vO:vH,oa=uO?ss(op3*1.6-.1):0;
  ob.forEach(function(o,i){var l=L[i],x=l[0]*hw,y=l[1]*hh,u=bk((t-1.2-i*.22)/1.5);x=x*u+x*3.2*(1-u);y=y*u+y*3.2*(1-u);
   o.g.position.set(x,y,0);o.g.scale.setScalar(Math.max(.0001,l[2]*sz3*u*vis*(1+oa*.1)));
   var sp=i%2?1:-1;o.g.rotation.x=t*.35*sp+scrollY*.0014*sp+(1-u)*5;o.g.rotation.y=t*.55+scrollY*.002+(1-u)*7;
   o.m.opacity=1-oa*.84;o.m.depthWrite=oa<.1;o.c.scale.setScalar(.2+oa*1.05);o.c.rotation.y=-t*1.1;o.c.rotation.x=t*.7});
  if((hb.bottom>0&&hb.top<vh)||(o2.bottom>0&&o2.top<vh))R3.render(sc3,cam3)}
 requestAnimationFrame(loop)}
requestAnimationFrame(loop);
})();
