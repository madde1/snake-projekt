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
function checkPongHighscore() {
    if (player1Score > pongData[2].pongScore) {
        document.getElementById("pong-Menu").style.display = "none";
        document.getElementById("pongForm").style.display = "block";

        document.getElementById("pongInput").addEventListener("click", pongListener)
    }
    else {
        document.getElementById("pong-Menu").style.display = 'grid';
        document.getElementById("pong-playText").textContent = "Game Over!";
        document.getElementById("pong-Play").textContent= "Play again?";
    }
}

function pongInputHighscore() {

    document.getElementById("pongForm").style.display = "none";

    pongData[2].pongName = document.getElementById("pongFormInput").value;
    pongData[2].pongScore = player1Score;

    pongData.sort(sort_by('pongScore', true, parseInt));

    for(let j = 0; j < pongData.length; j++)
    {
        $.ajax({
            type:"POST",
            url:"php/pongUpdate.php",
            data: {
                id: j+1,
                name: pongData[j].pongName,
                score: pongData[j].pongScore
            }
        });
    }

    pongDatabase();

    document.getElementById("pong-Menu").style.display = 'grid';
    document.getElementById("pong-playText").textContent = "Well played!";
    document.getElementById("pong-Play").textContent= "Play again?";


    document.getElementById("pongFormInput").value = "";

    document.getElementById("pongInput").removeEventListener("click", pongListener);
}

let pongListener = function () {
    pongInputHighscore();
};

