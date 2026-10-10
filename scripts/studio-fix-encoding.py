from pathlib import Path
for name in ['Recovery3DStudio.jsx','studioTouchLock.js']:
 p=Path('src/components/design-diagrams')/name
 text=p.read_text(encoding='utf-8-sig')
 if 'â' in text or 'Â' in text:
  text=text.encode('cp1252').decode('utf8')
 p.write_text(text,encoding='utf8')
