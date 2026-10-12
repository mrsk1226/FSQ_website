import sys, os, json, re
qa = r'D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery'
sys.path.insert(0, os.path.join(qa, 'python-deps'))
import pymupdf

pdf_path = r'D:\FSQ_website\design-references\uniframe\UNIFRAME Brochure.pdf'
out_dir = r'D:\FSQ_website\qa_inspect\uniframe'
os.makedirs(out_dir, exist_ok=True)

doc = pymupdf.open(pdf_path)
print(f"Total pages: {len(doc)}")

hits = []
for i, page in enumerate(doc):
    text = page.get_text()
    page_num = i + 1
    # Check for keywords
    matched = []
    for kw in ['graf', 'robus', 'livio', 'swatch', 'colour', 'color', 'shade', 'mystic', 'citrine', 'slate', 'dimension', 'specification', 'sliding', 'casement', 'fold']:
        if re.search(r'\b' + kw, text, re.I):
            matched.append(kw)
    if matched:
        hits.append({'page': page_num, 'keywords': matched, 'preview': text[:200].replace('\n', ' ')})
        # If it matches system names or colours specifically, render it
        if any(k in text.lower() for k in ['graf 26', 'graf 32', 'graf 45', 'robus 40', 'livio', 'mystic dark', 'royal chestnut', 'citrine', 'rustic charm']):
            img_path = os.path.join(out_dir, f"uniframe_page_{page_num:02d}.png")
            page.get_pixmap(dpi=150).save(img_path)
            print(f"Rendered Page {page_num} -> {img_path}")
            # Also print the full text of this page
            print(f"--- PAGE {page_num} TEXT ---")
            print(text)
            print("---------------------------")

# Also save full text summary
with open(os.path.join(out_dir, 'uniframe-toc-hits.json'), 'w') as f:
    json.dump(hits, f, indent=2)

print("Done scanning brochure.")
