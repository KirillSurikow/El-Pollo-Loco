class Endboss extends moveableObject {
    height = 400;
    width = 250;
    y = 55;
    x = 2500;
    contactWithCharacter = false;
    firstContact = false;
    world;
    dead = false;
    lastAttack = 0;
    intervalIDsEndboss = [];
    alertSound = new Audio('audio/chickenBig.mp3');
    hurtSound = new Audio('audio/chickenSmall.mp3')
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    landone = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    alertImages = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'

    ];

    attackingImages = [
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    walkingImages = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

    ];

    hurtImages = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    deadImages = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    deadImage = [
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super();
        this.world = world;
        this.loadImages(this.walkingImages);
        this.loadImages(this.alertImages);
        this.loadImages(this.attackingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deadImages);
        this.animate();
        this.speed = 1;
    }

    removeEnergyEndBoss() {
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    animate() {
        let i = 0;
        let j = 0;
        let k = 0;
       let interval1 = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.hurtImages);
                this.hurtSound.play();
            };
            if (this.isDead() && j <= 2) {
                this.playAnimation(this.deadImages);
                j++;
                clearInterval(this.chickenBossMoving);
                clearInterval(this.chickenBossWalking);
            }
            if (this.isDead() && j == 3) {
                this.playAnimation(this.deadImage);
            }
        }, 50);
        let interval2 = setInterval(() => {
            if (this.world.character.x < 1920 && i < 8 && this.energy > 0) {
                this.playAnimation(this.walkingImages);
            }
        }, 200);
        let interval3 = setInterval(() => {
            if (this.world.character.x > 1920 && i < 8 && this.energy > 0) {
                this.playAnimation(this.alertImages);
                this.alertSound.play();
                i++;
            }
        }, 200);
        let interval4 = setInterval(() => {
            if (i >= 8 && this.energy > 0) {

                this.moveLeft();
            }
        }, 1000 / 60);
        let interval5 = setInterval(() => {
            if (i >= 8 && k < 19 && this.energy > 0 ) {
                this.playAnimation(this.walkingImages);
                k++;
            }  
        }, 100);
        let interval6= setInterval(() => {
            if (i >= 8 && k >= 18 && k < 41 && this.energy > 0 ) {
                this.playAnimation(this.attackingImages);
                k++;
               
            }
            if (k == 41) {
                k = 0;
                
            }
        }, 50);
        this.intervalIDsEndboss.push(interval1, interval2, interval3, interval4, interval5, interval6);
    }
}


