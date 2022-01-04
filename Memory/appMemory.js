let selectCarte = document.querySelectorAll('.double-face');

// let carte_Attribut = document.querySelector('.double-face').getAttribute('data-attr');
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
    }
}



