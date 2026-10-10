import fs from 'node:fs';
import {studioRecords} from '../src/data/designs/studioRegistry.js';
import {buildAssembly,applyMotion,disposeGroup} from '../src/components/design-diagrams/studioAssembly.js';
import {inspectAssembly} from '../src/components/design-diagrams/studioDiagnostics.js';
const results=[];
for(const record of studioRecords.filter(r=>r.source==='procedural')){const a=buildAssembly(record),failures=[];for(const mode of record.type==='tilt-turn'?['turn','tilt']:['turn'])for(let i=0;i<=20;i++){a.motions.forEach(m=>{m.current=i/20;m.mode=mode;applyMotion(m);});const audit=inspectAssembly(a);if(audit.collisions.length||audit.foldJoints.some(j=>j.gap>1e-6))failures.push({mode,progress:i/20,collisions:audit.collisions,foldJoints:audit.foldJoints});}results.push({id:record.id,failures});disposeGroup(a.root);}
const qa='D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';fs.writeFileSync(`${qa}/geometry-21-samples.json`,JSON.stringify({results,method:'21 pose samples of rectangular profile-bar OBBs. Does not validate hardware, flexible gasket compression, or approved manufacturer dimensions.'},null,2));
console.log(JSON.stringify({tested:results.length,failures:results.filter(r=>r.failures.length)},null,2));if(results.some(r=>r.failures.length))process.exitCode=1;
