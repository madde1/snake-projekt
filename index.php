<?php
/**
 * Created by PhpStorm.
 * User: simon
 * Date: 16/03/2019
 * Time: 20:20
 */
?>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Luckiest+Guy" rel="stylesheet">
    <title>Lady Snake</title>
    <link href="style/snake.css" type="text/css" rel="stylesheet">
    <link href="style/menu.css" type="text/css" rel="stylesheet">
    <link href="style/pong.css" type="text/css" rel="stylesheet">
</head>
<body onkeydown="KD(event)">
<section id="startBackground">
</section>
<section>
    <div id="startPage">
        <button id="pongButton" onClick="startPong()">Pong</button>
        <button id="snakeButton" onClick="startSnake()">Snake</button>
    </div>
</section>

<div id="snake">
    <h1>Lady Snake</h1>
    <button id="return" onclick="stopSnake()">Return to main page</button>
    <div class="grid">

        <div class="item1">
            <div id="snakeHighScore">
                <h2>High Score</h2>
                <ol id="snakeHighscoreList"></ol>
            </div>
            <div id="styraOrmen">
                <h2>Styra Ormen</h2>
                <p>Använd tangenterna WASD för att styra ormen</p>
            </div>
            <img id="wasdImg" src="img/arrows.png" width="350" height="200">
        </div>

        <div class="item2">
            <div id="snake-play-container">
                <div id="snake-buttonDiv">
                    <p id="snake-playText">Click play to start the game, Good Luck!</p>
                    <button id="snake-play" onclick="snakeInit()">Play?</button>
                </div>
                <div id="snakeForm">
                    <form id="snakeStartForm">
                        <h2 id="snakeFormH2">You beat a highscore!</h2>
                        <input id=snakeFormInput type="text" name="namn" placeholder="namn" value="">
                        <button id="snakeInput" type="button" class="submitHighscore">Submit!</button>
                    </form>
                </div>

                <canvas id="snakeCanvas" width="500" height="500"></canvas>
            </div>
            <div id="soundSettingsBox">
                <span id="backgroundMusicVolumeText">Bakgrundsmusik:</span><input type="range" id="backgroundMusicVolume" min="0" max="1" step="0.05" value="1">
                <span id="soundEffectsVolumeText">Ljudeffekter:</span><input type="range" id="soundEffectsVolume" min="0" max="1" step="0.05" value="1">
            </div>
        </div>

        <div class="item3">
            <h2>Meny</h2>
            <button class="collapsible">Regler</button>
            <div class="content">
                <ul>
                    <li>10 poäng för varje äpple.</li>
                    <li>Powerups varar i 10 sekunder</li>
                    <li>Åker man in i en vägg dör man</li>
                    <li>Det kan aldrig vara mer än 1 powerup på spelplanen samtidigt.</li>
                </ul>
            </div>
            <button class="collapsible">PowerUps</button>
            <div class="content">
                <p>Wallhack - Ormen kan åka genom väggarna</p>
                <p>Invert - Kontrollerna är omvända. Vänster -> Höger, Upp -> Ner osv.</p>
            </div>
            <img id="snakeImg" src="img/snake.png" width="300" height="200">
        </div>
    </div>
    <img src="img/snakeHeadUpp.png" id="snakeHeadUpp">
    <img src="img/snakeHeadRight.png" id="snakeHeadRight">
    <img src="img/snakeHeadDown.png" id="snakeHeadDown">
    <img src="img/snakeHeadLeft.png" id="snakeHeadLeft">
    <img src="img/snakeBody.png" id="snakeBody">
    <img src="img/redApple.png" id="appleImg">
    <img src="img/powerUpp.png" id="poweruppImg">
    <img src="img/background.jpg" id="backgroundImg">
</div>



<div id="pong">
    <h1>Pong</h1>
    <button class="Return" onclick="stopPong()">Return to main page</button>
    <div class="grid">

        <div class="item1">
            <div id="pongHighScore">
                <h2>High Score</h2>
                <ol id="pongHighscoreList"></ol>
            </div>
            <div id="styraPaddle">
                <h2>Styra Vänstra Paddel</h2>
                <p>Rör musen upp/ner för att styra vänstra paddeln</p>
            </div>
            <img id="pongControls" src="img/pongControls.png" width="200" height="200">
        </div>

        <div class="item2">
            <div id="pong-play-container">
                <div id="pong-Menu">
                    <p id="pong-playText">Click play to start the game, Good Luck!</p>
                    <button id="pong-Play" onclick="pongInit()">Play?</button>
                </div>
                <div id="pongForm">
                    <form id="pongStartForm">
                        <h2 id="pongFormH2">You beat a highscore!</h2>
                        <input id=pongFormInput type="text" name="namn" placeholder="namn" value="">
                        <button id="pongInput" type="button" class="submitHighscore">Submit!</button>
                    </form>
                </div>
                <canvas id="pongCanvas" width="500" height="500"></canvas>
            </div>
        </div>

        <div class="item3">
            <h2>Meny</h2>
            <button class="collapsible">Regler</button>
            <div class="content">
                <ul>
                    <li>Går bollen förbi dig och i väggen bakom dig förlorar du ett liv</li>
                    <li>Får du den förbi motståndaren och i väggen bakom får du 1 poäng</li>
                    <li>Du har 3 liv på dig att få så många poäng som möjligt</li>
                </ul>
            </div>
            <img id="snakeImg" src="img/pong.png" width="300" height="300">
        </div>
    </div>
    <img src="img/heart.png" id="playerFullLifeImg">
    <img src="img/emptyHeart.png" id="playerEmptyLifeImg">
</div>

<script src="script/jquery-3.3.1.min.js"></script>
<script src="script/highscore.js"></script>
<script src="script/pongHighscore.js"></script>
<script src="script/snakeHighscore.js"></script>
<script src="script/game.js"></script>
<script src="script/volume.js"></script>
<script src="script/menu.js"></script>
<script src="script/snake.js"></script>
<script src="script/pong.js"></script>
</body>
</html>
