// Constants
var PACMAN_SPEED = 80; // how fast should Pacman move?
var GHOST_SPEED = 80; // how fast should the ghosts move?
var DOT_SIZE = 10; // what should be the size of the dots?
var WALL_THICKNESS = 4; // what should be the thickness of the walls?

// Game elements
var game = null;
var pacman = null;
var ghosts = null;
var dots = null;
var walls = null;
var score = 0;
var lives = 3;
var game_over = false;

// Initializes the game
function init() {
  game = new Game();
  game.init();
  pacman = new Pacman();
  pacman.init();
  ghosts = new Ghosts();
  ghosts.init();
  dots = new Dots();
  dots.init();
  walls = new Walls();
  walls.init();
  updateScore(0);
  updateLives(3);
}

// Updates the score
function updateScore(new_score) {
  score = new_score;
  document.getElementById("score").innerHTML = "Score: " + score;
}

// Updates the lives
function updateLives(new_lives) {
  lives = new_lives;
  document.getElementById("lives").innerHTML = "Lives: " + lives;
}

// Draws the game
function draw() {
  clearScreen();

  // draw dots
  dots.draw();

  // draw walls
  walls.draw();

  // draw ghosts
  ghosts.draw();

  // draw pacman
  pacman.draw();
}

// Clears the screen
function clearScreen() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Keydown handler
$(document).keydown(function (e) {
  pacman.keydown(e);
});

// Game loop
function gameLoop() {
  // move pacman
  pacman.move();

  // move ghosts
  ghosts.move();

  // check for collisions
  checkCollisions();

  // draw game
  draw();

  // check for game over
  if (game_over) {
    gameOver();
  }
}

// Checks for collisions between pacman, ghosts, and dots
function checkCollisions() {
  // check for collisions between pacman and ghosts
  ghosts.checkCollisions();

  // check for collisions between pacman and dots
  dots.checkCollisions();
}

// Game over
function gameOver() {
  clearInterval(game.interval_id);
  game_over = true;
  alert("Game over! Your score is " + score);
}

// Initializes the game when the window loads
window.onload = function () {
  init();
  game.interval_id = setInterval(gameLoop, 1000 / 60);
};
