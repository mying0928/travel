from urllib.request import Request,urlopen
from html.parser import HTMLParser
class Images(HTMLParser):
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='img':
   u=a.get('data-src') or a.get('src','')
   if u and not u.startswith('data:'): print(a.get('alt','')[:55], u)
for u in ['https://thaiskyadventures.com/','https://www.pattayacoral.com/','https://khaokheowzoothailand.org/site/khaokheow.zoothailand.org/en/index.html']:
 print('SOURCE',u)
 try: Images().feed(urlopen(Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read().decode('utf8','replace'))
 except Exception as e: print(e)
