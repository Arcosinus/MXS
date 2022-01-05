const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');
const grille = document.querySelector('.grille');


let divTimer = document.createElement("div");
divTimer.className = "tmp";
divTimer.style.cssText = 'text-align:center';
divTimer.innerHTML ='<h1>0:00</h1>';
document.body.insertBefore(divTimer, document.body.secondChild);

const tmp = document.querySelector('h1');

let min = 0o0;
let seconds = 0o0;
let splice = 0;
let counter = setInterval(function(){
    timer();
},1000);
function timer(){
    seconds++;
    if(seconds===59){
        seconds = 0o0;
        min = min + 1;
    }
    if(seconds===10){
        splice = '';
    }else{
        if(seconds=== 0o0){
            splice = '';
        }
    }
    tmp.innerText = min + ':' + splice + seconds;
}

let carteTourner = false;
let currCard;
let prevCard;
let carteChoix = [];

devoile.forEach(card => card.addEventListener('click', flipCard));
function flipCard() {
    this.classList.toggle('face');
    if (!carteTourner) {
        carteTourner = true;
        currCard = this;
        carteChoix.push(this);
        if (carteChoix.length === 2) {
            setTimeout(() => {
                if (carteChoix[0].innerHTML === carteChoix[1].innerHTML) {
                    carteChoix[0].classList.add('match');
                    carteChoix[1].classList.add('match');
                    carteChoix = [];
                } else {
                    carteChoix[0].classList.remove('face');
                    carteChoix[1].classList.remove('face');
                    carteChoix = [];
                }
                carteTourner = false;
            }, 1000);
        }
    } else {
        prevCard = this;
        carteTourner = false;
        setTimeout(() => {
            prevCard.classList.remove('face');
        }, 1000);
    }
}
