var game = {
	'gridSize': 20,
	'tileCount': 20,
	'canvas': 0,
	'context': 0
}



var apple = {
	'xPos': 15,
	'yPos': 15,

	'Render': function() {
		game.context.fillStyle="red";
		game.context.fillRect(this.xPos * game.gridSize, this.yPos * game.gridSize, game.gridSize - 2, game.gridSize - 2);
	},

	'MoveToRandomePos': function(){
		apple.xPos = Math.floor(Math.random() * game.tileCount);
		apple.yPos = Math.floor(Math.random() * game.tileCount);
	}

};



var snake = {
  'xPos': 10,
  'yPos': 10,
  'xVel': 0,
  'yVel': 0,
  'tailPositions': [],
  'tailLength': 5,
  
	// We move the HEAD of the snake
	'Move': function(){

		this.xPos += this.xVel;
		this.yPos += this.yVel;

		// We wrap snake head
		if(this.xPos < 0) this.xPos= game.tileCount - 1;
		if(this.xPos > game.tileCount - 1) this.xPos= 0;
		if(this.yPos < 0) this.yPos= game.tileCount - 1;
		if(this.yPos > game.tileCount - 1) this.yPos= 0;

		// We check if we've eaten our tail
		this.CheckForCollisions();
		
		// We check if we've eaten an apple
		this.CheckIfAppleEaten();

	},

	// Head-Tail collisions
	'CheckForCollisions': function(){
		
		// For every tail square
		for(var i = 0; i < this.tailPositions.length; i++) {
			
			// If the tail is in the same position as the head, we re start the game
			if(this.tailPositions[i].x == snake.xPos && this.tailPositions[i].y == snake.yPos) {
				snake.tailLength = 5;
			}

		}

	},

	// Head-Apple collisions - We elongate the snake and
	// calculate the new apple position.
	'CheckIfAppleEaten': function(){
		if(apple.xPos == this.xPos && apple.yPos==this.yPos) {
			this.tailLength++;
			apple.MoveToRandomePos();
		}
	},

	'Render': function() {

		// We paint the SNAKE LIME
		game.context.fillStyle = "lime";

		// For every tail square we paint it
		for(var i = 0; i < this.tailPositions.length; i++) {
			game.context.fillRect(this.tailPositions[i].x * game.gridSize, this.tailPositions[i].y * game.gridSize, game.gridSize - 2, game.gridSize - 2);
		}

		// We add the head position to the tail
		this.tailPositions.push(
			{
				x: snake.xPos,
				y: snake.yPos
			}
		);

		// If our length count is less than the tail positions stored
		// We erase the first tail position (SHIFT)
		while(this.tailPositions.length > this.tailLength) {
			this.tailPositions.shift();
		}

	},

	// < 0 for Left, >= 0 for Right
	'ChangeDirectionX': function(newDir){
		if(newDir >= 0) this.xVel = 1;
		else this.xVel = -1;

		this.yVel = 0;
	},

	// < 0 for Down, >= 0 for Up
	'ChangeDirectionY': function(newDir){
		if(newDir >= 0) this.yVel = 1;
		else this.yVel = -1;

		this.xVel = 0;
	}

};