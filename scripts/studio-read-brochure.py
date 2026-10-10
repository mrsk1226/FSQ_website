import sys,os,json,re
qa=r'D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery'
sys.path.insert(0,os.path.join(qa,'python-deps'))
import pymupdf
doc=pymupdf.open(r'D:\FSQ_website\public\assets\upvc-windows-brochure.pdf')
texts=[];hits=[]
for i,page in enumerate(doc):
    text=page.get_text();texts.append(f'\nPAGE {i+1}\n{text}')
    if re.search(r'profile|cross.section|touch.?lock|fold|glaz|60\s*mm|track',text,re.I):hits.append({'page':i+1,'text':text})
with open(os.path.join(qa,'brochure-text.txt'),'w',encoding='utf8') as f:f.write('\n'.join(texts))
with open(os.path.join(qa,'brochure-technical-hits.json'),'w',encoding='utf8') as f:json.dump({'file':doc.name,'pages':len(doc),'hits':hits},f,indent=2)
for page in [9,10,11,14,16,17,22]:doc[page-1].get_pixmap(matrix=pymupdf.Matrix(1,1)).save(os.path.join(qa,f"brochure-page-{page}.png"))
print(json.dumps({'technical_page_9_size':list(doc[8].rect),'vector_paths':len(doc[8].get_drawings()),'image_count':len(doc[8].get_images())}))
print(json.dumps({'pages':len(doc),'hit_pages':[h['page'] for h in hits],'text_chars':sum(map(len,texts))}))
