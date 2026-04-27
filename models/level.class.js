/**
 * Represents a game level containing all entities and environment objects
 */
class Level {
  level_end_x = 2500;

  /**
   * Creates a new level instance
   * @param {Array} enemies
   * @param {Array} backgroundObjects
   * @param {Array} coins
   * @param {Array} poisonBottles
   */
  constructor(enemies, backgroundObjects, coins, poisonBottles) {
    this.enemies = enemies;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.poisonBottles = poisonBottles;
  }
}
