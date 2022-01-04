let game = true;
let grille = document.querySelector("div");
let table = document.createElement("table");
for (let i = 0; i < 16; i++) {
    let ligne = document.createElement("tr");
    for (let j = 0; j < 16; j++) {
        let colonne = document.createElement("td");
        colonne.className = "void";
        colonne.id = "L"+i+"C"+j;
        if (i < 3 && j < 12){
            colonne.className = "alien";
        }
        if (i == 15 && j == 8){
            colonne.className = "tireur";
        }
        ligne.appendChild(colonne);
    }
    table.appendChild(ligne);
}
grille.appendChild(table);
let Droite = true;
let Gauche = 0;
for (let h = 0; h < 3; h++){
    setTimeout(function(){
    if (Droite){
        Gauche++;
    }
    if (!Droite){
        Gauche--;
    }
    for (let i = 15; i >= 0; i--) {
        if (Droite){
            for (let j = 15; j >= 0; j--) {
                let cellule = document.getElementById("L"+i+"C"+j);
                if (cellule.className == "alien"){
                    celluleSuivante = document.getElementById("L"+i+"C"+(j+1));
                    if (j+1 != 16) {
                        if (celluleSuivante.className == "tireur") {
                            game = false;
                        }
                        celluleSuivante.className = "alien";
                        cellule.className = "void";
                    }
                }
            }
        } else {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j);
                if (cellule.className == "alien"){
                    let celluleSuivante = document.getElementById("L"+i+"C"+(j-1));
                    if (j-1 != -1) {
                        if (celluleSuivante.className == "tireur") {
                            game = false;
                        }
                        celluleSuivante.className = "alien";
                        cellule.className = "void";
                    }
                }
            }
        }
    }
    if (Gauche == 4 && Droite){
        for (let k = 14; k >= 0; k--) {
            for (let l = 15; l >= 0; l--) {
                let cellule = document.getElementById("L" + k + "C" + l);
                let celluleSuivante = document.getElementById("L" + (k+1) + "C" + l);
                if (cellule.className == "alien") {
                    celluleSuivante.className = "alien";
                    cellule.className = "void";
                }
            }
        }
        Droite = false;
    }
    if (Gauche == 0 && !Droite) {
        Droite = true;
        for (let k = 14; k >= 0; k--) {
            for (let l = 15; l >= 0; l--) {
                let cellule = document.getElementById("L" + k + "C" + l);
                let celluleSuivante = document.getElementById("L" + (k + 1) + "C" + l);
                if (cellule.className == "alien") {
                    celluleSuivante.className = "alien";
                    cellule.className = "void";
                }
            }
        }
    }}, 1000)
}

