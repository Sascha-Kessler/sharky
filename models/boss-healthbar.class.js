/**
 * Image paths for the boss health bar (0% to 100%)
 * @type {string[]}
 */
const IMAGES_BOSSBAR = [
  "../img/4. Marcadores/green/Life/0_  copia3.png",
  "../img/4. Marcadores/green/Life/20_ copia4.png",
  "../img/4. Marcadores/green/Life/40_  copia3.png",
  "../img/4. Marcadores/green/Life/60_  copia3.png",
  "../img/4. Marcadores/green/Life/80_  copia3.png",
  "../img/4. Marcadores/green/Life/100_ copia2.png",
];

/**
 * Displays the boss health bar
 */
class BossHealthbar extends Statusbar {
  /**
   * Creates a new boss health bar
   * @param {Endboss} boss
   */
  constructor(boss) {
    super(IMAGES_BOSSBAR, 450, 0, boss.health);
  }

  /**
   * Updates boss health display
   * @param {number} health
   */
  updateBossHealth(health) {
    this.updateBar(health);
  }
}
