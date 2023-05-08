// Game elements
let canvas;
let ctx;
let gameBoard;
let pacman;
let ghosts = [];

// Game parameters
const cellSize = 32;
const boardWidth = 21;
const boardHeight = 21;
const gameWidth = cellSize * boardWidth;
const gameHeight = cellSize * boardHeight;

// Game setup
function setup() {
  canvas = document.getElementById("game-canvas");
  canvas.width = gameWidth;
  canvas.height = gameHeight;
  ctx = canvas.getContext("2d");

  gameBoard = new GameBoard(boardWidth, boardHeight, cellSize);
  gameBoard.create();

  pacman = new Pacman(13, 16, 1, "right", cellSize);
  ghosts.push(new Ghost(11, 11, 1, "right", cellSize, "red"));

  document.addEventListener("keydown", handleInput);
}

// Game loop
function gameLoop() {
  clearCanvas();
  gameBoard.draw();
  pacman.update();
  pacman.draw();
  ghosts.forEach(ghost => {
    ghost.update();
    ghost.draw();
  });

  requestAnimationFrame(gameLoop);
}

// Helper function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, gameWidth, gameHeight);
}

// Event handler for user input
function handleInput(e) {
  switch (e.keyCode) {
    case 37: // left arrow
      pacman.setDirection("left");
      break;
    case 38: // up arrow
      pacman.setDirection("up");
      break;
    case 39: // right arrow
      pacman.setDirection("right");
      break;
    case 40: // down arrow
      pacman.setDirection("down");
      break;
  }
}

// Start the game
setup();
gameLoop();
