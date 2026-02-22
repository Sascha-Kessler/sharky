class MovableObject extends DrawableObjects {
  speed = 0.15;
  speedX = 0;
  speedY = 0;
  otherDirection = false;

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof Endboss ||
      this instanceof Coin
    ) {
      const left = this.offset?.left || 0;
      const top = this.offset?.top || 0;
      const right = this.offset?.right || 0;
      const bottom = this.offset?.bottom || 0;

      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";

      ctx.rect(
        this.x + left,
        this.y + top,
        this.width - left - right,
        this.height - top - bottom,
      );

      ctx.stroke();
    }
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  isColliding(obj) {
    return (
      this.getHitboxRight() > obj.getHitboxLeft() &&
      this.getHitboxLeft() < obj.getHitboxRight() &&
      this.getHitboxBottom() > obj.getHitboxTop() &&
      this.getHitboxTop() < obj.getHitboxBottom()
    );
  }

  getHitboxLeft() {
    return this.x + (this.offset?.left || 0);
  }

  getHitboxRight() {
    return this.x + this.width - (this.offset?.right || 0);
  }

  getHitboxTop() {
    return this.y + (this.offset?.top || 0);
  }

  getHitboxBottom() {
    return this.y + this.height - (this.offset?.bottom || 0);
  }
}
