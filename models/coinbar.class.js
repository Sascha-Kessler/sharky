/**
 * Image paths for the coin status bar (0% to 100%)
 * @type {string[]}
 */
const IMAGES_COINBAR = [
  "../img/4. Marcadores/green/Coin/0_  copia 4.png",
  "../img/4. Marcadores/green/Coin/20_  copia 2.png",
  "../img/4. Marcadores/green/Coin/40_  copia 4.png",
  "../img/4. Marcadores/green/Coin/60_  copia 4.png",
  "../img/4. Marcadores/green/Coin/80_  copia 4.png",
  "../img/4. Marcadores/green/Coin/100_ copia 4.png",
];

/**
 * Displays the coin status bar based on collected coins
 * Extends the generic Statusbar class
 */
class Coinbar extends Statusbar {
  /**
   * Creates a new coin status bar
   * Initializes position and starting value (0 coins)
   */
  constructor() {
    super(IMAGES_COINBAR, 0, 80, 0);
  }

  /**
   * Updates the coin bar based on collected coins
   * @param {number} coins - Number of collected coins
   */
  updateCoin(coins) {
    this.updateBar(coins * 20);
  }
}
