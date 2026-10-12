import * as T from 'three';
import {disposeGroup} from './studioAssembly.js';

let configPromise;
export const isPhotoRoom=preset=>preset?.startsWith('photo-');
export function photoRoomConfig(){return configPromise ||=fetch('/textures/rooms-real/rooms.json').then(r=>{if(!r.ok)throw Error('Photo room configuration unavailable');return r.json();}).catch(e=>{configPromise=null;throw e;});}
const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`
uniform sampler2D roomMap;uniform vec4 opening;uniform vec2 texel;varying vec2 vUv;
void main(){
 vec4 sampleColor=texture2D(roomMap,vUv);vec3 c=sampleColor.rgb;
 vec2 p=vec2(vUv.x,1.0-vUv.y);
 vec2 lo=opening.xy-texel*2.0,hi=opening.xy+opening.zw+texel*2.0;
 float region=step(lo.x,p.x)*step(lo.y,p.y)*step(p.x,hi.x)*step(p.y,hi.y);
 vec2 spillLo=opening.xy-texel*16.0,spillHi=opening.xy+opening.zw+texel*16.0;
 float spillRegion=step(spillLo.x,p.x)*step(spillLo.y,p.y)*step(p.x,spillHi.x)*step(p.y,spillHi.y);
 // Linear-light green dominance; only the detected aperture is keyed.
 float dominance=c.g-max(c.r,c.b);
 float key=smoothstep(.10,.30,dominance)*(1.0-smoothstep(.18,.48,max(c.r,c.b)))*region;
 float alpha=1.0-key;if(alpha<.01)discard;
 // Remove chroma contamination from blended reveal/green boundary pixels.
 c.g=mix(c.g,min(c.g,max(c.r,c.b)+.006),spillRegion*smoothstep(.004,.05,dominance));
 gl_FragColor=vec4(c,alpha);
 #include <colorspace_fragment>
}`;

export function createPhotoRoom(config,map){
 const group=new T.Group();group.name='Stationary_Photo_Room';
 const width=8,height=width*config.height/config.width;
 const material=new T.ShaderMaterial({uniforms:{roomMap:{value:map},opening:{value:new T.Vector4(config.opening.x,config.opening.y,config.opening.w,config.opening.h)},texel:{value:new T.Vector2(1/config.width,1/config.height)}},vertexShader:vertex,fragmentShader:fragment,transparent:true,depthWrite:true,toneMapped:false});
 const plane=new T.Mesh(new T.PlaneGeometry(width,height),material);plane.name='Keyed_Photographic_Wall';plane.position.z=.12;plane.renderOrder=50;plane.raycast=()=>{};group.add(plane);
 const infill=new T.Group();infill.name='Photo_Aspect_Infill_PROVISIONAL';group.add(infill);
 // Contain the complete photo without allowing outdoor scenery into letterbox margins.
 const matte=new T.Mesh(new T.PlaneGeometry(40,30),new T.ShaderMaterial({uniforms:{hole:{value:new T.Vector4()},colour:{value:new T.Color('#c9bdaa')}},vertexShader:'varying vec2 point;void main(){point=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 point;uniform vec4 hole;uniform vec3 colour;void main(){if(point.x>hole.x&&point.y>hole.y&&point.x<hole.x+hole.z&&point.y<hole.y+hole.w)discard;gl_FragColor=vec4(colour,1.0);\n#include <colorspace_fragment>\n}',toneMapped:false}));
 matte.position.z=.119;matte.name='Stationary_Photo_Matte';matte.raycast=()=>{};group.add(matte);
 const room={group,plane,infill,matte,width,height,config,texture:map};
 return room;
}

const patchVertex=`varying vec2 vWorldPos;varying vec2 vUv;void main(){vUv=uv;vec4 worldPos=modelMatrix*vec4(position,1.0);vWorldPos=worldPos.xy;gl_Position=projectionMatrix*viewMatrix*worldPos;}`;
const patchFragment=`uniform sampler2D roomMap;uniform vec4 winRect;uniform vec4 patchBounds;uniform vec4 wallUvRect;varying vec2 vWorldPos;varying vec2 vUv;
void main(){
 vec2 p=vWorldPos;vec2 winLo=winRect.xy,winHi=winRect.xy+winRect.zw;
 if(p.x>=winLo.x&&p.x<=winHi.x&&p.y>=winLo.y&&p.y<=winHi.y) discard;
 vec2 pLo=patchBounds.xy,pHi=patchBounds.xy+patchBounds.zw;
 float edgeDistX=min(p.x-pLo.x,pHi.x-p.x),edgeDistY=min(p.y-pLo.y,pHi.y-p.y);
 float edgeDist=min(edgeDistX,edgeDistY),outerAlpha=smoothstep(0.0,0.08,edgeDist);
 if(outerAlpha<=0.001) discard;
 float tx=clamp((p.x-pLo.x)/(pHi.x-pLo.x),0.0,1.0),ty=clamp((pHi.y-p.y)/(pHi.y-pLo.y),0.0,1.0);
 vec2 uvL=vec2(wallUvRect.x,mix(wallUvRect.y,wallUvRect.w,ty)),uvR=vec2(wallUvRect.z,mix(wallUvRect.y,wallUvRect.w,ty));
 vec2 uvT=vec2(mix(wallUvRect.x,wallUvRect.z,tx),wallUvRect.y),uvB=vec2(mix(wallUvRect.x,wallUvRect.z,tx),wallUvRect.w);
 vec3 cL=texture2D(roomMap,uvL).rgb,cR=texture2D(roomMap,uvR).rgb,cT=texture2D(roomMap,uvT).rgb,cB=texture2D(roomMap,uvB).rgb;
 vec3 cTL=texture2D(roomMap,vec2(wallUvRect.x,wallUvRect.y)).rgb,cTR=texture2D(roomMap,vec2(wallUvRect.z,wallUvRect.y)).rgb;
 vec3 cBL=texture2D(roomMap,vec2(wallUvRect.x,wallUvRect.w)).rgb,cBR=texture2D(roomMap,vec2(wallUvRect.z,wallUvRect.w)).rgb;
 vec3 cHoriz=mix(cL,cR,tx),cVert=mix(cT,cB,ty),cCorners=mix(mix(cTL,cTR,tx),mix(cBL,cBR,tx),ty);
 vec3 wallColor=clamp(cHoriz+cVert-cCorners,0.0,1.0);
 float grain=(fract(sin(dot(p*260.0,vec2(12.9898,78.233)))*43758.5453)-0.5)*0.02;
 wallColor=clamp(wallColor*(1.0+grain),0.0,1.0);
 float dLeft=winLo.x-p.x,dRight=p.x-winHi.x,dBottom=winLo.y-p.y,dTop=p.y-winHi.y;
 float inSpanX=smoothstep(winLo.x-0.005,winLo.x+0.02,p.x)*(1.0-smoothstep(winHi.x-0.02,winHi.x+0.005,p.x));
 float inSpanY=smoothstep(winLo.y-0.005,winLo.y+0.02,p.y)*(1.0-smoothstep(winHi.y-0.02,winHi.y+0.005,p.y));
 float headShadow=(dTop>0.0&&dTop<0.06)?smoothstep(0.06,0.0,dTop)*inSpanX:0.0;
 float sideShadowL=(dLeft>0.0&&dLeft<0.05)?smoothstep(0.05,0.0,dLeft)*inSpanY:0.0;
 float sideShadowR=(dRight>0.0&&dRight<0.05)?smoothstep(0.05,0.0,dRight)*inSpanY:0.0;
 float innerRevealShadow=1.0-0.20*headShadow-0.12*max(sideShadowL,sideShadowR);
 float sillContactShadow=1.0;
 if(dBottom>0.0&&dBottom<0.07){float sillFactor=smoothstep(0.07,0.0,dBottom)*inSpanX;sillContactShadow=1.0-0.24*sillFactor;}
 wallColor*=innerRevealShadow*sillContactShadow;
 gl_FragColor=vec4(wallColor,outerAlpha);
 #include <colorspace_fragment>
}`;

export function updatePhotoRoom(room,config,map,a){
 room.config=config;room.texture=map;room.plane.material.uniforms.roomMap.value=map;
 room.plane.material.uniforms.opening.value.set(config.opening.x,config.opening.y,config.opening.w,config.opening.h);
 const rect=config.opening,w=rect.w*room.width,h=rect.h*room.height,cx=(rect.x+rect.w/2-.5)*room.width,cy=(.5-rect.y-rect.h/2)*room.height;
 const fw=a.width,fh=a.height;
 if(!a.photoRest)a.photoRest={position:a.root.position.clone(),scale:a.root.scale.clone()};
 a.root.scale.copy(a.photoRest.scale);
 const localCenterY=a.base+a.height/2-(a.photoRest?.position?.y||0);
 a.root.position.set(cx,cy-localCenterY,-.075);
 const needsInfill=(w-fw)>.015||(h-fh)>.015;
 room.fit={x:cx-fw/2,y:cy-fh/2,w:fw,h:fh,scale:1.0,infill:needsInfill,status:'PROVISIONAL'};
 for(const n of [...room.infill.children]){room.infill.remove(n);disposeGroup(n);}
 room.matte.material.uniforms.hole.value.set(cx-w/2-.008,cy-h/2-.008,w+.016,h+.016);
 if(needsInfill){
  const padX = 0.22, padY = 0.25;
  const patchW = Math.max(w + 2 * padX, fw + 0.04), patchH = Math.max(h + 2 * padY, fh + 0.04);
  const minX = config.pixelRect ? config.pixelRect[0] : config.opening.x * config.width;
  const minY = config.pixelRect ? config.pixelRect[1] : config.opening.y * config.height;
  const pW = config.pixelRect ? config.pixelRect[2] : config.opening.w * config.width;
  const pH = config.pixelRect ? config.pixelRect[3] : config.opening.h * config.height;
  const maxX = minX + pW - 1, maxY = minY + pH - 1;
  const uL = Math.max(0.005, (minX - 45) / config.width);
  const uR = Math.min(0.995, (maxX + 45) / config.width);
  const vT = Math.min(0.995, 1.0 - (minY - 35) / config.height);
  const vB = Math.max(0.005, 1.0 - (maxY + 40) / config.height);
  const patchMat=new T.ShaderMaterial({
   uniforms:{
    roomMap:{value:map},
    winRect:{value:new T.Vector4(cx-fw/2,cy-fh/2,fw,fh)},
    patchBounds:{value:new T.Vector4(cx-patchW/2,cy-patchH/2,patchW,patchH)},
    wallUvRect:{value:new T.Vector4(uL,vT,uR,vB)}
   },
   vertexShader:patchVertex,
   fragmentShader:patchFragment,
   transparent:true,
   depthWrite:true,
   toneMapped:false
  });
  const patchMesh=new T.Mesh(new T.PlaneGeometry(patchW,patchH,16,16),patchMat);
  patchMesh.position.set(cx,cy,.1205);
  patchMesh.renderOrder=55;
  patchMesh.name='Seamless_Sampled_Plaster_Patch';
  patchMesh.userData.role='photo-infill';
  patchMesh.raycast=()=>{};
  room.infill.add(patchMesh);
 }
 const shadow=new T.Mesh(new T.PlaneGeometry(fw,.055),new T.ShaderMaterial({vertexShader:vertex,fragmentShader:'varying vec2 vUv;void main(){gl_FragColor=vec4(.12,.085,.055,.20*(1.0-vUv.y)*(1.0-vUv.y));}',transparent:true,depthWrite:false,toneMapped:false}));
 shadow.position.set(cx,cy-fh/2+.0275,-.045);shadow.name='Soft_Sill_Contact_Shadow';shadow.renderOrder=40;shadow.raycast=()=>{};room.infill.add(shadow);
 a.root.updateMatrixWorld(true);
}

export function restorePhotoAssembly(a){if(a?.photoRest){a.root.position.copy(a.photoRest.position);a.root.scale.copy(a.photoRest.scale);}}
export function configurePhotoCamera(ctx,entering=false){
 if(entering){ctx.camera.position.set(0,0,6);ctx.controls.target.set(0,0,0);ctx.controls.enableZoom=false;ctx.controls.enablePan=false;ctx.controls.minDistance=6;ctx.controls.maxDistance=6;ctx.controls.minAzimuthAngle=-Math.PI/60;ctx.controls.maxAzimuthAngle=Math.PI/60;ctx.controls.minPolarAngle=Math.PI/2-Math.PI/60;ctx.controls.maxPolarAngle=Math.PI/2+Math.PI/60;ctx.controls.update();}
 const room=ctx.photo;if(!room)return;
 const visibleHeight=Math.max(room.height,room.width/ctx.camera.aspect)*1.025;
 ctx.camera.fov=T.MathUtils.radToDeg(2*Math.atan(visibleHeight/12));ctx.camera.updateProjectionMatrix();
 ctx.exterior=false;
}
export function photoHitAllowed(ctx,ray){
 if(!ctx.photo)return true;
 const p=ray.intersectPlane(new T.Plane(new T.Vector3(0,0,1),-.12),new T.Vector3());if(!p)return false;
 const f=ctx.photo.fit;return p.x>=f.x&&p.x<=f.x+f.w&&p.y>=f.y&&p.y<=f.y+f.h;
}
