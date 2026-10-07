/* No dependencies. Optical rendering is an enhancement, never a navigation requirement. */
(() => {
 'use strict';
 const stage=document.querySelector('.stage'),canvas=document.getElementById('cinema-optics');
 const systemMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
 let enabled=!systemMotion.matches,userDisabled=false,inView=true,raf=0,lastFrame=0,renderer=null;
 let scrollDirty=true,storyProgress=0,paper=null,mode='read',cursorVisible=false;
 const mouse={x:innerWidth/2,y:innerHeight/2,lx:innerWidth/2,ly:innerHeight/2,px:0,py:0,tx:0,ty:0};
 const controls=document.createElement('div');controls.className='optical-controls';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='motion-switch';
 toggle.setAttribute('aria-label','切換電影動態效果');controls.append(toggle);stage.append(controls);
 const cursor=document.createElement('div');cursor.className='viewfinder';cursor.setAttribute('aria-hidden','true');
 cursor.dataset.mode='read';
 cursor.innerHTML='<span class="viewfinder-dot"></span><span class="viewfinder-ring"></span><span class="viewfinder-note">走進這一幕 ↗</span>';document.body.append(cursor);
 document.querySelectorAll('.dropdown-trip').forEach((row,i)=>row.style.setProperty('--row',i));
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const selected=()=>Number(document.querySelector('[data-scene][aria-pressed="true"]').dataset.scene);
 function wake(){if(!raf&&enabled&&!document.hidden)raf=requestAnimationFrame(frame)}
 function resetPaper(){if(paper){paper.classList.remove('is-handled');['--paper-rx','--paper-ry','--paper-shadow-x','--paper-shadow-y','--paper-gloss','--paper-light'].forEach(key=>paper.style.removeProperty(key));paper=null}}
 function setMode(next){if(mode!==next){mode=next;cursor.dataset.mode=mode}}
 function updatePointer(event){
  if(!enabled||!finePointer.matches||event.pointerType==='touch')return;
  mouse.x=event.clientX;mouse.y=event.clientY;cursorVisible=true;cursor.classList.add('visible');
  const target=event.target,rect=stage.getBoundingClientRect();
  const inside=rect.top<=mouse.y&&rect.bottom>=mouse.y;
  mouse.tx=inside?clamp((mouse.x/innerWidth-.5)*2,-1,1):0;
  mouse.ty=inside?clamp(((mouse.y-rect.top)/rect.height-.5)*2,-1,1):0;
  setMode(target.closest('button')?'arrow':target.closest('a:not(.logo)')?'link':target.closest('h1,h2,h3,p,.dropdown-detail,.logo')?'read':inside?'frame':'read');
  const next=target.closest('.film');if(next!==paper)resetPaper();
  if(next){paper=next;const box=paper.querySelector('figure').getBoundingClientRect();
   const x=clamp((mouse.x-box.left)/box.width,0,1),y=clamp((mouse.y-box.top)/box.height,0,1);
   paper.classList.add('is-handled');paper.style.setProperty('--paper-rx',((.5-y)*5)+'deg');paper.style.setProperty('--paper-ry',((x-.5)*7)+'deg');
   paper.style.setProperty('--paper-shadow-x',((.5-x)*10)+'px');paper.style.setProperty('--paper-shadow-y',(9+y*7)+'px');
   paper.style.setProperty('--paper-gloss','.42');paper.style.setProperty('--paper-light',(x*100)+'%');
  }
  wake();
 }
 function story(){
  const box=stage.getBoundingClientRect(),progress=clamp(-box.top/box.height,0,1),mobile=innerWidth<=640;storyProgress=progress;
  stage.style.setProperty('--story-title-y',(-progress*(mobile?0:55))+'px');
  stage.style.setProperty('--story-title-opacity',String(mobile?1:1-progress*.5));
  const art=document.querySelector('.interlude-art'),r=art.getBoundingClientRect();
  const arrival=clamp((innerHeight-r.top)/(innerHeight*.85),0,1);
  art.style.setProperty('--story-paper-y',((1-arrival)*(mobile?12:35))+'px');
  art.style.setProperty('--story-paper-angle',((1-arrival)*-1.2)+'deg');
  // Moving the pointer does not hold the hero renderer awake after it leaves the viewport.
  if(box.bottom<=0||box.top>=innerHeight){mouse.tx=0;mouse.ty=0}
  scrollDirty=false;
 }
 function frame(now){
  raf=0;if(!enabled||document.hidden)return;
  const dt=Math.min(64,now-(lastFrame||now-16));lastFrame=now;
  const ease=1-Math.exp(-dt/95);
  mouse.lx+=(mouse.x-mouse.lx)*ease;mouse.ly+=(mouse.y-mouse.ly)*ease;
  mouse.px+=(mouse.tx-mouse.px)*(1-Math.exp(-dt/180));mouse.py+=(mouse.ty-mouse.py)*(1-Math.exp(-dt/180));
  if(finePointer.matches&&cursorVisible){cursor.style.transform=`translate3d(${mouse.x}px,${mouse.y}px,0)`;
   cursor.style.setProperty('--cursor-lag-x',(mouse.lx-mouse.x)*.35+'px');cursor.style.setProperty('--cursor-lag-y',(mouse.ly-mouse.y)*.35+'px');}
  if(scrollDirty)story();
  const opticalActive=renderer&&inView&&renderer.ready&&finePointer.matches;
  if(opticalActive)renderer.draw(now,mouse.px,mouse.py);
  const unsettled=Math.abs(mouse.lx-mouse.x)+Math.abs(mouse.ly-mouse.y)+Math.abs(mouse.px-mouse.tx)+Math.abs(mouse.py-mouse.ty)>.08;
  if(unsettled||scrollDirty||(opticalActive&&renderer.isMoving(now)))wake();
 }
 function applyMode(){
  enabled=!systemMotion.matches&&!userDisabled;document.body.classList.toggle('motion-off',!enabled);document.documentElement.style.scrollBehavior=enabled?'':'auto';
  document.body.classList.toggle('cursor-on',enabled&&finePointer.matches);
  toggle.setAttribute('aria-pressed',String(enabled));toggle.textContent=enabled?'動態 ON':'靜態模式';
  toggle.disabled=systemMotion.matches;toggle.title=systemMotion.matches?'依照系統「減少動態效果」設定':'可隨時關閉鏡頭、滑鼠與紙張動效';
  if(!enabled){cancelAnimationFrame(raf);raf=0;resetPaper();stage.classList.remove('has-optics');cursor.classList.remove('visible');}
  else{scrollDirty=true;if(renderer?.ready&&finePointer.matches)stage.classList.add('has-optics');else{stage.classList.remove('has-optics');setupOptics()}wake()}
 }
 toggle.addEventListener('click',()=>{userDisabled=!userDisabled;applyMode()});
 systemMotion.addEventListener('change',applyMode);
 finePointer.addEventListener('change',()=>{resetPaper();applyMode()});
 document.addEventListener('pointermove',updatePointer,{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>{cursorVisible=false;cursor.classList.remove('visible');mouse.tx=mouse.ty=0;resetPaper();wake()});
 window.addEventListener('blur',()=>{cursorVisible=false;cursor.classList.remove('visible');resetPaper()});
 document.addEventListener('keydown',event=>{if(event.key==='Tab'){cursorVisible=false;cursor.classList.remove('visible');resetPaper()}});
 window.addEventListener('scroll',()=>{scrollDirty=true;cursorVisible=false;cursor.classList.remove('visible');wake()},{passive:true});
 window.addEventListener('resize',()=>{scrollDirty=true;renderer?.resize();wake()},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;lastFrame=0}else{scrollDirty=true;wake()}});
 if('IntersectionObserver' in window){new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)wake()},{threshold:0}).observe(stage)}
 const directory=document.getElementById('directory');
 new MutationObserver(()=>directory.classList.toggle('opens-above',directory.style.bottom!=='auto')).observe(directory,{attributes:true,attributeFilter:['style']});

 class OpticalCamera {
  constructor(gl){
   this.gl=gl;this.ready=false;this.version=0;this.items=new Map();this.start=performance.now();this.transitionStart=0;this.lastDraw=0;this.lastX=0;this.lastY=0;
   const vertex=`attribute vec2 aPosition;varying vec2 vUV;void main(){vUV=aPosition*.5+.5;gl_Position=vec4(aPosition,0.,1.);}`;
   const fragment=`precision mediump float;
    varying vec2 vUV;uniform sampler2D uPhotoA,uPhotoB,uDepthA,uDepthB;
    uniform vec2 uImageA,uImageB,uViewport,uPointer;uniform float uMix,uZoom;
    vec2 cover(vec2 size){float screen=uViewport.x/uViewport.y;float image=size.x/size.y;return image>screen?vec2(screen/image,1.):vec2(1.,image/screen);}
    vec3 expose(sampler2D photo,sampler2D depth,vec2 size,float focus,float direction){
     vec2 crop=cover(size);vec2 uv=(vUV-.5)*crop/uZoom+.5;
     float distance=texture2D(depth,uv).r;
     uv+=uPointer*.008*(distance-.16)*crop;
     uv.x+=direction*focus*.004*crop.x;
     vec2 blur=vec2(1.8)/uViewport*crop*focus;
     vec3 color=texture2D(photo,uv).rgb*.4;
     color+=(texture2D(photo,uv+blur).rgb+texture2D(photo,uv-blur).rgb)*.2;
     color+=(texture2D(photo,uv+vec2(blur.x,-blur.y)).rgb+texture2D(photo,uv+vec2(-blur.x,blur.y)).rgb)*.1;
     return color;
    }
    void main(){float sweep=smoothstep(0.,1.,uMix+sin(uMix*3.14159265)*(.5-vUV.x)*.16);
     float focus=sin(uMix*3.14159265);
     vec3 a=expose(uPhotoA,uDepthA,uImageA,focus,-1.);
     vec3 b=expose(uPhotoB,uDepthB,uImageB,focus,1.);
     vec3 color=mix(a,b,sweep);
     float leak=exp(-pow((vUV.x-(uMix*1.5-.25))/.13,2.))*focus;
     color+=vec3(.11,.065,.025)*leak;
     float vignette=smoothstep(.1,.85,length((vUV-.5)*vec2(1.,.8)));
     color*=1.-vignette*.1;
     gl_FragColor=vec4(color,1.);
    }`;
   const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(s);gl.deleteShader(s);throw Error(error)}return s};
   const vs=shader(gl.VERTEX_SHADER,vertex),fs=shader(gl.FRAGMENT_SHADER,fragment);
   this.program=gl.createProgram();gl.attachShader(this.program,vs);gl.attachShader(this.program,fs);gl.linkProgram(this.program);gl.deleteShader(vs);gl.deleteShader(fs);
   if(!gl.getProgramParameter(this.program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(this.program));
   gl.useProgram(this.program);this.buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer);
   gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const attribute=gl.getAttribLocation(this.program,'aPosition');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0);
   this.uniforms={};['uPhotoA','uPhotoB','uDepthA','uDepthB','uImageA','uImageB','uViewport','uPointer','uMix','uZoom'].forEach(name=>this.uniforms[name]=gl.getUniformLocation(this.program,name));
   this.resize();
  }
  texture(image){const gl=this.gl,t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
   try{gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image)}catch(error){gl.deleteTexture(t);throw error}return t;
  }
  async item(index,image){
   if(this.items.has(index))return this.items.get(index);
   const depth=new Image();depth.src=['concept-assets/depth-bangkok.svg','concept-assets/depth-tokyo.svg','concept-assets/depth-hangzhou.svg'][index];
   await Promise.all([image.decode(),depth.decode()]);
   if(this.failed)throw Error('Optical layer unavailable');
   // Browsers vary in their SVG-to-texture support: rasterize the manual mask first.
   const mask=document.createElement('canvas');mask.width=depth.naturalWidth;mask.height=depth.naturalHeight;mask.getContext('2d').drawImage(depth,0,0);
   const item={photo:this.texture(image),depth:this.texture(mask),size:[image.naturalWidth,image.naturalHeight]};this.items.set(index,item);return item;
  }
  async change(index,image){
   const version=++this.version;
   try{const item=await this.item(index,image);if(version!==this.version||this.failed)return;
    this.a=this.b||item;this.b=item;this.transitionStart=this.ready?performance.now():0;this.start=performance.now();this.ready=true;
    if(enabled&&finePointer.matches)stage.classList.add('has-optics');canvas.dataset.opticalScene=String(index);wake();
   }catch(error){this.fallback()}
  }
  resize(){const box=stage.getBoundingClientRect();const ratio=Math.min(devicePixelRatio||1,1.5,Math.sqrt(2200000/(box.width*box.height)));
   canvas.width=Math.max(1,Math.round(box.width*ratio));canvas.height=Math.max(1,Math.round(box.height*ratio));this.gl.viewport(0,0,canvas.width,canvas.height);}
  isMoving(now){return now-this.start<18000}
  draw(now,x,y){
   if(this.failed||!this.ready)return;
   const interacting=Math.abs(x-this.lastX)+Math.abs(y-this.lastY)>.002;
   if(!interacting&&now-this.lastDraw<32)return;this.lastDraw=now;this.lastX=x;this.lastY=y;
   const gl=this.gl,u=this.uniforms;gl.useProgram(this.program);
   const progress=this.transitionStart?clamp((now-this.transitionStart)/1000,0,1):1;
   const mix=progress*progress*(3-2*progress);
   [this.a.photo,this.b.photo,this.a.depth,this.b.depth].forEach((texture,i)=>{gl.activeTexture(gl.TEXTURE0+i);gl.bindTexture(gl.TEXTURE_2D,texture)});
   ['uPhotoA','uPhotoB','uDepthA','uDepthB'].forEach((name,i)=>gl.uniform1i(u[name],i));
   gl.uniform2fv(u.uImageA,this.a.size);gl.uniform2fv(u.uImageB,this.b.size);gl.uniform2f(u.uViewport,canvas.width,canvas.height);gl.uniform2f(u.uPointer,x,y);
   gl.uniform1f(u.uMix,mix);gl.uniform1f(u.uZoom,1.065-clamp((now-this.start)/18000,0,1)*.035-storyProgress*.012);gl.drawArrays(gl.TRIANGLES,0,6);
   if(progress===1)this.a=this.b;
  }
  fallback(){if(this.failed)return;this.failed=true;this.ready=false;stage.classList.remove('has-optics');canvas.dataset.renderer='fallback';
   const gl=this.gl;this.items.forEach(item=>{gl.deleteTexture(item.photo);gl.deleteTexture(item.depth)});this.items.clear();gl.deleteBuffer(this.buffer);gl.deleteProgram(this.program);}
 }
 let opticsAttempted=false;
 function setupOptics(){
  // Touch devices retain a lighter photographic dissolve; no hidden GPU workload.
  if(opticsAttempted||!enabled||!finePointer.matches)return;opticsAttempted=true;
  try{const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'});
   if(!gl){canvas.dataset.renderer='fallback';return}renderer=new OpticalCamera(gl);canvas.dataset.renderer='webgl';
   renderer.change(selected(),document.querySelector('.landscape:not([aria-hidden="true"])'));
   canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();renderer.fallback()});
  }catch(error){canvas.dataset.renderer='fallback';stage.classList.remove('has-optics');renderer?.fallback();renderer=null}
 }
 window.CinemaFX={changeScene(index,image){if(renderer&&!renderer.failed)renderer.change(index,image)}};
 applyMode();
})();
