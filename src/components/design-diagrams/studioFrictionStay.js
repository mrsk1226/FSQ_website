import * as T from 'three';
import {OBB} from 'three/examples/jsm/math/OBB.js';

// Photo-directed lower-rail stay. All dimensions and the slider mounting shoe
// are PROVISIONAL: the photos do not establish a manufacturer hardware drawing.
export function installFrictionStay(m, {width, height, sideX, bottom, front, frameFront, mountY, material}) {
  const parent=m.node.parent, vertical=m.kind==='top',sign=vertical?1:m.left?1:-1;
  const reach=Math.min(width*.22,.22);
  const pivotLocal=new T.Vector3(vertical?sideX:sign*reach,bottom+.022,Math.max(front+.014,(frameFront??-.005)-m.node.position.z+.02));
  const length=vertical?height*Math.sin(20*Math.PI/180)+pivotLocal.z*(1-Math.cos(20*Math.PI/180))+.045:Math.max(reach+.085,reach*Math.sin(70*Math.PI/180)+pivotLocal.z*(1-Math.cos(70*Math.PI/180))+.032);
  const closed=pivotLocal.clone().applyMatrix4(m.node.matrix);
  const railZ=closed.z+.012, railStart=vertical?closed.y:m.node.position.x+sign*.022;
  const railEnd=vertical?closed.y+length+height*(1-Math.cos(20*Math.PI/180))+Math.abs(pivotLocal.z)*Math.sin(20*Math.PI/180)+.022:m.node.position.x+sign*(Math.hypot(reach,pivotLocal.z)+length+.015);
  const group=new T.Group();group.name=`${m.id}_Friction_Stay_PROVISIONAL`;parent.add(group);
  const steel=material||new T.MeshStandardMaterial({name:'Friction_Stay_Brushed_Stainless_PROVISIONAL',color:0xbac2c8,metalness:.92,roughness:.38});
  function mesh(name,geometry,owner=group){const n=new T.Mesh(geometry,steel);n.name=`${m.id}_Stay_${name}`;n.userData.role='friction-stay';n.userData.status='PROVISIONAL';n.userData.motionId=m.id;n.castShadow=true;n.receiveShadow=true;owner.add(n);return n;}
  const rail=mesh('Frame_Track',vertical?new T.BoxGeometry(.006,Math.abs(railEnd-railStart),.016):new T.BoxGeometry(Math.abs(railEnd-railStart),.006,.016));
  rail.position.set(vertical?closed.x-.016:(railStart+railEnd)/2,vertical?(railStart+railEnd)/2:closed.y-.016,railZ);
  // A stationary lower-jamb shoe supports the track; the arm lies above it.
  const footY=mountY??closed.y-.045;
  const shoeBottom=Math.min(footY+.006,closed.y-.023),shoeTop=Math.max(footY+.006,closed.y-.013);
  const shoe=mesh('Frame_Mount',new T.BoxGeometry(.025,shoeTop-shoeBottom,.016));shoe.position.set(vertical?closed.x:railStart,(shoeTop+shoeBottom)/2,railZ+.016);
  const foot=mesh('Frame_Mount_Foot',new T.BoxGeometry(.025,.006,.052));foot.position.set(vertical?closed.x:railStart,footY+.003,railZ-.002);
  foot.userData.mountContact=true;
  const rosette=mesh('Round_Slider_Rosette',new T.CylinderGeometry(.012,.012,.008,24));
  if(vertical)rosette.rotation.z=Math.PI/2;
  const sliderShoe=mesh('Slider_Shoe',new T.BoxGeometry(vertical?.018:.008,vertical?.008:.018,.008));
  const arm=mesh('Constant_Length_Flat_Arm',new T.BoxGeometry(length,.003,.014));
  const pivot=mesh('Sash_Pivot',new T.CylinderGeometry(.009,.009,.008,20),m.node);pivot.position.copy(pivotLocal);
  if(vertical)pivot.rotation.z=Math.PI/2;
  const padDepth=pivotLocal.z-front;
  const pad=mesh('Sash_Pivot_Standoff',new T.BoxGeometry(.014,.01,padDepth),m.node);pad.position.set(pivotLocal.x,pivotLocal.y,front+padDepth/2);
  pad.userData.mountContact=true;
  const rivet=mesh('Sash_Rivet',new T.CylinderGeometry(.003,.003,.01,12),m.node);rivet.position.copy(pivotLocal);
  m.stay={group,rail,shoe,foot,pad,rosette,sliderShoe,arm,pivot,pivotLocal,length,railZ,railStart,railEnd,sign,vertical,status:'PROVISIONAL',valid:true};
  updateFrictionStay(m);
  return m.stay;
}

const point=new T.Vector3(),direction=new T.Vector3(),axis=new T.Vector3(1,0,0);
export function updateFrictionStay(m){
  const s=m.stay;if(!s)return;
  m.node.updateMatrix();point.copy(s.pivotLocal).applyMatrix4(m.node.matrix);
  // Circle (constant arm length about moving sash pivot) intersected with the
  // stationary X slider line. Keep the same branch throughout the swing.
  const discriminant=s.length*s.length-(point.z-s.railZ)**2;
  s.valid=discriminant>=0;
  if(!s.valid)throw new Error(`PROVISIONAL friction stay has insufficient travel: ${m.id}`);
  const slider=(s.vertical?point.y:point.x)+s.sign*Math.sqrt(discriminant);
  s.rosette.position.set(s.vertical?point.x:slider,s.vertical?slider:point.y,s.railZ);
  s.sliderShoe.position.copy(s.rosette.position);if(s.vertical)s.sliderShoe.position.x-=.01;else s.sliderShoe.position.y-=.01;
  s.arm.position.copy(point).add(s.rosette.position).multiplyScalar(.5);
  s.arm.quaternion.setFromUnitVectors(axis,direction.subVectors(s.rosette.position,point).normalize());
}

export function inspectFrictionStays(a){
  a.root.updateMatrixWorld(true);
  return a.motions.filter(m=>m.stay).map(m=>{
    const s=m.stay, mount=s.rosette.getWorldPosition(new T.Vector3()),pivot=s.pivot.getWorldPosition(new T.Vector3());
    const ends=[new T.Vector3(-s.length/2,0,0),new T.Vector3(s.length/2,0,0)].map(v=>s.arm.localToWorld(v));
    const error=Math.min(Math.max(ends[0].distanceTo(mount),ends[1].distanceTo(pivot)),Math.max(ends[1].distanceTo(mount),ends[0].distanceTo(pivot)));
    const x=s.vertical?s.rosette.position.y:s.rosette.position.x,min=Math.min(s.railStart,s.railEnd),max=Math.max(s.railStart,s.railEnd);
    return {id:m.id,status:s.status,attachmentError:error,lengthError:Math.abs(mount.distanceTo(pivot)-s.length),sliderOnTrack:x>=min&&x<=max,valid:s.valid,mount:mount.toArray(),pivot:pivot.toArray()};
  });
}

export function frictionStayCollisions(a,installation){
  a.root.updateMatrixWorld(true);installation?.updateMatrixWorld(true);
  const obstacles=[];
  function collect(root,architecture=false){root?.traverse(n=>{if(n.isMesh&&(architecture||['profile','glass','installation'].includes(n.userData.role))){n.geometry.computeBoundingBox();obstacles.push({n,obb:new OBB().fromBox3(n.geometry.boundingBox).applyMatrix4(n.matrixWorld)});}});}
  collect(a.root);collect(installation,true);
  const hits=[];
  for(const m of a.motions.filter(m=>m.stay))for(const n of [m.stay.arm,m.stay.rail,m.stay.shoe,m.stay.foot,m.stay.pad,m.stay.rosette,m.stay.sliderShoe,m.stay.pivot]){
    n.geometry.computeBoundingBox();const obb=new OBB().fromBox3(n.geometry.boundingBox).applyMatrix4(n.matrixWorld);
    for(const o of obstacles){
      // Only deliberate mounting face contact is allowed, never arm penetration.
      const contact=n.userData.mountContact&&o.n.userData.role==='profile'&&(n===m.stay.pad?o.n.userData.motionId===m.id:!o.n.userData.motionId);
      if(!contact&&obb.intersectsOBB(o.obb,1e-8))hits.push([n.name,o.n.name]);
    }
  }
  return hits;
}
