skapa databasen:

CREATE DATABASE Highscore;

skapa table:

CREATE TABLE snake(
  snakeId INT NOT NULL AUTO_INCREMENT,
  snakeName VARCHAR(50),
  snakeScore INT(100),
  primary key (snakeId)
);

s�tt in dummy v�rden:

INSERT INTO snake(SNAKENAME, SNAKESCORE)
VALUE ("Adam",1000),("Bertil",750),("Cecilia",500);

i php filen skriv i f�ljande:

$link = mysqli_connect("localhost", "anv�ndarnamn", "l�senord", "databasens namn");