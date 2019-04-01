function snakeDatabase() {
    snakeContent = '';
    xmlhttp = new XMLHttpRequest();
    url = 'php/snakeHighscore.php';


    xmlhttp.open("GET", url , true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {
            snakeData = JSON.parse(this.responseText);

            for (let y in snakeData) {
                snakeContent += '<li>';
                snakeContent += snakeData[y].snakeName;
                snakeContent += ' ';
                snakeContent += snakeData[y].snakeScore;
                snakeContent += '</li>';
            }
            document.getElementById("snakeHighscoreList").innerHTML = snakeContent;
        }
    }
}
function checkSnakeHighscore(score) {
    console.log(snakeData);
    if (score > snakeData[2].snakeScore) {
        snakeData[2].snakeName = document.getElementById("formInput").value;
        snakeData[2].snakeScore = score;


        snakeData.sort(sort_by('snakeScore', true, parseInt));

        for(let i =0;i < snakeData.length; i++)
        {
            $.ajax({
                type:"POST",
                url:"php/snakeUpdate.php",
                data: {
                    id: i+1,
                    name: snakeData[i].snakeName,
                    score: snakeData[i].snakeScore
                }
            });
        }

        snakeDatabase();
    }

    snakePlayMenu.style.display = 'grid';
    document.getElementById("snake-playText").textContent = "Game Over!";
    document.getElementById("snake-play").textContent= "Play again?";
}
