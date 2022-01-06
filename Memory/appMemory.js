const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');

const divTimer = document.createElement("div");
divTimer.className = "temps";
divTimer.style.cssText = 'text-align:center';
divTimer.innerHTML ='<h1>00 min:00 sec</h1>';
document.body.insertBefore(divTimer, document.body.secondChild);
const temps = document.querySelector('h1');

let minutes = 0o0;
let secondes = 0o0;
let secondZero = 0;
let carteTourner = false;
let currCard;
let carteChoix = [];
let carteBon = [];
let validTimer = true;

function timer(){
    secondes ++;
    if(secondes === 59){
        secondes = 0o0;
        minutes = minutes + 1;
    }
    if(secondes === 10){
        secondZero = '';
    }else{
        if(secondes === 0o0){
            secondZero = '';
        }
    }
    temps.innerText = minutes + ' min' + ':' + secondZero + secondes + ' sec';
}

/*Fonction qui mélange la position des cartes en ordre aléatoire*/
randomCarte();
function randomCarte() {
    allCarte.forEach(rand=>{
        const cartes = [...Array(allCarte.length).keys()];
        const randomFonct = Math.floor(Math.random() * allCarte.length);
        rand.style.order= cartes[randomFonct];
    })
}

devoile.forEach(card => card.addEventListener('click', flipCard));
/*Fonction qui retourne les cartes sélectionnées et les stocke dans un tableau*/
function flipCard() {
    this.classList.toggle('face');
    /*Démarre le timer quand l'utilisateur touche une carte*/
    if (validTimer === true){
        let counter = setInterval(function(){
            timer();
        },1000);
        validTimer = false;
    }
    carteTourner = true;
        currCard = this;
    if (carteChoix.length === 0) {
        carteChoix.push(this);
    } else if (carteChoix.length === 1) {
        carteChoix.push(this);
        setTimeout(matchCarte, 500);
    }
}
/*Fonction qui compare la première carte et la seconde carte sélectionnée qui sont stockée dans un tableau*/
function matchCarte() {
    /*Si la première carte est égale à la seconde carte, les deux cartes restent en tourné face, sinon elles restent cachées*/
    if (carteChoix[0].innerHTML === carteChoix[1].innerHTML) {
        carteChoix[0].removeEventListener('click', flipCard);
        carteChoix[1].removeEventListener('click', flipCard);
        carteChoix = [];
        carteTourner = false;
        carteBon++;
        /*Si toutes les cartes sont tournées face, la page indique la fin du jeu et la page se recharge*/
        if (carteBon === 6) {
        setTimeout( function(){
            if (confirm('vous avez gagné en ' + temps.innerHTML + ' !')){
            window.location.reload(false);
            } else {
            }
        }, 500)
        }
    } else {
        carteChoix.forEach(card => card.classList.remove('face'));
        carteChoix = [];
        carteTourner = false;
    }
}
