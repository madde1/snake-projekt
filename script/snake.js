let snakeCanvas,snakeCtx,interval;
let updateInterval = 10;
let size = 500;
let scorePerSecond = 0.1;
let scorePerApple = 10;
let scorePerPowerUp = 20;
let snake;
let distanceMoved;
let apple;
let appleSize;
let appleMaxSize;
let snakeSize;
let shouldGrow = false;
let snakeHeadExtraSize = 8;
let directionX,directionY;
let newDirectionX, newDirectionY;
let snakeGameOver;
let score = 0;
let cantMove = false;
let posistionPowerUpp;
let powerUpText;
let powerupSize;
let powerupMaxSize;
let invert;
let wallHack;
let powerUppChoice;
let spawnPowerUpTimer;
let appleImg = document.getElementById('appleImg');
let powerUppImg = document.getElementById('poweruppImg');
let backgroundMusic = new sound('sound/backgroundMusic.mp3');
let eatSound = new sound('sound/eat.mp3');
let powerSound = new sound('sound/powerup.mp3');

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
     powerUpText = "No Power Up";
     powerupSize = powerupMaxSize = snakeSize;
     apple= {appleX: getRandomLocation().x, appleY: getRandomLocation().y};
     appleSize = appleMaxSize = snakeSize;
     backgroundMusic.sound.loop = true;
     backgroundMusic.play();

    snake.push({snakeX: snakeSize, snakeY: 0, directionX: directionX, directionY: directionY});
    snake.unshift({snakeX: 0, snakeY: 0, directionX: directionX, directionY: directionY});

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
    snakeCtx.shadowColor = "#FFFFFF";
    snakeCtx.font = "30px Luckiest Guy";
    snakeCtx.textAlign = "right";
    snakeCtx.fillText("Score: " + Math.floor(score), size-10, 30);
    snakeCtx.font = "20px Luckiest Guy";
    snakeCtx.fillText(powerUpText, size-10, 50);

    snakeCtx.shadowColor = "#000000";
    snakeCtx.fillStyle= "#41FF00";

    snakeCtx.fillStyle= "#e60a00";
    snakeCtx.drawImage(appleImg,apple.appleX,apple.appleY, appleSize, appleSize);
    if(appleSize < appleMaxSize) {
        appleSize += (appleMaxSize - appleSize) * 0.03;
    }
    snakeCtx.fillStyle= "#ffda00";

    snakeCtx.drawImage(powerUppImg,posistionPowerUpp.powerUppX,posistionPowerUpp.powerUppY,powerupSize,powerupSize);
    if(powerupSize < powerupMaxSize) {
        powerupSize += (powerupMaxSize - powerupSize) * 0.05;
    }

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
                snake.unshift({snakeX: snake[0].snakeX-snake[0].directionX, snakeY: snake[0].snakeY-snake[0].directionY, directionX: snake[0].directionX, directionY: snake[0].directionY});
            }, getSpeed()*updateInterval+updateInterval);
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
    }

    if(snake[snake.length-1].snakeX < -10 || snake[snake.length-1].snakeX > size-snakeSize ||
        snake[snake.length-1].snakeY < -10 || snake[snake.length-1].snakeY > size-snakeSize) {
        snakeGameOver = true;
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
    eatSound.play();
    appleSize = 0;
    apple.appleX = applePosition.x;
    apple.appleY = applePosition.y;
    shouldGrow = true;
    score += scorePerApple;
}

function lost() {

    if (snakeGameOver){
        backgroundMusic.stop();
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
    powerUpText = "No Power Up";
    powerupSize = 0;
    let powerUpPosition;
    do {
        powerUpPosition = getRandomLocation(true, false);
    }while (powerUpPosition.x < 0);
    posistionPowerUpp.powerUppX = powerUpPosition.x;
    posistionPowerUpp.powerUppY = powerUpPosition.y;
}
function powerUpp() {
    if (snake[snake.length - 1].snakeX === posistionPowerUpp.powerUppX && snake[snake.length - 1].snakeY === posistionPowerUpp.powerUppY) {
        powerSound.play();
        score += scorePerPowerUp;
        powerUppChoice =  Math.floor(Math.random() * 2) + 1;
    switch (powerUppChoice) {
        case 1:
            powerUpText = "Wall hack";
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            wallHack = true;
            spawnPowerUpTimer = setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break;

        case 2:
            powerUpText = "Invert";
            posistionPowerUpp.powerUppX = -100;
            posistionPowerUpp.powerUppY = -100;
            invert = true;
            spawnPowerUpTimer = setTimeout(spawnPowerUpp, 10000);
            setTimeout(timeoutPowerUpp, 10000);
            break


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
function sound(src) {
    this.sound = document.createElement("AUDIO");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}