from Users import Users
import secrets
from urlsInfo import UrlsInfo


def isUserRegistered(username,password):
    for id in Users:
        if Users[id]["name"] == username and Users[id]["password"] == password:
            return True


def getIndex(username,website):
    for id in Users:
        if Users[id]["name"] == username:
            return Users[id]["indexes"][website]


def getAttribute(username,AttributeName):
    for id in Users:
        if Users[id]["name"] == username:
            return Users[id][AttributeName]


def setIndex(username,website,index):
    for id in Users:
        if Users[id]["name"] == username:
            Users[id]["indexes"][website] = index
            SaveUsers()
            return True
    return False


def setAttribute(username,AttributeName,AttributeValue):

    print(username,AttributeName,AttributeValue)

    for id in Users:
        if Users[id]["name"] == username:
            Users[id][AttributeName] = AttributeValue
            SaveUsers()
            return True
    return False


def SaveUsers():
    open("Users.py","w",encoding="utf-8").write("Users = " + str(Users))


def getSecretKey():
    key =  open("secretKey.txt","r",encoding="utf-8").read()
    if key == "":
        key = secrets.token_hex(16)
        open("secretKey.txt","w",encoding="utf-8").write(str(key))
    return key


def resetSecretKey():
    open("secretKey.txt","w",encoding="utf-8").write("")


def getListOfManga():
    ListOfManga = []
    for Manga in UrlsInfo:
        ListOfManga.append([Manga,UrlsInfo[Manga]["coverImage"], UrlsInfo[Manga]["NameInUsers"] ])
    return ListOfManga

def getUrlsInfo(MangaName):
    return UrlsInfo[MangaName]