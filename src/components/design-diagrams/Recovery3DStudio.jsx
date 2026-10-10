import React,{useEffect,useRef,useState} from 'react';
import * as T from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
import {buildAssembly,applyMotion,disposeGroup} from './studioAssembly.js';
import {buildRoom,buildInstallation} from './studioRoom.js';
import {resolveStudioRecord,recoveredAsset} from '../../data/designs/studioRegistry.js';
import finishes from '../../data/designs/studioFinishes.json';
import './recovery-studio.css';
import {inspectAssembly,clearOpening} from './studioDiagnostics.js';
import {touchLockAsset,installTouchLocks} from './studioTouchLock.js';

let cachedModel;
let cachedHardware;
const loadHardware=()=>cachedHardware ||=new GLTFLoader().loadAsync(touchLockAsset).catch(e=>{cachedHardware=null;throw e;});
const loadRecovered=()=>cachedModel ||=new GLTFLoader().loadAsync(recoveredAsset).catch(e=>{cachedModel=null;throw e;});
const textures=new Map();
const textureSubscribers=new Set();
function texture(url){if(!textures.has(url)){const t=new T.TextureLoader().load(url,()=>textureSubscribers.forEach(fn=>fn()));t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.ClampToEdgeWrapping;textures.set(url,t);}return textures.get(url);}
const scenery={ooty:'ooty_tea_estate.jpg',city:'modern_city_skyline.jpg',garden:'green_garden.jpg',hills:'hills_nature.jpg'};
export default function Recovery3DStudio({product,windowType,design,finish,glass,state,viewMode,outdoorView,roomPreset}){
 const host=useRef(),r=useRef(),props=useRef();props.current={finish,glass,roomPreset,outdoorView};
 const [info,setInfo]=useState(null),[error,setError]=useState(''),[version,setVersion]=useState(0),[preset,setPreset]=useState('Interior'),[wallColor,setWallColor]=useState('#ded6c8'),[quality,setQuality]=useState('auto');
 const record=resolveStudioRecord(product,windowType,design);
 const effectiveRoom=roomPreset==='smart'||!roomPreset?(design?.concept?'ooty-bay':windowType.includes('door')?'luxury-living':windowType==='tilt-turn'?'city-bedroom':product==='aluminium'?'home-office':'hillside-living'):roomPreset;
 props.current.effectiveRoom=effectiveRoom;props.current.wallColor=wallColor;
 const mark=()=>{const ctx=r.current;if(!ctx)return;ctx.dirty=true;if(ctx.assembly){ctx.camera.position.y=T.MathUtils.clamp(ctx.camera.position.y,.25,Math.max(3.4,ctx.assembly.base+ctx.assembly.height+.45)-.15);ctx.camera.position.x=T.MathUtils.clamp(ctx.camera.position.x,-3.65,3.65);if(!ctx.exterior)ctx.camera.position.z=T.MathUtils.clamp(ctx.camera.position.z,.55,7.5);}};
 const setTarget=(m,p)=>{const linked=m.kind==='fold'?r.current.assembly.motions.filter(n=>n.kind==='fold'):[m];linked.forEach(n=>{if(!n.locked)n.target=p;});mark();};
 const switchMode=(m,mode)=>{if(m.current>.001){m.pendingMode=mode;m.pendingTarget=m.target;m.target=0;}else m.mode=mode;mark();};
 function applyAppearance(){const a=r.current?.assembly;if(!a)return;
  const selected=finishes.find(f=>f.id===props.current.finish?.id || f.id==='mahogany'&&props.current.finish?.id==='mahagony');
  const supported=a.record.product==='aluminium'||!!selected;
  a.root.traverse(n=>{if(n.userData.role==='profile'){
   const m=n.material;if(a.record.product==='aluminium'&&props.current.finish?.type!=='wood'){m.color.set(props.current.finish?.baseColor||'#50565b');m.metalness=.75;m.roughness=.32;m.map=null;m.needsUpdate=true;}
   else if(selected){if(selected.id==='white-base'&&n.userData.originalMaterial)n.material=n.userData.originalMaterial;else {n.material=a.mats.profile;const mat=n.material;mat.color.setRGB(...selected.linearColor);mat.roughness=selected.roughness;mat.metalness=selected.metalness;mat.map=selected.texture?texture(selected.texture):null;mat.needsUpdate=true;}}
  }});
  const id=props.current.glass?.id||'clear',gm=a.mats.glass;
  gm.color.set(id.includes('grey')?'#aab4bb':id.includes('bronze')?'#bda28b':'#f4fcff');gm.roughness=id.includes('frost')?.5:id.includes('reflect')?.08:.025;gm.transmission=id.includes('reflect')?.65:1;gm.metalness=0;gm.ior=1.5;gm.thickness=.005;gm.attenuationColor.copy(gm.color);gm.attenuationDistance=id==='clear'?100:.08;gm.needsUpdate=true;
  a.root.traverse(n=>{if(n.userData.role==='glass')n.material=gm;});
  r.current.finishSupported=supported&&!(a.record.product==='aluminium'&&props.current.finish?.type==='wood');r.current.glassSupported=!props.current.glass?.isDgu&&['clear','tinted-grey','tinted-bronze'].includes(id)||id.includes('frost')||id.includes('reflect');mark();
 }
 function camera(name){const ctx=r.current,a=ctx?.assembly;if(!a)return;const cy=a.base+a.height/2,dist=Math.max(a.width*1.5,a.height*1.9,2.8);ctx.controls.target.set(0,cy,0);let pos=[0,cy+.15,dist];
  if(name==='Interior')pos=[Math.min(a.width*.45,1.4),cy+.35,dist+1];if(name==='3D Angle')pos=[a.width*.8,cy+.35,dist];if(name==='Exterior')pos=[a.width*.3,cy+.15,-dist];if(name==='Hardware'){const handle=a.motions.find(m=>m.handle)?.handle;if(handle){const target=handle.getWorldPosition(new T.Vector3());ctx.controls.target.copy(target);pos=[target.x+.15,target.y+.08,target.z+.7];}else pos=[a.width*.2,cy,.8];}
  ctx.exterior=name==='Exterior';ctx.camera.position.set(...pos);ctx.controls.minAzimuthAngle=name==='Exterior'?Math.PI*.65:-Math.PI*.36;ctx.controls.maxAzimuthAngle=name==='Exterior'?Math.PI*1.35:Math.PI*.36;ctx.controls.minDistance=name==='Hardware'?.5:Math.max(a.width*.7,1.2);ctx.controls.maxDistance=7;ctx.controls.update();mark();setPreset(name);
 }
 useEffect(()=>{const scene=new T.Scene();scene.background=new T.Color('#c8d3d7');const renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  const environment=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer),environmentTarget=pmrem.fromScene(environment,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.6;environment.dispose();pmrem.dispose();
  const cam=new T.PerspectiveCamera(50,1,.05,100);const controls=new OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minPolarAngle=Math.PI*.32;controls.maxPolarAngle=Math.PI*.58;
  scene.add(new T.HemisphereLight(0xdcecff,0x8c765e,1.3));const sun=new T.DirectionalLight(0xfff1d5,2.3);sun.position.set(-3,6,-4);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-4;sun.shadow.camera.right=4;sun.shadow.camera.top=5;sun.shadow.camera.bottom=-2;scene.add(sun);scene.add(new T.AmbientLight(0xffffff,.25));
  host.current.append(renderer.domElement);const ctx={scene,renderer,camera:cam,controls,dirty:true,assembly:null,room:null,scenery:null,frames:0,last:performance.now(),renders:0,raycaster:new T.Raycaster(),pointer:new T.Vector2(),generation:0};r.current=ctx;textureSubscribers.add(mark);
  const resize=()=>{const el=host.current;const reduced=ctx.quality==='fast'||ctx.quality!=='detail'&&innerWidth<700;renderer.setPixelRatio(Math.min(devicePixelRatio,ctx.quality==='fast'?.75:reduced?1:1.5));renderer.shadowMap.enabled=!reduced;renderer.transmissionResolutionScale=reduced?.5:1;renderer.setSize(el.clientWidth,el.clientHeight);cam.aspect=el.clientWidth/el.clientHeight;cam.updateProjectionMatrix();mark();};ctx.resize=resize;const observer=new ResizeObserver(resize);observer.observe(host.current);controls.addEventListener('change',mark);
  function hit(e){const rect=renderer.domElement.getBoundingClientRect();ctx.pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);scene.updateMatrixWorld(true);ctx.raycaster.setFromCamera(ctx.pointer,cam);const hit=ctx.raycaster.intersectObjects([ctx.assembly?.root,ctx.room].filter(Boolean),true)[0];return ctx.assembly?.motions.find(m=>m.id===hit?.object.userData.motionId);}
  const down=e=>{const motion=hit(e);if(motion&&!motion.locked){const vertical=motion.kind==='top'||motion.kind==='tilt'&&motion.mode==='tilt',sign=motion.kind==='slide'?Math.sign(motion.travel):vertical?-1:motion.kind==='fold'||motion.left?-1:1;ctx.drag={motion,x:e.clientX,y:e.clientY,start:motion.target,vertical,sign:sign*(ctx.exterior?-1:1),moved:false};controls.enabled=false;renderer.domElement.setPointerCapture(e.pointerId);}};
  const move=e=>{if(ctx.drag){const d=ctx.drag,delta=d.vertical?e.clientY-d.y:e.clientX-d.x;d.moved ||=Math.abs(delta)>4;setTarget(d.motion,T.MathUtils.clamp(d.start+delta*d.sign/160,0,1));}};
  const up=()=>{if(ctx.drag){if(!ctx.drag.moved)setTarget(ctx.drag.motion,ctx.drag.motion.target>.5?0:1);ctx.drag=null;controls.enabled=true;setVersion(v=>v+1);mark();}};
  renderer.domElement.addEventListener('pointerdown',down,true);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);
  let raf;const frame=now=>{const dt=Math.min((now-ctx.last)/1000,.05);ctx.last=now;let moving=false;ctx.assembly?.motions.forEach(m=>{if(m.pendingMode&&m.current<.001){m.current=0;m.mode=m.pendingMode;m.pendingMode=null;m.target=m.pendingTarget;}if(Math.abs(m.current-m.target)>.0001){m.current=T.MathUtils.damp(m.current,m.target,9,dt);moving=true;}applyMotion(m);});if(ctx.wasMoving&&!moving)setVersion(v=>v+1);ctx.wasMoving=moving;controls.update();if(ctx.dirty||moving){renderer.render(scene,cam);ctx.dirty=false;ctx.renders++;}ctx.frames++;raf=requestAnimationFrame(frame);};raf=requestAnimationFrame(frame);
  if(import.meta.env.DEV)window.__FSQ_STUDIO__={snapshot:()=>{const a=ctx.assembly;const nodes=[],roles={};a?.root.traverse(n=>{nodes.push(n.name);if(n.userData.role)roles[n.userData.role]=(roles[n.userData.role]||0)+1;});return {id:a?.record.id,source:a?.source,panels:a?.panels,width:a?.width,height:a?.height,tracks:a?.tracks,hardwareSource:a?.hardwareSource,motions:a?.motions.map(m=>({id:m.id,kind:m.kind,target:m.target,current:m.current,track:m.track,travel:m.travel,mode:m.mode,locked:m.locked})),roles,nodes,renderer:renderer.info.render,memory:renderer.info.memory,renderCount:ctx.renders,roomMatrix:ctx.room?.matrix.toArray(),camera:cam.position.toArray(),finishSupported:ctx.finishSupported,glassSupported:ctx.glassSupported};},operate:(id,p,mode)=>{const m=ctx.assembly.motions.find(m=>m.id===id);if(m){m.mode=mode||m.mode;m.target=p;mark();}},camera,ctx};
  if(import.meta.env.DEV)Object.assign(window.__FSQ_STUDIO__,{inspect:()=>inspectAssembly(ctx.assembly),clearOpening:()=>clearOpening(ctx.assembly)});
  return ()=>{cancelAnimationFrame(raf);textureSubscribers.delete(mark);observer.disconnect();controls.dispose();disposeGroup(ctx.assembly?.root);disposeGroup(ctx.room);disposeGroup(ctx.scenery);environmentTarget.dispose();renderer.dispose();renderer.domElement.remove();r.current=null;if(import.meta.env.DEV)delete window.__FSQ_STUDIO__;};
 },[]);
 useEffect(()=>{const ctx=r.current;if(!ctx||!record){setError('This catalogue configuration is unavailable.');return;}const generation=++ctx.generation;setError('');setInfo(null);
  async function install(){let a=buildAssembly(record);
   if(a.tracks){try{const hardware=await loadHardware();installTouchLocks(a,hardware.scene);}catch(e){disposeGroup(a.root);setError(`Touch Lock reference could not load: ${e.message}`);return;}}
   if(record.source==='recovered-glb'){try{const loaded=await loadRecovered();disposeGroup(a.root);a.root=loaded.scene.clone(true);a.root.position.y=.85;a.width=1.2;a.height=1.2;a.base=.85;a.source=recoveredAsset;a.motions=[];
    a.root.traverse(n=>{if(n.isMesh){n.geometry=n.geometry.clone();n.material=n.material.clone();n.userData.originalMaterial=n.material;const mn=n.material.name;n.userData.role=/M_Recovery_(Frame|Sash|Bead)_UPVC_White/.test(mn)?'profile':mn==='M_Recovery_Glass_Clear'?'glass':mn==='M_Recovery_EPDM'?'gasket':'hardware';n.castShadow=n.userData.role!=='glass';n.receiveShadow=true;}});
    for(const side of ['Left','Right']){const node=a.root.getObjectByName(`Sash_${side}_Controller`),handle=a.root.getObjectByName(`Handle_${side}_Pivot`);if(!node||!handle)throw new Error('Recovered controller contract missing');const id=side.toLowerCase();node.traverse(n=>{n.userData.motionId=id;});a.motions.push({id,kind:'recovered',node,handle,left:side==='Left',target:0,current:0});}
    a.clips=loaded.animations.map(c=>c.name);
   }catch(e){disposeGroup(a.root);setError(`Recovered model could not load: ${e.message}`);return;}}
   if(generation!==ctx.generation){disposeGroup(a.root);return;}if(ctx.assembly){ctx.scene.remove(ctx.assembly.root);disposeGroup(ctx.assembly.root);}ctx.assembly=a;ctx.scene.add(a.root);
   const currentRoom=props.current.effectiveRoom,currentWall=props.current.wallColor;
   if(ctx.room&&ctx.roomPreset===currentRoom&&ctx.wallColor===currentWall){const old=ctx.room.getObjectByName('Installation_Architecture');ctx.room.remove(old);disposeGroup(old);ctx.room.add(buildInstallation(a,currentWall));}
   else {if(ctx.room){ctx.scene.remove(ctx.room);disposeGroup(ctx.room);}ctx.room=buildRoom(a,currentRoom,currentWall,mark);ctx.scene.add(ctx.room);ctx.roomPreset=currentRoom;ctx.wallColor=currentWall;}
   const nodes=[],materials=new Set();let meshCount=0;a.root.traverse(n=>{nodes.push(n.name);if(n.isMesh){meshCount++;(Array.isArray(n.material)?n.material:[n.material]).forEach(mat=>materials.add(mat.name||mat.uuid));}});const bounds=new T.Box3().setFromObject(a.root).getSize(new T.Vector3());
   applyAppearance();camera('Interior');setInfo({id:record.id,source:a.source,hardwareSource:a.hardwareSource,panels:a.panels.length,tracks:a.tracks,motions:a.motions.length,meshCount,materialCount:materials.size,nodes,dimensions:bounds.toArray()});setVersion(v=>v+1);
  }install();return ()=>{ctx.generation++;};
 },[record?.id]);
 useEffect(()=>{applyAppearance();},[finish,glass,info]);
 useEffect(()=>{const ctx=r.current;if(ctx){ctx.quality=quality;ctx.resize();}},[quality]);
 useEffect(()=>{const ctx=r.current;if(!ctx?.assembly)return;if(ctx.room){ctx.scene.remove(ctx.room);disposeGroup(ctx.room);}ctx.room=buildRoom(ctx.assembly,effectiveRoom,wallColor,mark);ctx.roomPreset=effectiveRoom;ctx.wallColor=wallColor;ctx.scene.add(ctx.room);mark();},[effectiveRoom,wallColor]);
 useEffect(()=>{const ctx=r.current;if(!ctx)return;const map=texture(`/textures/environments/${scenery[outdoorView]||scenery.ooty}`);if(!ctx.scenery){const mesh=new T.Mesh(new T.PlaneGeometry(150,84.375),new T.MeshBasicMaterial({map,side:T.DoubleSide}));mesh.position.set(0,3.5,-28);mesh.name='Stationary_Distant_Outdoor';ctx.scenery=mesh;ctx.scene.add(mesh);}else {ctx.scenery.material.map=map;ctx.scenery.material.needsUpdate=true;}mark();const timer=setTimeout(mark,1500);return()=>clearTimeout(timer);},[outdoorView]);
 useEffect(()=>{const a=r.current?.assembly;if(!a)return;for(const m of a.motions){const target=state==='open'||state==='turn'||state==='tilt'?1:state==='preview'?.25:0;if(target>0)m.locked=false;if(m.kind==='tilt'){switchMode(m,state==='tilt'?'tilt':'turn');if(m.pendingMode)m.pendingTarget=target;else m.target=target;}else m.target=target;}mark();setVersion(v=>v+1);},[state,info]);
 useEffect(()=>{if(info)camera(viewMode==='angle'?'3D Angle':'Elevation');},[viewMode]);
 const motions=r.current?.assembly?.motions||[];
 return <div className="recovery-studio" data-design-id={record?.id} data-load-status={error?'error':info?'ready':'loading'} style={{height:'100%',position:'relative',background:'#ece8df',borderRadius:14,overflow:'hidden'}}>
  <div ref={host} style={{height:'100%',width:'100%',touchAction:'none'}}/>
  <div style={{position:'absolute',top:8,left:8,right:8,display:'flex',gap:4,flexWrap:'wrap'}}>{['Interior','Exterior','Elevation','3D Angle','Hardware'].map(n=><button key={n} onClick={()=>camera(n)} aria-pressed={preset===n}>{n}</button>)}<label style={{background:'white',padding:3,fontSize:11}}>Quality <select aria-label="3D quality" value={quality} onChange={e=>setQuality(e.target.value)}><option value="auto">Auto</option><option value="fast">Fast</option><option value="detail">Detail</option></select></label><label style={{background:'white',padding:3,fontSize:11}}>Wall <input aria-label="Wall comparison colour" type="color" value={wallColor} onChange={e=>setWallColor(e.target.value)}/></label></div>
  <div style={{position:'absolute',bottom:8,left:8,right:8,background:'rgba(255,255,255,.94)',padding:8,borderRadius:8,fontSize:11}}>
   {error?<strong role="alert">{error}</strong>:!info?'Loading selected assembly…':<><div>{record.name} · {record.design.concept?'Concept — provisional':'Layout preview — specification validation pending'}</div><div style={{display:'flex',gap:8,flexWrap:'wrap',maxHeight:90,overflowY:'auto'}}>{motions.filter((m,i)=>m.kind!=='fold'||i===0).map(m=><label key={m.id}>{m.kind==='fold'?'Linked folding panels':m.id} <input aria-label={`${m.id} opening`} disabled={m.locked} type="range" min="0" max="1" step=".01" value={m.target} onChange={e=>{setTarget(m,+e.target.value);setVersion(v=>v+1);}}/>{m.kind==='tilt'&&<select aria-label={`${m.id} mechanism mode`} value={m.pendingMode||m.mode} onChange={e=>{switchMode(m,e.target.value);setVersion(v=>v+1);}}><option value="turn">Turn</option><option value="tilt">Tilt</option></select>}<button onClick={()=>{const linked=m.kind==='fold'?motions:[m],lock=!m.locked;linked.forEach(n=>{n.locked=lock;if(lock)n.target=0;});mark();setVersion(v=>v+1);}}>{m.locked?'Unlock':'Lock'}</button></label>)}</div>
   {!!info?.tracks&&<div>Travel controls: 0–100% of provisional permitted travel · current clear width ≈ {((clearOpening(r.current.assembly)||0)*1000).toFixed(0)} mm. Full travel does not mean a fully clear opening.</div>}
   {r.current?.finishSupported===false&&<div role="status">Selected finish unavailable in the recovered library; retaining current profile finish.</div>}{r.current?.glassSupported===false&&<div role="status">This glazing specification is unverified. Preview is a single-glass approximation.</div>}
   {import.meta.env.DEV&&<details><summary>Asset inspector · {record.status}</summary><div>{info.source} · {info.meshCount} meshes · {info.materialCount} materials · {info.dimensions.map(v=>v.toFixed(3)).join(' × ')} m</div><div>{info.panels} panels · {info.tracks} tracks · {info.motions} operable sections. {record.source==='recovered-glb'?'Source: FSQ_UPVC_Casement_2Open_Material_Validation_v03.blend':'Source: studioAssembly.js procedural generator'}</div><div>Manufacturer dimensions and hardware approval pending. {info.hardwareSource&&<>Hardware: {info.hardwareSource} (FSQ_TouchLock_Visual_Recovery_v02.blend; provisional). </>}Exported clips: {r.current?.assembly?.clips?.join(', ')||'Procedural motion'}</div><button onClick={()=>{const ctx=r.current;ctx.room.visible=!ctx.room.visible;ctx.scenery.visible=ctx.room.visible;mark();}}>Toggle isolated model</button><div style={{maxHeight:60,overflowY:'auto'}}>{info.nodes.join(', ')}</div></details>}</>}
  </div>
 </div>;
}




