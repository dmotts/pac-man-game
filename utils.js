// Helper function to get random integer between two values
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  // Helper function to get distance between two points
  function distance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Helper function to check if two objects collide
  function checkCollision(a, b) {
    const distanceBetween = distance(a.position, b.position);
    const sumOfRadii = a.radius + b.radius;
    return distanceBetween < sumOfRadii;
  }
  