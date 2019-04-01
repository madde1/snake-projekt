<?php

    $connection = mysqli_connect("localhost", "root", "", "highscore") or die("Could not connect");
    mysqli_select_db($connection, "highscore") or die ("Could not select database");

    $data = array();

    if (mysqli_connect_error()){
        die ("Error! Can't connect");
    }

    $query = 'SELECT * FROM snake';
    $result = mysqli_query($connection,$query);

    while($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode ( $data );

?>
