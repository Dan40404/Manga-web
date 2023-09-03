import requests
from bs4 import BeautifulSoup

def isUrlLeading404(url):
    return FastIsUrlLeading404(url)

def FastIsUrlLeading404(url):
    return requests.head(url).status_code == 404

nombreChap = 206
url = "https://www.scan-vf.net/uploads/manga/kimetsu-no-yaiba/chapters/chapitre-1/02.jpg"

for i in range(1,nombreChap+1):
    c = 1
    ScanExist = True
    while ScanExist or c == 1:

        url = f"https://www.scan-vf.net/uploads/manga/kimetsu-no-yaiba/chapters/chapitre-{i}/{format(c,'02d')}.jpg"
        url2 = f"https://www.scan-vf.net/uploads/manga/kimetsu-no-yaiba/chapters/chapitre-{i}/{format(c,'02d')}.png"

        ScanExist1 = FastIsUrlLeading404(url)
        ScanExist2 = FastIsUrlLeading404(url2)
        ScanExist = ScanExist1 or ScanExist2

        if ScanExist:
            if ScanExist1:
                print(url)
            if ScanExist2:
                print(url2)

        c+=1

