function preparation(){
    start.innerHTML = 'Arrêter';
    /*Préparation du score servant de zone de texte et ajout de la musique*/
    let score = document.querySelector("h3");
    let musique = document.createElement("div");
    musique.innerHTML = "<embed src=\"fond.mp3\" hidden=true autostart=true loop=true mastersound>";
    start.appendChild(musique);
    score.innerHTML = 'Score : 0'
    let game = true;
    /*Création et ajout d'un tableau contenant les ennemis et le joueur*/
    let table = document.createElement("table");
    for (let i = 0; i < 16; i++) {
        let ligne = document.createElement("tr");
        for (let j = 0; j < 16; j++) {
            let colonne = document.createElement("td");
            colonne.className = "void";
            colonne.id = "L" + i + "C" + j;
            if (i < 3 && j < 12) {
                colonne.className = "alien"+graphisme;
            }
            if (i == 15 && j == 8) {
                colonne.className = "tireur"+graphisme;
            }
            ligne.appendChild(colonne);
        }
        table.appendChild(ligne);
    }
    grille.appendChild(table);
    let Droite = true;
    let Gauche = 0;
    /*Lancement d'un tour de jeu*/
    play(game,Droite,Gauche);
}
function play(game,Droite,Gauche) {
    setTimeout(function(){
        /*Rechargement du laser utilisé en ligne 288*/
        if (tir == false){
            tir = true;
        }
        /*Disparition des explosions après un tour*/
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L" + i + "C" + j);
                if (cellule.className == "boom"+graphisme){
                    cellule.className = "void";
                }
            }
        }
        /*Déplacement des lasers et gestion des collisions avec les ennemis et le joueur*/
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j);
                if (cellule.className == "laser"+graphisme && i-1 != -1){
                    let celluleSuivante = document.getElementById("L"+(i-1)+"C"+j)
                    if (celluleSuivante.className == "alien"+graphisme){
                        celluleSuivante.className = "boom"+graphisme;
                    } else if (celluleSuivante.className == "void"){
                        celluleSuivante.className = "laser+graphisme"
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
                if (cellule.className == "alien"+graphisme){
                    celluleSuivante = document.getElementById("L"+i+"C"+(j+1));
                    if (j+1 != 16) {
                        if (celluleSuivante.className == "tireur"+graphisme) {
                            game = false;
                        } else if (celluleSuivante.className == "laser"+graphisme) {
                            celluleSuivante.className = "boom"+graphisme;
                        } else {
                            celluleSuivante.className = "alien"+graphisme;
                        }
                        cellule.className = "void";
                    }
                }
            }
        }
        /*Sur la gauche*/
        else if (!Droite && Gauche > 0) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j);
                if (cellule.className == "alien"+graphisme){
                    let celluleSuivante = document.getElementById("L"+i+"C"+(j-1));
                    if (j-1 != -1) {
                        if (celluleSuivante.className == "tireur"+graphisme) {
                            game = false;
                        } else if (celluleSuivante.className == "laser"+graphisme){
                            celluleSuivante.className = "boom"+graphisme;
                        } else {
                            celluleSuivante.className = "alien"+graphisme;
                        }
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
                if (cellule.className == "alien"+graphisme) {
                    if (celluleSuivante.className == "tireur"+graphisme){
                        game=false;
                    } else if (celluleSuivante.className == "laser"+graphisme){
                        celluleSuivante.className = "boom"+graphisme;
                    } else {
                        celluleSuivante.className = "alien"+graphisme;
                    }
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
                if (cellule.className == "alien"+graphisme) {
                    if (celluleSuivante.className == "tireur"+graphisme){
                        game=false;
                    } else if (celluleSuivante.className == "laser"+graphisme){
                        celluleSuivante.className = "boom"+graphisme;
                    } else {
                        celluleSuivante.className = "alien"+graphisme;
                    }
                    cellule.className = "void";
                }
            }
        }
    }
        /*Vérification du nombre d'ennemi sur le terrain, utilisé à la ligne 174*/
        let AlienNumber = 0;
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L" + i + "C" + j);
                if (cellule.className == "alien"+graphisme){
                    if (i == 15){
                        game = false;
                    }
                    AlienNumber ++;
                    let score = document.querySelector("h3");
                    score.innerText = "Score : " + ((36-AlienNumber)*100);
                }
            }
        }
        if (AlienNumber == 0){
            game = false;
        }
        /*Fin du jeu par mort du joueur*/
        if (!game){
            grille.innerHTML = "";
            let score = document.querySelector("h3");
            if (AlienNumber != 0){
                score.innerHTML = 'Vous avez perdu !'
            }
            /*Fin du jeu par victoire du jeu, en lien avec le code pour vérifier le nombre d'ennemis ligne 151*/
            if (AlienNumber == 0){
                score.innerHTML = 'Vous avez gagné !'
            }
        }
        /*Poursuite du jeu*/
        else if (game){
            play(game,Droite,Gauche)
        }
    }, 1000)
}
let graphisme = 0;
let choixGraphisme = 2;
let tir = false;
let grille = document.querySelector("div");
let Body = document.querySelector("body");
Body.style.display = "flex";
Body.style.alignItems = "center";
Body.style.flexDirection = "column";
/*Ajout d'un bouton pour lancer le jeu et d'un input*/
let start = document.createElement("button");
start.innerHTML = "Jouer";
start.style.width = "64px";
start.style.height = "64px";
document.querySelector("body").appendChild(start);
/*Appuyer le bouton lance le jeu*/
start.addEventListener("click", function(){
    if (start.innerHTML == "Jouer" && choixGraphisme == 1){
        graphisme = 1;
        preparation();
    } else if (start.innerHTML == "Jouer"){
        graphisme = 2;
        preparation();
    } else {
        window.location.reload(false);
    }
});
document.addEventListener("keydown", function(event){
    /*Appuyer sur gauche ou Q pour allez à gauche*/
    if (event.code == 'ArrowLeft' || event.code == "KeyQ"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"+graphisme){
                    if (j-1 >= 0) {
                        let celluleSuivante = document.getElementById("L" + i + "C" + (j - 1));
                        if (celluleSuivante.className == "alien"+graphisme){
                            game = false;
                        } else {
                            celluleSuivante.className = "tireur"+graphisme;
                        }
                        cellule.className = "void"+graphisme;
                        break;
                    }
                }
            }
        }
    }
    /*Appuyer sur droite ou D pour allez à droite*/
    if (event.code == 'ArrowRight' || event.code == "KeyD"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"+graphisme){
                    if (j+1 < 16) {
                        let celluleSuivante = document.getElementById("L" + i + "C" + (j + 1));
                        if (celluleSuivante.className == "alien"+graphisme){
                            game = false;
                        } else {
                            celluleSuivante.className = "tireur"+graphisme;
                        }
                        cellule.className = "void";
                        break;
                    }
                }
            }
        }
    }
    /*Appuyer sur haut ou Z pour approcher les ennemis*/
    if (event.code == 'ArrowUp' || event.code == "KeyZ"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"+graphisme){
                    if (i-1 > 11) {
                        let celluleSuivante = document.getElementById("L" + (i-1) + "C" + j);
                        if (celluleSuivante.className == "alien"+graphisme){
                            game = false;
                        } else {
                            celluleSuivante.className = "tireur"+graphisme;
                        }
                        cellule.className = "void";
                        break;
                    }
                }
            }
        }
    }
    /*Appuyer sur bas ou S pour revenir sur la ligne initiale*/
    if (event.code == 'ArrowDown' || event.code == "KeyS"){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"+graphisme){
                    if (i+1 < 16) {
                        let celluleSuivante = document.getElementById("L" + (i+1) + "C" + j);
                        if (celluleSuivante.className == "alien"+graphisme){
                            game = false;
                        } else {
                            celluleSuivante.className = "tireur"+graphisme;
                        }
                        cellule.className = "void";
                        break;
                    }
                }
            }
        }
    }
    /*Appuyer sur espace permet de tirer et décharge le laser, utilisé en ligne 39*/
    if (event.code == 'Space'){
        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {
                let cellule = document.getElementById("L"+i+"C"+j)
                if (cellule.className=="tireur"+graphisme && tir){
                    let celluleSuivante = document.getElementById("L" + (i - 1) + "C" + j);
                    if (celluleSuivante.className=="alien"+graphisme){
                        celluleSuivante.className = "boom"+graphisme;
                    } else {
                        celluleSuivante.className = "laser"+graphisme;
                    }
                    tir = false;
                    break;
                }
            }
        }
    }
    if (event.code == 'Digit1'){
        choixGraphisme = 2;
    }
    if (event.code == 'Digit2'){
        choixGraphisme = 1;
    }
})