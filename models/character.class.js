class Character extends MovableObject {
  x = 120;
  y = 200;
  height = 180;
  width = 180;
  IMAGES_SWIMMING = [
    "../img/1.Sharkie/3.Swim/1.png",
    "../img/1.Sharkie/3.Swim/2.png",
    "../img/1.Sharkie/3.Swim/3.png",
    "../img/1.Sharkie/3.Swim/4.png",
    "../img/1.Sharkie/3.Swim/5.png",
    "../img/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_HURT = [
    "../img/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/4.png",
    "../img/1.Sharkie/5.Hurt/1.Poisoned/5.png",
  ];
  IMAGES_DEAD = [
    "../img/1.Sharkie/6.dead/1.Poisoned/1.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/2.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/3.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/4.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/5.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/6.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/7.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/8.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/9.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/10.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/11.png",
    "../img/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];
  currentImage = 0;
  currentImageDead = 0;
  currentImageHurt = 0;
  speedX = 0;
  speedY = 0;
  lastHit = 0;
  invincibleTime = 2000;
  health = 100;
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

    if (this.keyboard.isPressed("ArrowUp")) {
      this.speedY = -5;
    } else if (this.keyboard.isPressed("ArrowDown")) {
      this.speedY = 5;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;
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

    clearInterval(this.swimInterval); // 🛑 Swimming stoppen

    this.deadInterval = setInterval(() => {
      if (this.currentImageDead >= this.IMAGES_DEAD.length) {
        clearInterval(this.deadInterval);
        return;
      }

      let path = this.IMAGES_DEAD[this.currentImageDead];
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
}
