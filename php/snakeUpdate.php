<?php

    $connection = mysqli_connect("localhost", "root", "", "highscore") or die("Could not connect");
    mysqli_select_db($connection, "highscore") or die ("Could not select database");

    $stmt = $connection->prepare("UPDATE snake SET snakeName=?, snakeScore=? WHERE snakeId=?");
    $stmt->bind_param("sii", $name, $score, $id);

    $name = $_POST['name'];
    $score = $_POST['score'];
    $id = $_POST['id'];

    $stmt->execute();

?>
