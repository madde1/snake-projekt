function pongDatabase() {
    pongContent = '';

    xmlhttp = new XMLHttpRequest();
    url = 'php/pongHighscore.php';


    xmlhttp.open("GET", url , true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {

            pongData = JSON.parse(this.responseText);

            console.log(pongData);

            for (let y in pongData) {
                pongContent += '<li>';
                pongContent += pongData[y].pongName;
                pongContent += ' ';
                pongContent += pongData[y].pongScore;
                pongContent += '</li>';
            }

            document.getElementById("pongHighscoreList").innerHTML = pongContent;
        }
    }
}


function checkPongHighscore(score) {
    if (score > pongData[2].pongScore) {
        pongData[2].pongName = document.getElementById("formInput").value;
        pongData[2].pongScore = score;


        pongData.sort(sort_by('pongScore', true, parseInt));

        for(var i =0;i < pongData.length; i++)
        {
            $.ajax({
                type:"POST",
                url:"php/pongUpdate.php",
                data: {
                    id: i+1,
                    name: pongData[i].pongName,
                    score: pongData[i].pongScore
                }
            });
        }

        pongDatabase();
    }

    pongMenu.style.display = 'grid';
    document.getElementById("pong-playText").textContent = "Game Over!";
    document.getElementById("pong-Play").textContent= "Play again?";
}

