class ThrowableObject extends MovableObject {
  speedX = 0;
  isThrown = false;

  constructor(x, y, otherDirection, type = "normal") {
    super();
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.otherDirection = otherDirection;
    this.type = type;
    if (type === "poison") {
      this.damage = 20;
      this.loadImage(
        "../img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png",
      );
    } else {
      this.damage = 10;
      this.loadImage("../img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
    }
  }

  update() {
    if (!this.isThrown) return;
    this.x += this.speedX;
  }

  throw() {
    this.speedX = this.otherDirection ? -2 : 2;
    this.isThrown = true;
  }
}
