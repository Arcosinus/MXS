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
let carteBon = [];
let validTimer = true;

devoile.forEach(card => card.addEventListener('click', flipCard));
function flipCard() {
    this.classList.toggle('face');
    /*démarre le timer quand l'utilisateur touche une carte*/
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


function matchCarte() {
    //console.log(carteChoix.length);
    if (carteChoix[0].innerHTML === carteChoix[1].innerHTML) {
        console.log('cest bon');
        carteChoix[0].removeEventListener('click', flipCard);
        carteChoix[1].removeEventListener('click', flipCard);
        carteChoix = [];
        carteTourner = false;
        carteBon++;
        console.log(carteBon);
        if (carteBon === 6) {
            setTimeout( function(){ if (confirm('vous avez gagné !')){
                window.location.reload(false);
            } else {
            }}, 500)



        }
    } else {
        console.log('pas bon');
        carteChoix.forEach(card => card.classList.remove('face'));
        carteChoix = [];
        carteTourner = false;

    }
}
