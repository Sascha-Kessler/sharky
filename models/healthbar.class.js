/**
 * Image paths for the health status bar (0% to 100%)
 * @type {string[]}
 */
const IMAGES_HEALTHBAR = [
  "../img/4. Marcadores/green/Life/0_  copia3.png",
  "../img/4. Marcadores/green/Life/20_ copia4.png",
  "../img/4. Marcadores/green/Life/40_  copia3.png",
  "../img/4. Marcadores/green/Life/60_  copia3.png",
  "../img/4. Marcadores/green/Life/80_  copia3.png",
  "../img/4. Marcadores/green/Life/100_ copia2.png",
];

/**
 * Displays the health status bar based on the character's health
 * Extends the generic Statusbar class
 */
class Healthbar extends Statusbar {
  /**
   * Creates a new health bar
   * @param {Character} character - The player character instance
   */
  constructor(character) {
    super(IMAGES_HEALTHBAR, 0, 0, character.health);
  }

  /**
   * Updates the health bar based on current health value
   * @param {number} health - Current health (0–100)
   */
  updateHealth(health) {
    this.updateBar(health);
  }
}
