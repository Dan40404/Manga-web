let NextImg = urls[currentIndex +1];
let PreviousImg = urls[currentIndex -1];

// Sélectionner l'élément de sélection de page
var pageSelect = document.querySelector('#page-select');

// Parcourir la liste d'URL et ajouter une option de page pour chaque URL
for (var i = 0; i < urls.length; i++) {
    var option = document.createElement('option');
    option.value = i + 1;
    option.text = 'Page ' + (i + 1);
    pageSelect.add(option);

    if (i == currentIndex-1) {
        pageSelect.selectedIndex = i;
    }

}

// Ajouter un écouteur d'événement au changement de la sélection de page
pageSelect.addEventListener('change', function() {
    // Récupérer l'index de la page sélectionnée
    var selectedIndex = pageSelect.selectedIndex;
    var selectedValue = pageSelect.options[selectedIndex].value;
    var selectedPage = parseInt(selectedValue);

    // Changer l'image affichée
    currentIndex = selectedPage - 1;
    changeImage();
    scrollToTop(event);
    EditIndex(NameOfManga);

});


$(document).ready(function() {
    changeImage();
    setBrightness(Brightness);

    $('#brightness').on('input', function() {
        const CurrentBrightness = $(this).val();
        setBrightness(CurrentBrightness);
    });

    $(document).on('keydown', function(event) {
        if (event.key === " ") {
            event.preventDefault();
            changeImage();
            scrollToTop(event);
            EditIndex(NameOfManga);
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            changeImage(-1);
            scrollToTop(event);
        }
    });
});


function changeImage(direction = 1) {

    currentIndex = currentIndex + direction;

    if (currentIndex >= urls.length) {
        currentIndex = urls.length - 1;
    }

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    if (direction == 1) {
        document.getElementById('image').src = NextImg;
    }
    else {
        document.getElementById('image').src = PreviousImg;
    }

    NextImg = urls[currentIndex +1];
    PreviousImg = urls[currentIndex -1];

    changeBackgroundBlur();
    pageSelect.selectedIndex = currentIndex;

    console.log(1);

}

function setBrightness(CurrentBrightness) {
     $('#image').css('filter', `brightness(${CurrentBrightness}%)`);
     EditAttribute("brightness", CurrentBrightness.toString());
}

function scrollToTop(event) {
    event.preventDefault();
    const topElement = document.getElementsByName('top')[0];
    topElement.scrollIntoView({ behavior: 'auto' });
}


function EditIndex(MangaName) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/EditIndex", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({parametre: currentIndex, Manga:MangaName}));
}


function EditAttribute(Name, Value) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/EditAttribute", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({AttributeName:Name, AttributeValue:Value }));
}




function changeBackgroundBlur() {
const imageUrl = document.getElementById('image').src;

}

