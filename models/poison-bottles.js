class PoisonBottle extends MovableObject {
  // =========================
  // Animation Image Sets
  // =========================
  IMAGES_POISON_BOTTLE = "../img/4. Marcadores/Posiขn/Dark - Left.png";

  // =========================
  // Size
  // =========================
  height = 60;
  width = 60;

  // =========================
  // Constructor
  // =========================
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES_POISON_BOTTLE);

    this.x = x;
    this.y = y;
  }
}
