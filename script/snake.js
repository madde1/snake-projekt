var canvas,ctx,interval;
var updateInterval = 10;
var size = 500;
var snake;
var distanceMoved;
var apple;
var snakeSize;
var directionX,directionY;
var newDirectionX, newDirectionY;
var gameOver;
var cantMove = false;
var posistionPowerUpp;
var invert;
var wallHack;
var powerUppChoice;

window.onload = function windowInit() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.shadowBlur = 4;
    ctx.shadowColor = 'gray';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    init()

}
 function init() {

     wallHack = false;
     invert = false;
     gameOver = false;
     snake = [];
     distanceMoved = 0;
     snakeSize = 20;
     directionX = snakeSize;
     directionY = 0;
     newDirectionX = snakeSize;
     newDirectionY = 0;
     posistionPowerUpp = {powerUppX: 200, powerUppY: 200};
     apple = {appleX: snakeSize, appleY: snakeSize}


    ctx.fillStyle = "#000000";
    snake.push({snakeX: snakeSize, snakeY: 0, directionX: directionX, directionY: directionY});
    snake.unshift({snakeX: 0, snakeY: 0, directionX: directionX, directionY: directionY});

    interval = window.setInterval(update, updateInterval)

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
        snake[i] = {snakeX: snake[i].snakeX + snake[i].directionX/(1000/updateInterval)*10, snakeY: snake[i].snakeY + snake[i].directionY/(1000/updateInterval)*10, directionX: snake[i].directionX, directionY: snake[i].directionY};

    }
    snake[snake.length-1] = {snakeX: snake[snake.length-1].snakeX + directionX/(1000/updateInterval)*10, snakeY :snake[snake.length-1].snakeY + directionY/(1000/updateInterval)*10, directionX: directionX, directionY: directionY};

    distanceMoved += (Math.abs(directionX) + Math.abs(directionY))/(1000/updateInterval)*10;
    if(distanceMoved >= snakeSize) {
        for (var i = 0; i < snake.length - 1; i++){
            snake[i] = {snakeX: snake[i].snakeX, snakeY: snake[i].snakeY, directionX: snake[i+1].directionX, directionY: snake[i+1].directionY};

        }
        directionX = newDirectionX;
        directionY = newDirectionY;
        distanceMoved = 0;


    }


}
function kolisionDetection() {
    for (var i = 0; i < snake.length; i++) {
        if (wallHack) {
            if (snake[i].snakeX < -snakeSize) {
                snake[i].snakeX = snake[i].snakeX + size + snakeSize;
            }
            if (snake[i].snakeX > (size+snakeSize)) {
                snake[i].snakeX = snake[i].snakeX - size - snakeSize
            }
            if (snake[i].snakeY < 0) {
                snake[i].snakeY = snake[i].snakeY + size + snakeSize
            }
            if (snake[i].snakeY > size+snakeSize) {
                snake[i].snakeY = snake[i].snakeY - size - snakeSize;
            }
        }
        else if(snake[snake.length-1].snakeX < 0 || snake[i].snakeX > size-snakeSize || snake[i].snakeY < 0 || snake[i].snakeY > size-snakeSize) {
            gameOver = true;
        }
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
        newDirectionX = 0 ;
        newDirectionY =  invert ? -snakeSize: snakeSize;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }
    else if (keyPress === 38 && directionY !== (invert ? -snakeSize: snakeSize) && cantMove === false) {
        newDirectionX = 0;
        newDirectionY = invert ? snakeSize: -snakeSize;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }
    else if (keyPress === 37 && directionX !== (invert ? -snakeSize: snakeSize) && cantMove === false) {
        newDirectionX = invert ? snakeSize: -snakeSize;
        newDirectionY = 0;
        cantMove = !cantMove;
        setTimeout(timeout, 100)
    }

    else if (keyPress === 39 && directionX !== (invert ? snakeSize : -snakeSize) && cantMove === false) {
        newDirectionX = invert ? -snakeSize: snakeSize;
        newDirectionY = 0;
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
    invert = false;
    wallHack = false;
}

function eatApple() {

    if (snake[snake.length - 1].snakeX === apple.appleX && snake[snake.length - 1].snakeY === apple.appleY){
        apple.appleX = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        apple.appleY = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
        snake.unshift({snakeX: snake[0].snakeX-snake[0].directionX, snakeY: snake[0].snakeY-snake[0].directionY, directionX: snake[0].directionX, directionY: snake[0].directionY});

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
function spawnPowerUpp() {
    posistionPowerUpp.powerUppX = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
    posistionPowerUpp.powerUppY = Math.floor(Math.random() * Math.floor(24.5)) * snakeSize;
}
function powerUpp() {
    if (snake[snake.length - 1].snakeX === posistionPowerUpp.powerUppX && snake[snake.length - 1].snakeY === posistionPowerUpp.powerUppY) {

        powerUppChoice =  Math.floor(Math.random() * 2) + 1;
    switch (powerUppChoice) {

        case 1:
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            wallHack = true;
            setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

        case 2:
            console.log("test")
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            invert = true;
            setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

    }}


}