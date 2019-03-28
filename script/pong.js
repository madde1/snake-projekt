let pongCanvas, canvasContext, pongInterval;
let ballX;
let ballY;
let ballSpeedX;
let ballSpeedY;
let pongMenu = document.getElementById("pong-Menu");
let fullLifeImg = document.getElementById('playerFullLifeImg');
let emptyLifeImg = document.getElementById('playerEmptyLifeImg');
let player1Score = 0;
let playerLife = 3;
let losing_score = 0;
let ballSize = 15;
let computerScored = false;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function pongInit(){
    ballX = 50;
    ballY = 50;
    ballSpeedX = 10;
    ballSpeedY = 4;

    pongMenu.style.display = "none";
    player1Score = 0;
    playerLife = 3;

    let framesPerSecond = 30;
    pongInterval = setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    pongCanvas.addEventListener('mousemove', function(evt) {
        let mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
        if (paddle1Y + 100 > 500){
            paddle1Y = 400;
        }
        else if (paddle1Y < 0){
            paddle1Y = 0;
        }
    });
}

function calculateMousePos(evt) {
    let rect = pongCanvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x:mouseX,
        y:mouseY
    };
}

function colorRect(leftX,topY, width,height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY, width,height);
}

function ballReset() {
    if (playerLife === losing_score) {
        pongLost();
    }
    if(computerScored){

        ballSpeedX = ballSpeedX = -10;
        ballSpeedY = ballSpeedY = 4;
    }
    else {

        ballSpeedX = ballSpeedX = 10;
        ballSpeedY = ballSpeedY = 4;
    }
    ballX = pongCanvas.width/2;
    ballY = pongCanvas.height/2;

    computerScored = false;

}
function pongLost() {
    canvasContext.clearRect(0,0,pongCanvas.width,pongCanvas.height);
    clearInterval(pongInterval);

    pongMenu.style.display = 'grid';
    document.getElementById("pong-playText").textContent = "Game Over!";
    document.getElementById("pong-Play").textContent= "Play again?";

}

function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY - 35) {
        paddle2Y += 9;
    } else if(paddle2YCenter > ballY + 35) {
        paddle2Y -= 9;
    }
    if (paddle2Y + 100 > 500){
        paddle2Y = 400;
    }
}

function moveEverything() {
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if(ballX < 10) {
        if(ballY + ballSize> paddle1Y &&
            ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY
                -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.25;
        } if (ballX < 0) {
            playerLife--;
            computerScored = true;
            ballReset();

        }
    }
    if(ballX + ballSize > pongCanvas.width) {
        if(ballY > paddle2Y &&
            ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY
                -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.25;
        } else {
            player1Score++;
            ballReset();

        }
    }
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if(ballY + ballSize > pongCanvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}


function drawEverything() {
    //Background
    colorRect(0,0,pongCanvas.width,pongCanvas.height,'black');
    // Net
    for (let i = 0; i <pongCanvas.height; i+=40) {
        colorRect(pongCanvas.width/2-2,i,4,20,'pink');
    }

    // Heart image
    if(playerLife === 3) {
            canvasContext.drawImage(fullLifeImg, pongCanvas.width - (90),0, 30,20,);
            canvasContext.drawImage(fullLifeImg, pongCanvas.width - (60),0, 30,20,);
            canvasContext.drawImage(fullLifeImg, pongCanvas.width - (30),0, 30,20,);
    }
    else if (playerLife === 2){
            canvasContext.drawImage(fullLifeImg, pongCanvas.width - (90),0, 30,20,);
            canvasContext.drawImage(fullLifeImg, pongCanvas.width - (60),0, 30,20,);
            canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (30),0, 30,20,);
        }
    else if (playerLife === 1){
        canvasContext.drawImage(fullLifeImg, pongCanvas.width - (90),0, 30,20,);
        canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (60),0, 30,20,);
        canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (30),0, 30,20,);
    }
    else if (playerLife === 0){
        canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (90),0, 30,20,);
        canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (60),0, 30,20,);
        canvasContext.drawImage(emptyLifeImg, pongCanvas.width - (30),0, 30,20,);
    }
    canvasContext.fillText('Score: ', pongCanvas.width/6 ,30);
    canvasContext.fillText(player1Score, pongCanvas.width/2 - 60 ,30);

    // Player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

    // Computer paddle
    colorRect(pongCanvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'pink');

    // Ball
    colorRect(ballX, ballY, ballSize, ballSize, 'pink');
}
	