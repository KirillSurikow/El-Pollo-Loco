class Chick extends moveableObject {
    id;
    dead = false;
    height = 50;
    y = 370;
    intervalIDsChicken = [];
    chickenMoving;

    offset = {
        top: 15,
        bottom: 0,
        left: 0,
        right: 0
    }

    landZone = {
        top: 0,
        bottom: 40,
        left: 0,
        right: 0
    };
    walkingImages = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    imageDead = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * 
     * @param {number} id every chick gets an id, to identify individual hits on chicks
     */
    constructor(id) {
        super();
        this.id = id;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.walkingImages);
        this.x = 730 + Math.random() * 4000;
        this.loadImages(this.imageDead);
        this.speed = 0.15 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    };

    animate() {
        this.chickJumping = setInterval(() => this.jump(), 3000);
        this.chickenMoving = setInterval(() => this.moveLeft(), 1000 / 60);
        let chickenWalking = setInterval(() => this.playAnimation(this.walkingImages), 200);
        let chickenDead = setInterval(() => this.deadChicken(), 200);
        this.intervalIDsChicken.push(this.chickenMoving, chickenWalking, chickenDead);
    }

    deadChicken() {
        if (this.dead)
            this.playAnimation(this.imageDead);
    }
}