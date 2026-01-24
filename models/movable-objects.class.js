class MovableObject {
    img;
    imageCache = {};
    speed = 0.15;
    speedX = 0;
    speedY = 0;

    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
    }


    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60);
    }
}