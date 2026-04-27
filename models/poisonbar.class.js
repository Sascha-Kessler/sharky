/**
 * Displays the poison status bar based on collected poison bottles
 */
class Poisonbar extends Statusbar {
  IMAGES_POISONBAR = [
    "../img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "../img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "../img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  /**
   * Creates a new poison status bar
   */
  constructor() {
    super([], 0, 40);

    this.images = this.IMAGES_POISONBAR;

    this.loadImages(this.images);
    this.setPercentage(0);
  }

  /**
   * Updates the poison bar based on collected bottles
   * @param {number} poisonBottles
   */
  poisonbarUpdate(poisonBottles) {
    this.setPercentage(poisonBottles * 20);
  }
}
