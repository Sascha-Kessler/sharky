/**
 * Represents a jellyfish enemy with vertical movement and activation behavior
 */
class JellyFish extends MovableObject {
  IMAGES_SWIMMING_GREEN = JELLYFISH_IMAGES.GREEN_SWIMMING;
  IMAGES_SWIMMING_PINK = JELLYFISH_IMAGES.PINK_SWIMMING;

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

  speedY = -0.15 - Math.random() * 1.25;
  activationRange = 600;
  isActive = false;

  /**
   * Creates a jellyfish with a given position and color
   * @param {number} x
   * @param {number} y
   * @param {"green"|"pink"} color
   */
  constructor(x, y, color) {
    super();
    this.movement = new JellyFishMovement(this);
    this.animation = new JellyFishAnimation(this);

    this.imagesSwimming =
      color === "pink" ? this.IMAGES_SWIMMING_PINK : this.IMAGES_SWIMMING_GREEN;

    this.loadImage(this.imagesSwimming[0]);
    this.loadImages(this.imagesSwimming);

    this.x = x;
    this.y = y;
  }

  /**
   * Connects the jellyfish to the game world
   * @param {World} world
   */
  setWorld(world) {
    this.world = world;
    this.character = world.character;
  }

  /**
   * Updates jellyfish behavior each frame
   */
  update() {
    if (!this.world) return;

    this.animation.checkActivation();
    if (!this.isActive) return;

    this.movement.move();
    this.animation.updateSwimAnimation();
    this.movement.clampToWorld();
  }
}
