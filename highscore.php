<?php
//ta bort lösenordet
    $link = mysqli_connect("localhost", "root", "Polemistis321", "Highscore");

    if (mysqli_connect_error()){
        die ("Error! Can't connect");
    }

    $query = 'SELECT * FROM snake';
    $result = mysqli_query($link,$query);
        if (mysqli_num_rows($result) >0){
            while($row = mysqli_fetch_assoc($result)){
            echo $row["snakeName"]. " " .$row["snakeScore"]. "<br>";
        }
    }
?>



