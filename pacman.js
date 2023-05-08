const COLS = 28;
const ROWS = 36;
const TILE_SIZE = 20;
const WIDTH = COLS * TILE_SIZE;
const HEIGHT = ROWS * TILE_SIZE;

const map = [
    "1111111111111111111111111111",
    "1200000000000000000000000021",
    "1201110111111111111011110221",
    "1201310000000010000010310221",
    "1201310111111111111010310221",
    "1201310100000000001010310221",
    "1201310111111221111010310221",
    "1200000100001221000010000021",
    "1111110111111101111011111111",
    "0000000000000000000000000000",
    "1111110111111101111011111111",
    "1200000100001221000010000021",
    "1201310111111221111010310221",
    "1201310100000000001010310221",
    "1201310111111111111010310221",
    "1201310000000010000010310221",
    "1201110111111111111011110221",
    "1200000000000000000000000021",
    "1111111111111111111111111111",
    "0000000000000000000000000000",
    "1111111111111111111111111111",
    "1200000000000000000000000021",
    "1201110111111111111011110221",
    "1201310110000000001010310221",
    "1201310111111221111010310221",
    "1200000100001221000010000021",
    "1111110111111101111011111111",
    "0000000000000000000000000000",
    "1111110111111101111011111111",
    "1200000100001221000010000021",
    "1201310111111221111010310221",
    "1201310100000000001010310221",
    "1201310111111111111010310221",
    "1201310000000010000010310221",
    "1201110111111111111011110221",
    "1200000000000000000000000021",
    "1111111111111111111111111111",
];

// The map variable goes here

const state = {
  player: {
    x: 1,
    y: 1
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the score
  context.font = "20px Arial";
  context.fillStyle = "white";
  context.fillText("Score: " + score, 10, 30);

  // Draw the lives
  for (var i = 0; i < lives; i++) {
    var x = canvas.width - 25 - (i * 25);
    var y = 5;
    context.drawImage(lifeImg, x, y, 20, 20);
  }

  // Draw the pellets
  for (var i = 0; i < pellets.length; i++) {
    var pellet = pellets[i];
    if (!pellet.eaten) {
      context.beginPath();
      context.fillStyle = "white";
      context.arc(pellet.x, pellet.y, 5, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }
  }

  // Draw the power pellets
  for (var i = 0; i < powerPellets.length; i++) {
    var powerPellet = powerPellets[i];
    if (!powerPellet.eaten) {
      context.beginPath();
      context.fillStyle = "white";
      context.arc(powerPellet.x, powerPellet.y, 10, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }
  }

  // Draw the ghosts
  for (var i = 0; i < ghosts.length; i++) {
    var ghost = ghosts[i];
    context.drawImage(ghostImg, ghost.x - ghost.radius, ghost.y - ghost.radius, ghost.radius * 2, ghost.radius * 2);
  }

  // Draw Pacman
  context.beginPath();
  context.arc(pacman.x, pacman.y, pacman.radius, pacman.mouthAngle1, pacman.mouthAngle2);
  context.lineTo(pacman.x, pacman.y);
  context.closePath();
  context.fillStyle = "yellow";
  context.fill();

  // Draw the eyes
  context.beginPath();
  context.arc(pacman.x + pacman.eyeX, pacman.y + pacman.eyeY, 2, 0, Math.PI * 2);
  context.fillStyle = "black";
  context.fill();
  
  // Draw the ghost's eyes
  for (var i = 0; i < ghosts.length; i++) {
    var ghost = ghosts[i];
    var angle = Math.atan2(pacman.y - ghost.y, pacman.x - ghost.x);
    var eyeX = Math.cos(angle) * ghost.radius / 2;
    var eyeY = Math.sin(angle) * ghost.radius / 2;
    context.beginPath();
    context.arc(ghost.x + eyeX, ghost.y + eyeY, 2, 0, Math.PI * 2);
    context.fillStyle = "black";
    context.fill();
  }

  // Move Pacman
  pacman.x += pacman.vx;
  pacman.y += pacman.vy;

  // Move the ghosts
  for (var i = 0; i < ghosts.length; i++) {
    moveGhost(ghosts[i]);
  }

  // Check for collisions
  checkCollisions();

  // Check if the level is cleared
  if (pelletsEaten == pellets.length) {
    level++;
    initialize();
  }

  // Check if the game is over
  if (lives == 0) {
    gameOver();
  }
}
