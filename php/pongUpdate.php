<?php
    include("connection.php");

    $stmt = $connection->prepare("UPDATE pong SET pongName=?, pongScore=? WHERE pongId=?");
    $stmt->bind_param("sii", $name, $score, $id);

    $name = $_POST['name'];
    $score = $_POST['score'];
    $id = $_POST['id'];

    $stmt->execute();

?>
