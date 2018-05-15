class Jedi 
{
    constructor() {
        this.name = "";
        this.imageURL = "";
        this.attackValue = "";
        this.healthValue = "";

    }
}

var CardHelper ={
    cardToHtml(jediName,jediImage,attackValue,healthValue) 
    {
        var parentDiv = $('<div class="card">');
        parentDiv.addClass(jediName.split(' ')[0]);
        
        var childHeading = $('<h1>');
        childHeading.html(jediName);

        var childImage = $('<img>');
        childImage.attr("src",jediImage);

        var childchildContainer = $('<div class="container">')
        var attackHeader = $('<h4 class="Attack">');
        attackHeader.html("Attack Value : " +attackValue);
        
        var healthHeader = $('<h4 class="Health">');
        healthHeader.html("Health Value : " +healthValue);

        var card =  parentDiv;
        card.append(childHeading)
        card.append(childImage);
        childchildContainer.append(attackHeader);
        childchildContainer.append(healthHeader);
        card.append(childchildContainer);
        return card;
    }
}

var gameBoard = {

    jedis: [],

    populateStartGame: function () {
        var luke = new Jedi();
        luke.name = "Luke Skywalker";
        luke.imageURL = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngmart.com%2Ffiles%2F2%2FLuke-Skywalker-PNG-Transparent-Image.png&f=1";
        luke.attackValue = 20;
        luke.healthValue = 180;
        this.jedis.push(luke);

        var Darthvadar = new Jedi();
        Darthvadar.name = "Darth Vadar";
        Darthvadar.imageURL = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Fpngimg.com%2Fuploads%2Fdarth_vader%2Fdarth_vader_PNG13.png&f=1";
        Darthvadar.attackValue = 20;
        Darthvadar.healthValue = 200;
        this.jedis.push(Darthvadar);

        var JarJar = new Jedi();
        JarJar.name = "Jar Jar";
        JarJar.imageURL = "https://images.duckduckgo.com/iu/?u=http%3A%2F%2Ffc00.deviantart.net%2Ffs70%2Ff%2F2013%2F284%2F2%2Ff%2Fjar_jar_binks_png_by_biebersays-d6q12yz.png&f=1";
        JarJar.attackValue = 5;
        JarJar.healthValue = 100;
        this.jedis.push(JarJar);

        var Palpatine = new Jedi();
        Palpatine.name = "Palpatine";
        Palpatine.imageURL = "https://images.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fvsbattles%2Fimages%2F6%2F64%2FDarth_Sidious_Render.png%2Frevision%2Flatest%3Fcb%3D20170810182252&f=1";
        Palpatine.attackValue = 25;
        Palpatine.healthValue = 200;
        this.jedis.push(Palpatine);


    },

    displayStartChoises: function () {
        var game = $("#startPosition");
        const grid = $('<section>');
        grid.attr('class', 'col-md-12');
        grid.attr('style', 'display: flex;');
        var index=0;
        this.jedis.forEach(item => {
            var card = $('<span>');
            card.attr("value",index);
            index++;
            card.append(CardHelper.cardToHtml(item.name,item.imageURL,item.attackValue,item.healthValue));
            grid.append(card);
        });
        game.append(grid);

    },

    displayHumanPlayer: function(card){
        var game = $("#yourChoise");
        game.html(CardHelper.cardToHtml(card.name,card.imageURL,card.attackValue,card.healthValue))

    },

    displayEnemyPlayer: function(card){
        var game = $("#yourenemyChoise");
        game.html(CardHelper.cardToHtml(card.name,card.imageURL,card.attackValue,card.healthValue))

    },

    displayEnemies: function(enemyArray)
    {
        var game = $("#enemyChoiseLeft");
        const grid = $('<section>');
        grid.attr('class', 'col-md-12');
        grid.attr('style', 'display: flex;');
        var index=0;
        enemyArray.forEach(item => {
            var card = $('<span>');
            card.attr("value",index);
            index++;
            card.append(CardHelper.cardToHtml(item.name,item.imageURL,item.attackValue,item.healthValue));
            grid.append(card);
        });
        game.html(grid);

    },

    updateGamePlay: function(userJedi,enemyJedi){
        this.displayEnemyPlayer(enemyJedi);
        this.displayHumanPlayer(userJedi);
    },

    updateLog: function(userType,attackStrength){
        var updateLog = $('#updateLog');
        updateLog.append(userType +" : Attacks with a Value : " + attackStrength +"<br>");
    },
     
    resetTheGame: function()
    {
        $("#updateLog").hide();
        $("#yourChoise").hide();
        $("#yourenemyChoise").hide();
        $("#enemyChoiseLeft").hide();

        this.jedis= [];
        $("#updateLog").html("");
        $("#startPosition").html("");
        $("#yourChoise").html("");
        $("#yourenemyChoise").html("");
        $("#enemyChoiseLeft").html("");

        $("#updateLog").show();
        $("#yourChoise").show();
        $("#yourenemyChoise").show();
        $("#enemyChoiseLeft").show();       
        $("#buttonChoise").show();
 
        this.populateStartGame();
        this.displayStartChoises();

    }
}