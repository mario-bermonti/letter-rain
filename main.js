enchant();
window.onload = function() {
    var width = 320;
    var height = 320;
    var game = new Game(width, height);

    function selectRandomLetter(){
	var letters = ["a", "b"];
	var min = 0;
	var max = letters.length;
	var selectedLetter = letters[Math.floor(Math.random() * (max - min)) + min];

	return selectedLetter;
    }

    function getRandomCoords(){
	//Return coordinates. Inclusive min and max
	var min = 0;
	var max = 320 - 50;
	var coords = Math.floor(Math.random() * (max - min)) + min;

	return coords;
    }

    function createLetters(){
	var selectedLetter = selectRandomLetter();
        var letter = new Sprite(50, 50);
	var letterPath = "img/letters/" + selectedLetter + ".png";
        letter.image = game.assets[letterPath];
        letter.x = getRandomCoords();
        letter.y = -30;
        letter.frame = 50;
	game.rootScene.addChild(letter);

	return letter;
    }

    function moveLetters(letter){
        letter.addEventListener("enterframe", function(){
            this.y += 2;
            this.frame = this.age % 2 + 16;
        });
}

    function destroyLetter(letter){
        letter.addEventListener("touchstart", function(){
            game.rootScene.removeChild(letter);
        });
    }

    // Add all images
    game.preload("img/letters/a.png", "img/letters/b.png");
    game.onload = function() {
        var label = new enchant.Label();
	//After calculating score, use it here
        label.text = "Score: ";
        label.width = 128;
        label.height = 64;
	// TO DO
	//Set the desired location
	//Determine screen size
        label.font = "20px 'Arial'";
        game.rootScene.addChild(label);

        //game.addEventListener("enterframe", function(){
	    var letter = createLetters();
	    moveLetters(letter);
        //});
    };
    game.start();
};
