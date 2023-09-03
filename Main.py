
from flask import Flask, render_template, request, redirect, url_for, session
import json

import urlsInfo
from Fonctions import *
from Parameters import *
from urlsInfo import *



app = Flask(__name__)
app.secret_key = getSecretKey()



# Page de connexion
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Vérifier si les informations de connexion sont valides
        if isUserRegistered(request.form['username'], request.form['password']):
            session['logged_in'] = True

            session["username"] = request.form['username']

            return redirect(url_for('Home'))
        else:
            return render_template('login.html', error=True,css=cssLogin)
    return render_template('login.html',css=cssLogin)


@app.route('/Home')
def Home():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    else:
        return render_template('Home.html',
                               css=cssScanHome,
                               js=JsNoHeader)


@app.route('/Acccount')
def Account():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    else:
        return render_template('account.html',
                               css=cssAccount,
                               js=JsAccount,
                               nom=session["username"])



@app.route('/Scan/<nom_manga>')
def Scan(nom_manga):
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    else:


        NomMangaUser = getUrlsInfo(nom_manga)["NameInUsers"]

        return render_template('scan.html', urls=json.dumps(getUrlsInfo(nom_manga)["Scan"]),
                               css=cssScanHome,
                               index=getIndex(session["username"],NomMangaUser),
                               js=JsScan+JsNoHeader,
                               NameOfManga=NomMangaUser,
                               Brightness=getAttribute(session["username"],"brightness"),)

@app.route('/Catalogue')
def Catalogue():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    else:
        return render_template('catalogue.html',
                               css=cssCatalogue,
                               js=JsCatalogue,
                               mangas=getListOfManga())


@app.route('/EditIndex', methods=['POST'])
def EditIndex():
    index = request.json.get('parametre')
    Manga = request.json.get('Manga')
    # Code pour modifier le fichier Python ici

    setIndex(session["username"],Manga,index)
    return "ok"


@app.route('/EditAttribute', methods=['POST'])
def EditAttribute():
    AttributeName = request.json.get('AttributeName')
    AttributeValue = request.json.get('AttributeValue')

    assert AttributeName in ["brightness"], "AttributeName invalide, l'attribut {" + AttributeName + "} n'est pas un attribut valide"


    # Code pour modifier le fichier Python ici
    setAttribute(session["username"],AttributeName,AttributeValue)
    return "ok"


@app.route('/EditUsername', methods=['POST'])
def EditUsername():
    NewUsername = request.json.get('NewUsername')
    OldUsername = session["username"]
    Password = request.json.get('Password')

    assert isUserRegistered(OldUsername,Password), "Mot de passe incorrect"

    # Code pour modifier le fichier Python ici
    setAttribute(OldUsername,"name",NewUsername)
    session["username"] = NewUsername


@app.route('/EditPassword', methods=['POST'])
def EditPassword():
    NewPassword = request.json.get('NewPassword')
    OldPassword = request.json.get('OldPassword')
    Username = session["username"]

    assert isUserRegistered(Username,OldPassword), "Username ou mot de passe incorrect"

    # Code pour modifier le fichier Python ici
    setAttribute(Username,"password",NewPassword)



# Page pour se déconnecter
@app.route('/logout')
def logout():
    session['logged_in'] = False
    return redirect(url_for('login'))



if __name__ == '__main__':
    app.run(port=8000,debug=True)
    resetSecretKey()
