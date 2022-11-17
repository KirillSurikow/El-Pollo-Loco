class Chicken extends moveableObject {
    dead = false;
    height = 75;
    y = 350;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
    walkingImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imageDead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 730 + Math.random() * 2000;
        this.loadImages(this.walkingImages);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };

    animate() {
        if(this.dead == false){
          
            setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
            setInterval(() => {
               
                this.playAnimation(this.walkingImages);
            }, 200)
        }
        else{
            console.log('play dead')
            setInterval(() => {
                this.playAnimation(this.imageDead);
            }, 200)
        }
        
    }
}