import * as T from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
export const touchLockAsset='/models/FSQ_TouchLock_Visual_Recovery_v02.glb';
export function installTouchLocks(a,source){
 for(const m of a.motions.filter(m=>m.kind==='slide')){
  const stub=m.node.getObjectByName(`${m.id}_TouchLock`),surface=stub.parent,pos=stub.position.clone(),positive=pos.x>0;
  const side=positive?'Left':'Right',bank=source.getObjectByName(`TouchLock_${side}_Template`).clone(true);
  surface.remove(stub);stub.geometry.dispose();bank.position.set(pos.x,pos.y,.016);bank.rotation.y+=Math.PI;surface.add(bank);
  bank.traverse(n=>{if(n.isMesh){n.geometry=toCreasedNormals(n.geometry,Math.PI/4);n.material=(Array.isArray(n.material)?n.material:[n.material]).map(x=>{const material=x.clone();material.flatShading=false;return material;});if(n.material.length===1)n.material=n.material[0];n.userData.role='hardware';n.userData.motionId=m.id;n.castShadow=true;n.name=`${m.id}_${n.name}`;}});
  m.handle=bank.getObjectByName(`${m.id}_TouchLock_${side}_Actuator`);m.actuator=m.handle;m.actuatorRest=m.actuator.position.y;
  m.latch=bank.getObjectByName(`${m.id}_TouchLock_${side}_Latch`);m.latchRest=m.latch.position.x;m.latchDirection=side==='Left'?-1:1;
  const keeper=bank.getObjectByName(`${m.id}_TouchLock_${side}_Keeper`);a.root.updateMatrixWorld(true);a.root.attach(keeper);delete keeper.userData.motionId;
  m.hardwareReference='Phase3F owner photograph; dimensions provisional';
  // A genuine pocket removes the stile face behind the recessed lock, rather than hiding a block behind it.
  const stile=m.node.getObjectByName(`${m.id}_${positive?'Right':'Left'}`),height=stile.geometry.parameters?.height||(stile.geometry.boundingBox.max.y-stile.geometry.boundingBox.min.y),pw=stile.geometry.parameters?.width||(stile.geometry.boundingBox.max.x-stile.geometry.boundingBox.min.x),depth=stile.geometry.parameters?.depth||(stile.geometry.boundingBox.max.z-stile.geometry.boundingBox.min.z),center=stile.position.clone();
  stile.parent.remove(stile);stile.geometry.dispose();
  function bar(name,x,y,z,w,h,d){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),a.mats.profile);mesh.name=`${m.id}_${name}`;mesh.position.set(x,y,z);mesh.userData.role='profile';mesh.userData.motionId=m.id;mesh.castShadow=true;mesh.receiveShadow=true;surface.add(mesh);const p=mesh.geometry.attributes.position,uv=mesh.geometry.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getY(i)+h/2)/Math.max(h,1.25),.15+.7*(p.getX(i)/w+.5));}
  const holeW=.028,holeH=.196,sideW=(pw-holeW)/2,endH=(height-holeH)/2;
  for(const sign of [-1,1]){bar(`Mortise_Side_${sign}`,center.x+sign*(holeW/2+sideW/2),center.y,0,sideW,height,depth);bar(`Mortise_End_${sign}`,center.x,center.y+sign*(holeH/2+endH/2),0,holeW,endH,depth);}
  bar('Mortise_Back',center.x,center.y,-.006,holeW,holeH,.020);
 }
 a.hardwareSource=touchLockAsset;
}

