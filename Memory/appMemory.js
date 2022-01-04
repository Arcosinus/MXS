let selectCarte = document.querySelectorAll('.double-face');

let carte_Attribut = document.querySelector('.double-face').getAttribute('data-attr');
for (let cartes of selectCarte){
    cartes.addEventListener('click', tournerCarte);
    let carteRetourner = false;
    let carte_selected1;
    let carte_selected2;
    function tournerCarte() {
        if(this == carte_selected1){
            this.classList.toggle('face');
        }
        if(!carteRetourner){
            carteRetourner = true;
            carte_selected1 = this;
        }
        carteRetourner = false;
        carte_selected2 = this;
        if(carte_selected1.getAttribute('data-attr') == carte_selected2.getAttribute('data-attr')){
            carteRetourner =true;
        }
        else{
            this.classList.toggle('arriere');
        }
    }
}

//La carte se retourne au clic et dévoile au joueur le contenu de la carte. Celle-ci reste retournée.
//Le choix de l’utilisateur est enregistré dans une variable.
//Lorsque le joueur clic sur une seconde carte, celle-ci est comparée avec la précédente.
//Si la seconde carte est la même que la précédente, elles restent retournées.
//Si la seconde carte est différente de la première. Les deux cartes se retournent face caché.



