/**
 * Displays the health status bar based on character health
 */
class Healthbar extends Statusbar {
  IMAGES_HEALTHBAR = [
    "../img/4. Marcadores/green/Life/0_  copia3.png",
    "../img/4. Marcadores/green/Life/20_ copia4.png",
    "../img/4. Marcadores/green/Life/40_  copia3.png",
    "../img/4. Marcadores/green/Life/60_  copia3.png",
    "../img/4. Marcadores/green/Life/80_  copia3.png",
    "../img/4. Marcadores/green/Life/100_ copia2.png",
  ];

  /**
   * Creates a new health bar
   * @param {Character} character
   */
  constructor(character) {
    super([], 0, 0);

    this.character = character;
    this.images = this.IMAGES_HEALTHBAR;

    this.loadImages(this.images);
    this.setPercentage(this.character.health);
  }

  /**
   * Updates the health bar based on current health
   * @param {number} health
   */
  healthbarUpdate(health) {
    this.setPercentage(health);
  }
}
