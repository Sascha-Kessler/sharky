/**
 * Represents a puffer fish enemy with horizontal movement and activation behavior
 */
class PufferFish extends MovableObject {
  IMAGES_SWIMMING_GREEN = PUFFERFISH_IMAGES.GREEN_SWIMMING;
  IMAGES_SWIMMING_ORANGE = PUFFERFISH_IMAGES.ORANGE_SWIMMING;
  IMAGES_SWIMMING_RED = PUFFERFISH_IMAGES.RED_SWIMMING;

  height = 60;
  width = 60;
  health = 1;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  currentImage = 0;
  frameCounter = 0;
  swimFrameDelay = 12;

  speedX = -(0.15 + Math.random() * 1.25);
  activationRange = 600;
  isActive = false;

  /**
   * Creates a puffer fish with a given position and color
   * @param {number} x
   * @param {number} y
   * @param {"green"|"orange"|"red"} color
   */
  constructor(x, y, color) {
    super();

    this.imagesSwimming =
      color === "green"
        ? this.IMAGES_SWIMMING_GREEN
        : color === "orange"
          ? this.IMAGES_SWIMMING_ORANGE
          : this.IMAGES_SWIMMING_RED;

    this.loadImage(this.imagesSwimming[0]);
    this.loadImages(this.imagesSwimming);

    this.x = x;
    this.y = y;
  }

  /**
   * Connects the puffer fish to the game world
   * @param {World} world
   */
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  /**
   * Updates puffer fish behavior each frame
   */
  update() {
    if (!this.world) return;

    this.checkActivation();
    if (!this.isActive) return;

    this.move();
    this.updateSwimAnimation();
  }
}
