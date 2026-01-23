class Character extends MovableObject {
    x = 120;
    y = 200;
    height = 140;
    width = 140;
    IMAGES_SWIMMING = ['../img/1.Sharkie/3.Swim/1.png',
            '../img/1.Sharkie/3.Swim/2.png',
            '../img/1.Sharkie/3.Swim/3.png',
            '../img/1.Sharkie/3.Swim/4.png',
            '../img/1.Sharkie/3.Swim/5.png',
            '../img/1.Sharkie/3.Swim/6.png'
        ];
    currentImage = 0;

    constructor() {
        super();
        this.loadImage('../img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200);  
    }
}