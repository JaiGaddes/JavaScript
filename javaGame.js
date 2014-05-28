// Author: JaiGaddes
// Date:   28 May 2014

// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {
	bgReady = true;
};

bgImage.src = "background.png";

//Player image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "player.png";

//Goblin image
var goblinReady = false;
var goblinImage = new Image();
goblinImage.onload = function () {
	goblinReady = true;
};
goblinImage.src = "goblin.png";

//Game objects
var player = {
	speed: 256
};
var goblin = {};
var goblinsCaught = 0;

//Controls handler
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Reset the game when the player catches a goblin
var reset = function () {
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;

//Throw the goblin somewhere on the screen randomly
	goblin.x = 32 + (Math.random() * (canvas.width - 64));
	goblin.y = 32 + (Math.random() * (canvas.height - 64));
};

//Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		player.y += player.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		player.x += player.speed * modifier;
	}

//Check collision
	if (
		player.x <= (goblin.x + 32)
		&& goblin.x <= (player.x + 32)
		&& player.y <= (goblin.y + 32)
		&& goblin.y <= (player.y + 32)
	) {
		++goblinsCaught;
		reset();
		
		if (goblinsCaught >= 20){
			alert("You have captured 20 Goblins! Good Job")
		}
	}	
};





//Draw everything
var render = function () {
	if (bgReady) {
		context.drawImage(bgImage, 0, 0);
	}

	if (playerReady) {
		context.drawImage(playerImage, player.x, player.y);
	}

	if (goblinReady) {
		context.drawImage(goblinImage, goblin.x, goblin.y);
	}

	//Score
	context.fillStyle = "rgb(250, 250, 250)";
	context.font = "24px Arial";
	context.textAlign = "left";
	context.textBaseline = "top";
	context.fillText("Goblins Captured: " + goblinsCaught, 1, 1);
};



//Game loop
var main = function () {
	var now = Date.now();
	var delta = now - then; // how many milliseconds have passed since the last interval

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};


// Start Game 
var then = Date.now();
reset();
main();