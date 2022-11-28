class Endboss extends moveableObject {
    height = 400;
    width = 250;
    y = 55;
    x = 4600;
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
        if (this.energy <= 0)
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    animate() {
        let i = 0;
        let interval1 = setInterval(() => this.animateDamage(), 50);
        let interval2 = setInterval(() => this.inactiveEndboss(i), 200);
        let interval3 = setInterval(() => {
            if (this.alerted(i)) {
                this.animateAlert();
                this.animateWalkAndAttack(i);
                i++;
            }
        }, 200);
        let interval4 = setInterval(() => {
            if (this.shallMoveLeft(i)) {
                this.moveLeft();
            }
        }, 1000 / 60);
        this.intervalIDsEndboss.push(interval1, interval2, interval3, interval4,);
    }

    shallMoveLeft(i) {
        return i >= 7 && this.energy > 0;
    }

    animateWalkAndAttack(i) {
        let k = 0;
        let interval5 = setInterval(() => {
            if (this.shallAnimateWalk(i, k)) {
                this.playAnimation(this.walkingImages);
                k++;
                i++;
            }
        }, 100);
        let interval6 = setInterval(() => {
            if (this.shallAttack(i, k)) {
                this.playAnimation(this.attackingImages);
                k++;
                i++;
            }
            if (k == 41)
                k = 0;
        }, 50);
        this.intervalIDsEndboss.push(interval5, interval6);
    }

    shallAnimateWalk(i, k){
        return i >= 7 && k < 19 && this.energy > 0;
    }

    shallAttack(i, k){
        return i >= 7 && k >= 18 && k < 41 && this.energy > 0;
    }

    inactiveEndboss(i) {
        if (this.notInEndzone(i))
            this.playAnimation(this.walkingImages);
    }

    notInEndzone(i) {
        return this.world.character.x < 4020 && i < 8 && this.energy > 0;
    }

    animateDamage() {
        let j = 0;
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
        if (this.isDead() && j == 3)
            this.playAnimation(this.deadImage);
    }

    animateAlert() {
        this.playAnimation(this.alertImages);
        this.alertSound.play();
    }

    alerted(i) {
        return this.world.character.x > 4020 && i < 8 && this.energy > 0;
    }
}


