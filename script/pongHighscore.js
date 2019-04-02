function pongDatabase() {
    let pongContent = '';
    xmlhttp = new XMLHttpRequest();
    url = 'php/pongHighscore.php';


    xmlhttp.open("GET", url , true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) {
            pongData = JSON.parse(this.responseText);

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
    console.log(pongData);
    if (score > pongData[2].pongScore) {
        document.getElementById("pongForm").style.display = "block";

        document.getElementById("pongInput").addEventListener("click", function(){
            pongInputHighscore(score);
        });
    }
    else {
        document.getElementById("pong-Menu").style.display = 'grid';
        document.getElementById("pong-playText").textContent = "Game Over!";
        document.getElementById("pong-Play").textContent= "Play again?";
    }
}

function pongInputHighscore(score) {

    document.getElementById("pongForm").style.display = "none";

    pongData[2].pongName = document.getElementById("pongFormInput").value;
    pongData[2].pongScore = score;

    console.log(document.getElementById("pongFormInput").value);
    console.log(score);


    pongData.sort(sort_by('pongScore', true, parseInt));

    for(let i =0;i < pongData.length; i++)
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

    document.getElementById("pong-Menu").style.display = 'grid';
    document.getElementById("pong-playText").textContent = "Well played!";
    document.getElementById("pong-Play").textContent= "Play again?";
}
