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
        var letter = new Sprite(45, 50);
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

    function presentLetters(){
	var letter = createLetters();
	moveLetters(letter);
    }

    function createAvatar(){
        var avatar = new Sprite(50, 54);
        avatar.image = game.assets["img/avatar.png"];
        avatar.x = width/2;
        avatar.y = height - 75;
        avatar.frame = 50;
	game.rootScene.addChild(avatar);

	return avatar;
    }

    function moveAvatar(avatar){
	avatar.addEventListener("enterframe", function(){
	    var speed = 6;
	    if (game.input.right){
		avatar.x += speed;
	    } else if (game.input.left){
		avatar.x -= speed;
	    }
	});
    }

    // Add all images
    game.preload("img/letters/a.png", "img/letters/b.png", "img/avatar.png");
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

	var avatar = createAvatar();
	moveAvatar(avatar);
	window.setInterval(presentLetters, 2000);
    };
    game.start();
};
