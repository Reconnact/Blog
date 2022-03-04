let word = "";
let underscores = "";
let length = 0;
let counter = 0;
let arr;
let arr2;
let won = false;
const words = ["jackpot", "luxury", "nightclub", "kiosk", "scratch", "programmer", "zombie", "crypto", "actor", "gold", "painting", "advertisement", "grass", "pencil", "hamburger", "helicopter", "yacht", "magician"];
window.onload = function() {
    wordAsUnderscores();
};


function wordAsUnderscores() {
    document.getElementById("word").innerHTML = words[Math.floor((Math.random() * (words.length - 1 + 1)) + 1) - 1]
    length = document.getElementById("word").innerText.length;
    word = document.getElementById("word").innerHTML;
    document.getElementById("word").innerHTML = "";
    for (var i = 0; i < length; i++){
        underscores += "_ ";
    }
    document.getElementById("word").innerHTML = underscores;
    arr = word.split("");
    arr2 = underscores.split(" ");
}

function isInWord(letter){
    let result = word.includes(letter);
    document.getElementById(letter).disabled = true;
    if (result === true){
        document.getElementById(letter).innerHTML = "✅";
        underscores = "";
        for (var i = 0; i < length; i++){
            if (arr[i] === letter){
                arr2[i] = letter;
            }
            underscores += arr2[i] + " ";
        }
        document.getElementById("word").innerHTML = underscores;
        for (var j = 0; j < length; j++){
            if (arr2[j] !== "_"){
                won = true;
            }else{
                won = false;
                break;
            }
        }
        if (won === true){
            finished("You win!")
        }
    }else{
        document.getElementById(letter).innerHTML = "❌";
        counter++;
        document.getElementById("drawing").src="img/hangman" + counter + ".jpg";
        if (counter === 6){
            finished("YOU LOSE!")
        }
    }
}

function finished(text){
    document.getElementById("result").innerHTML = text;
    document.getElementById("alphabet").style.visibility = "hidden";
    document.getElementById("word").style.visibility ="hidden";
    document.getElementById("rules").style.visibility ="hidden";
    document.getElementById("explantation").style.visibility ="hidden";
    document.getElementById("stats").innerHTML = "Your wrong try's: " + counter + "<br>" + "The word: " + word;
    document.getElementById("play_again").style.visibility = "visible";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (won === true){
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6}
        });
    }
}

function playAgain(){
    location.reload(); 
}
