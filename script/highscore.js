let xmlhttp, data, url, newContent = "";
let snakeHighscoreV = [];
let pongHighscoreV = [];

document.getElementById("snakeButton").addEventListener("click", function() {
    newContent = '';
    xmlhttp = new XMLHttpRequest();
    url = 'php/snakeHighscore.php';


    xmlhttp.open("GET", url , true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);

            for (let y in data) {
                snakeHighscoreV[y] = data[y].snakeScore;

                newContent += '<li>';
                newContent += data[y].snakeName;
                newContent += ' ';
                newContent += data[y].snakeScore;
                newContent += '</li>';
            }
            console.log(snakeHighscoreV[2]);
            document.getElementById("snakeHighscoreList").innerHTML = newContent;
        }
    }
});

document.getElementById("pongButton").addEventListener("click", function() {
    newContent = '';

    xmlhttp = new XMLHttpRequest();
    url = 'php/pongHighscore.php';


    xmlhttp.open("GET", url , true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);

            for (let y in data) {
                pongHighscoreV[y] = data[y].pongScore;

                newContent += '<li>';
                newContent += data[y].pongName;
                newContent += ' ';
                newContent += data[y].pongScore;
                newContent += '</li>';
            }

            console.log(pongHighscoreV[2]);
            document.getElementById("pongHighscoreList").innerHTML = newContent;
        }
    }
});

function checkPongHighscore(score) {
    if(score > pongHighscoreV){

    }
}