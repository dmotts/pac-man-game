
class Food {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = SQUARE_SIZE / 3;
      this.color = 'white';
      this.isVisible = true;
    }
  
    draw(ctx) {
      if (this.isVisible) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(
          this.x * SQUARE_SIZE + SQUARE_SIZE / 2,
          this.y * SQUARE_SIZE + SQUARE_SIZE / 2,
          this.size,
          0,
          2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
  
  