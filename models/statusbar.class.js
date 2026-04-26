class Statusbar extends DrawableObjects {
  percentage = 100;

  constructor(images, x, y, width = 170, height = 50) {
    super();

    this.images = images;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.loadImages(this.images);
    this.setPercentage(this.percentage);
  }

  setPercentage(value) {
    this.percentage = Math.max(0, Math.min(100, value));

    const index = Math.floor(this.percentage / 20);
    const safeIndex = Math.min(index, this.images.length - 1);

    this.img = this.imageCache[this.images[safeIndex]];
  }
}
