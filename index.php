﻿<?php
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
</head>
<body onkeydown="KD(event)">
<img src="img/apple.png" id="appleImg">
<h1>Lady Snake</h1>

<div class="grid">
    <div class="item1">
        <div class="highScore">
            <h2>High Score</h2>
            <?php include"highscore.php";?>
        </div>
    </div>
    <div class="item2">
        <div id="play-container">
            <div id="buttonDiv">
                <p id="playText">Click play to start the game, Good Luck!</p>
                <button id="play" onclick="init()">Play?</button>
            </div>
            <canvas id="canvas" width="500" height="500"></canvas>
        </div>
    </div>
    <div class="item3">
        <h2>Meny</h2>
        <button class="collapsible">Regler</button>
        <div class="content">
            <ul>
                <ul>
                    <li>10 poäng för varje äpple.</li>
                    <li>Powerups varar i 10 sekunder</li>
                    <li>Åker man in i en vägg dör man</li>
                    <li>Det kan aldrig vara mer än 1 powerup på spelplanen samtidigt.</li>
                </ul>
            </ul>
        </div>
        <button class="collapsible">PowerUps</button>
        <div class="content">
            <p>Wallhack - Ormen kan åka genom väggarna</p>
        </div>
    </div> <button class="collapsible">Styra Ormen</button>
    <div class="content">
        <p>För att styra ormen används tangenterna W A S D</p>
    </div>

        <img id="snake" src="snake.png" width="300" height="200">
    </div>
</div>
<script src="script/menu.js"></script>
<script src="script/snake.js"></script>
</body>
</html>
