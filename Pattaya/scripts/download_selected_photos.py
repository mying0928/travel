from urllib.request import Request,urlopen
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]/'images'
rows=[('khao-kheow-zoo.jpg','https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/images/gallery/g20170711144248_g.jpg','https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html'),('thai-sky-adventures.jpg','https://thaiskyadventures.com/wp-content/uploads/img1.jpg','https://thaiskyadventures.com/'),('koh-larn.jpg','https://www.pattayacoral.com/assets/images/home-slider/coral-islandb03.jpg','https://www.pattayacoral.com/')]
for name,url,source in rows:
 with urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25) as r: data=r.read()
 (root/name).write_bytes(data);print(name,len(data))
(root/'trip-photo-sources.json').write_text(json.dumps([dict(file=n,image=u,source=s) for n,u,s in rows],indent=2))
