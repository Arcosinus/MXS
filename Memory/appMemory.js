let selectCarte = document.querySelector('.double-face');

selectCarte.addEventListener('click', tournerCarte);
let carteRetourner = false;
let carte_selected;
function tournerCarte() {
    if(this == carte_selected){
        this.classList.toggle('face');
    }
    if(!carteRetourner){
        carteRetourner = true;
        carte_selected = this;
    }
}
