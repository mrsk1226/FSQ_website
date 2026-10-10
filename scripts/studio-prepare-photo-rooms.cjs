const fs=require('fs');const crypto=require('crypto');
const {chromium}=require('C:/Users/FSQ-MIS/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const output='public/textures/rooms-real';
setTimeout(()=>{console.error('Photo preparation timeout');process.exit(1);},90000).unref();
(async()=>{const browser=await chromium.launch({headless:true});try{
 const page=await browser.newPage();
 const rooms=[];fs.mkdirSync(output,{recursive:true});
 for(const [id,name] of [['bedroom','Photo Bedroom'],['living','Photo Living Room'],['garden-sitting','Photo Garden Sitting Room']]){
  const source=`design-references/real-rooms/${id}.png`,bytes=fs.readFileSync(source);
  const result=await page.evaluate(async url=>{
   const img=new Image();img.src=url;await img.decode();const c=document.createElement('canvas');const factor=Math.min(1,2560/img.width);c.width=Math.round(img.width*factor);c.height=Math.round(img.height*factor);const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,c.width,c.height);
   const {data}=ctx.getImageData(0,0,c.width,c.height);let x0=c.width,y0=c.height,x1=0,y1=0,count=0;
   for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const i=(y*c.width+x)*4,r=data[i],g=data[i+1],b=data[i+2];if(g>180&&r<90&&b<90&&g-Math.max(r,b)>140){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);count++;}}
   if(!count)throw Error('No usable chroma opening');const w=x1-x0+1,h=y1-y0+1,fill=count/(w*h);if(fill<.96||w<c.width*.1||h<c.height*.1)throw Error('Opening is not one solid rectangular region');
   // Average adjacent plaster strips, not white reveals or green aperture.
   const samples=[];for(const xStart of [x0-55,x1+35])for(let y=y0+30;y<y1-30;y+=4)for(let x=xStart;x<xStart+16;x+=4){if(x>=0&&x<c.width){const i=(y*c.width+x)*4;samples.push([data[i],data[i+1],data[i+2]]);}}
   const wallColor=[0,1,2].map(k=>Math.round(samples.reduce((s,p)=>s+p[k],0)/samples.length));
   return {width:c.width,height:c.height,opening:{x:x0/c.width,y:y0/c.height,w:w/c.width,h:h/c.height},pixelRect:[x0,y0,w,h],greenFill:fill,wallColor,data:c.toDataURL('image/webp',.85).split(',')[1]};
  },`data:image/png;base64,${bytes.toString('base64')}`);
  const {data,...metadata}=result;const encoded=Buffer.from(data,'base64');fs.writeFileSync(`${output}/${id}.webp`,encoded);
  rooms.push({id:`photo-${id}`,name,image:`/textures/rooms-real/${id}.webp`,...metadata,status:'PROVISIONAL',sourceSha256:crypto.createHash('sha256').update(bytes).digest('hex'),optimizedBytes:encoded.length});
 }
 fs.writeFileSync(`${output}/rooms.json`,JSON.stringify({version:1,key:'green opening only; RGB G>180 R/B<90 G-max(R,B)>140',rooms},null,2));console.log(JSON.stringify(rooms,null,2));
 // Read the existing live application before editing the renderer.
 await page.goto('http://127.0.0.1:5173/#/products/window-studio?product=upvc&type=casement&design=4');await page.locator('[data-load-status="ready"]').waitFor({timeout:30000});console.log('Existing live Studio:',await page.evaluate(()=>window.__FSQ_STUDIO__.snapshot()));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
