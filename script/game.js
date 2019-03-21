var snakeGame = document.getElementById('snake');
var startPage = document.getElementById('startPage');
var pongGame = document.getElementById('PongGame');

function playSnake() {
    startPage.style.display = 'none';
    snakeGame.style.display = 'block';

    document.getElementById("playText").textContent = "Click play to start the game, Good Luck!";
    document.getElementById("play").textContent = "Play?";
}

function stopSnake() {
    startPage.style.display = 'block';
    snakeGame.style.display = 'none';
}

function playPong() {
    startPage.style.display = 'none';
    pongGame.style.display = 'block';
}