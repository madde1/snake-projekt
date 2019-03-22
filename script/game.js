var snakeGame = document.getElementById('snake');
var startPage = document.getElementById('startPage');
var pongGame = document.getElementById('PongGame');
var startForms = document.getElementById('startForm');
function playSnake() {
    startForms.style.display ='none';
    startPage.style.display = 'none';
    snakeGame.style.display = 'block';
    document.getElementById("playText").textContent = "Click play to start the game, Good Luck!";
    document.getElementById("play").textContent = "Play?";
}

function stopSnake() {
    startPage.style.display = 'grid';
    snakeGame.style.display = 'none';
    startForms.style.display ='grid';
}

function playPong() {
    startPage.style.display = 'none';
    pongGame.style.display = 'block';
}