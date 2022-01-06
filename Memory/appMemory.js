const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');
const grille = document.querySelector('.grille');

document.body.style.userSelect = "none";

const divTimer = document.createElement("div");
divTimer.className = "temps";
divTimer.style.cssText = 'text-align:center';
divTimer.innerHTML ='<h1>00 min :00 sec</h1>';
document.body.insertBefore(divTimer, document.body.secondChild);
const temps = document.querySelector('h1');

const divStart = document.createElement("div");
divStart.className = "start";
divStart.style.cssText = 'flex:auto ';
document.body.insertBefore(divStart, document.body.firstChild);

const btnStart = document.createElement("button");
btnStart.className = "buttonStart";
btnStart.innerHTML = `Start`;
divStart.appendChild(btnStart);

const btnRestart = document.createElement("button");
btnRestart.className = "buttonRestart";
btnRestart.style.cssText = 'display:none';
btnRestart.innerHTML = `Restart`;
divStart.appendChild(btnRestart);

let clickStart = document.querySelector('.buttonStart');
let clickRestart = document.querySelector('.buttonRestart');
let divClique = document.querySelector('.start');

window.onload = function() {
    setTimeout( function(){
        grille.style.display = 'none';
        temps.style.display = 'none';
        clickStart.addEventListener('click', startClique);
        clickRestart.addEventListener('click', restartClique);
    }, 250)
}

function startClique(){
    grille.style.display = '';
    temps.style.display = '';
    clickRestart.style.display = '';
    clickStart.style.display = 'none';
}

function restartClique(){
    grille.style.display = '';
    temps.style.display = '';
    clickStart.style.display = '';
    clickRestart.style.display = 'none';
    window.location.reload(false);
}

let minutes = 0;
let secondes = 0;
let carteTourner = false;
let currCard;
let carteChoix = [];
let carteBon = [];
let validTimer = true;

function timer(){
    secondes ++;
    if(secondes === 60){
        minutes++;
        secondes = 0;
    }
    if(secondes < 10){
        temps.innerHTML= '0' + minutes + ' min ' + ':0' + secondes + ' sec';
    }else{
        temps.innerHTML = '0' + minutes + ' min ' + ':' + secondes + ' sec';
    }
}

/*Fonction qui mélange la position des cartes en ordre aléatoire*/
randomCarte();
function randomCarte() {
    allCarte.forEach(randomCarte=>{
        const cartes = [...Array(allCarte.length).keys()];
        const randomFonct = Math.floor(Math.random() * allCarte.length);
        randomCarte.style.order= cartes[randomFonct];
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
            }
        }, 500)
        }

    } else {
        carteChoix.forEach(card => card.classList.remove('face'));
        carteChoix = [];
        carteTourner = false;
    }
}
