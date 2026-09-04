class World {
  character;
  healthbar;
  poisonbar;
  coinbar;
  bossHealthbar;

  ctx;
  camera_x = 0;
  throwableObjects = [];

  /**
   * Creates a new game world.
   * @param {HTMLCanvasElement} canvas - Game canvas element
   * @param {Keyboard} keyboard - Keyboard input state
   * @param {Level} level - Current level data
   * @param {SoundManager} soundManager - Sound manager instance
   */
  constructor(canvas, keyboard, level, soundManager) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext("2d");
    this.level = level;
    this.soundManager = soundManager;
    this.throwableObjects = [];
    this.collisionManager = new CollisionManager(this);

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
   * Returns the height of the world.
   * @returns {number}
   */
  get height() {
    return this.canvas.height;
  }

  /**
   * Updates the entire game world.
   */
  update() {
    this.handleEntities();
    this.handleProjectiles();
    this.handleCollisions();
    this.updateUI();
    showRotateHint();
  }

  /**
   * Updates all entities like character, enemies and coins.
   */
  handleEntities() {
    this.character.update();
    this.updateEnemies();
    this.coins.forEach((coin) => coin.update());
  }

  /**
   * Updates all enemies and removes dead/off-screen enemies.
   */
  updateEnemies() {
    this.enemies.forEach((enemy) => enemy.update());

    this.enemies = this.enemies.filter((enemy) => {
      if (enemy instanceof Endboss) return true;
      return !enemy.dead && enemy.x + enemy.width > -100;
    });
  }

  /**
   * Updates all projectile objects.
   */
  handleProjectiles() {
    this.throwableObjects.forEach((bubble) => bubble.update());
    this.updateThrowableObjects();
  }

  /**
   * Removes expired or distant throwable objects.
   */
  updateThrowableObjects() {
    this.throwableObjects = this.throwableObjects.filter(
      (bubble) =>
        Math.abs(bubble.x - this.character.x) < 500 && !bubble.isExpired(),
    );
  }

  /**
   * Handles all collision checks through the collision manager.
   */
  handleCollisions() {
    this.collisionManager.handleAll();
  }

  /**
   * Updates all UI elements.
   */
  updateUI() {
    this.healthbar.updateHealth(this.character.health);
    this.poisonbar.updatePoison(this.character.poisonBottles);
    this.coinbar.updateCoin(this.character.coins);
    this.updateBossHealthbar();
  }

  /**
   * Updates the boss health bar if a boss exists.
   */
  updateBossHealthbar() {
    const boss = this.enemies.find((enemy) => enemy instanceof Endboss);

    if (boss && this.bossHealthbar) {
      this.bossHealthbar.updateBossHealth(boss.health);
    }
  }

  /**
   * Handles damage taken by the character.
   * @param {number} [damage=20] - Damage amount
   */
  handleCharacterHit(damage = 20) {
    if (
      this.character.isHurtCooldownActive() ||
      this.character.isFinSlapAttacking
    )
      return;

    this.applyDamage(damage);
  }

  /**
   * Applies damage to the character.
   * @param {number} damage - Damage amount
   */
  applyDamage(damage) {
    this.soundManager.play("getsHit");

    this.character.lastHit = Date.now();
    this.character.health -= damage;
    this.character.hurt();

    this.updateCharacterUI();
    this.checkCharacterDeath();
  }

  /**
   * Updates character-related UI elements.
   */
  updateCharacterUI() {
    this.healthbar.updateHealth(this.character.health);
  }

  /**
   * Checks if the character should die.
   */
  checkCharacterDeath() {
    if (this.character.health <= 0) {
      this.character.die();
    }
  }

  /**
   * Applies delayed fin slap damage to marked enemies.
   */
  applyFinSlapDamage() {
    this.enemies.forEach((enemy) => {
      if (enemy.finSlapMarked) {
        enemy.hit(10);

        enemy.finSlapMarked = false;
      }
    });
  }

  /**
   * Creates and throws a new projectile.
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
   * Draws the entire world.
   */
  draw() {
    this.clearCanvas();
    this.drawGameObjects();
    this.drawUI();
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws all game objects affected by camera movement.
   */
  drawGameObjects() {
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);

    [
      this.backgroundObjects,
      this.coins,
      this.enemies,
      this.poisonBottles,
      [this.character],
      this.throwableObjects,
    ].forEach((objects) => this.addObjectToMap(objects));
    this.ctx.restore();
  }

  /**
   * Draws all fixed UI elements.
   */
  drawUI() {
    this.addToMap(this.healthbar);
    this.addToMap(this.poisonbar);
    this.addToMap(this.coinbar);
    this.drawBossHealthbar();
  }

  /**
   * Draws the boss health bar after first contact.
   */
  drawBossHealthbar() {
    const boss = this.enemies.find((enemy) => enemy instanceof Endboss);

    if (boss && boss.hadFirstContact && this.bossHealthbar) {
      this.addToMap(this.bossHealthbar);
    }
  }

  /**
   * Draws multiple objects.
   * @param {Array} objects - Objects to draw
   */
  addObjectToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Draws one object.
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
    if (window.DEBUG.hitbox && typeof mo.drawFrame === "function") {
      mo.drawFrame(this.ctx);
    }
  }

  /**
   * Flips an object horizontally.
   * @param {Object} mo - Object to flip
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores flipped object position.
   * @param {Object} mo - Object to restore
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
