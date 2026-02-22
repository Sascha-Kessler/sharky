class Character extends MovableObject {
  IMAGES_SWIMMING = SHARKIE_IMAGES.SWIMMING;
  IMAGES_HURT = SHARKIE_IMAGES.HURT;
  IMAGES_DEAD = SHARKIE_IMAGES.DEAD;
  IMAGES_ATTACK_NORMAL_BUBBLE = SHARKIE_IMAGES.ATTACK_NORMAL_BUBBLE;
  IMAGES_ATTACK_POISON_BUBBLE = SHARKIE_IMAGES.ATTACK_POISON_BUBBLE;
  IMAGES_ATTACK_WITHOUT_BUBBLE = SHARKIE_IMAGES.ATTACK_WITHOUT_BUBBLE;
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
  currentImage = 0;
  currentImageDead = 0;
  currentImageHurt = 0;
  currentImageNormalAttack = 0;
  speedX = 0;
  speedY = 0;
  lastHit = 0;
  invincibleTime = 1500;
  health = 10000;
  dead = false;
  isHurt = false;

  constructor(keyboard, world) {
    super();
    this.world = world;
    this.keyboard = keyboard;
    this.loadImage("../img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMMING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK_NORMAL_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_POISON_BUBBLE);
    this.loadImages(this.IMAGES_ATTACK_WITHOUT_BUBBLE);
    this.animate();
  }

  isHurtCooldownActive() {
    let now = Date.now();
    return now - this.lastHit < this.invincibleTime;
  }

  animate() {
    clearInterval(this.swimInterval);

    this.swimInterval = setInterval(() => {
      if (this.dead || this.isHurt) return;

      const i = this.currentImage % this.IMAGES_SWIMMING.length;
      const path = this.IMAGES_SWIMMING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }

  update() {
    this.clampToWorld();
    if (this.dead) {
      return;
    }
    // X-Steuerung: wenn tot -> optional stoppen

    if (this.keyboard.isPressed("ArrowRight")) {
      this.speedX = 5;
      this.otherDirection = false;
    } else if (this.keyboard.isPressed("ArrowLeft")) {
      this.speedX = -5;
      this.otherDirection = true;
    } else {
      this.speedX = 0;
    }

    this.x += this.speedX;
    this.world.camera_x = -this.x + 100;

    // Y-Steuerung:

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

    this.y += this.speedY;

    // danach clampen, damit er nicht durch den Boden fällt
    this.clampToWorld();
  }

  clampToWorld() {
    if (this.x < 150) {
      this.x = 150;
    }
    if (this.x > this.world.level.level_end_x) {
      this.x = this.world.level.level_end_x;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + this.height > this.world.height) {
      this.y = this.world.height - this.height;
    }
  }

  die() {
    this.dead = true;
    clearInterval(this.swimInterval);

    clearInterval(this.deadInterval);
    this.currentImageDead = 0;

    this.deadInterval = setInterval(() => {
      if (this.currentImageDead >= this.IMAGES_DEAD.length) {
        clearInterval(this.deadInterval);
        return;
      }
      const path = this.IMAGES_DEAD[this.currentImageDead];
      this.img = this.imageCache[path];
      this.currentImageDead++;
    }, 200);
  }

  hurt() {
    if (this.dead) return;
    if (this.isHurt) return; // verhindert mehrfaches Starten

    this.isHurt = true;
    this.currentImageHurt = 0;

    // Swimming stoppen (weil du es so willst)
    clearInterval(this.swimInterval);
    clearInterval(this.hurtInterval);

    this.hurtInterval = setInterval(() => {
      // Hurt-Animation fertig?
      if (this.currentImageHurt >= this.IMAGES_HURT.length) {
        clearInterval(this.hurtInterval);
        this.isHurt = false;

        // Wenn tot -> Dead starten, sonst wieder schwimmen
        if (this.health <= 0) {
          this.die();
        } else {
          this.animate(); // ✅ Swimming wieder starten
        }
        return;
      }

      // nächstes Hurt-Bild setzen
      const path = this.IMAGES_HURT[this.currentImageHurt];
      this.img = this.imageCache[path];
      this.currentImageHurt++;
    }, 120);
  }

  normalAttack() {
    if (this.normalAttackInterval) return;

    clearInterval(this.swimInterval);
    this.currentImageNormalAttack = 0;

    this.normalAttackInterval = setInterval(() => {
      const i =
        this.currentImageNormalAttack % this.IMAGES_ATTACK_NORMAL_BUBBLE.length;

      const path = this.IMAGES_ATTACK_NORMAL_BUBBLE[i];
      this.img = this.imageCache[path];
      this.currentImageNormalAttack++;

      // ✅ Wenn Animation fertig ist
      if (
        this.currentImageNormalAttack >= this.IMAGES_ATTACK_NORMAL_BUBBLE.length
      ) {
        clearInterval(this.normalAttackInterval);
        this.normalAttackInterval = null;

        // 💥 ERST JETZT Bubble erzeugen
        this.world.throwObject();

        this.animate(); // zurück zur Swim-Animation
      }
    }, 100);
  }
}
