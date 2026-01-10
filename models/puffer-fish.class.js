class PufferFish extends MovableObject {
    height = 80;
    width = 80;

    constructor(character) {
        super();
        this.loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        const minX = Math.max(GAME_WIDTH / 2, character.x + 100);
        this.x = minX + Math.random() * (GAME_WIDTH - minX - this.width);
        this.y = Math.random() * 300;
    }
}