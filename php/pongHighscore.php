<?php
    include("connection.php");

    $data = array();

    if (mysqli_connect_error()){
        die ("Error! Can't connect");
    }

    $query = 'SELECT * FROM pong';
    $result = mysqli_query($connection,$query);

    while($row = mysqli_fetch_assoc($result))
    {
        $data[] = $row;
    }
    echo json_encode ( $data );

?>
