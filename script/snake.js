var canvas,ctx,interval;
var updateInterval = 10;
var size = 500;
var scorePerSecond = 0.1;
var scorePerApple = 10;
var scorePerPowerUp = 20;
var snake;
var distanceMoved;
var apple;
var snakeSize;
var snakeHeadExtraSize = 10;
var directionX,directionY;
var newDirectionX, newDirectionY;
var gameOver;
var score = 0;
var cantMove = false;
var posistionPowerUpp;
var invert;
var wallHack;
var powerUppChoice;
var spawnPowerUpTimer;
var appleImg = document.getElementById('appleImg');

var snakeHeadUpp = document.getElementById('snakeHeadUpp');
var snakeHeadRight = document.getElementById('snakeHeadRight');
var snakeHeadDown = document.getElementById('snakeHeadDown');
var snakeHeadLeft = document.getElementById('snakeHeadLeft');
var snakeBody = document.getElementById('snakeBody');
var backgroundImg = document.getElementById('backgroundImg');

var playMenu = document.getElementById("buttonDiv");

window.onload = function windowInit() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    //init()

};

 function init() {
     playMenu.style.display = "none";

     wallHack = false;
     invert = false;
     gameOver = false;
     snake = [];
     distanceMoved = 0;
     snakeSize = 30;
     directionX = snakeSize;
     directionY = 0;
     newDirectionX = snakeSize;
     newDirectionY = 0;
    window.clearInterval(spawnPowerUpTimer);
     posistionPowerUpp = {powerUppX: 10*snakeSize, powerUppY: 10*snakeSize};
     apple= {appleX: getRandomLocation().x, appleY: getRandomLocation().y};
    ctx.fillStyle = "#000000";
    snake.push({snakeX: snakeSize, snakeY: 0, directionX: directionX, directionY: directionY});
    snake.unshift({snakeX: 0, snakeY: 0, directionX: directionX, directionY: directionY});

     eatApple();
     score = 0;
    interval = window.setInterval(update, updateInterval)

}
function update() {
    render();
    kolisionDetection();
    checkEatApple();
    powerUpp();
    updatePosition();
    lost();

}
function render() {
    ctx.clearRect(0,0,size,size);
    ctx.drawImage(backgroundImg,0,0,size,size);
    //Score text
    ctx.font = "30px Luckiest Guy";
    ctx.textAlign = "right";
    ctx.fillText("Score: " + Math.floor(score), size-10, 30);

    ctx.fillStyle= "#41FF00";

    ctx.fillStyle= "#e60a00";
    ctx.drawImage(appleImg,apple.appleX-3,apple.appleY-3, snakeSize+6, snakeSize+6);
    ctx.fillStyle= "#ffda00";

    ctx.fillRect(posistionPowerUpp.powerUppX,posistionPowerUpp.powerUppY,snakeSize,snakeSize);

    var snakeHead;
    if (newDirectionX === snakeSize){
        snakeHead = snakeHeadRight;
    }
    if (newDirectionX == -snakeSize) {
        snakeHead = snakeHeadLeft;
    }
    if (newDirectionY == snakeSize) {
        snakeHead = snakeHeadDown;
    }
    if (newDirectionY == -snakeSize) {
        snakeHead = snakeHeadUpp;
    }

    ctx.drawImage(snakeHead, snake[snake.length - 1].snakeX-snakeHeadExtraSize/2, snake[snake.length - 1].snakeY-snakeHeadExtraSize/2,
        snakeSize+snakeHeadExtraSize, snakeSize+snakeHeadExtraSize);

    for (var i = 0; i < snake.length-1; i++){
        ctx.fillStyle= "#e61dcb";

        ctx.drawImage(snakeBody,snake[i].snakeX ,snake[i].snakeY, snakeSize, snakeSize);
    }

    ctx.fillStyle= "#000000";
}
function updatePosition() {
    for (var i = 0; i < snake.length - 1; i++){
        snake[i] = {snakeX: snake[i].snakeX + snake[i].directionX/getSpeed(), snakeY: snake[i].snakeY + snake[i].directionY/getSpeed(), directionX: snake[i].directionX, directionY: snake[i].directionY};

    }
    snake[snake.length-1] = {snakeX: snake[snake.length-1].snakeX + directionX/getSpeed(), snakeY :snake[snake.length-1].snakeY + directionY/getSpeed(), directionX: directionX, directionY: directionY};

    distanceMoved += (Math.abs(directionX) + Math.abs(directionY))/getSpeed();
    if(distanceMoved >= snakeSize) {
        score += scorePerSecond;
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
        else if(snake[snake.length-1].snakeX < -10 || snake[i].snakeX > size-snakeSize || snake[i].snakeY < -10 || snake[i].snakeY > size-snakeSize) {
            gameOver = true;
        }
    }

    for (var i = 1; i < snake.length -2; i++){
        if (snake[snake.length-1].snakeX === snake[i].snakeX && snake[snake.length-1].snakeY === snake[i].snakeY){
            gameOver = !gameOver;
        }
    }



}

function KD(event) {
    //console.log(event.keyCode);
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
}
function timeout() {
    cantMove = !cantMove;
}
function timeoutPowerUpp() {
    invert = false;
    wallHack = false;
}

function checkEatApple() {
    if (snake[snake.length - 1].snakeX === apple.appleX && snake[snake.length - 1].snakeY === apple.appleY){
        eatApple();
    }
}

function eatApple() {
    let applePosition;
    do {
        applePosition = getRandomLocation(false, true);
    }while (applePosition.x < 0)
    apple.appleX = applePosition.x;
    apple.appleY = applePosition.y;
    snake.unshift({snakeX: snake[0].snakeX-snake[0].directionX, snakeY: snake[0].snakeY-snake[0].directionY, directionX: snake[0].directionX, directionY: snake[0].directionY});
    score += scorePerApple;
}

function lost() {

    if (gameOver){
        ctx.clearRect(0,0,size,size);
        wallHack = false;
        invert = false;
        playMenu.style.display = 'grid';
        document.getElementById("playText").textContent = "Game Over!";
        document.getElementById("play").textContent= "Play again?";

        clearInterval(interval);
        ctx.fillStyle = '#eee8d5';
        //ctx.font = '40px serif';
        //ctx.textAlign = 'center';
        //ctx.fillText('Refresh to play again', size / 2, size/ 2);
        //init();
    }

}
function spawnPowerUpp() {
    let powerUpPosition;
    do {
        powerUpPosition = getRandomLocation(true, false);
    }while (powerUpPosition.x < 0)
    posistionPowerUpp.powerUppX = powerUpPosition.x;
    posistionPowerUpp.powerUppY = powerUpPosition.y;
}
function powerUpp() {
    if (snake[snake.length - 1].snakeX === posistionPowerUpp.powerUppX && snake[snake.length - 1].snakeY === posistionPowerUpp.powerUppY) {
        score += scorePerPowerUp;
        powerUppChoice =  Math.floor(Math.random() * 2) + 1;
    switch (powerUppChoice) {

        case 1:
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            wallHack = true;
            spawnPowerUpTimer = setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

        case 2:
            console.log("test")
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            invert = true;
            spawnPowerUpTimer = setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

    }}


}

function getRandomLocation(checkForApple, checkForPowerUp) {
    var x = Math.floor(Math.random() * Math.floor(size/snakeSize)) * snakeSize;
    var y = Math.floor(Math.random() * Math.floor(size/snakeSize)) * snakeSize;
    for(var i = 0; i < snake.length; i++) {
        if(x === snake[i].snakeX && y === snake[i].snakeY) {
            return {x:-100, y:-100};
        }
    }
    if(checkForApple) {
        if(x === apple.appleX && y === apple.appleY) {
            return {x:-100, y:-100};
        }
    }
    if(checkForPowerUp) {
        if(x === posistionPowerUpp.powerUppX && y === posistionPowerUpp.powerUppY) {
            return {x:-100, y:-100};
        }
    }
    return {x:x, y:y};
}

function getSpeed() {
    return snakeSize/2;
}