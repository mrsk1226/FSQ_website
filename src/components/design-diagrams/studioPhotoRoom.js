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

export function updatePhotoRoom(room,config,map,a){
 room.config=config;room.texture=map;room.plane.material.uniforms.roomMap.value=map;
 room.plane.material.uniforms.opening.value.set(config.opening.x,config.opening.y,config.opening.w,config.opening.h);
 const rect=config.opening,w=rect.w*room.width,h=rect.h*room.height,cx=(rect.x+rect.w/2-.5)*room.width,cy=(.5-rect.y-rect.h/2)*room.height;
 const fit=Math.min(w/a.width,h/a.height),fw=a.width*fit,fh=a.height*fit;
 // Match each deeper plane's perspective projection to the front wall image.
 const modelProjection=6.075/5.88,infillProjection=6.11/5.88;
 if(!a.photoRest)a.photoRest={position:a.root.position.clone(),scale:a.root.scale.clone()};
 a.root.scale.copy(a.photoRest.scale).multiplyScalar(fit*modelProjection*1.024);
 a.root.position.set(cx*modelProjection,cy*modelProjection-(a.base+a.height/2-a.photoRest.position.y)*fit*modelProjection*1.024,-.075);
 room.fit={x:cx-fw/2,y:cy-fh/2,w:fw,h:fh,scale:fit*modelProjection*1.024,infill:(w-fw)>.015||(h-fh)>.015,status:'PROVISIONAL'};
 for(const n of [...room.infill.children]){room.infill.remove(n);disposeGroup(n);}
 const wall=new T.Color(`rgb(${config.wallColor.join(',')})`);
 room.matte.material.uniforms.hole.value.set(cx-w/2-.008,cy-h/2-.008,w+.016,h+.016);
 function panel(x,y,pw,ph){if(pw<.001||ph<.001)return;
  const mat=new T.ShaderMaterial({uniforms:{wall:{value:wall.clone()}},vertexShader:vertex,fragmentShader:`uniform vec3 wall;varying vec2 vUv;void main(){float grain=fract(sin(dot(vUv,vec2(127.1,311.7)))*43758.5453)-.5;float contact=exp(-min(vUv.x,1.0-vUv.x)*40.0)*.05;gl_FragColor=vec4(wall*(1.0+grain*.02-contact),1.0);#include <colorspace_fragment>}`.replace(';#include',';\n#include'),toneMapped:false});
  const n=new T.Mesh(new T.PlaneGeometry((pw+.012)*infillProjection,(ph+.022)*infillProjection),mat);n.position.set(x*infillProjection,y*infillProjection,-.11);n.name='Sampled_Plaster_Infill_PROVISIONAL';n.userData.role='photo-infill';room.infill.add(n);
 }
 const side=(w-fw)/2,band=(h-fh)/2;
 panel(cx-fw/2-side/2,cy,side,h);panel(cx+fw/2+side/2,cy,side,h);
 panel(cx,cy-fh/2-band/2,fw,band);panel(cx,cy+fh/2+band/2,fw,band);
 // Soft neutral contact veil on the lower inner reveal; no baked scenery.
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
