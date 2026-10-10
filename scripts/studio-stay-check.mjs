import fs from 'node:fs';
import {studioRecords} from '../src/data/designs/studioRegistry.js';
import {buildAssembly,applyMotion,disposeGroup} from '../src/components/design-diagrams/studioAssembly.js';
import {inspectFrictionStays} from '../src/components/design-diagrams/studioFrictionStay.js';

import {frictionStayCollisions as stayCollisions} from '../src/components/design-diagrams/studioFrictionStay.js';

if(process.argv[1]?.endsWith('studio-stay-check.mjs')){
  const results=[];
  for(const record of studioRecords.filter(r=>r.source==='procedural')){
    const a=buildAssembly(record),poses=[];
    for(const p of [0,.3,.6,1]){for(const m of a.motions){m.current=p>0?.25+.75*p:0;applyMotion(m);}poses.push({progress:p,stays:inspectFrictionStays(a),collisions:stayCollisions(a)});}
    const expected=a.motions.filter(m=>['casement','top'].includes(m.kind)).length;
    results.push({id:record.id,expected,poses});disposeGroup(a.root);
  }
  const failures=results.filter(r=>r.poses.some(p=>p.stays.length!==r.expected||p.collisions.length||p.stays.some(s=>s.attachmentError>1e-6||s.lengthError>1e-6||!s.sliderOnTrack||!s.valid)));
  const report={status:'PROVISIONAL',method:'Four requested endpoint poses; conservative OBB hardware vs profile/glass bounds; intentional stay joints excluded. Manufacturer dimensions unapproved.',results,failures};
  fs.writeFileSync('D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery/friction-stay-attachment.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({tested:results.length,stays:results.reduce((n,r)=>n+r.expected,0),failures:failures.map(r=>({id:r.id,poses:r.poses.filter(p=>p.collisions.length||p.stays.some(s=>!s.sliderOnTrack)),}))},null,2));if(failures.length)process.exitCode=1;
}
