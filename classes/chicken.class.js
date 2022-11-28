class Chicken extends moveableObject {
    id;
    dead = false;
    height = 75;
    y = 350;
    intervalIDsChicken = [];
    chickenMoving;

    offset = {
        top: 15,
        bottom: 0,
        left: 0,
        right: 0
    }

    landZone = {
        top: -10,
        bottom: 60,
        left: 0,
        right: 0
    };

    walkingImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imageDead = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * 
     * @param {number} id every chicken gets an id, to identify individual hits
     */
    constructor(id) {
        super();
        this.id = id;
        this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.walkingImages);
        this.x = 730 + Math.random() * 4000;
        this.loadImages(this.imageDead);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };

    animate() {
        this.chickenMoving = setInterval(() => this.moveLeft(), 1000 / 60);
        let chickenWalking = setInterval(() => this.playAnimation(this.walkingImages), 200);
        let chickenDead = setInterval(() => this.chickenDead(), 200);
        this.intervalIDsChicken.push(this.chickenMoving, chickenWalking, chickenDead)
    }

    chickenDead() {
        if (this.dead)
            this.playAnimation(this.imageDead);
    }
}