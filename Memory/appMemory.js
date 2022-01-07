const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');
const grille = document.querySelector('.grille');
const faceAvant = document.querySelectorAll('.face');
const faceArriere = document.querySelectorAll('.arriere');

document.body.style.userSelect = "none";

const divTimer = document.createElement("div");
divTimer.className = "bottom";
divTimer.style.cssText = 'background-color: rgba(255,255,255,0.25);border-radius:10px;margin:7px;margin-top:27px;color: white;height:43px;text-align: center;';
divTimer.innerHTML =`<span class=moves>Moves :0</span>
<span class=lvlPlayer>Your level: NOICE</span>
<span class=bonusTmp>Bonus Temps: 0 secondes</span>
<span class=times>00 min :00 sec</span>`;
document.body.insertBefore(divTimer, document.body.secondChild);
const temps = document.querySelector('.times');
const moves = document.querySelector('.moves');
const bonusTemps = document.querySelector('.bonusTmp');
const playerLvl = document.querySelector('.lvlPlayer');
moves.style.cssText ='position: absolute;left: 20px;font-size: 16px;top:8.5px;';
playerLvl.style.cssText ='position: absolute;left: 20px;font-size: 12px;top:25px;';
temps.style.cssText = 'font-size: 22px;padding-top:10px;display:block;';
bonusTemps.style.cssText = 'position: absolute;right: 20px;font-size: 16px;top: 8.5px;';

const divTop2 = document.createElement("div");
divTop2.className = "top2";
divTop2.style.cssText = 'border-radius:10px;margin:7px;margin-top:0px;margin-bottom:-87px;color: white;height:56px;text-align: center;';
document.body.insertBefore(divTop2, document.body.firstChild);

const btnStart = document.createElement("button");
btnStart.className = "buttonStart";
btnStart.innerHTML = `START GAME`;
btnStart.style.cssText = 'background-color:rgba(255,255,255,0.2);border:none;border-radius:7px;font-size:15px;cursor:pointer;padding:7px ';
divTop2.appendChild(btnStart);

const btnRestart = document.createElement("button");
btnRestart.className = "buttonRestart";
btnRestart.innerHTML = `RESTART GAME`;
btnRestart.style.cssText = 'background-color:rgba(255,255,255,0.2);border:none;border-radius:7px;font-size:15px;display:none;cursor:pointer;padding:7px';
divTop2.appendChild(btnRestart);

const divTop = document.createElement("div");
divTop.className = "top";
divTop.style.cssText = 'background-color: rgba(255,255,255,0.25);border-radius:10px;margin:7px;margin-top:0px;color: white;height:42px;text-align: center;'
document.body.insertBefore(divTop, divTop2);

const divTitre = document.createElement("span");
divTitre.className = "titre";
divTitre.innerHTML = `MEMORY GAME`;
divTitre.style.cssText = 'font-size:17px;padding-top:10px;display:block;';
divTop.appendChild(divTitre);
const titre = document.querySelector('.titre');
titre.style.fontSize = "x-large";
titre.style.fontFamily = "Impact,sans-serif";

const clickStart = document.querySelector('.buttonStart');
const clickRestart = document.querySelector('.buttonRestart');

devoile.forEach(double=>{
    double.style.cssText= 'background-color:rgba(255,255,255,0.2);border:none;border-radius:13px;';
})
faceAvant.forEach(avant=>{
    avant.style.cssText= 'background-color:rgba(255,255,255,0.2);border:none;border-radius:13px;';
})
faceArriere.forEach(arriere=>{
    arriere.style.cssText= 'background-color:rgba(255,255,255,0.2);border:none;border-radius:13px;';
})
grille.style.cssText = 'background-color:rgba(255,255,255,0.2);border:none;border-radius:13px;';

window.onload = function() {
    setTimeout( function(){
        grille.style.display = 'none';
        temps.style.display = 'none';
        clickStart.addEventListener('click', startClique);
        clickRestart.addEventListener('click', restartClique);
    }, 250)
}
function startClique(){
    grille.style.display = 'grid';
    temps.style.display = 'grid';
    clickRestart.style.display = '';
    clickStart.style.display = 'none';
}
function restartClique(){
    grille.style.display = 'grid';
    temps.style.display = 'grid';
    clickRestart.style.display = 'none';
    window.location.reload(true);
}

let bonusSecondes = 0;
let moveCount = 0;
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
// card.addEventListener('mouseenter',  ()=>console.log('enter') ,card.style.cssText = "transform:rotate(7deg)");
// card.addEventListener('mouseleave',  ()=>console.log('leave') ,card.style.cssText = "transform:scale(0.90)");
/*Fonction qui retourne les cartes sélectionnées et les stocke dans un tableau*/
function flipCard() {
    moves.innerHTML = 'Moves :'+ moveCount ;
    grille.style.cssText= 'background-color:rgba(255,255,255,0.2);';
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
        moveCount++;
        console.log(moveCount)
    }
    if(moveCount === 12){
        playerLvl.innerHTML = 'Your level: MOYEN';
    }
    if(moveCount === 24){
        playerLvl.innerHTML = 'Your level: BAD...';
    }
    moves.innerHTML = 'Moves :'+ moveCount ;
    bonusTemps.innerHTML = 'Bonus Temps: '+bonusSecondes+' secondes';
}
/*Fonction qui compare la première carte et la seconde carte sélectionnée qui sont stockée dans un tableau*/
function matchCarte() {
    /*Si la première carte est égale à la seconde carte, les deux cartes restent en tourné face, sinon elles restent cachées*/
    if (carteChoix[0].innerHTML === carteChoix[1].innerHTML) {
        carteChoix[0].removeEventListener('click', flipCard);
        carteChoix[1].removeEventListener('click', flipCard);
        carteChoix = [];
        carteTourner = true;
        carteBon++;
        secondes--;
        bonusSecondes++;
        /*Si toutes les cartes sont tournées face, la page indique la fin du jeu et la page se recharge*/
        if (carteBon === 6) {
        grille.style.cssText= 'background-color: rgba(8, 226, 55, 0.2);';
        setTimeout( function(){
            if (confirm(playerLvl.innerHTML +'\nvous avez gagné en ' + temps.innerHTML + ' !\nTotal Move : '+moves.innerHTML+'\n'+bonusTemps.innerHTML)=== true){
                window.location.reload();
            }
        }, 500)
        }
    } else {
        grille.style.cssText= 'background-color: rgba(230, 21, 14, 0.2);';
        carteChoix.forEach(card => card.classList.remove('face'));
        carteChoix = [];
        carteTourner = false;
    }
    if(secondes < 10){
        temps.innerHTML= '0' + minutes + ' min ' + ':0' + secondes + ' sec';
    }else{
        temps.innerHTML = '0' + minutes + ' min ' + ':' + secondes + ' sec';
    }
}
