var canvas,ctx,interval;
var size = 500;
var snake;
var apple;
var snakeSize;
var directionX,directionY;
var gameOver;
var cantMove = false;
var posistionPowerUpp;
var invert;

window.onload = function windowInit() {
    init()
}
 function init() {
     invert = false;
     gameOver = false;
     snake = [];
     snakeSize = 20;
     directionX = snakeSize;
     directionY = 0;
     posistionPowerUpp = {powerUppX: 200, powerUppY: 200};
     apple = {appleX: 100, appleY: 100}

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "#000000";
    snake.push({snakeX: 0, snakeY: 0});
    snake.unshift({snakeX: 20, snakeY: 20});

    interval = window.setInterval(update,100)

}
function update() {
    render();
    kolisionDetection();
    eatApple();
    powerUpp();
    updatePosition();
    lost();

}
function render() {
    ctx.clearRect(0,0,size,size);
    ctx.fillStyle= "#41FF00";

    ctx.fillRect(snake[snake.length-1].snakeX,snake[snake.length-1].snakeY,snakeSize,snakeSize);

    for (var i = 0; i < snake.length-1; i++){
        ctx.fillStyle= "#e61dcb";

        ctx.fillRect(snake[i].snakeX ,snake[i].snakeY ,snakeSize,snakeSize);
    }
    ctx.fillStyle= "#e60a00";
    ctx.fillRect(apple.appleX,apple.appleY ,snakeSize,snakeSize);
    ctx.fillStyle= "#ffda00";

    ctx.fillRect(posistionPowerUpp.powerUppX,posistionPowerUpp.powerUppY,snakeSize,snakeSize);

    ctx.fillStyle= "#000000";





}
function updatePosition() {


        for (var i = 0; i < snake.length - 1; i++){

                snake[i] = snake[i + 1];

        }
            snake[snake.length-1] = {snakeX: snake[snake.length-1].snakeX + directionX, snakeY :snake[snake.length-1].snakeY + directionY};




        }
function kolisionDetection() {

    if (snake[snake.length-1].snakeX < 0 || snake[snake.length-1].snakeX > size){
        gameOver = !gameOver;
    }
    if (snake[snake.length-1].snakeY < 0 || snake[snake.length-1].snakeY > size){
        gameOver = !gameOver;
    }

    for (var i = 0; i < snake.length -2; i++){
        if (snake[snake.length-1].snakeX === snake[i].snakeX && snake[snake.length-1].snakeY === snake[i].snakeY){
            gameOver = !gameOver;
        }
    }
}

function KD(event) {
    console.log(event.keyCode);
    var keyPress = event.keyCode;
    if (keyPress === 40 && directionY !== (invert ? snakeSize: -snakeSize) && cantMove === false ) {
        directionX = 0 ;
        directionY =  invert ? -snakeSize: snakeSize;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }
    else if (keyPress === 38 && directionY !== (invert ? -snakeSize: snakeSize) && cantMove === false) {
        directionX = 0;
        directionY = invert ? snakeSize: -snakeSize;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }
    else if (keyPress === 37 && directionX !== (invert ? -snakeSize: snakeSize) && cantMove === false) {
        directionX = invert ? snakeSize: -snakeSize;
        directionY = 0;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }

    else if (keyPress === 39 && directionX !== (invert ? snakeSize : -snakeSize) && cantMove === false) {
        directionX = invert ? -snakeSize: snakeSize;
        directionY = 0;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }
    console.log(invert ? snakeSize : -snakeSize)
    if (console.log(directionX !== invert ? snakeSize : -snakeSize)){
        console.log("test")
    }


}
function timeout() {
    cantMove = !cantMove;
}
function timeoutPowerUpp() {
    invert = !invert
}

function eatApple() {

    if (snake[snake.length - 1].snakeX === apple.appleX && snake[snake.length - 1].snakeY === apple.appleY){
        apple.appleX = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        apple.appleY = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        snake.unshift({snakeX: snake[0].snakeX, snakeY: snake[0].snakeY});

    }

}

function lost() {

    if (gameOver){
        ctx.clearRect(0,0,size,size);

        clearInterval(interval);
        ctx.fillStyle = '#eee8d5';
        ctx.font = '40px serif';
        ctx.textAlign = 'center';
        ctx.fillText('Refresh to play again', size / 2, size/ 2);
        init();
    }

}
function powerUpp() {
    if (snake[snake.length - 1].snakeX === posistionPowerUpp.powerUppX && snake[snake.length - 1].snakeY === posistionPowerUpp.powerUppY) {
        console.log("test")
        posistionPowerUpp.powerUppX = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        posistionPowerUpp.powerUppY = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        invert = !invert;
        setTimeout(timeoutPowerUpp, 10000);
    }
}