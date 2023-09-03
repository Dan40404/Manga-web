import time

import requests
from bs4 import BeautifulSoup

NomManga = "OnePiece"
numberChapter = 206


def getImgSrcList(url):
    response = requests.get(url)
    html_content = response.content
    soup = BeautifulSoup(html_content, 'html.parser')
    image_list = soup.select('img[decoding="async"]')
    src_list = [img['src'] for img in image_list]
    return src_list



Chapters = [str(i) for i in range(1, numberChapter+1)]


UrlsImages = []

for chap in Chapters:
    print(chap)
    UrlsImages += getImgSrcList(f"https://onepiecescan-vf.fr/comic/scan-one-piece-{chap}-vf/")
    open(f"{NomManga}.py","w",encoding="utf-8").write(f"{NomManga}Urls = " + str(UrlsImages))