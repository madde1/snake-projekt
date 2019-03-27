let snakeCanvas,snakeCtx,interval;
let updateInterval = 10;
let size = 500;
let scorePerSecond = 0.1;
let scorePerApple = 10;
let scorePerPowerUp = 20;
let snake;
let distanceMoved;
let apple;
let snakeSize;
let shouldGrow = false;
let snakeHeadExtraSize = 8;
let directionX,directionY;
let newDirectionX, newDirectionY;
let snakeGameOver;
let score = 0;
let cantMove = false;
let posistionPowerUpp;
let invert;
let wallHack;
let powerUppChoice;
let spawnPowerUpTimer;
let appleImg = document.getElementById('appleImg');

let snakeHeadUpp = document.getElementById('snakeHeadUpp');
let snakeHeadRight = document.getElementById('snakeHeadRight');
let snakeHeadDown = document.getElementById('snakeHeadDown');
let snakeHeadLeft = document.getElementById('snakeHeadLeft');
let snakeBody = document.getElementById('snakeBody');
let backgroundImg = document.getElementById('backgroundImg');

let snakePlayMenu = document.getElementById("snake-buttonDiv");


 function snakeInit() {
     snakePlayMenu.style.display = "none";
     snakeCtx.fillStyle = "#000000";

     wallHack = false;
     invert = false;
     snakeGameOver = false;
     snake = [];
     distanceMoved = 0;
     shouldGrow = false;
     snakeSize = 20;
     directionX = snakeSize;
     directionY = 0;
     newDirectionX = snakeSize;
     newDirectionY = 0;
    window.clearInterval(spawnPowerUpTimer);
     posistionPowerUpp = {powerUppX: 10*snakeSize, powerUppY: 10*snakeSize};
     apple= {appleX: getRandomLocation().x, appleY: getRandomLocation().y};

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
    snakeCtx.clearRect(0,0,size,size);
    snakeCtx.drawImage(backgroundImg,0,0,size,size);
    //Score text
    snakeCtx.font = "30px Luckiest Guy";
    snakeCtx.textAlign = "right";
    snakeCtx.fillText("Score: " + Math.floor(score), size-10, 30);

    snakeCtx.fillStyle= "#41FF00";

    snakeCtx.fillStyle= "#e60a00";
    snakeCtx.drawImage(appleImg,apple.appleX,apple.appleY, snakeSize, snakeSize);
    snakeCtx.fillStyle= "#ffda00";

    snakeCtx.fillRect(posistionPowerUpp.powerUppX,posistionPowerUpp.powerUppY,snakeSize,snakeSize);

    let snakeHead;
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

    snakeCtx.drawImage(snakeHead, snake[snake.length - 1].snakeX-snakeHeadExtraSize/2, snake[snake.length - 1].snakeY-snakeHeadExtraSize/2,
        snakeSize+snakeHeadExtraSize, snakeSize+snakeHeadExtraSize);

    for (let i = 0; i < snake.length-1; i++){
        snakeCtx.fillStyle= "#e61dcb";

        snakeCtx.drawImage(snakeBody,snake[i].snakeX ,snake[i].snakeY, snakeSize, snakeSize);
    }

    snakeCtx.fillStyle= "#000000";
}
function updatePosition() {
    for (let i = 0; i < snake.length - 1; i++){
        snake[i] = {snakeX: snake[i].snakeX + snake[i].directionX/getSpeed(), snakeY: snake[i].snakeY + snake[i].directionY/getSpeed(), directionX: snake[i].directionX, directionY: snake[i].directionY};

    }
    snake[snake.length-1] = {snakeX: snake[snake.length-1].snakeX + directionX/getSpeed(), snakeY :snake[snake.length-1].snakeY + directionY/getSpeed(), directionX: directionX, directionY: directionY};

    distanceMoved += (Math.abs(directionX) + Math.abs(directionY))/getSpeed();
    if(distanceMoved >= snakeSize) {
        score += scorePerSecond;
        for (let i = 0; i < snake.length - 1; i++){
            snake[i] = {snakeX: snake[i].snakeX, snakeY: snake[i].snakeY, directionX: snake[i+1].directionX, directionY: snake[i+1].directionY};
        }
        directionX = newDirectionX;
        directionY = newDirectionY;
        distanceMoved = 0;
        if(shouldGrow) {
            setTimeout(function () {
                console.log("grow");
                snake.unshift({snakeX: snake[0].snakeX-snake[0].directionX, snakeY: snake[0].snakeY-snake[0].directionY, directionX: snake[0].directionX, directionY: snake[0].directionY});
            }, getSpeed()*updateInterval+updateInterval);
            console.log("growded");
            shouldGrow = false;
        }
    }


}
function kolisionDetection() {
    for (let i = 0; i < snake.length; i++) {
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
        else if(snake[snake.length-1].snakeX < -10 || snake[snake.length-1].snakeX > size-snakeSize ||
            snake[snake.length-1].snakeY < -10 || snake[snake.length-1].snakeY > size-snakeSize) {
            snakeGameOver = true;
        }
    }

    for (let i = 1; i < snake.length -2; i++){
        if (snake[snake.length-1].snakeX === snake[i].snakeX && snake[snake.length-1].snakeY === snake[i].snakeY){
            snakeGameOver = !snakeGameOver;
        }
    }



}

function KD(event) {
    //console.log(event.keyCode);
    let keyPress = event.keyCode;
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
    }while (applePosition.x < 0);
    apple.appleX = applePosition.x;
    apple.appleY = applePosition.y;
    shouldGrow = true;
    score += scorePerApple;
}

function lost() {

    if (snakeGameOver){
        snakeCtx.clearRect(0,0,size,size);
        snakeCtx.drawImage(backgroundImg,0,0,size,size);

        wallHack = false;
        invert = false;
        snakePlayMenu.style.display = 'grid';
        document.getElementById("snake-playText").textContent = "Game Over!";
        document.getElementById("snake-play").textContent= "Play again?";

        clearInterval(interval);
        snakeCtx.fillStyle = '#eee8d5';
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
    }while (powerUpPosition.x < 0);
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
            console.log("test");
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            invert = true;
            spawnPowerUpTimer = setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

    }}


}

function getRandomLocation(checkForApple, checkForPowerUp) {
    let x = Math.floor(Math.random() * Math.floor(size/snakeSize-0.5)) * snakeSize;
    let y = Math.floor(Math.random() * Math.floor(size/snakeSize-0.5)) * snakeSize;
    for(let i = 0; i < snake.length; i++) {
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