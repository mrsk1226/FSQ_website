import * as T from 'three';
import {inspectFrictionStays,frictionStayCollisions} from './studioFrictionStay.js';
import {OBB} from 'three/examples/jsm/math/OBB.js';
// A conservative box test is evidence for the rectangular procedural bars only.
// Recovered stepped profile boxes can yield false positives and require their Blender convex-part QA.
export function inspectAssembly(a,installation){
 a.root.updateMatrixWorld(true);const meshes=[],materials={};a.root.traverse(n=>{if(!n.isMesh)return;
 const slots=Array.isArray(n.material)?n.material:[n.material],m=slots[0];materials[n.name]={role:n.userData.role,name:m.name,color:m.color.toArray(),map:m.map?.image?.src||null,transmission:m.transmission,roughness:m.roughness,slots:slots.map(x=>({name:x.name,color:x.color.toArray(),roughness:x.roughness}))};
 meshes.push({name:n.name,role:n.userData.role,motion:n.userData.motionId||null,matrix:n.matrixWorld.toArray(),parent:n.parent.name});});
 const bars=[];if(a.source==='procedural')a.root.traverse(n=>{if(n.isMesh&&n.userData.role==='profile'&&!n.name.includes('Bead')){n.geometry.computeBoundingBox();const obb=new OBB().fromBox3(n.geometry.boundingBox);obb.halfSize.addScalar(-.0003);obb.applyMatrix4(n.matrixWorld);bars.push({name:n.name,motion:n.userData.motionId||null,obb});}});
 const collisions=[];for(let i=0;i<bars.length;i++)for(let j=i+1;j<bars.length;j++){const x=bars[i],y=bars[j];if(x.motion===y.motion||!x.motion&&!y.motion)continue;if(x.obb.intersectsOBB(y.obb,1e-8))collisions.push([x.name,y.name]);}
 const folding=a.motions.filter(m=>m.kind==='fold'),foldJoints=[];for(let i=0;i<folding.length-1;i++){const m=folding[i],n=folding[i+1],right=new T.Vector3(m.pitch/2,0,i%2===0?.045:-.045).applyMatrix4(m.node.matrixWorld),left=new T.Vector3(-n.pitch/2,0,(i+1)%2===0?-.045:.045).applyMatrix4(n.node.matrixWorld);foldJoints.push({from:m.id,to:n.id,gap:right.distanceTo(left)});}
 return {meshes,materials,collisions,foldJoints,frictionStays:inspectFrictionStays(a),stayCollisions:frictionStayCollisions(a,installation),collisionMethod:a.source==='procedural'?'OBB profile bars; excludes same-sash internal contacts; 0.3mm tolerance':'Recovered convex-part Blender QA; not retested by website OBB'};
}
export function clearOpening(a){if(!a.tracks)return null;const intervals=a.panels.filter(p=>p.id.startsWith('main')).map(p=>{const m=a.motions.find(m=>m.id===p.id),x=p.x+(m?.travel||0)*(m?.current||0);return [x-p.width/2-.001,x+p.width/2+.001];}).sort((x,y)=>x[0]-y[0]);let end=-a.width/2+(a.profile||.06)+.008,best=0;const rightEdge=a.width/2-(a.profile||.06)-.008;for(const [left,right] of intervals){best=Math.max(best,Math.min(left,rightEdge)-end);end=Math.max(end,right);}best=Math.max(best,rightEdge-end);return Math.max(0,best);}
