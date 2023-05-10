import { Gameboard } from "./gameboard.js";

export default class Ghost {
  constructor(game, row, col, color) {
    this.game = game;
    this.row = row;
    this.col = col;
    this.color = color;
    this.direction = null;
    this.el = null;
    this.speed = 1;
    this.timer = null;
    this.create();
  }

  create() {
    const ghost = document.createElement('div');
    ghost.classList.add('ghost');
    ghost.classList.add(this.color);
    this.game.el.appendChild(ghost);
    this.el = ghost;
    this.move();
  }

  move() {
    const directions = ['up', 'right', 'down', 'left'];
    const index = Math.floor(Math.random() * 4);
    const direction = directions[index];
    this.direction = direction;
    const {row, col} = this;
    let nextRow = row;
    let nextCol = col;
    switch (direction) {
      case 'up':
        nextRow--;
        break;
      case 'right':
        nextCol++;
        break;
      case 'down':
        nextRow++;
        break;
      case 'left':
        nextCol--;
        break;
    }
    const nextCell = this.game.getCell(nextRow, nextCol);
    if (!nextCell.classList.contains('wall')) {
      this.row = nextRow;
      this.col = nextCol;
      const {top, left} = nextCell.getBoundingClientRect();
      const el = this.el;
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
    }
    this.timer = setTimeout(() => this.move(), 500 / this.speed);
  }

  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  restart() {
    this.stop();
    this.row = 9;
    this.col = 9;
    this.speed = 1;
    this.move();
  }
}
