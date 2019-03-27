<?php
//ta bort lösenordet
    $link = mysqli_connect("localhost", "root", "pussel91", "highscore");

    if (mysqli_connect_error()){
        die ("Error! Can't connect");
    }

    $query = 'SELECT * FROM pong';
    $result = mysqli_query($link,$query);


    while($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode ( $data );

?>
