class ThrowableObject extends moveableObject {
    id;
    enbossHit = false;
    glass_sound = new Audio('audio/glass.mp3');
    bottleIntervalIDs = []
    splash;
    splashSound;
    spin;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    spinning_Images = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    splash_Images = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y, id) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.id = id;
        this.loadImages(this.spinning_Images);
        this.loadImages(this.splash_Images);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 90;
        this.throw();
        this.animate();
    }

 
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.y < 330) {
                this.x += 10
            }
        }, 25);
    }

    animate() {
        this.spin = setInterval(() => this.playAnimation(this.spinning_Images), 100);
        this.splash = setInterval(() => {
            if (this.hitGround())
                this.playAnimation(this.splash_Images);
        }, 50);
        this.splashSound = setInterval(() => {
            if (this.y >= 310)
                this.glass_sound.play();
        }, 100);
        this.bottleIntervalIDs.push(this.spin, this.splash, this.splashSound)
    }

    hitGround(){
        return this.y >= 310;
    }
}