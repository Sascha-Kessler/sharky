class World {
  backgroundObjects;
  character;
  enemies;
  ctx;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");

    this.backgroundObjects = [
      new BackgroundObject("../img/3. Background/Light/1.png", 0),
      new BackgroundObject("../img/3. Background/Light/2.png", canvas.width),
    ];

    this.character = new Character(this.keyboard, this);

    this.enemies = [
      new PufferFish(this.character, this),
      new PufferFish(this.character, this),
      new PufferFish(this.character, this),
    ];
  }

  get width() {
    return Math.max(...this.backgroundObjects.map((bg) => bg.x + bg.width));
  }

  get height() {
    return this.canvas.height;
  }

  update() {
    this.character.update();
    this.enemies.forEach((enemy) => enemy.update());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
    this.ctx.translate(-this.camera_x, 0);
  }

  addObjectToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(mo) {
    if (!mo.img || !mo.img.complete) return;
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
