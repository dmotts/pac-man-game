var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var pacman = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 25,
  mouthAngle: 1 / 6,
  direction: 'right'
};

function drawPacman() {
  context.beginPath();
  context.arc(pacman.x, pacman.y, pacman.radius, pacman.mouthAngle * Math.PI, (2 - pacman.mouthAngle) * Math.PI);
  context.lineTo(pacman.x, pacman.y);
  context.fillStyle = 'yellow';
  context.fill();
  context.closePath();
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function movePacman() {
  if (pacman.direction == 'right') {
    pacman.x += 5;
  } else if (pacman.direction == 'left') {
    pacman.x -= 5;
  } else if (pacman.direction == 'up') {
    pacman.y -= 5;
  } else if (pacman.direction == 'down') {
    pacman.y += 5;
  }
}

function changeDirection(event) {
  if (event.keyCode == 37) {
    pacman.direction = 'left';
  } else if (event.keyCode == 38) {
    pacman.direction = 'up';
  } else if (event.keyCode == 39) {
    pacman.direction = 'right';
  } else if (event.keyCode == 40) {
    pacman.direction = 'down';
  }
}

function setup() {
  canvas.width = 400;
  canvas.height = 400;
  window.addEventListener('keydown', changeDirection);
  setInterval(function() {
    clearCanvas();
    movePacman();
    drawPacman();
  }, 30);
}

window.addEventListener('load', setup);
