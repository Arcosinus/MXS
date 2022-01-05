function preparation(){
    /*Reset du score servant de zone de texte et emplacement pour dissimuler la musique*/
    let score = document.querySelector("h3");
    score.innerHTML = 'Score : <embed src="fond.mp3" hidden=true autostart=true loop=true mastersound>'
    let game = true;
    /*Reset de la grille*/
    let grille = document.querySelector("div");
    grille.innerHTML = '';
    /*Création et ajout d'un tableau contenant les ennemis et le joueur*/
    let table = document.createElement("table");
    for (let i = 0; i < 16; i++) {
        let ligne = document.createElement("tr");
        for (let j = 0; j < 16; j++) {
            let colonne = document.createElement("td");
            colonne.className = "void";
            colonne.id = "L" + i + "C" + j;
            if (i < 3 && j < 12) {
                colonne.className = "alien";
            }
            if (i == 15 && j == 8) {
                colonne.className = "tireur";
            }
            ligne.appendChild(colonne);
        }
        table.appendChild(ligne);
    }
    grille.appendChild(table);
    let Droite = true;
    let Gauche = 0;
    /*Lancement d'un tour de jeu*/
    play(game,Droite,Gauche)
}
function play(game,Droite,Gauche) {
    setTimeout(function(){
        /*Disparition des explosions après un tour*/
        if (tir == false){
            tir = true;
        }
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L" + i + "C" + j);
                if (cellule.className == "boom"){
                    cellule.className = "void";
                }
            }
        }
        /*Vérification du nombre d'ennemi sur le terrain, utilisé à la ligne 149*/
        let AlienNumber = 0;
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L" + i + "C" + j);
                if (cellule.className == "alien"){
                    AlienNumber ++;
                }
            }
        }
        /*Déplacement des lasers et gestion des collisions avec les ennemis et le joueur*/
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j);
                if (cellule.className == "laser" && i-1 != -1){
                    let celluleSuivante = document.getElementById("L"+(i-1)+"C"+j)
                    if (celluleSuivante.className == "alien"){
                        celluleSuivante.className = "boom";
                    } else if (celluleSuivante.className == "void"){
                        celluleSuivante.className = "laser"
                    }
                    cellule.className = "void";
                }
            }
        }
    if (Droite){
        Gauche++;
    }
    if (!Droite){
        Gauche--;
    }
    /*Déplacement des ennemis*/
    for (let i = 15; i >= 0; i--) {
        /*Sur la droite*/
        if (Droite && Gauche < 5){
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
        }
        /*Sur la gauche*/
        else if (!Droite && Gauche > 0) {
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
    /*Déplacement vers le bas une fois le bord droite atteint*/
    if (Gauche == 5 && Droite){
        for (let k = 14; k >= 0; k--) {
            for (let l = 15; l >= 0; l--) {
                cellule = document.getElementById("L" + k + "C" + l);
                let celluleSuivante = document.getElementById("L" + (k+1) + "C" + l);
                if (cellule.className == "alien") {
                    if (celluleSuivante.className == "tireur"){
                        game=false;
                    }
                    celluleSuivante.className = "alien";
                    cellule.className = "void";
                }
            }
        }
        Droite = false;
    }
    /*Déplacement vers le bas une fois le bord gauche atteint*/
    if (Gauche == 0 && !Droite) {
        Droite = true;
        for (let k = 14; k >= 0; k--) {
            for (let l = 15; l >= 0; l--) {
                let cellule = document.getElementById("L" + k + "C" + l);
                let celluleSuivante = document.getElementById("L" + (k + 1) + "C" + l);
                if (cellule.className == "alien") {
                    if (celluleSuivante.className == "tireur"){
                        game=false;
                    }
                    celluleSuivante.className = "alien";
                    cellule.className = "void";
                }
            }
        }
    }
        /*Fin du jeu par mort du joueur*/
        if (!game){
            let score = document.querySelector("h3");
            score.innerHTML = 'Vous avez perdu !'
        }
        /*Poursuite du jeu*/
        else if (game){
            play(game,Droite,Gauche)
        }
        /*Fin du jeu par victoire du jeu, en lien avec le code pour vérifier le nombre d'ennemis ligne 40*/
        else if (AlienNumber == 0){
            let score = document.querySelector("h3");
            score.innerHTML = 'Vous avez gagné !'
        }
    }, 1000)
}
let tir = false;
/*Ajout d'un bouton pour lancer le jeu et d'un input*/
let start = document.createElement("button");
let input = document.createElement("input");
start.innerHTML = "Jouer";
document.querySelector("body").appendChild(start);
document.querySelector("body").appendChild(input);
start.addEventListener("click", preparation)
input.addEventListener("keydown", function(event){
    if (event.code == 'ArrowLeft' || event.code == "KeyQ"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"){
                    if (j-1 >= 0) {
                        let celluleSuivante = document.getElementById("L" + i + "C" + (j - 1));
                        cellule.className = "void";
                        celluleSuivante.className = "tireur";
                        break;
                    }
                }
            }
        }
    }
    if (event.code == 'ArrowRight' || event.code == "KeyD"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"){
                    if (j+1 < 16) {
                        let celluleSuivante = document.getElementById("L" + i + "C" + (j + 1));
                        cellule.className = "void";
                        celluleSuivante.className = "tireur";
                        break;
                    }
                }
            }
        }
    }
    if (event.code == 'ArrowUp' || event.code == "KeyZ"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"){
                    if (i-1 > 11) {
                        let celluleSuivante = document.getElementById("L" + (i - 1) + "C" + j);
                        cellule.className = "void";
                        celluleSuivante.className = "tireur";
                        break;
                    }
                }
            }
        }
    }
    if (event.code == 'ArrowDown' || event.code == "KeyS"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"){
                    if (i+1 < 16) {
                        let celluleSuivante = document.getElementById("L" + (i + 1) + "C" + j);
                        cellule.className = "void";
                        celluleSuivante.className = "tireur";
                        break;
                    }
                }
            }
        }
    }
    /*Appuyer sur espace permet de tirer*/
    if (event.code == 'Space'){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur" && tir){
                    let celluleSuivante = document.getElementById("L" + (i - 1) + "C" + j);
                    if (celluleSuivante.className=="alien"){
                        celluleSuivante.className = "boom";
                    } else {
                        celluleSuivante.className = "laser";
                    }
                    tir = false;
                    break;
                }
            }
        }
    }
})

