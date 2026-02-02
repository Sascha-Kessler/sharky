class BackgroundObject extends MovableObject {
  constructor(imagePath, x, canvas) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 0;
    this.height = canvas.height;
    this.width = canvas.width;
  }
}
