class World {
  character;
  healthbar;
  poisonbar;
  coinbar;

  /** @type {BossHealthbar | undefined} */
  bossHealthbar;

  ctx;
  camera_x = 0;

  throwableObjects = [];

  /**
   * Creates a new game world
   * @param {HTMLCanvasElement} canvas
   * @param {Keyboard} keyboard
   * @param {Level} level
   * @param {SoundManager} soundManager
   */
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

    const boss = this.enemies.find((enemy) => enemy instanceof Endboss);

    if (boss) {
      this.bossHealthbar = new BossHealthbar(boss);
    }

    this.enemies.forEach((enemy) => enemy.setWorld(this));
  }

  /**
   * Returns the height of the world
   * @returns {number}
   */
  get height() {
    return this.canvas.height;
  }

  /**
   * Updates the entire game world
   */
  update() {
    this.handleEntities();
    this.handleProjectiles();
    this.handleCollisions();

    this.healthbar.updateHealth(this.character.health);
    this.poisonbar.updatePoison(this.character.poisonBottles);
    this.coinbar.updateCoin(this.character.coins);
    this.updateBossHealthbar();
  }

  /**
   * Updates all entities like character, enemies and coins
   */
  handleEntities() {
    this.character.update();
    this.updateEnemies();
    this.coins.forEach((coin) => coin.update());
  }

  /**
   * Updates all enemies and removes dead/off-screen ones
   */
  updateEnemies() {
    this.enemies.forEach((enemy) => enemy.update());

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy instanceof Endboss) return true;
      return !enemy.dead && enemy.x + enemy.width > -100;
    });
  }

  /**
   * Updates all projectile objects
   */
  handleProjectiles() {
    this.throwableObjects.forEach((bubble) => bubble.update());
    this.updateThrowableObjects();
  }

  /**
   * Removes expired or distant throwable objects
   */
  updateThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (bubble) =>
        Math.abs(bubble.x - this.character.x) < 500 && !bubble.isExpired(),
    );
  }

  /**
   * Creates and throws a new projectile
   * @param {string} type - Type of bubble
   */
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

  /**
   * Handles all collision checks
   */
  handleCollisions() {
    this.handleEnemyCollisions();
    this.handleBubbleCollisions();
    this.handleFinSlapCollisions();
    this.handlePoisonBottlesCollisions();
    this.handleCoinCollisions();
  }

  /**
   * Checks collisions between character and enemies
   */
  handleEnemyCollisions() {
    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleCharacterHit(20);
      }
    });
  }

  /**
   * Handles damage taken by the character
   * @param {number} damage - Damage amount
   */
  handleCharacterHit(damage = 20) {
    if (
      this.character.isHurtCooldownActive() ||
      this.character.isFinSlapAttacking
    )
      return;

    this.soundManager.play("getsHit");

    this.character.lastHit = Date.now();
    this.character.health -= damage;
    this.character.hurt();

    this.healthbar.updateHealth(this.character.health);

    if (this.character.health <= 0) {
      this.character.die();
    }
  }

  /**
   * Checks collisions between bubbles and enemies
   */
  handleBubbleCollisions() {
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

  /**
   * Checks collisions between character and coins
   */
  handleCoinCollisions() {
    this.coins = this.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.soundManager.play("coinPickup");
        this.character.coins++;
        this.coinbar.updateCoin(this.character.coins);
        return false;
      }

      return true;
    });
  }

  /**
   * Checks collisions between character and poison bottles
   */
  handlePoisonBottlesCollisions() {
    this.poisonBottles = this.poisonBottles.filter((poisonBottle) => {
      if (this.character.isColliding(poisonBottle)) {
        this.soundManager.play("bottlePickup");
        this.character.poisonBottles++;
        this.poisonbar.updatePoison(this.character.poisonBottles);
        return false;
      }

      return true;
    });
  }

  /**
   * Checks collisions between characters fin slap and enemies
   */
  handleFinSlapCollisions() {
    if (!this.character.isFinSlapAttacking) return;

    this.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        enemy.hit(10);
      }
    });
  }

  /**
   * Updates the boss health bar if a boss exists
   */
  updateBossHealthbar() {
    const boss = this.enemies.find((enemy) => enemy instanceof Endboss);

    if (boss && this.bossHealthbar) {
      this.bossHealthbar.updateBossHealth(boss.health);
    }
  }

  /**
   * Draws the entire world
   */
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

    const boss = this.enemies.find((enemy) => enemy instanceof Endboss);

    if (boss && boss.hadFirstContact && this.bossHealthbar) {
      this.addToMap(this.bossHealthbar);
    }
  }

  /**
   * Draws multiple objects
   * @param {Array} objects - Objects to draw
   */
  addObjectToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Draws one object
   * @param {Object} mo - Drawable object
   */
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

  /**
   * Flips an object horizontally
   * @param {Object} mo - Object to flip
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores flipped object position
   * @param {Object} mo - Object to restore
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
