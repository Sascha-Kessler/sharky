class MovableObject {
  img;
  imageCache = {};
  speed = 0.15;
  speedX = 0;
  speedY = 0;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof PufferFish ||
      this instanceof Endboss ||
      this instanceof Coin
    ) {
      // Red rectangle
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  isColliding(mo) {
    return (
      this.x < mo.x + mo.width &&
      this.x + this.width > mo.x &&
      this.y < mo.y + mo.height &&
      this.y + this.height > mo.y
    );
  }
}
