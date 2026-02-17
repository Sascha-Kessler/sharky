class Endboss extends MovableObject {
  height = 300;
  width = 300;
  y = 100;
  currentImage = 0;
  IMAGES_FLOATING = [
    "../img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "../img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_FLOATING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.x = 2500;
    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_FLOATING.length;
      let path = this.IMAGES_FLOATING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 300);
  }

  setWorld(world) {
    this.world = world;
    this.character = world.character; // optional
  }
  update() {
    // ✅ wenn du playAnimation hast:
    if (this.playAnimation) {
      this.playAnimation(this.IMAGES_FLOATING);
      return;
    }
  }
}
