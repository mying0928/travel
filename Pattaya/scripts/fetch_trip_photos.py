from urllib.request import Request,urlopen
from html.parser import HTMLParser
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
class Meta(HTMLParser):
 def __init__(self): super().__init__(); self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta' and a.get('property',a.get('name')) in ('og:image','twitter:image'): self.images.append(a.get('content',''))
sources=[('khao-kheow-zoo.jpg','https://www.klook.com/en-US/activity/338-khao-kheow-open-zoo-pattaya/'),('thai-sky-adventures.jpg','https://thaiskyadventures.com/'),('koh-larn.jpg','https://www.pattayacoral.com/')]
log=[]
for name,url in sources:
 try:
  html=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read().decode('utf8','replace');m=Meta();m.feed(html)
  if not m.images: raise ValueError('No social preview image')
  image_url=m.images[0];req=Request(image_url,headers={'User-Agent':'Mozilla/5.0'})
  with urlopen(req,timeout=25) as r:
   data=r.read();mime=r.headers.get_content_type()
  if not mime.startswith('image/'): raise ValueError(mime)
  (root/'images'/name).write_bytes(data)
  log.append(dict(file=name,source=url,image=image_url));print(name,len(data),image_url)
 except Exception as e: print(name,'ERROR',str(e))
(root/'images'/'trip-photo-sources.json').write_text(json.dumps(log,ensure_ascii=False,indent=2))
