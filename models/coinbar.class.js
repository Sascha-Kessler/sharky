/**
 * Displays the coin status bar based on collected coins
 */
class Coinbar extends Statusbar {
  IMAGES_COINBAR = [
    "../img/4. Marcadores/green/Coin/0_  copia 4.png",
    "../img/4. Marcadores/green/Coin/20_  copia 2.png",
    "../img/4. Marcadores/green/Coin/40_  copia 4.png",
    "../img/4. Marcadores/green/Coin/60_  copia 4.png",
    "../img/4. Marcadores/green/Coin/80_  copia 4.png",
    "../img/4. Marcadores/green/Coin/100_ copia 4.png",
  ];

  /**
   * Creates a new coin status bar
   */
  constructor() {
    super([], 0, 80);

    this.images = this.IMAGES_COINBAR;

    this.loadImages(this.images);
    this.setPercentage(0);
  }

  /**
   * Updates the coin bar based on collected coins
   * @param {number} coins
   */
  coinbarUpdate(coins) {
    this.setPercentage(coins * 20);
  }
}
