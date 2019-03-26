let snakeGame = document.getElementById('snake');
let startPage = document.getElementById('startPage');
let pongGame = document.getElementById('pong');
let startForms = document.getElementById('startForm');



window.onload = function WindowInit() {

    // snake
    snakeCanvas = document.getElementById('snakeCanvas');
    snakeCtx = snakeCanvas.getContext('2d');
    snakeCtx.shadowBlur = 2;
    snakeCtx.shadowColor = 'black';
    snakeCtx.shadowOffsetX = 2;
    snakeCtx.shadowOffsetY = 2;

    //background
    snakeCtx.drawImage(backgroundImg,0,0,size,size);

    // pong
    pongCanvas = document.getElementById('pongCanvas');
    canvasContext = pongCanvas.getContext('2d');
    canvasContext.font = "30px Luckiest Guy";

    //background
    player1Score = 0;
    playerLife = 3;
    drawEverything();
};

function playSnake() {

    startForms.style.display ='none';
    startPage.style.display = 'none';
    snakeGame.style.display = 'block';
    document.getElementById("snake-playText").textContent = "Click play to start the game, Good Luck!";
    document.getElementById("snake-play").textContent = "Play?";
}

function stopSnake() {
    startPage.style.display = 'grid';
    snakeGame.style.display = 'none';
    startForms.style.display ='grid';

    snakeGameOver = true;
}

function playPong() {
    startPage.style.display = 'none';
    pongGame.style.display = 'block';
    startForms.style.display ='none';

    document.getElementById("pong-playText").textContent = "Click play to start the game, Good Luck!";
    document.getElementById("pong-Play").textContent = "Play?";

   drawEverything();

}
function stopPong() {
    startPage.style.display = 'grid';
    pongGame.style.display = 'none';
    startForms.style.display ='grid';

    pongLost();
}
