let player = 1;
let won = false;
function myFunction(id) {
    if (document.getElementById(id).innerHTML === "X" || document.getElementById(id).innerHTML === "O"){
    }else{
    if (player === 1){
    document.getElementById(id).innerHTML = "X";
    validate(id, "X");
    }else{
    document.getElementById(id).innerHTML = "O";
    validate(id, "O");
    }
    if (won === false){
        valAll();
    }
    changePlayer();
    }

}

function changePlayer(){
    if (player === 1){
        player = 2;
    }else {
        player = 1;
    }
}

function validate(id, play){
    if (id === 1 || id === 2 || id === 3){
        if (document.getElementById(id + 3).innerHTML === play && document.getElementById(id + 6).innerHTML === play){
            win();
        }
    }
    if (id === 1 || id === 4 || id === 7){
        if (document.getElementById(id + 1).innerHTML === play && document.getElementById(id + 2).innerHTML === play){
            win();
        }
    }
    if (id === 3 || id === 6 || id === 9){
        if (document.getElementById(id - 1).innerHTML === play && document.getElementById(id - 2).innerHTML === play){
            win();
        }
    }
    if (id === 7 || id === 8 || id === 9){
        if (document.getElementById(id - 3).innerHTML === play && document.getElementById(id - 6).innerHTML === play){
            win();
        }
    }
    if (id === 1){
        if (document.getElementById(5).innerHTML === play && document.getElementById(9).innerHTML === play){
            win();
        }
    }
    if (id === 3){
        if (document.getElementById(5).innerHTML === play && document.getElementById(7).innerHTML === play){
            win();
        }
    }
    if (id === 7){
        if (document.getElementById(5).innerHTML === play && document.getElementById(3).innerHTML === play){
            win();
        }
    }
    if (id === 9){
        if (document.getElementById(5).innerHTML === play && document.getElementById(1).innerHTML === play){
            win();
        }
    }
    if (id === 8){
        if (document.getElementById(7).innerHTML === play && document.getElementById(9).innerHTML === play){
            win();
        }
    }
    if (id === 4){
        if (document.getElementById(1).innerHTML === play && document.getElementById(7).innerHTML === play){
            win();
        }
    }
    if (id === 2){
        if (document.getElementById(5).innerHTML === play && document.getElementById(8).innerHTML === play){
            win();
        }
    }
    if (id === 6){
        if (document.getElementById(3).innerHTML === play && document.getElementById(9).innerHTML === play){
            win();
        }
    }
    if (id === 5){
        if (document.getElementById(6).innerHTML === play && document.getElementById(4).innerHTML === play){
            win();
        }else if (document.getElementById(2).innerHTML === play && document.getElementById(8).innerHTML === play){
            win();
        }else if (document.getElementById(1).innerHTML === play && document.getElementById(9).innerHTML === play){
            win();
        }else if (document.getElementById(3).innerHTML === play && document.getElementById(7).innerHTML === play){
            win();
        }
    }
}

function valAll(){
    for (let i = 1; i < 10; i++){
        if (document.getElementById(i).innerHTML !== ""){
        }else {
            return;
        }
    }
    for (let i = 1; i < 10; i++){
        document.getElementById(i).style.visibility = "hidden"; 
    }
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("winner").innerHTML = "TIE!";
    document.getElementById("win").style.visibility = "visible";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById("explantation").style.visibility = "hidden";
    document.getElementById("rules").style.visibility = "hidden";
}

function win(){
    for (let i = 1; i < 10; i++){
        document.getElementById(i).style.visibility = "hidden"; 
    }
    document.getElementById("container").style.visibility = "hidden";
    document.getElementById("win").style.visibility = "visible";
    document.getElementById("winner").innerHTML = "Player " + player + " WINS!";
    document.getElementById("explantation").style.visibility = "hidden";
    document.getElementById("rules").style.visibility = "hidden";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6}
    });
    won = true;
}

function playAgain(){
    location.reload(); 
}

