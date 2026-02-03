class BackgroundObject extends MovableObject {
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 0;
    this.height = GAME_HEIGHT;
    this.width = GAME_WIDTH;
  }
}
