import { CELL_SIZE, PACMAN_SPEED, getCell, getCellCenter, getNextPosition } from "./utils.js";
import { DIRECTIONS, KEY_MAPPING } from "./constants.js";
import { pacman } from "./pacman.js";
import { ghosts } from "./ghosts.js";
import { maze } from "./maze.js";
import { food } from "./food.js";

// Get the canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions based on the maze size
canvas.width = maze[0].length * CELL_SIZE;
canvas.height = maze.length * CELL_SIZE;

// Handle keyboard input
const handleKeyDown = (e) => {
  const key = e.code;
  if (KEY_MAPPING.hasOwnProperty(key)) {
    pacman.direction = KEY_MAPPING[key];
    e.preventDefault();
  }
};

document.addEventListener("keydown", handleKeyDown);

// Main game loop
const animate = () => {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the maze
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      const cell = maze[row][col];
      if (cell === "#") {
        ctx.fillStyle = "blue";
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }

  // Draw the food
  food.forEach((f) => {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    const [x, y] = getCellCenter(f.row, f.col);
    ctx.arc(x, y, CELL_SIZE / 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });

  // Draw the ghosts
  ghosts.forEach((ghost) => {
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    const [x, y] = getCellCenter(ghost.row, ghost.col);
    ctx.arc(x, y, CELL_SIZE / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });

  // Draw Pac-Man
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  const [x, y] = getCellCenter(pacman.row, pacman.col);
  const startAngle = (0.1 - pacman.direction) * Math.PI;
  const endAngle = (1.9 - pacman.direction) * Math.PI;
  ctx.arc(x, y, CELL_SIZE / 2, startAngle, endAngle);
  ctx.lineTo(x, y);
  ctx.fill();
  ctx.closePath();

  // Move Pac-Man
  const [nextRow, nextCol] = getNextPosition(pacman, PACMAN_SPEED);
  const nextCell = getCell(nextRow, nextCol, maze);
  if (nextCell !== "#") {
    pacman.row = nextRow;
    pacman.col = nextCol;
  }

  // Move the ghosts
  ghosts.forEach((ghost) => {
    const [nextRow, nextCol] = getNextPosition(ghost, ghost.speed);
    const nextCell = getCell(nextRow, nextCol, maze);
    if (nextCell !== "#") {
      ghost.row = nextRow;
      ghost.col = nextCol;
    }
  });

  requestAnimationFrame(animate);
};

animate();
