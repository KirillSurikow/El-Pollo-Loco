class moveableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround(){
        return this.y <  180
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {     /* diese Funktion ist in Verbindung mit animate() zubetrachten*/
        arr.forEach(path => {  /*jedes Element wird der Variable path zugeordnet*/
            let img = new Image();  /* für jedes Element aus dem Array wird wird ein img erstellt und je der Variable img zugeordnet*/
            img.src = path;     /*die src des imgs wird der Variable path zugeordnet*//*beachte this. wird nicht verwendet*/
            this.imageCache[path] = img;  /*der path ist der Schlüssel zum img mit dem selben path*/
        });
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    moveRight() {
        console.log('moving Right')
    };

    playAnimation(images) {
        let i = this.currentImage % this.walkingImages.length;
        let path = images[i];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
        this.img = this.imageCache[path];              /*das img tag wird das img Element aus dem JSON mit dem benannten Schlüssel*/
        this.currentImage++;
    }
}