/**
 * Image paths for the poison status bar (0% to 100%)
 * @type {string[]}
 */
const IMAGES_POISONBAR = [
  "../img/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
  "../img/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
  "../img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
  "../img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
  "../img/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
  "../img/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
];

/**
 * Displays the poison status bar based on collected poison bottles
 * Extends the generic Statusbar class
 */
class Poisonbar extends Statusbar {
  /**
   * Creates a new poison status bar
   * Initializes position and starting value (0 bottles)
   */
  constructor() {
    super(IMAGES_POISONBAR, 0, 40, 0);
  }

  /**
   * Updates the poison bar based on collected poison bottles
   * @param {number} poisonBottles - Number of collected poison bottles
   */
  updatePoison(poisonBottles) {
    this.updateBar(poisonBottles * 20);
  }
}
