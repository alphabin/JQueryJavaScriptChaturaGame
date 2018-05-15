gameBoard.populateStartGame();
gameBoard.displayStartChoises();


$(document).ready(function () {
    $("#hiddenButton").hide();
    var playerJedi = "";
    var enemyArray = "";
    var enemyJedi = "";
    var winCount = 0;

    $("#startPosition").on('click', 'span', function () {
        var index = $(this).attr("value");
        playerJedi = gameBoard.jedis[index];
        gameBoard.displayHumanPlayer(playerJedi);
        //Selects a player
        $("#startPosition").empty();
        gameBoard.jedis.splice(index, 1);
        enemyArray = gameBoard.jedis;
        //Display the enemies
        gameBoard.displayEnemies(enemyArray);
    })

    $("#enemyChoisesArray").on('click', 'span', function () {
        if (enemyJedi == "") {
            var index = $(this).attr("value");
            enemyJedi = enemyArray[index];
            gameBoard.displayEnemyPlayer(enemyJedi);
            enemyArray.splice(index, 1);
            enemyArray = enemyArray;
            //Display the enemies
            gameBoard.displayEnemies(enemyArray);
        }

    })


    $("#buttonChoise").on('click', 'button', function () {
        console.log("Attack Mode!");

        var attackUserPoints = playerJedi.attackValue;
        console.log(attackUserPoints);
        var enemyUserPoints = enemyJedi.attackValue;
        console.log(enemyUserPoints);

        if(typeof(attackUserPoints) == 'undefined' || typeof(enemyUserPoints) == 'undefined')
        {
            return;
        }
        enemyJedi.healthValue -= attackUserPoints;
        gameBoard.updateLog("User " + playerJedi.name, attackUserPoints);
        //Subract from the enemy
        gameBoard.updateGamePlay(playerJedi, enemyJedi);

        if (enemyJedi.healthValue <= 0) {
            winCount++;
            enemyJedi = "";
            $("#updateLog").empty();
            $("#yourenemyChoise").empty();
            playerJedi.attackValue += playerJedi.attackValue;
            if(winCount>=3)
            {
                $("#updateLog").html("<h1>WINNER !! " + playerJedi.name + " has WON THE GAME "+" </h1>");
                $("#hiddenButton").show();
            }
            return false;
        }

        //Computer 
        playerJedi.healthValue -= enemyUserPoints;

        if (playerJedi.healthValue <= 0) {

            $("#updateLog").html("<h1>GAME OVER!! " + playerJedi.name + " has lost to " + enemyJedi.name + " </h1>");
            $("#hiddenButton").show();
            $("#buttonChoise").hide();     
            return false;
        }

        gameBoard.updateLog("Enemy :" + enemyJedi.name, enemyUserPoints);
        gameBoard.updateGamePlay(playerJedi, enemyJedi);

    })

    $("#buttonReset").on('click','button',function(){
        playerJedi = "";
        enemyArray = "";
        enemyJedi = "";
        winCount = 0;
        $("#hiddenButton").hide();
        gameBoard.resetTheGame();

    })
})

