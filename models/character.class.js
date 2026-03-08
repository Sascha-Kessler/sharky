class Character extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_SWIMMING = SHARKIE_IMAGES.SWIMMING;
  IMAGES_IDLE = SHARKIE_IMAGES.IDLE;
  IMAGES_HURT = SHARKIE_IMAGES.HURT;
  IMAGES_DEAD = SHARKIE_IMAGES.DEAD;
  IMAGES_ATTACK_NORMAL_BUBBLE = SHARKIE_IMAGES.ATTACK_NORMAL_BUBBLE;
  IMAGES_ATTACK_POISON_BUBBLE = SHARKIE_IMAGES.ATTACK_POISON_BUBBLE;
  IMAGES_ATTACK_WITHOUT_BUBBLE = SHARKIE_IMAGES.ATTACK_WITHOUT_BUBBLE;

  // =========================
  // Position and Size
  // =========================
  x = 120;
  y = 200;
  height = 220;
  width = 220;

  offset = {
    top: 100,
    left: 35,
    right: 40,
    bottom: 45,
  };

  // =========================
  // Animation Indices
  // =========================
  currentImageIdle = 0;
  currentImage = 0;
  currentImageDead = 0;
  currentImageHurt = 0;
  currentImageNormalAttack = 0;

  // =========================
  // Movement
  // =========================
  speedX = 0;
  speedY = 0;

  // =========================
  // Health and State
  // =========================
  lastHit = 0;
  invincibleTime = 1500;
  health = 100;

  dead = false;
  isHurt = false;
  isAttacking = false;

  // =========================
  // Idle Animation
  // =========================
  idleAnimationCounter = 0;
  idleAnimationDelay = 12;

  // =========================
  // Swim Animation
  // =========================
  frameCounter = 0;
  swimFrameDelay = 10;

  // =========================
  // Dead Animation
  // =========================
  deadAnimationCounter = 0;
  deadAnimationDelay = 10;
  deadAnimationFinished = false;

  // =========================
  // Hurt Animation
  // =========================
  hurtAnimationCounter = 0;
  hurtAnimationDelay = 6;
  hurtAnimationFinished = false;

  // =========================
  // Attack Animation
  // =========================
  attackAnimationCounter = 0;
  attackAnimationDelay = 6;
  attackBubbleThrown = false;

  // =========================
  // Constructor
  // =========================
  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;

    this.loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK_NORMAL_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_POISON_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_WITHOUT_BUBBLE);
  }

  // =========================
  // Main Update Flow
  // =========================
  update() {
    if (!this.dead) {
      this.handleMovementInput();
      this.applyMovement();
      this.clampToWorld();
    }

    this.updateAnimation();
  }

  // =========================
  // Input and Movement
  // =========================
  handleMovementInput() {
    if (this.keyboard.isPressed("ArrowRight")) {
      this.speedX = 5;
      this.otherDirection = false;
    } else if (this.keyboard.isPressed("ArrowLeft")) {
      this.speedX = -5;
      this.otherDirection = true;
    } else {
      this.speedX = 0;
    }

    if (this.keyboard.isPressed("ArrowUp")) {
      this.speedY = -5;
    } else if (this.keyboard.isPressed("ArrowDown")) {
      this.speedY = 5;
    } else {
      this.speedY = 0;
    }

    if (this.keyboard.isPressed("Space")) {
      this.normalAttack();
    }
  }

  applyMovement() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.world.camera_x = -this.x + 100;
  }

  clampToWorld() {
    if (this.x < 150) {
      this.x = 150;
    }

    if (this.x > this.world.level.level_end_x) {
      this.x = this.world.level.level_end_x;
    }

    if (this.y < -this.offset.top) {
      this.y = -this.offset.top;
    }

    if (this.y + this.height - this.offset.bottom > this.world.height) {
      this.y = this.world.height - this.height + this.offset.bottom;
    }
  }

  // =========================
  // Animation Controller
  // =========================
  updateAnimation() {
    if (this.dead) {
      this.updateDeadAnimation();
      return;
    }

    if (this.isHurt) {
      this.updateHurtAnimation();
      return;
    }

    if (this.isAttacking) {
      this.updateNormalAttackAnimation();
      return;
    }

    if (this.speedX === 0 && this.speedY === 0) {
      this.updateIdleAnimation();
      return;
    }

    this.updateSwimAnimation();
  }

  // =========================
  // Idle Animation
  // =========================
  updateIdleAnimation() {
    this.idleAnimationCounter++;

    if (this.idleAnimationCounter >= this.idleAnimationDelay) {
      this.idleAnimationCounter = 0;

      const i = this.currentImageIdle % this.IMAGES_IDLE.length;
      const path = this.IMAGES_IDLE[i];
      this.img = this.imageCache[path];
      this.currentImageIdle++;
    }
  }

  // =========================
  // Swim Animation
  // =========================
  updateSwimAnimation() {
    if (this.dead || this.isHurt) return;
    if (this.speedX === 0 && this.speedY === 0) return;

    this.frameCounter++;

    if (this.frameCounter >= this.swimFrameDelay) {
      this.frameCounter = 0;

      const i = this.currentImage % this.IMAGES_SWIMMING.length;
      const path = this.IMAGES_SWIMMING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  // =========================
  // Hurt Animation
  // =========================
  updateHurtAnimation() {
    this.hurtAnimationCounter++;

    if (this.hurtAnimationCounter >= this.hurtAnimationDelay) {
      this.hurtAnimationCounter = 0;

      const path = this.IMAGES_HURT[this.currentImageHurt];
      this.img = this.imageCache[path];

      this.currentImageHurt++;

      if (this.currentImageHurt >= this.IMAGES_HURT.length) {
        this.isHurt = false;
        this.currentImageHurt = 0;
      }
    }
  }

  // =========================
  // Dead Animation
  // =========================
  updateDeadAnimation() {
    if (this.deadAnimationFinished) return;

    this.deadAnimationCounter++;

    if (this.deadAnimationCounter >= this.deadAnimationDelay) {
      this.deadAnimationCounter = 0;

      const path = this.IMAGES_DEAD[this.currentImageDead];
      this.img = this.imageCache[path];

      this.currentImageDead++;

      if (this.currentImageDead >= this.IMAGES_DEAD.length) {
        this.currentImageDead = this.IMAGES_DEAD.length - 1;
        this.deadAnimationFinished = true;
      }
    }
  }

  // =========================
  // Attack Animation
  // =========================
  updateNormalAttackAnimation() {
    this.attackAnimationCounter++;

    if (this.attackAnimationCounter >= this.attackAnimationDelay) {
      this.attackAnimationCounter = 0;

      const path =
        this.IMAGES_ATTACK_NORMAL_BUBBLE[this.currentImageNormalAttack];
      this.img = this.imageCache[path];

      if (
        !this.attackBubbleThrown &&
        this.currentImageNormalAttack ===
          this.IMAGES_ATTACK_NORMAL_BUBBLE.length - 1
      ) {
        this.world.throwObject();
        this.attackBubbleThrown = true;
      }

      this.currentImageNormalAttack++;

      if (
        this.currentImageNormalAttack >= this.IMAGES_ATTACK_NORMAL_BUBBLE.length
      ) {
        this.isAttacking = false;
        this.currentImageNormalAttack = 0;
      }
    }
  }

  // =========================
  // State Checks
  // =========================
  isHurtCooldownActive() {
    let now = Date.now();
    return now - this.lastHit < this.invincibleTime;
  }

  // =========================
  // State Triggers
  // =========================
  die() {
    if (this.dead) return;

    this.dead = true;
    this.speedX = 0;
    this.speedY = 0;
    this.currentImageDead = 0;
    this.deadAnimationCounter = 0;
    this.deadAnimationFinished = false;
  }

  hurt() {
    if (this.dead) return;
    if (this.isHurt) return;

    this.isHurt = true;
    this.currentImageHurt = 0;
    this.hurtAnimationCounter = 0;
  }

  normalAttack() {
    if (this.dead) return;
    if (this.isHurt) return;
    if (this.isAttacking) return;

    this.isAttacking = true;
    this.currentImageNormalAttack = 0;
    this.attackAnimationCounter = 0;
    this.attackBubbleThrown = false;
  }
}
