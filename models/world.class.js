class World {
  character;
  healthbar;
  poisonbar;
  coinbar;
  ctx;
  camera_x = 0;
  throwableObjects = [];

  constructor(canvas, keyboard, level) {
    console.log("World level:", level);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.level = level;

    // Inhalte aus dem Level
    this.backgroundObjects = level.backgroundObjects;
    this.enemies = level.enemies;
    this.coin = level.coin;

    // Spielfigur
    this.character = new Character(this.keyboard, this);
    this.throwableObjects = [];
    this.healthbar = new Healthbar(this.character);
    this.poisonbar = new Poisonbar();
    this.coinbar = new Coinbar();

    // Enemies verkabeln
    this.enemies.forEach((e) => e.setWorld(this));
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
    this.throwableObjects = this.throwableObjects.filter(
      (b) => b.x > 0 && b.x < this.level.level_end_x + 500,
    );
    this.checkCollisions();
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isHurtCooldownActive()) {
          this.character.lastHit = Date.now();
          this.character.health -= 20;
          this.character.hurt();
          this.healthbar.healthbarUpdate(this.character.health);
          if (this.character.health == 0) {
            this.character.die();
          }
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // ===== Welt mit Kamera =====
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects); // Hintergrund
    this.addObjectToMap(this.level.coin); // Coins
    this.addObjectToMap(this.level.enemies); // Enemies
    this.addToMap(this.character); // Character vorne
    this.addObjectToMap(this.throwableObjects);
    this.ctx.restore();

    // ===== UI ohne Kamera (HUD) =====
    this.addToMap(this.healthbar);
    this.addToMap(this.poisonbar);
    this.addToMap(this.coinbar);
  }

  addObjectToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(mo) {
    if (!mo.img || !mo.img.complete) return;

    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }

    mo.drawFrame(this.ctx);
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

  throwObject() {
    const x = this.character.x + (this.character.otherDirection ? -20 : 120);
    const y = this.character.y + 80;

    const bubble = new ThrowableObject(x, y, this.character.otherDirection);
    bubble.throw(); // ✅ Logik in der Klasse

    this.throwableObjects.push(bubble); // ✅ World verwaltet die Liste
  }
}
