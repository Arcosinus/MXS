const allCarte = document.querySelectorAll('.carte');
const devoile = document.querySelectorAll('.double-face');

let carteTourner = false;
let currCard;
let prevCard;
let carteChoix = [];
let carteBon = [];

devoile.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    this.classList.toggle('face');
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







