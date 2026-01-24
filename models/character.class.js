class Character extends MovableObject {
  x = 120;
  y = 200;
  height = 140;
  width = 140;
  IMAGES_SWIMMING = [
    "../img/1.Sharkie/3.Swim/1.png",
    "../img/1.Sharkie/3.Swim/2.png",
    "../img/1.Sharkie/3.Swim/3.png",
    "../img/1.Sharkie/3.Swim/4.png",
    "../img/1.Sharkie/3.Swim/5.png",
    "../img/1.Sharkie/3.Swim/6.png",
  ];
  currentImage = 0;
  speedX = 0;
  speedY = 0;

  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_SWIMMING.length;
      let path = this.IMAGES_SWIMMING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }

  update() {
    this.clampToWorld();

    if (this.x === 0 || this.x + this.width === this.world.width) {
      this.speedX = 0;
    }

    if (this.keyboard.isPressed("ArrowRight")) {
      this.speedX = 5;
    } else if (this.keyboard.isPressed("ArrowLeft")) {
      this.speedX = -5;
    } else {
      this.speedX = 0;
    }
    this.x += this.speedX;

    if (this.keyboard.isPressed("ArrowUp")) {
      this.speedY = -5;
    } else if (this.keyboard.isPressed("ArrowDown")) {
      this.speedY = 5;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;
  }

  clampToWorld() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.world.width) {
      this.x = this.world.width - this.width;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > this.world.height) {
      this.y = this.world.height - this.height;
    }
  }
}
