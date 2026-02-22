class ThrowableObject extends MovableObject {
  speedX = 0;

  constructor(x, y, otherDirection) {
    super();
    this.loadImage("../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.otherDirection = otherDirection;
  }

  throw() {
    this.speedX = this.otherDirection ? -2 : 2;

    this.throwInterval = setInterval(() => {
      this.x += this.speedX;
    }, 1000 / 60);
  }
}
