// Sélectionner tous les liens d'onglet
var tabLinks = document.querySelectorAll('#sidebar a');

// Sélectionner l'élément de notification de succès
var successNotification = document.querySelector('.success-notification');

// Pour chaque lien d'onglet, ajouter un écouteur d'événement au clic
tabLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Empêcher la navigation par défaut
        event.preventDefault();

        // Désélectionner tous les liens d'onglet
        tabLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        // Sélectionner le lien d'onglet cliqué
        this.classList.add('active');

        // Masquer tous les contenus d'onglet
        var tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(function(content) {
            content.classList.remove('active');
        });

        // Sélectionner le contenu d'onglet correspondant
        var target = this.getAttribute('href');
        var tabContent = document.querySelector(target);
        tabContent.classList.add('active');
    });
});


function DisplaySuccessNotification() {
    successNotification.style.display = 'block';

    // Masquer la notification de succès après 3 secondes
    setTimeout(function() {
        successNotification.style.display = 'none';
    }, 3000);
}


function EditUsername(Name,Password) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/EditUsername", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({NewUsername:Name, Password:Password}));
}


function EditPassword(OldPassword,NewPassword) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/EditPassword", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({OldPassword:OldPassword, NewPassword:NewPassword}));
}


// Sélectionner le formulaire de modification d'informations
var formNom = document.querySelector('#modifier form');


// Ajouter un écouteur d'événement pour la soumission du formulaire
formNom.addEventListener('submit', function(event) {
    // Empêcher la soumission par défaut du formulaire
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    var nom = document.querySelector('#nom').value;
    var password = document.querySelector('#password').value;

    // Envoyer les données du formulaire
    EditUsername(nom,password);

    DisplaySuccessNotification();

   });


// Sélectionner le formulaire de modification d'informations
var formPassword = document.querySelector('#modifierPassword form');


// Ajouter un écouteur d'événement pour la soumission du formulaire
formPassword.addEventListener('submit', function(event) {
    // Empêcher la soumission par défaut du formulaire
    event.preventDefault();

    // Récupérer les valeurs des champs de formulaire
    var oldPassword = document.querySelector('#oldPassword').value;
    var newPassword = document.querySelector('#newPassword').value;

    // Envoyer les données du formulaire
    EditPassword(oldPassword,newPassword);

    DisplaySuccessNotification();

   });



