let selectCarte = document.querySelectorAll('.double-face');
let selectAllcarte = document.querySelectorAll('.carte');

for (let cartes of selectCarte){
    cartes.addEventListener('click', tournerCarte);
    let carteRetourner = false;
    let carte_selected1;
    let carte_selected2;
    let carteChoix = [];
    let secondClick = false;
    function tournerCarte() {
        if(!carteRetourner){
            console.log('carte 1');
            this.classList.toggle('face');
            carteRetourner = true;
            carte_selected1 = this;
            carteChoix.push(carte_selected1);
        }
        if(!secondClick){
            console.log('secondclick');
            carteRetourner = false;
            carte_selected2 = this;
            if(carte_selected2 !== carte_selected1){
                this.classList.toggle('arriere');
            }
        }
    }
}
//La carte se retourne au clic et dévoile au joueur le contenu de la carte. Celle-ci reste retournée.
//Le choix de l’utilisateur est enregistré dans une variable.
//Lorsque le joueur clic sur une seconde carte, celle-ci est comparée avec la précédente.
//Si la seconde carte est la même que la précédente, elles restent retournées.
//Si la seconde carte est différente de la première. Les deux cartes se retournent face caché.



