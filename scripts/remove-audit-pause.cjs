const fs = require('fs');
const file = 'scripts/studio-catalogue-audit.cjs';
let s = fs.readFileSync(file, 'utf8');
const target = "if(process.argv[capture+1].includes(',')){console.log('PAUSED_FOR_IMAGE_REVIEW');await new Promise(resolve=>{process.stdin.resume();process.stdin.once('data',()=>{process.stdin.pause();resolve();});});}";
if (!s.includes(target)) {
  console.error('Target not found!');
  process.exit(1);
}
s = s.replace(target, '');
fs.writeFileSync(file, s, 'utf8');
console.log('PAUSE_REMOVED_SUCCESSFULLY');
