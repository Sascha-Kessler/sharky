class World {
  // =========================
  // World Objects
  // =========================
  character;
  healthbar;
  poisonbar;
  coinbar;

  // =========================
  // Canvas and Camera
  // =========================
  ctx;
  camera_x = 0;

  // =========================
  // Game Collections
  // =========================
  throwableObjects = [];

  constructor(canvas, keyboard, level) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.level = level;

    // Level content
    this.backgroundObjects = level.backgroundObjects;
    this.enemies = level.enemies;
    this.coins = level.coin;

    // Main character
    this.character = new Character(this.keyboard, this);

    // HUD
    this.healthbar = new Healthbar(this.character);
    this.poisonbar = new Poisonbar();
    this.coinbar = new Coinbar();

    // Connect enemies with world
    this.enemies.forEach((enemy) => enemy.setWorld(this));
  }

  // =========================
  // World Dimensions
  // =========================
  get width() {
    return Math.max(...this.backgroundObjects.map((bg) => bg.x + bg.width));
  }

  get height() {
    return this.canvas.height;
  }

  // =========================
  // Main Update Flow
  // =========================
  update() {
    this.character.update();
    this.updateEnemies();
    this.coins.forEach((coin) => coin.update());
    this.updateThrowableObjects();
    this.checkEnemyCollisions();
    this.checkBubbleCollisions();
    this.checkCoinCollisions();
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => enemy.update());

    this.enemies = this.enemies.filter((enemy) => enemy.x + enemy.width > -100);
  }

  updateThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (bubble) => Math.abs(bubble.x - this.character.x) < 800,
    );
  }

  // =========================
  // Collision Handling
  // =========================
  checkEnemyCollisions() {
    this.enemies.forEach((enemy) => {
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

  checkBubbleCollisions() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.enemies.forEach((enemy, enemyIndex) => {
        if (bubble.isColliding(enemy)) {
          this.throwableObjects.splice(bubbleIndex, 1);
          this.enemies.splice(enemyIndex, 1);
        }
      });
    });
  }

  checkCoinCollisions() {
    this.coins.forEach((coin, coinIndex) => {
      if (this.character.isColliding(coin)) {
        this.coins.splice(coinIndex, 1);
        this.character.coins++;
        this.coinbar.coinbarUpdate(this.character.coins);
      }
    });
  }

  // =========================
  // Drawing
  // =========================
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.backgroundObjects);
    this.addObjectToMap(this.coins);
    this.addObjectToMap(this.enemies);
    this.addToMap(this.character);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.restore();

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

  // =========================
  // Image Flipping
  // =========================
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

  // =========================
  // Throwing Objects
  // =========================
  throwObject() {
    const x = this.character.x + (this.character.otherDirection ? -20 : 120);
    const y = this.character.y + 80;

    const bubble = new ThrowableObject(x, y, this.character.otherDirection);
    bubble.throw();

    this.throwableObjects.push(bubble);
  }
}
