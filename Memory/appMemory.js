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






/*if (!carteTourner) {
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
   }*/