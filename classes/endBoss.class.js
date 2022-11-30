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
    movingCounter = 0;
    attackingCounter = 0;
    hurt = false;
    hurtCounter = 0;

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
        this.hurt = true;
        if (this.energy <= 0)
            this.energy = 0;
    }

    /**
     * initiating all intervals linked to the endboss
     * 
     */
    animate() {
        let interval1 = setInterval(() => this.animateDamage(), 500);
        let interval2 = setInterval(() => this.inactiveEndboss(), 200);
        let interval3 = setInterval(() => this.isAlerted(), 200);
        let interval4 = setInterval(() => this.isMovingLeft(), 1000 / 60);
        let interval5 = setInterval(() => this.isAnimatingWalk(), 100);
        let interval6 = setInterval(() => this.isAttacking(), 150);
        let interval7 = setInterval(() => this.animateDeath(), 50);
        this.intervalIDsEndboss.push(interval1, interval2, interval3, interval4, interval5, interval6, interval7);
    }

    isAlerted(){
        if (this.alerted()) {
            console.log('works')
            this.animateAlert();
            this.movingCounter++;
        }
    }

    isMovingLeft(){
        if (this.shallMoveLeft()) {
            this.moveLeft();
        }
    }

    shallMoveLeft() {
        return this.movingCounter >= 7 && this.energy > 0;
    }

    isAnimatingWalk(){
        if (this.shallAnimateWalk()) {
            this.playAnimation(this.walkingImages);
            this.attackingCounter++;
            this.movingCounter++;
        }
    }

    isAttacking(){
        if (this.shallAttack()) {
            this.playAnimation(this.attackingImages);
            this.attackingCounter++;
            this.movingCounter++;
        }
        if (this.attackingCounter == 41)
            this.attackingCounter = 0;
    }

    shallAnimateWalk(){
        return this.movingCounter >= 7 && this.attackingCounter < 19 && this.energy > 0;
    }

    shallAttack(){
        return this.movingCounter >= 7 && this.attackingCounter >= 18 && this.attackingCounter < 41 && this.energy > 0;
    }

    inactiveEndboss() {
        if (this.notInEndzone())
            this.playAnimation(this.walkingImages);
    }

    notInEndzone() {
        return this.world.character.x < 4020 && this.movingCounter < 8 && this.energy > 0;
    }

    animateDamage() {
        if (this.hurt && this.hurtCounter < 3) {
            this.playAnimation(this.hurtImages);
            this.hurtSound.play();
            this.hurtCounter++;
        };
        if(this.hurt && this.hurtCounter == 3){
            this.hurt = false;
            this.hurtCounter = 0;
        }
        
    }

    animateDeath(){
        if (this.isDead() && hurtCounter <= 2) {
            this.playAnimation(this.deadImages);
            clearInterval(this.chickenBossMoving);
            clearInterval(this.chickenBossWalking);
        }
        if (this.isDead() && hurtCounter == 3)
            this.playAnimation(this.deadImage);
    }

    animateAlert() {
        this.playAnimation(this.alertImages);
        this.alertSound.play();
    }

    alerted() {
        return this.world.character.x > 4020 && this.movingCounter < 8 && this.energy > 0;
    }
}


