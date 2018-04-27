
class Enemy {
   // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	constructor (x,y) {
	    this.x = x;
	    this.y = y;
	    this.sprite = 'images/enemy-bug.png';
	   
	 	// speed of enemies 
	    this.speed = Math.floor((Math.random() * 100) + 100);
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
 	    this.x = this.x + (this.speed * dt) ;
	    if (this.x > 500) {
	        this.x = -200;
	    }
	// check if there is a collision with player
	    this.collision(player);
	}

	// Draw the enemy on the screen, required method for game

	render () {
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	// remove the enemies from the canvas after collision or winner case
	remove () {
		delete this.x;
		delete this.y;
	}

	collision (player) {
    
	    if (player.x < this.x + 80 &&
	        player.x + 80 > this.x &&
	        player.y < this.y + 60 &&
	        60 + player.y > this.y) {
	//function lost -> if there is a collision a popup comes      
	        lost();
	// remove player and enemies from sreen
	        allEnemies.forEach(function(enemy) {
            delete enemy.remove();
        		});
		    delete player.remove(); 	
	    }
	}
}
//Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor (x, y){
	    this.x = x;
	    this.y = y;
	    this.sprite = 'images/char-cat-girl.png';
	}
// drawing player
	render() {
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
// back to the start position;
	reset () {
        this.x = 200;
        this.y = 400;
    }
//Check if the player touched the water
	update () {
		if (this.y < 10) { 
//function winner ->a popup comes  
		    	winner();
//removes enemies and player from screen
		    	allEnemies.forEach(function(enemy) {
            	delete enemy.remove();
        		});
		    	delete player.remove(); 		
        }
	}
	// removes the eplayer from the canvas after collision or winner case
	remove () {
		delete this.x;
		delete this.y;
	}


	handleInput (key){
		switch(key) {
	        case 'left':
	            if (this.x > 0){
	                this.x -=100;
	            }
	            break;

	        case 'right':
	            if (this.x < 400){
	                this.x +=100;
	            }
	        break;

	        case 'up':
	            if (this.y > 10){
	                this.y -=80;
	            }
	        break;

	        case 'down':
	            if (this.y < 400){
	                this.y +=80;
	            }
	        break;
	   }
	}
}


// Modal screen 
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const modalContent =  document.getElementById("result");

// it will popup after player win
function winner() {
    modal.style.display = "block";
    modalContent.innerHTML = "You're the winner!"
}

// it will popup after player lost
function lost() {
    modal.style.display = "block";
    modalContent.innerHTML = "You lost!"
}

// When the user clicks on <span> (x), close the modal, reset player and enemies
span.onclick = () => {
	modal.style.display = "none";
	player.reset();
	showEnemies();
	
}
// When the user clicks anywhere outside of the modal, close it, reset player and enemies
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        player.reset();
		showEnemies();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(400, 60); 
const enemy2 = new Enemy(0, 150); 
const enemy3 = new Enemy(0, 230); 
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200,400);

//function to show enemies after popup winner and lost.
const showEnemies = () => { 
	enemy1.x = 400; enemy1.y = 60;
	enemy2.x = 0; enemy2.y = 150; 
	enemy3.x = 0; enemy3.y = 230; 
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});