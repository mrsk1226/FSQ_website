const fs=require('node:fs');
const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/catalogue-audit';
fs.mkdirSync(qa,{recursive:true});
const capture=process.argv.indexOf('--capture'),only=process.argv.indexOf('--only');
const selected=only>=0?process.argv[only+1].split(','):null;
setTimeout(()=>{console.error('Catalogue audit timeout');process.exit(1);},900000).unref();
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1100}});page.setDefaultTimeout(30000);const errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=0&room=photo-living');
 const records=await page.evaluate(async()=>{
  // Expected layouts come directly from the same catalogue JSON consumed by the 2D diagram.
  // No assembly generator or generated panels are used to create this oracle.
  const {windowSystems}=await import('/src/data/designs/windowSystems.js');
  const {upvcDoorsCasementDesigns}=await import('/src/data/designs/upvcDoorsCasement.js');
  const {upvcDoorsSlidingDesigns}=await import('/src/data/designs/upvcDoorsSliding.js');
  const {upvcDoorsFoldDesigns}=await import('/src/data/designs/upvcDoorsFold.js');
  const {studioSystems}=await import('/src/data/designs/studioRegistry.js');
  const systems=[...windowSystems,{id:'upvc-door-casement',material:'upvc',mechanismType:'door-casement',designs:upvcDoorsCasementDesigns},{id:'upvc-door-sliding',material:'upvc',mechanismType:'door-sliding',designs:upvcDoorsSlidingDesigns},{id:'upvc-door-fold',material:'upvc',mechanismType:'door-fold',designs:upvcDoorsFoldDesigns},studioSystems.find(s=>s.id==='upvc-bay-concepts')];
  return systems.flatMap(s=>s.designs.map((design,index)=>({id:design.id||`${s.id}:${index}`,systemId:s.id,product:s.material,type:s.mechanismType,index,name:design.name,design})));
 });
 if(records.length!==81||records.filter(r=>!r.design.concept).length!==78)throw Error('Unexpected catalogue inventory');
 const results=[];
 for(const r of records.filter(r=>capture>=0?process.argv[capture+1].split(',').includes(r.id):!selected||selected.includes(r.id))){
  const before=errors.length;let result={id:r.id,systemId:r.systemId,name:r.name,expected:r.design,status:r.product==='aluminium'?'BLOCKED_BY_UNVERIFIED_SPEC':'PARTIAL_3D'};
  try{
   await page.goto(`http://127.0.0.1:5173/#/products/window-studio?product=${r.product}&type=${r.type}&design=${encodeURIComponent(r.design.id||r.index)}&room=photo-living&glass=clear&finish=${r.product==='aluminium'?'alu-slate':'white-base'}`);
   await page.waitForFunction(id=>{const s=window.__FSQ_STUDIO__?.snapshot();return s?.id===id&&s.photo?.ready&&s.photo.room==='photo-living';},r.id);
   await page.locator('[data-load-status="ready"]').waitFor();
   await page.evaluate(async()=>{const {applyMotion}=await import('/src/components/design-diagrams/studioAssembly.js');const ctx=window.__FSQ_STUDIO__.ctx;ctx.assembly.motions.forEach(m=>{m.current=m.target=0;m.mode='turn';m.locked=false;applyMotion(m);});ctx.controls.target.set(0,0,0);ctx.camera.position.set(0,0,6);ctx.controls.update();ctx.dirty=true;});
   if(capture>=0){await page.locator('.recovery-studio').scrollIntoViewIfNeeded();await page.waitForTimeout(600);const path=`${qa}/${r.id.replace(':','-')}-closed.png`;await page.locator('.recovery-studio').screenshot({path,timeout:60000});console.log(JSON.stringify({screenshot:path,id:r.id}));if(process.argv[capture+1].includes(',')){console.log('PAUSED_FOR_IMAGE_REVIEW');await new Promise(resolve=>{process.stdin.resume();process.stdin.once('data',()=>{process.stdin.pause();resolve();});});}continue;}
   result.geometry=await page.evaluate(async r=>{
    const T=await import('/node_modules/.vite/deps/three.js');
    const {OBB}=await import('/node_modules/three/examples/jsm/math/OBB.js');
    const {applyMotion}=await import('/src/components/design-diagrams/studioAssembly.js');
    const {inspectFrictionStays,frictionStayCollisions}=await import('/src/components/design-diagrams/studioFrictionStay.js');
    const api=window.__FSQ_STUDIO__,a=api.ctx.assembly,d=r.design,rows=[['bottom',d.bottomPanes],['main',d.panes],['top',d.topPanes]].filter(([,p])=>p?.length);
    const expected=d.concept?d.panes.map((p,i)=>({...p,id:`bay_${i}`})):rows.flatMap(([row,ps])=>ps.map((p,i)=>({...p,id:`${row}_${i}`,row,index:i,count:ps.length})));
    const tracks=r.type.includes('sliding')?(/3-Track/i.test(d.name)?3:2):0;
    const meshList=[];a.root.traverse(n=>{if(n.isMesh)meshList.push(n);});a.root.updateMatrixWorld(true);
    const check={panelCount:a.panels.length===expected.length,layout:a.panels.every((p,i)=>p.type===expected[i]?.type&&p.hinge===(expected[i]?.hinge||null)),glassCount:meshList.filter(n=>n.userData.role==='glass').length===expected.length,trackCount:a.tracks===tracks,operableCount:a.motions.length===expected.filter(p=>p.type!=='fixed').length,dimensions:Math.abs(a.width/ a.height-parseInt(d.width)/parseInt(d.height))<.005};
    const panelDetails=expected.map((p,i)=>{
     const m=a.motions.find(m=>m.id===p.id)||(a.source!=='procedural'?a.motions[i]:null);
     const kind=p.type==='fixed'?null:p.type==='slide'?'slide':p.type==='tilt'?'tilt':p.type==='fold'?'fold':p.hinge==='top'?'top':'casement';
     const nodes=meshList.filter(n=>n.name.startsWith(p.id+'_')||(a.source!=='procedural'&&n.name.includes(i===0?'Left':'Right')));
     const glasses=nodes.filter(n=>n.userData.role==='glass');
     const hinges=nodes.filter(n=>/Hinge/i.test(n.name));let center=null;if(glasses[0]){const g=glasses[0];g.geometry.computeBoundingBox();center=g.localToWorld(g.geometry.boundingBox.getCenter(new T.Vector3())).applyMatrix4(new T.Matrix4().copy(a.root.matrixWorld).invert());if(a.source!=='procedural')center.y=center.y*a.root.scale.y+a.base;}const rowIndex=rows.findIndex(([key])=>key===p.row);const placementPass=d.concept||!!center&&Math.abs((center.x+a.width/2-a.profile)/(a.width-2*a.profile)-(p.index+.5)/p.count)<.04&&Math.abs((center.y-a.base-a.profile)/(a.height-2*a.profile)-(rowIndex+.5)/rows.length)<.04;
     return {id:p.id,type:p.type,glassCenter:center?.toArray(),placementPass,track:m?.track,travel:m?.travel,directionPass:p.type!=='slide'||Math.sign(m?.travel)===(p.direction==='right'?1:-1),expectedHinge:p.hinge||null,actualHinge:a.panels[i]?.hinge,actualKind:m?.kind||null,kindPass:kind===null?!m:(m?.kind===kind||kind==='casement'&&m?.kind==='recovered'),hingePass:!m||kind==='slide'||kind==='fold'||kind==='top'||m.left===(p.hinge==='left'||p.subType==='tilt-left'),glassNodes:glasses.map(n=>n.name),handle:!!m?.handle||nodes.some(n=>/Handle|TouchLock/.test(n.name)),hinges:hinges.map(n=>n.name),stay:!!m?.stay,stayRequired:['casement','top'].includes(kind)};
    });
    check.panelPlacement=panelDetails.every(p=>p.placementPass);check.slideDirection=panelDetails.every(p=>p.directionPass);
    check.hinges=panelDetails.every(p=>p.kindPass&&p.hingePass&&(p.type==='fixed'||p.type==='slide'||p.hinges.length>0));
    check.hardware=panelDetails.every(p=>p.type==='fixed'||p.handle);
    check.stays=panelDetails.every(p=>p.stay===p.stayRequired);
    check.aluminium=r.product!=='aluminium'||Math.abs(a.profile-.042)<1e-6&&Math.abs(a.mats.profile.metalness-.75)<1e-6&&!a.mats.profile.map;
    check.rails=!tracks||Array.from({length:tracks},(_,i)=>meshList.some(n=>n.name===`Track_${i}_Sill_Rail`)&&meshList.some(n=>n.name===`Track_${i}_Head_Rail`)).every(Boolean);
    // Check rendered triangle edges for a genuine diagonal bevel, not seam labels.
    function tapered(n){let reference=a.root;if(d.concept){reference=n;while(reference.parent&&reference.parent!==a.root)reference=reference.parent;}const matrix=new T.Matrix4().copy(reference.matrixWorld).invert().multiply(n.matrixWorld);const p=n.geometry.attributes.position,ix=n.geometry.index;for(let j=0;j<(ix?.count||p.count);j+=3){const tri=[0,1,2].map(k=>new T.Vector3().fromBufferAttribute(p,ix?ix.getX(j+k):j+k).applyMatrix4(matrix));const normal=tri[1].clone().sub(tri[0]).cross(tri[2].clone().sub(tri[0])).normalize();if(Math.abs(normal.z)<1e-4&&Math.abs(normal.x)>.4&&Math.abs(Math.abs(normal.x)-Math.abs(normal.y))<1e-4)return true;for(let k=0;k<3;k++){const delta=tri[k].clone().sub(tri[(k+1)%3]);if(Math.abs(delta.z)<1e-5&&Math.abs(delta.x)>.0004&&Math.abs(Math.abs(delta.x)-Math.abs(delta.y))<1e-4)return true;}}return false;}
    const mitred=meshList.filter(n=>n.userData.role==='profile'&&!/Bead|Mortise_Back|Seal/i.test(n.name)&&tapered(n)).map(n=>n.name);
    const corners=expected.map((p,i)=>({id:p.id,members:mitred.filter(n=>a.source==='procedural'?n.startsWith(p.id+'_'):n.includes(`Sash_${i===0?'Left':'Right'}_Profile`))}));
    check.mitres=corners.every(c=>c.members.length>=4)&&mitred.filter(n=>/OuterFrame|BayFrame|^Frame_/.test(n)).length>=(d.concept?4*d.panes.length:4);
    const mullions=meshList.filter(n=>/Mullion/.test(n.name)).map(n=>({name:n.name,position:n.position.toArray()}));
    const transoms=meshList.filter(n=>/^Transom_/.test(n.name)).map(n=>({name:n.name,position:n.position.toArray()}));
    const expectedSeparators=d.concept?[]:rows.flatMap(([row,ps])=>ps.slice(1).map((p,i)=>({row,index:i+1,x:(i+1)/ps.length,structural:!tracks&&!((/french/i.test(d.name)||r.type==='door-fold')&&p.type!=='fixed'&&ps[i].type!=='fixed')})));
    check.mullions=d.concept||a.source!=='procedural'?true:expectedSeparators.filter(s=>s.structural).every(s=>{const n=mullions.find(m=>m.name===`${s.row}_Mullion_${s.index}`);return n&&Math.abs((n.position[0]+a.width/2-a.profile)/(a.width-2*a.profile)-s.x)<.01;})&&mullions.length===expectedSeparators.filter(s=>s.structural).length;
    check.transoms=d.concept?true:transoms.length===rows.length-1&&transoms.every((n,i)=>Math.abs((n.position[1]-a.base-a.profile)/(a.height-2*a.profile)-(i+1)/rows.length)<.01);
    const fixed=meshList.filter(n=>['profile','glass'].includes(n.userData.role)&&!n.userData.motionId),closedFixed=fixed.map(n=>n.matrixWorld.toArray());
    const bars=meshList.filter(n=>n.userData.role==='profile'&&!/Bead/.test(n.name));
    function collisions(){a.root.updateMatrixWorld(true);const bs=bars.map(n=>{n.geometry.computeBoundingBox();const o=new OBB().fromBox3(n.geometry.boundingBox);o.halfSize.addScalar(-.0003);o.applyMatrix4(n.matrixWorld);return {n,o};});const hits=[];for(let i=0;i<bs.length;i++)for(let j=i+1;j<bs.length;j++){const x=bs[i],y=bs[j],xm=x.n.userData.motionId,ym=y.n.userData.motionId;if(xm===ym||!xm&&!ym)continue;if(x.o.intersectsOBB(y.o,1e-8))hits.push([x.n.name,y.n.name]);}return hits;}
    const closedCollisions=collisions(),sweep=[];const modes=r.type==='tilt-turn'?['turn','tilt']:['turn'];
    for(const mode of modes)for(let i=0;i<=20;i++){const progress=i/20;a.motions.forEach(m=>{m.mode=mode;m.current=m.target=progress;applyMotion(m);});const hits=collisions(),stays=inspectFrictionStays(a),stayHits=frictionStayCollisions(a,api.ctx.room);const bad=stays.filter(s=>s.attachmentError>1e-6||s.lengthError>1e-6||s.mountError>1e-6||!s.sliderOnTrack||!s.valid);const moved=fixed.some((n,j)=>JSON.stringify(n.matrixWorld.toArray())!==JSON.stringify(closedFixed[j]));const joints=[];const folds=a.motions.filter(m=>m.kind==='fold');for(let j=0;j<folds.length-1;j++){const l=new T.Vector3(folds[j].pitch/2,0,j%2===0?.045:-.045).applyMatrix4(folds[j].node.matrixWorld),rr=new T.Vector3(-folds[j+1].pitch/2,0,(j+1)%2===0?-.045:.045).applyMatrix4(folds[j+1].node.matrixWorld);joints.push(l.distanceTo(rr));}sweep.push({mode,progress,collisions:hits,stayCollisions:stayHits,attachmentFailures:bad,fixedMoved:moved,foldJointGaps:joints});}
    check.closedCollision=closedCollisions.length===0;check.sweepCollision=sweep.every(p=>!p.collisions.length&&!p.stayCollisions.length&&!p.attachmentFailures.length);check.fixedStationary=sweep.every(p=>!p.fixedMoved);check.foldJoints=sweep.every(p=>p.foldJointGaps.every(v=>v<1e-6));
    const door=r.type.startsWith('door')?{height:a.height,thresholdNodes:meshList.filter(n=>/OuterFrame_Sill/.test(n.name)).map(n=>n.name),leafCount:expected.length,foldSequence:a.motions.filter(m=>m.kind==='fold').map(m=>({index:m.index,angle:m.node.rotation.y,guide:!!m.carriage})),guides:meshList.filter(n=>/Fold_Guide|Fold_Rail/.test(n.name)).map(n=>n.name)}:null;
    check.door=!door||door.height>=1.8&&door.thresholdNodes.length>0&&(r.type!=='door-fold'||door.guides.length>=4&&door.foldSequence.length===d.panes.length);
    a.motions.forEach(m=>{m.current=m.target=0;m.mode='turn';applyMotion(m);});api.ctx.dirty=true;
    return {checks:check,panels:panelDetails,tracks:a.tracks,dimensions:[a.width,a.height],profileWidth:a.profile,profileMaterial:{metalness:a.mats.profile.metalness,roughness:a.mats.profile.roughness,map:!!a.mats.profile.map},mitredMembers:mitred,corners,mitreDiagnostics:a.source==='procedural'?[]:meshList.filter(n=>/Sash_Left_Profile_Right|Sash_Right_Profile_Left/.test(n.name)).map(n=>{const m=new T.Matrix4().copy(a.root.matrixWorld).invert().multiply(n.matrixWorld),p=n.geometry.attributes.position;return {name:n.name,points:[...new Set(Array.from({length:p.count},(_,i)=>new T.Vector3().fromBufferAttribute(p,i).applyMatrix4(m).toArray().map(v=>+v.toFixed(5)).join(',')))]};}),mullions,transoms,expectedSeparators,closedCollisions,sweep,door,source:a.source,photo:api.snapshot().photo,collisionMethod:'Conservative OBBs of actual loaded profile meshes including recovered GLB; same-sash/internal and fixed-fixed contacts excluded, 0.3mm tolerance. 21 controller poses/mode. Stay OBBs vs profile/glass and photo planes; no solid masonry in photo mode.'};
   },r);
   // Actual UI finish and glass switches on every record; compare rendered material identities/values.
   await page.getByRole('button',{name:r.product==='aluminium'?/^Slate/:/^Original White/}).first().click();await page.locator('#fsq-studio-glass').selectOption('clear');
   await page.waitForTimeout(100);
   await page.evaluate(()=>{const ctx=window.__FSQ_STUDIO__.ctx,a=ctx.assembly;const stamp=role=>{const rows=[];a.root.traverse(n=>{if(n.isMesh&&(role==='profile'?n.userData.role==='profile':n.userData.role!=='profile'))rows.push([n.name,...(Array.isArray(n.material)?n.material:[n.material]).map(m=>[m.uuid,m.color?.toArray(),m.map?.uuid,m.roughness,m.transmission])]);});return JSON.stringify(rows);};window.__CAT_AUDIT__={ctx,root:a.root,renderer:ctx.renderer,roomMap:ctx.photo.plane.material.uniforms.roomImage?.value||ctx.photo.texture,stamp,before:stamp('other'),profile:stamp('profile')};});
   await page.getByRole('button',{name:r.product==='aluminium'?/^Noir/:/^Mahogany/}).first().click();await page.waitForTimeout(100);
   const finish=await page.evaluate(()=>{const b=window.__CAT_AUDIT__,ctx=window.__FSQ_STUDIO__.ctx;const out={isolated:b.before===b.stamp('other'),profileChanged:b.profile!==b.stamp('profile'),sameRenderer:b.renderer===ctx.renderer,sameAssembly:b.root===ctx.assembly.root,noWoodgrain:ctx.assembly.record.product!=='aluminium'||!ctx.assembly.mats.profile.map};b.profile=b.stamp('profile');return out;});
   await page.locator('#fsq-studio-glass').selectOption('tinted-grey');await page.waitForTimeout(100);
   result.appearance={...finish,...await page.evaluate(()=>{const b=window.__CAT_AUDIT__,ctx=window.__FSQ_STUDIO__.ctx;return {glassChanged:b.before!==b.stamp('other'),profileStable:b.profile===b.stamp('profile'),roomStable:b.roomMap===ctx.photo.texture};})};
   result.geometry.checks.finishIsolation=Object.values(result.appearance).every(Boolean);
   result.consoleErrors=errors.slice(before);result.pass=Object.values(result.geometry.checks).every(Boolean)&&!result.consoleErrors.length;
  }catch(e){result.error=e.message;result.consoleErrors=errors.slice(before);result.pass=false;}
  results.push(result);const stem=selected?'targeted':'catalogue';fs.writeFileSync(`${qa}/${stem}.json`,JSON.stringify({inventory:records,renderer:'Chromium SwiftShader software GPU',results},null,2));
  fs.writeFileSync(`${qa}/${stem}.md`,'# Individual catalogue audit\n\nNo manufacturer certification. Aluminium sections: generic slim profiles, BLOCKED_BY_UNVERIFIED_SPEC until Uniframe extrusion drawings. Other assemblies remain PARTIAL_3D: provisional dimensions/hardware and photo perimeter defects.\n\n| ID | Name | Panels | Tracks | Checks | Status | Failures |\n|---|---|---:|---:|---|---|---|\n'+results.map(x=>`| ${x.id} | ${x.name} | ${x.geometry?.panels.length??'-'} | ${x.geometry?.tracks??'-'} | ${x.pass?'PASS':'FAIL'} | ${x.status} | ${x.error||Object.entries(x.geometry?.checks||{}).filter(([,v])=>!v).map(([k])=>k).join(', ')||x.consoleErrors?.join('; ')||'none'} |`).join('\n')+'\n');
  console.log(JSON.stringify({id:r.id,pass:result.pass,failures:result.error||Object.entries(result.geometry?.checks||{}).filter(([,v])=>!v).map(([k])=>k)}));
 }
 if(capture<0){console.log(JSON.stringify({audited:results.length,passed:results.filter(r=>r.pass).length,failed:results.filter(r=>!r.pass).length}));if(results.some(r=>!r.pass))process.exitCode=1;}
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
