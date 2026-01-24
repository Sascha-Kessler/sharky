class World {
  backgroundObjects;
  character;
  enemies;
  ctx;

  constructor(canvas, keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");

    this.backgroundObjects = [
      new BackgroundObject("../img/3. Background/Light/1.png"),
    ];

    this.character = new Character(this.keyboard, this);

    this.enemies = [
      new PufferFish(this.character, this),
      new PufferFish(this.character, this),
      new PufferFish(this.character, this),
    ];
  }

  get width() {
    return this.canvas.width;
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

    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
  }

  addObjectToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(mo) {
    if (!mo.img || !mo.img.complete) return;
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}
