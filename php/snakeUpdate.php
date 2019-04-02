<?php
    include("connection.php");

    $stmt = $connection->prepare("UPDATE snake SET snakeName=?, snakeScore=? WHERE snakeId=?");

    $name = $_POST['name'];
    $score = $_POST['score'];
    $id = $_POST['id'];

    $stmt->bind_param("sii", $name, $score, $id);
    $stmt->execute();

?>
