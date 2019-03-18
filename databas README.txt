skapa databasen:

CREATE DATABASE Highscore;

skapa table:

CREATE TABLE snake(
  snakeId INT NOT NULL AUTO_INCREMENT,
  snakeName VARCHAR(50),
  snakeScore INT(100),
  primary key (snakeId)
);

sätt in dummy värden:

INSERT INTO snake(SNAKENAME, SNAKESCORE)
VALUE ("Adam",1000),("Bertil",750),("Cecilia",500);

i php filen skriv i följande:

$link = mysqli_connect("localhost", "användarnamn", "lösenord", "databasens namn");