window.onload = InitGame();

// Function that will start the game
function InitGame(){

	// We get our DOM Game elements
	game.canvas = document.getElementById("GameCanvas");
	game.context = game.canvas.getContext("2d");

	// We set a listener to capture key presses
	document.addEventListener("keydown", ControllerManagement);

	// Cal UPDATE 15 times a second
	setInterval(Update, 1000/15);

}

// Will be called every cycle
function Update() {
	snake.Move();
	RenderGame();
}

function RenderGame(){
	ClearBuffer();	// Clear the screen from previous frame
	snake.Render();
	apple.Render();
}

// Clear the canvas by painting it black
function ClearBuffer(){
	game.context.fillStyle = "black";
	game.context.fillRect(0, 0, game.canvas.width, game.canvas.height);
}

function ControllerManagement(keyPressEvent) {
	
	switch(keyPressEvent.keyCode) {
		
		// LEFT ARROW
		case 37:
			snake.ChangeDirectionX(-1);
			break;

		// DOWN ARROW
		case 38:
			snake.ChangeDirectionY(-1);
			break;

		// RIGHT ARROW
		case 39:
			snake.ChangeDirectionX(1);
			break;

		// UP ARROW
		case 40:
			snake.ChangeDirectionY(1);
			break;

		// ESC KEY
		case 27:
			window.location.reload(false); 
			break;

		// ANY OTHER KEY
		default:
			break;

	}

}