import * as T from 'three';
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

export function createMaterials(aluminium=false){return {
 profile:new T.MeshStandardMaterial({color:aluminium?0x50565b:0xf5f6f2,metalness:aluminium?.75:0,roughness:aluminium?.32:.42}),
 glass:new T.MeshPhysicalMaterial({color:0xf4fcff,transmission:1,roughness:.025,ior:1.5,thickness:.005,transparent:true,opacity:1,depthWrite:false}),
 gasket:new T.MeshStandardMaterial({color:0x202724,roughness:.85}),hardware:new T.MeshStandardMaterial({color:0xc1c6ca,metalness:.9,roughness:.25}),
 trim:new T.MeshStandardMaterial({color:0xdedbd2,roughness:.75})};}
function box(parent,name,x,y,z,w,h,d,material,role){const geometry=new T.BoxGeometry(w,h,d);
 if(role==='profile'){const pos=geometry.attributes.position,normal=geometry.attributes.normal,uv=geometry.attributes.uv,alongX=w>h,length=alongX?w:h,span=Math.max(1.25,length);for(let i=0;i<pos.count;i++){const longitudinal=alongX?pos.getX(i):pos.getY(i);const front=Math.abs(normal.getZ(i))>.5;const transverse=front?(alongX?pos.getY(i):pos.getX(i)):pos.getZ(i);const extent=front?(alongX?h:w):d;uv.setXY(i,(longitudinal+length/2)/span,.15+.7*(transverse/extent+.5));}uv.needsUpdate=true;}
 const m=new T.Mesh(geometry,material);m.position.set(x,y,z);m.name=name;m.userData.role=role;m.castShadow=role!=='glass';m.receiveShadow=true;parent.add(m);return m;}
function ring(parent,name,x,y,z,w,h,p,d,mat,role='profile'){
 box(parent,`${name}_Head`,x,y+h/2-p/2,z,w,p,d,mat,role);box(parent,`${name}_Sill`,x,y-h/2+p/2,z,w,p,d,mat,role);
 box(parent,`${name}_Left`,x-w/2+p/2,y,z,p,h-2*p,d,mat,role);box(parent,`${name}_Right`,x+w/2-p/2,y,z,p,h-2*p,d,mat,role);
}
export function buildAssembly(record){
 const {design,product,type}=record;const root=new T.Group();root.name=record.id;const mats=createMaterials(product==='aluminium');
 const width=parseInt(design.width)/100,height=parseInt(design.height)/100,door=type.startsWith('door'),base=door?.03:.85;
 const profile=product==='aluminium'?.042:.06,depth=type.includes('sliding')?.17:.07;
 const motions=[],panels=[];let tracks=type.includes('sliding')?(design.name.includes('3-Track')?3:2):0;
 const rows=[design.bottomPanes?.length&&{key:'bottom',panes:design.bottomPanes,fraction:.22},{key:'main',panes:design.panes,fraction:1-(design.topPanes?.length?.22:0)-(design.bottomPanes?.length?.22:0)},design.topPanes?.length&&{key:'top',panes:design.topPanes,fraction:.22}].filter(Boolean);
 rows.forEach(row=>{row.fraction=1/rows.length;}); // The authoritative 2D renderer uses equal-height flex rows.
 const pane=(parent,p,x,y,w,h,z,key,index,groupPanels)=>{
  const fixed=p.type==='fixed',slide=p.type==='slide',fold=p.type==='fold',tt=p.type==='tilt';
  const left=p.hinge==='left'||p.subType==='tilt-left',top=p.hinge==='top';
  const sash=new T.Group();sash.name=`${key}_Sash`;parent.add(sash);
  const pivotX=left?x-w/2:x+w/2,pivotY=top?y+h/2:y-h/2;
  if(!fixed&&!slide&&!fold){sash.position.set(pivotX,tt?y-h/2:top?pivotY:y,z);}else sash.position.set(x,y,z);
  if(!fixed&&!slide&&!fold)sash.position.z+=tt?.05:-.05;
  const surface=new T.Group();surface.name=`${key}_Attached_Components`;surface.position.z=z-sash.position.z;sash.add(surface);
  const sx=x-sash.position.x,sy=y-sash.position.y;
  const pw=fixed?.025:profile;
  ring(surface,key,sx,sy,0,w-.006,h-.006,pw,tracks?.032:depth*.5,mats.profile);
  ring(surface,`${key}_Bead`,sx,sy,.027,w-2*pw,h-2*pw,.012,.01,mats.profile);
  ring(surface,`${key}_Seal`,sx,sy,.018,w-2*pw-.015,h-2*pw-.015,.006,.008,mats.gasket,'gasket');
  box(surface,`${key}_Glass`,sx,sy,0,w-2*pw-.025,h-2*pw-.025,.005,mats.glass,'glass');
  let handle=null;
  if(!fixed){const hx=sx+(p.handlePos==='left'?-1:p.handlePos==='right'?1:left?1:-1)*(w/2-pw/2);
   if(slide)handle=box(surface,`${key}_TouchLock`,hx,sy,.045,.014,.09,.025,mats.hardware,'hardware');
   else {
    handle=new T.Group();handle.name=`${key}_Handle`;handle.position.set(hx,sy,.022);surface.add(handle);
    const base=new T.Mesh(new RoundedBoxGeometry(.026,door?.15:.10,.006,2,.003),mats.hardware);base.name=`${key}_Handle_Rosette`;base.userData.role='hardware';handle.add(base);
    const stem=new T.Mesh(new T.CylinderGeometry(.008,.008,.027,12),mats.hardware);stem.rotation.x=Math.PI/2;stem.position.z=.016;stem.name=`${key}_Handle_Spindle`;stem.userData.role='hardware';handle.add(stem);
    const lever=new T.Mesh(new RoundedBoxGeometry(.018,door?.12:.085,.016,2,.005),mats.hardware);lever.position.set(0,-(door?.053:.037),.034);lever.name=`${key}_Handle_Lever`;lever.userData.role='hardware';handle.add(lever);
    for(const y of [-.033,.033]){const screw=new T.Mesh(new T.CylinderGeometry(.0025,.0025,.002,8),mats.hardware);screw.rotation.x=Math.PI/2;screw.position.set(0,y,.004);screw.userData.role='hardware';handle.add(screw);}
   }
   if(slide){box(surface,`${key}_Roller`,sx,sy-h/2+.015,0,.045,.025,.025,mats.hardware,'hardware');}
   else if(fold){const pitch=(width-2*profile)/groupPanels.length;for(const sign of [-1,1])for(const hy of [-h*.36,h*.36])box(surface,`${key}_Linked_Hinge_${sign}_${hy}`,sx+sign*pitch/2,sy+hy+sign*.016,(index%2===0?sign:-sign)*.045,.024,.025,.024,mats.hardware,'hardware');if(index<groupPanels.length-1)box(surface,`${key}_Joint_Seal`,sx+pitch/2,sy,0,.046,h,.006,mats.gasket,'gasket');}
   else for(const hy of [-h*.36,h*.36]) box(surface,`${key}_Hinge_${hy}`,sx+(left?-1:1)*(w/2-.005),sy+hy,0,.013,.06,.024,mats.hardware,'hardware');
  }
  let carriage=null;
  if(fold&&index%2===1){const pitch=(width-2*profile)/groupPanels.length;carriage=new T.Group();carriage.name=`${key}_Paired_Track_Carriage`;carriage.position.set(pitch/2,0,-.045);sash.add(carriage);for(const sign of [-1,1]){box(carriage,`${key}_Hanger_${sign}`,0,sign*(h/2+.026),0,.014,.06,.012,mats.hardware,'hardware');const wheel=new T.Mesh(new T.CylinderGeometry(.012,.012,.012,16),mats.hardware);wheel.rotation.x=Math.PI/2;wheel.position.set(0,sign*(h/2+.048),0);wheel.name=`${key}_Guide_Roller_${sign}`;wheel.userData.role='hardware';carriage.add(wheel);}}
  let motion=null;
  if(fixed&&tracks)sash.position.z=-.08;
  if(slide){const direction=p.direction==='right'?1:-1;const track=tracks===3?index:1;sash.position.z=track*.055-.08;
   const maxCells=tracks===3&&direction===-1?index:1;
   motion={kind:'slide',node:sash,rest:sash.position.clone(),travel:direction*Math.max(0,w*maxCells-.02),track};
  }else if(tt){motion={kind:'tilt',node:sash,left,rest:sash.position.clone(),width:w,height:h,handle};}
  else if(fold){motion={kind:'fold',node:sash,carriage,rest:sash.position.clone(),width:w,pitch:(width-2*profile)/groupPanels.length,index,count:groupPanels.length};}
  else if(!fixed){motion={kind:top?'top':'casement',node:sash,left,handle};}
  if(motion){motion.id=key;motion.target=0;motion.current=0;motion.mode='turn';motion.locked=false;motions.push(motion);sash.traverse(n=>{n.userData.motionId=key;});}
  panels.push({id:key,type:p.type,hinge:p.hinge||null,track:motion?.track??(tracks?0:null),width:w,height:h,x,y});
 };
 if(design.concept){
  const segment=width/design.angles.reduce((sum,a)=>sum+Math.cos(T.MathUtils.degToRad(a)),0);let cursorX=-width/2,cursorZ=0;const outline=[new T.Vector2(cursorX,cursorZ)];
  design.angles.forEach((angle,i)=>{const g=new T.Group();const a=-T.MathUtils.degToRad(angle);g.position.set(cursorX+Math.cos(a)*segment/2,0,cursorZ-Math.sin(a)*segment/2);g.rotation.y=a;root.add(g);ring(g,`BayFrame${i}`,0,base+height/2,0,segment,height,profile,depth,mats.profile);pane(g,design.panes[i],0,base+height/2,segment-2*profile,height-2*profile,0,`bay_${i}`,i,design.panes);cursorX+=Math.cos(a)*segment;cursorZ-=Math.sin(a)*segment;outline.push(new T.Vector2(cursorX,cursorZ));if(i<design.panes.length-1){const join=new T.Mesh(new T.CylinderGeometry(.045,.045,height,12),mats.profile);join.position.set(cursorX,base+height/2,cursorZ);join.name=`Bay_Corner_${i}`;join.userData.role='profile';root.add(join);}});
  const slab=new T.ExtrudeGeometry(new T.Shape(outline),{depth:.035,bevelEnabled:false});slab.rotateX(Math.PI/2);for(const y of [base,base+height+.035]){const mesh=new T.Mesh(slab.clone(),mats.trim);mesh.position.y=y;mesh.name='Bay_Installation_Slab';mesh.userData.role='installation';root.add(mesh);}slab.dispose();
 }else{
  ring(root,'OuterFrame',0,base+height/2,-.04,width,height,profile,depth,mats.profile);
  let bottom=base+profile;
  rows.forEach((row,ri)=>{const h=(height-2*profile)*row.fraction,w=(width-2*profile)/row.panes.length,y=bottom+h/2;
   const french=/french/i.test(design.name),folding=type==='door-fold';
   row.panes.forEach((p,i)=>{let x=-width/2+profile+w*(i+.5),panelWidth=w-.04;
    if(tracks){const samePlane=other=>other&&(p.type==='fixed'&&other.type==='fixed'||tracks===2&&p.type==='slide'&&other.type==='slide'),sameTrackLeft=samePlane(row.panes[i-1]),sameTrackRight=samePlane(row.panes[i+1]);const left=i===0?.006:sameTrackLeft?.0005:-.015,right=i===row.panes.length-1?-.006:sameTrackRight?-.0005:.015;x+=(left+right)/2;panelWidth=w+right-left;}
    pane(root,p,x,y,panelWidth,h-.04,-.03,`${row.key}_${i}`,i,row.panes);
    const floatingLeft=(french||folding)&&p.type!=='fixed'&&i>0&&row.panes[i-1].type!=='fixed',floatingRight=(french||folding)&&p.type!=='fixed'&&i<row.panes.length-1&&row.panes[i+1].type!=='fixed';
    if(!tracks){box(root,`${row.key}_${i}_CompressionHead`,x,y+h/2-.016,.004,w-.012,.023,.006,mats.gasket,'gasket');box(root,`${row.key}_${i}_CompressionSill`,x,y-h/2+.016,.004,w-.012,.023,.006,mats.gasket,'gasket');for(const [sign,floating] of [[-1,floatingLeft],[1,floatingRight]])if(!floating)box(root,`${row.key}_${i}_CompressionJamb_${sign}`,x+sign*(w/2-.016),y,.004,.023,h-.012,.006,mats.gasket,'gasket');}
    if(i>0&&!tracks&&!floatingLeft)box(root,`${row.key}_Mullion_${i}`,x-w/2,y,-.04,.028,h,depth,mats.profile,'profile');
   });
   if(tracks){for(const sign of [-1,1])box(root,`${row.key}_Track_Jamb_Seal_${sign}`,sign*(width/2-profile-.004),y,-.025,.008,h,.15,mats.gasket,'gasket');for(let i=1;i<row.panes.length;i++)if(row.panes[i-1].type==='fixed'&&row.panes[i].type==='fixed')box(root,`${row.key}_Fixed_Meeting_Seal_${i}`,-width/2+profile+w*i,y,-.08,.002,h-.04,.024,mats.gasket,'gasket');
    for(const m of motions.filter(m=>m.kind==='slide'&&m.id.startsWith(`${row.key}_`))){const index=Number(m.id.split('_').at(-1)),direction=Math.sign(m.travel),destination=tracks===3?(direction<0?0:row.panes.length-1):index+direction,target=panels.find(p=>p.id===`${row.key}_${destination}`),panel=panels.find(p=>p.id===m.id);if(target)m.travel=T.MathUtils.clamp(target.x,-width/2+profile+.003+panel.width/2,width/2-profile-.003-panel.width/2)-m.rest.x;
     if(tracks===2&&row.panes[index+1]?.type==='slide')box(m.node,`${m.id}_Meeting_Seal`,panel.width/2,0,0,.002,panel.height,.024,mats.gasket,'gasket').userData.motionId=m.id;
    }
   }
   bottom+=h;if(ri<rows.length-1)box(root,`Transom_${ri}`,0,bottom,-.04,width-2*profile,.028,depth,mats.profile,'profile');
  });
  if(tracks)for(let i=0;i<tracks;i++)for(const y of [base+.024,base+height-.024])box(root,`Track_${i}_${y}`,0,y,i*.055-.08,width-.04,.012,.01,mats.hardware,'hardware');
  if(type==='door-fold')for(const y of [base+.022,base+height-.022]){for(const side of [-1,1])box(root,`Fold_Guide_${y}_${side}`,0,y,-.075+side*.013,width-.04,.024,.006,mats.hardware,'hardware');box(root,`Fold_Rail_Back_${y}`,0,y+(y>height/2?.015:-.015),-.075,width-.04,.006,.032,mats.hardware,'hardware');}
 }
 return {root,mats,motions,panels,width,height,base,profile,tracks,source:'procedural',record};
}
export function applyMotion(m){const p=m.current;
 if(m.kind==='slide'){m.node.position.x=m.rest.x+m.travel*p;if(m.actuator){const locked=m.locked&&p<.001;m.actuator.position.y=m.actuatorRest+(locked?.008:0);m.latch.position.x=m.latchRest+(locked?m.latchDirection*.008:0);}}
 else if(m.kind==='casement') {m.node.rotation.y=(m.left?1:-1)*T.MathUtils.degToRad(70)*Math.max(0,(p-.25)/.75);if(m.handle)m.handle.rotation.z=(m.left?-1:1)*Math.PI/2*Math.min(1,p/.25);}
 else if(m.kind==='top'){m.node.rotation.x=T.MathUtils.degToRad(20)*Math.max(0,(p-.25)/.75);if(m.handle)m.handle.rotation.z=Math.PI/2*Math.min(1,p/.25);}
 else if(m.kind==='tilt'){m.node.position.copy(m.rest);m.node.rotation.set(0,0,0);const opening=Math.max(0,(p-.25)/.75);if(m.handle)m.handle.rotation.z=(m.left?-1:1)*(m.mode==='tilt'?Math.PI:Math.PI/2)*Math.min(1,p/.25);if(m.mode==='tilt')m.node.rotation.x=T.MathUtils.degToRad(10)*opening;else {m.node.rotation.y=(m.left?-1:1)*T.MathUtils.degToRad(65)*opening;}}
 else if(m.kind==='fold'){const angle=T.MathUtils.degToRad(80)*p,w=m.pitch,offset=.045;let x=m.rest.x-(m.index+.5)*w,z=m.rest.z-offset;for(let i=0;i<m.index;i++){const theta=(i%2===0?1:-1)*angle,dz=i%2===0?2*offset:-2*offset;x+=w*Math.cos(theta)+dz*Math.sin(theta);z+=-w*Math.sin(theta)+dz*Math.cos(theta);}const theta=(m.index%2===0?1:-1)*angle,leftZ=m.index%2===0?-offset:offset;m.node.position.set(x+w*Math.cos(theta)/2-leftZ*Math.sin(theta),m.rest.y,z-w*Math.sin(theta)/2-leftZ*Math.cos(theta));m.node.rotation.y=theta;if(m.carriage)m.carriage.rotation.y=-theta;}
 else if(m.kind==='recovered'){m.node.rotation.y=(m.left?1:-1)*T.MathUtils.degToRad(70)*Math.max(0,(p-.25)/.75);m.handle.rotation.z=(m.left?-1:1)*Math.PI/2*Math.min(1,p/.25);}
}
export function disposeGroup(group){const geometries=new Set(),materials=new Set();group?.traverse(n=>{if(n.geometry)geometries.add(n.geometry);if(n.userData.originalMaterial)materials.add(n.userData.originalMaterial);if(n.material)(Array.isArray(n.material)?n.material:[n.material]).forEach(m=>materials.add(m));});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
