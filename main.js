enchant();
window.onload = function() {
    var game = new Game(320, 320);

    function moveLetters(letter){
	//Move letters
        letter.addEventListener("enterframe", function(){
            this.y += 2;
            this.frame = this.age % 2 + 16;
        });

	// remove letter from screen
        //letter.addEventListener("touchstart", function(){
            //game.rootScene.removeChild(letter);
        //});
}
    function createLetters(){
	//Letters
        var letter = new Sprite(50, 50);
        letter.image = game.assets["img/letters/a.png"];
        letter.x = 20;
        letter.y = 30;
        letter.frame = 50;
	game.rootScene.addChild(letter);
	moveLetters(letter)
    }

    game.preload("img/letters/a.png");
    game.onload = function() {
        var label = new enchant.Label();
	//After calculating score, use it here
        label.text = "Score: ";
        label.width = 128;
        label.height = 64;
	//Set the desired location
	//Determine screen size
        label.font = "20px 'Arial'";
        game.rootScene.addChild(label);

	createLetters()
    }
    game.start();
}
