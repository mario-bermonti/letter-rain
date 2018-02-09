enchant();
window.onload = function() {
    var width = 320;
    var height = 320;
    var game = new Game(width, height);
    var presentedLetters = [];
    var letters = ["a", "b"];
    var currentLetter;
    var score = 0;

    function selectRandomLetter(){
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

    function presentLetterName(){
	// Determine the current letter to play its audio
	currentLetter = selectRandomLetter();
	console.log("correct letter: ", currentLetter);
	// To do:
	//When all audio is included, change next line
	var currentLetter2 = "a.wav";
	var sound = "audio/" + currentLetter2;
	game.sound = game.assets[sound];
	game.sound.play();
    }

    function createLetters(){
	// Displays words on screen
	var selectedLetter = selectRandomLetter();
        var letter = new Sprite(50, 65);
	letter.name = selectedLetter;
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
	letter = createLetters();
	presentedLetters.push(letter);
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

    function determineScore(letterName, label){
	if(letterName == currentLetter){
	    score += 1;
	    presentLetterName();
	} else{
	    score -=1;
	}
	updateScore(label);
    }

    function detectIfHit(avatar, label){
	for(var letter in presentedLetters){
	    if(avatar.within(presentedLetters[letter], 35)){
		determineScore(presentedLetters[letter].name, label);
	    }
	}
    }

    function updateScore(label){
	label.text = "Score: " + score;
    }

    function presentScore(){
        var label = new enchant.Label();
	//After calculating score, use it here
        label.text = "Score: " + score;
        label.width = 128;
        label.height = 64;
	// TO DO
	//Set the desired location
	//Determine screen size
        label.font = "20px 'Arial'";
        game.rootScene.addChild(label);

	return label;
    }

    // Add all images
    // Add all audio
    game.preload("img/letters/a.png", "img/letters/b.png", "img/avatar.png", "audio/a.wav");
    game.onload = function() {
	var scoreLabel = presentScore();
	var avatar = createAvatar();
	moveAvatar(avatar);
	presentLetterName();
	window.setInterval(presentLetters, 2000);
	//800ms so it doesn't detect twice the same hit for a given letter
	window.setInterval(detectIfHit, 1000, avatar, scoreLabel);
    };
    game.start();
};
