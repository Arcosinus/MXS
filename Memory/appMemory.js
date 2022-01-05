const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');

let carteTourner = false;
let currCard;
let prevCard;
let carteChoix = [];

devoile.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    this.classList.toggle('face');
    if (!carteTourner) {
        console.log('first')
        carteTourner = true;
        currCard = this;
        carteChoix.push(currCard);
        console.log('carte 1 ' + carteChoix);
        return;
    } else {
    console.log('second')
    carteTourner = false;
    prevCard = this;
    carteChoix.push(prevCard);
    console.log('carte 2 ' + carteChoix);
    return;
    }
    carteTourner = false;
    if(carteChoix.length === 2){
        if(carteChoix[0].dataset.attr === carteChoix[1].dataset.attr){
            console.log('vrai');
        }else {
            console.log('faux');
        }
    }
}

//La carte se retourne au clic et dévoile au joueur le contenu de la carte. Celle-ci reste retournée.
//Le choix de l’utilisateur est enregistré dans une variable.
//Lorsque le joueur clic sur une seconde carte, celle-ci est comparée avec la précédente.
//Si la seconde carte est la même que la précédente, elles restent retournées.
//Si la seconde carte est différente de la première. Les deux cartes se retournent face caché.




