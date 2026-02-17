class PufferFish extends MovableObject {
  height = 60;
  width = 60;
  IMAGES_SWIMMING = [
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];
  currentImage = 0;
  speedX = -0.15 - Math.random() * 1.25;

  constructor() {
    super();
    this.loadImage(this.IMAGES_SWIMMING[0]);
    this.loadImages(this.IMAGES_SWIMMING);
    this.x = 800 + Math.random() * 400;
    this.y = Math.random() * (GAME_HEIGHT - this.height);
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

  setWorld(world) {
    this.world = world;
    this.character = world.character;

    // falls du Position vom Character ableiten willst, erst HIER:
    // this.x = this.character.x + 600;
  }

  update() {
    // Wenn du setWorld korrekt aufrufst, sind world/character da.
    // Bewegung
    this.x += this.speedX;

    // Optional: wenn offscreen links -> respawn rechts
    if (this.x + this.width < 0) {
      this.x = this.world.canvas.width + 200 + Math.random() * 600;
    }
  }
}
