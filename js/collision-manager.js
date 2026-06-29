/**
 * Handles all collision checks inside the game world.
 */
class CollisionManager {
  /**
   * Creates a new collision manager.
   * @param {World} world - Current game world instance
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Handles all collision types.
   */
  handleAll() {
    this.handleEnemyCollisions();
    this.handleBubbleCollisions();
    this.handleFinSlapCollisions();
    this.handlePoisonBottlesCollisions();
    this.handleCoinCollisions();
  }

  /**
   * Checks collisions between character and enemies.
   */
  handleEnemyCollisions() {
    const { character, enemies } = this.world;

    enemies.forEach((enemy) => {
      if (character.isColliding(enemy)) {
        this.world.handleCharacterHit(20);
      }
    });
  }

  /**
   * Checks collisions between bubbles and enemies.
   */
  handleBubbleCollisions() {
    const world = this.world;

    world.throwableObjects = world.throwableObjects.filter((bubble) => {
      const hitEnemy = world.enemies.find((enemy) => bubble.isColliding(enemy));

      if (hitEnemy) {
        hitEnemy.hit(bubble.damage);
        world.soundManager.play("bubblePop");
        return false;
      }

      return true;
    });
  }

  /**
   * Checks collisions between fin slap attack and enemies.
   */
  handleFinSlapCollisions() {
    const { character, enemies } = this.world;

    if (!character.isFinSlapAttacking || character.finSlapHitDone) return;

    enemies.forEach((enemy) => {
      if (this.isFinSlapHit(enemy)) {
        enemy.finSlapMarked = true;
        character.finSlapHitDone = true;
      }
    });
  }

  /**
   * Checks if an enemy is inside the fin slap attack range.
   * @param {MovableObject} enemy - Enemy object to check
   * @returns {boolean}
   */
  isFinSlapHit(enemy) {
    const char = this.world.character;
    const attackOffset = 10;

    const overlapsX = char.otherDirection
      ? char.x - attackOffset < enemy.x + enemy.width
      : char.x + char.width + attackOffset > enemy.x;

    const a = char.getHitbox();
    const b = enemy.getHitbox();

    const overlapsY = a.bottom > b.top && a.top < b.bottom;

    return overlapsX && overlapsY;
  }

  /**
   * Checks collisions between character and poison bottles.
   */
  handlePoisonBottlesCollisions() {
    const world = this.world;

    world.poisonBottles = world.poisonBottles.filter((poisonBottle) => {
      if (world.character.isColliding(poisonBottle)) {
        world.soundManager.play("bottlePickup");

        world.character.poisonBottles++;

        world.poisonbar.updatePoison(world.character.poisonBottles);

        return false;
      }

      return true;
    });
  }

  /**
   * Checks collisions between character and coins.
   */
  handleCoinCollisions() {
    const world = this.world;

    world.coins = world.coins.filter((coin) => {
      if (world.character.isColliding(coin)) {
        world.soundManager.play("coinPickup");
        world.character.coins++;
        world.coinbar.updateCoin(world.character.coins);
        return false;
      }

      return true;
    });
  }
}
