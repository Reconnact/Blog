const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
var keys=[];
var speed = 100;
var enabled = false;

const player1 = {
    x : 10,
    y : canvas.height/2 - 50,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

const player2 = {
    x : canvas.width - 20,
    y : canvas.height/2 - 50,
    width : 10,
    height : 100,
    color : "white",
    score : 0
}

const ball = {
    x : canvas.width/2, 
    y : canvas.height/2,
    r : 10,
    speed: 1,
    velocityX : 5,
    velocityY : 5,
    color : "white"
}

function drawMiddleLine(){
    for (i = 0; i < 400; i+= 62){
        drawRect(   canvas.width/2 , i, 8, 30, "white");
    }
}

function drawText(){
    context.font = "100px Monospace";
    context.fillText(player1.score, canvas.width/4, canvas.height/4);
    context.fillText(player2.score, 2.6*canvas.width/4, canvas.height/4);    
}

function drawBall(){
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

window.addEventListener('keydown', movePlayer, true);
function movePlayer(e){
    
};

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

function collision(b, p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.r;
    b.bottom = b.y + b.r;
    b.left = b.x - b.r;
    b.right = b.x + b.r;
    
    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
    
}


function drawRect(x, y, r, h, color){
    context.fillStyle = color; 
    context.fillRect(x, y, r, h);
}

function resetBall(){
    ball.speed = 1;
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
}

function update(){ 
    if (keys[38] && player2.y > 0)  {
        player2.y -= 10;
    }
    if (keys[40] && player2.y < canvas.height - 100){
        player2.y += 10;
    }
    if (keys[83] && player1.y < canvas.height - 100)  {
        player1.y += 10;
    }
    if (keys[87] && player1.y > 0)  {
        player1.y -= 10;
    }
    if (keys[27])  {
        if(player1.score > 0 || player2.score > 0){
            enabled = false;
        }else{
            restart();
        }
    }
    ball.speed += 0.0005;
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;

    if(ball.y + ball.r > canvas.height || ball.y - ball.r < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width/2) ? player1 : player2;
    if (collision(ball, player)){
        ball.velocityX = -ball.velocityX;
    }

    if (ball.x - ball.r > canvas.width){
        player1.score++;
        resetBall();
    } else if (ball.x + ball.r < 0){
        player2.score++;
        resetBall();
    }
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "Black");
    drawBall();
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);
    drawText();
    drawMiddleLine();   
}

function start(){
    enabled = true;
    document.getElementById("startButton").style.display = "none";
    document.getElementById("terminateMsg").style.display = "block";   
}

function restart(){
    location.reload();
}

function game() {
    if (enabled == true){
        drawBall();
        update();
        render();
    }else if(player1.score > 0 || player2.score > 0){
        clearInterval(interval);
        confetti({
            particleCount: 200,
            spread: 80,
            origin: { y: 0.6}
        });
        if (player1.score > player2.score){
            document.getElementById("terminateMsg").innerHTML = "Player 1 won!";
        } else if (player1.score < player2.score){
            document.getElementById("terminateMsg").innerHTML = "Player 2 won!";
        } else if (player1.score = player2.score){
            document.getElementById("terminateMsg").innerHTML = "Tie!";
        }
        document.getElementById("restartButton").style.display = "inline";
    }
}

update();
render();
var interval = setInterval(game, 1000/speed);