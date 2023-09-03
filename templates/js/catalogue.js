// Sélectionner toutes les balises .manga-container
var mangaContainers = document.querySelectorAll('.manga-container');
var params = new URLSearchParams(window.location.search);
var nomManga = params.get('manga');


// Ajouter un écouteur d'événement pour chaque conteneur de manga
mangaContainers.forEach(function(container) {
    container.addEventListener('click', function() {
        var link = this.querySelector('a').getAttribute('href');
        window.location.href = link;
    });
});

function ajouterMangas(mangas) {
  var main = document.querySelector('main');

  Mangas.forEach(function(manga) {
    var nomManga = manga[0];
    var nomMangaUser = manga[2];
    var imageManga = manga[1];
    console.log(nomManga, imageManga);
    var container = document.createElement('div');
    var link = document.createElement('a');
    link.setAttribute('href', '/Scan/' + encodeURIComponent(nomManga));
    var image = document.createElement('img');
    var titre = document.createElement('h2');

    container.classList.add('manga-container');
    image.setAttribute('src', imageManga);
    image.setAttribute('alt', nomMangaUser);
    titre.textContent = nomManga;

    link.appendChild(image);
    container.appendChild(link);
    container.appendChild(titre);
    main.appendChild(container);
  });
}


ajouterMangas(Mangas)

// Sélectionner toutes les images de couverture
var images = document.querySelectorAll('.manga-container img');





