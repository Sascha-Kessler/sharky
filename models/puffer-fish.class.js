class PufferFish extends MovableObject {
    height = 60;
    width = 60;
    IMAGES_SWIMMING = ['../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
            '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
            '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
            '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
            '../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
        ];
    currentImage = 0;

    constructor(character) {
        super();
        this.loadImage('../img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
        const minX = Math.max(GAME_WIDTH / 2, character.x + 100);
        this.x = minX + Math.random() * (GAME_WIDTH - minX - this.width);
        this.y = Math.random() * 300;
        
    }

    animate() {
        setInterval(() => {
            let path = this.IMAGES_SWIMMING[this.currentImage];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.currentImage === 5) {
            this.currentImage = 0;
        }
        }, 1000);  
    }
}