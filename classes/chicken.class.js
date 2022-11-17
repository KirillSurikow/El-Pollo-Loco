class Chicken extends moveableObject {
    height = 75;
    y = 350;
    offset = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    }
    walkingImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.walkingImages);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();

    };

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.walkingImages);
        }, 200)
    }
}