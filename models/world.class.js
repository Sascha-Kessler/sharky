class World {
  character;
  healthbar;
  poisonbar;
  coinbar;

  ctx;
  camera_x = 0;

  throwableObjects = [];

  constructor(canvas, keyboard, level, soundManager) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.level = level;
    this.soundManager = soundManager;

    this.backgroundObjects = level.backgroundObjects;
    this.enemies = level.enemies;
    this.coins = level.coins;
    this.poisonBottles = level.poisonBottles;

    this.character = new Character(this.keyboard, this);

    this.healthbar = new Healthbar(this.character);
    this.poisonbar = new Poisonbar();
    this.coinbar = new Coinbar();

    this.enemies.forEach((enemy) => enemy.setWorld(this));
  }

  get width() {
    return Math.max(...this.backgroundObjects.map((bg) => bg.x + bg.width));
  }

  get height() {
    return this.canvas.height;
  }

  update() {
    this.character.update();
    this.updateEnemies();
    this.coins.forEach((coin) => coin.update());
    this.throwableObjects.forEach((bubble) => bubble.update());
    this.updateThrowableObjects();
    this.checkEnemyCollisions();
    this.checkBubbleCollisions();
    this.checkCoinCollisions();
    this.checkPoisonBottlesCollisions();
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => enemy.update());

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy instanceof Endboss) return true;
      return !enemy.dead && enemy.x + enemy.width > -100;
    });
  }

  updateThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (bubble) =>
        Math.abs(bubble.x - this.character.x) < 500 && !bubble.isExpired(),
    );
  }

  checkEnemyCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isHurtCooldownActive()) {
          this.soundManager.play("getsHit");

          this.character.lastHit = Date.now();
          this.character.health -= 20;
          this.character.hurt();
          this.healthbar.healthbarUpdate(this.character.health);

          if (this.character.health <= 0) {
            this.character.die();
          }
        }
      }
    });
  }

  checkBubbleCollisions() {
    this.throwableObjects = this.throwableObjects.filter((bubble) => {
      const hitEnemy = this.enemies.find((enemy) => bubble.isColliding(enemy));

      if (hitEnemy) {
        hitEnemy.hit(bubble.damage);
        this.soundManager.play("bubblePop");
        return false;
      }

      return true;
    });
  }

  checkCoinCollisions() {
    this.coins = this.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.soundManager.play("coinPickup");
        this.character.coins++;
        this.coinbar.coinbarUpdate(this.character.coins);
        return false;
      }

      return true;
    });
  }

  checkPoisonBottlesCollisions() {
    this.poisonBottles = this.poisonBottles.filter((poisonBottle) => {
      if (this.character.isColliding(poisonBottle)) {
        this.soundManager.play("bottlePickup");
        this.character.poisonBottles++;
        this.poisonbar.poisonbarUpdate(this.character.poisonBottles);
        return false;
      }

      return true;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.backgroundObjects);
    this.addObjectToMap(this.coins);
    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.poisonBottles);
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

    if (window.DEBUG.hitbox) {
      mo.drawFrame(this.ctx);
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

  throwObject(type) {
    const x = this.character.x + (this.character.otherDirection ? -20 : 120);
    const y = this.character.y + 80;

    const bubble = new ThrowableObject(
      x,
      y,
      this.character.otherDirection,
      type,
    );

    bubble.throw();
    this.throwableObjects.push(bubble);
  }
}
