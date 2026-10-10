import {windowSystems} from './windowSystems.js';
import {upvcDoorsCasementDesigns} from './upvcDoorsCasement.js';
import {upvcDoorsSlidingDesigns} from './upvcDoorsSliding.js';
import {upvcDoorsFoldDesigns} from './upvcDoorsFold.js';

// Existing records and numeric/name deep links are retained; these keys are Studio identities.
export const studioSystems=[...windowSystems,
 {id:'upvc-door-casement',name:'Casement Doors',material:'upvc',mechanismType:'door-casement',designs:upvcDoorsCasementDesigns},
 {id:'upvc-door-sliding',name:'Sliding Doors',material:'upvc',mechanismType:'door-sliding',designs:upvcDoorsSlidingDesigns},
 {id:'upvc-door-fold',name:'Slide & Fold Doors',material:'upvc',mechanismType:'door-fold',designs:upvcDoorsFoldDesigns},
 {id:'upvc-bay-concepts',name:'Bay / Bow Concepts — provisional',material:'upvc',mechanismType:'bay-concepts',designs:[
  {name:'3-Panel Angled Bay',width:'240px',height:'145px',concept:true,angles:[-35,0,35],panes:Array.from({length:3},()=>({type:'fixed'}))},
  {name:'5-Panel Bay',width:'320px',height:'145px',concept:true,angles:[-40,-20,0,20,40],panes:Array.from({length:5},()=>({type:'fixed'}))},
  {name:'Curved / Bow Style',width:'340px',height:'145px',concept:true,angles:[-45,-30,-15,0,15,30,45],panes:Array.from({length:7},()=>({type:'fixed'}))}
 ]}
];
export const studioRecords=studioSystems.flatMap(system=>system.designs.map((design,index)=>({
 id:design.id || `${system.id}:${index}`,systemId:system.id,index,name:design.name,product:system.material,type:system.mechanismType,design,
 status:'PARTIAL_3D',source:system.id==='upvc-casement'&&index===4?'recovered-glb':'procedural',
 notes:'Catalogue layout implemented. Dimensions, profile sections, hardware and safe travel require approved manufacturer drawings and individual collision/visual validation.'
})));
export function resolveStudioRecord(product,type,design){
 return studioRecords.find(r=>r.product===product&&r.type===type&&r.design===design) ||
 studioRecords.find(r=>r.product===product&&r.type===type&&r.name===design?.name) || null;
}
export const recoveredAsset='/models/FSQ_UPVC_Casement_2Open_Material_v04_Web_r01.glb';
