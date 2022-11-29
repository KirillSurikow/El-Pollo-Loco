class Character extends moveableObject {
    height = 250;
    y = 0;
    speed = 10;
    intervalIDsCharacter = [];
    inactiveTime = 0;
    inactiveCounter = 0;

    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 25
    };

    landZone = {
        top: 240,
        bottom: 0,
        left: 20,
        right: 25
    };
    coins = 0;
    bottles = 0;
    walkingImages = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    jumpingImages = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    deadImages = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    hurtImages = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    standingImages = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    sleepingImages = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;  // character nimmt hier die Instanz World auf und kann somit auf die Variablen der world zugreifen wie z.B. keyboard

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);          /* Befehl wird an die superklasse weitergegeben*/
        this.loadImages(this.jumpingImages);
        this.loadImages(this.deadImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.standingImages);
        this.loadImages(this.sleepingImages);
        this.animate();                                /*mit einem Parameter (dem Array)*/
        this.applyGravity();
    };

    hitByEndboss() {
        this.energy -= 10;
        if (this.dead())
            this.energy = 0;
        else
            this.lastHit = new Date().getTime();
    }

    dead() {
        return this.energy <= 0
    }

    animate() {
        let interval1 = setInterval(() => this.moveCharacter(), 1000 / 60);
        let interval2 = setInterval(() => this.playCharacter(), 50);
        let interval3 = setInterval(() => this.deadCharacter(), 200);
        let interval4 = setInterval(() => this.inactiveCharacter(), 200);
        let interval5 = setInterval(() => this.sleepingCharacter(), 200);
        this.intervalIDsCharacter.push(interval1, interval2, interval3, interval4, interval5)
    }

    moveCharacter() {
        this.world.walking_sound.pause();
        if (this.shallMoveRight())
            this.moveToRight();
        if (this.shallMmoveLeft())
            this.moveToLeft();
        if (this.shallJump())
            this.jumpCharacter();
        this.adjustCamera()
    }

    shallMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy > 0;
    }

    moveToRight() {
        this.inactiveCounter = 0;
        this.moveRight();
        this.otherDirection = false;
        this.world.walking_sound.play();
    }

    shallMmoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0 && this.energy > 0;
    }

    moveToLeft() {
        this.inactiveCounter = 0;
        this.moveLeft();
        this.otherDirection = true;
        this.world.walking_sound.play();
    }

    shallJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0;
    }

    jumpCharacter() {
        this.inactiveCounter = 0;
        this.world.walking_sound.pause();
        this.world.jumping_sound.play();
        this.jump(); 
    }

    adjustCamera() {
        this.world.camera_x = -this.x + 100;
    }

    playCharacter() {
        if (this.isHurt())
            this.playAnimation(this.hurtImages);
        else if (this.isAboveGround())
            this.playAnimation(this.jumpingImages);
        else if (this.movingAndGrounded())
            this.playAnimation(this.walkingImages);
    }

    inactiveCharacter() {
        if (this.isInactive() && this.inactiveCounter <= 25){
            this.playAnimation(this.standingImages);
            this.inactiveCounter++
        }
    }

    isInactive(){
        return !this.world.keyboard.SPACE && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT;
    }

    sleepingCharacter(){
      if(this.isInactive() && this.inactiveCounter > 25){
          this.playAnimation(this.sleepingImages)
      }
    }

    movingAndGrounded() {
        return this.world.keyboard.RIGHT && this.energy > 0 || this.world.keyboard.LEFT && this.energy > 0;
    }

    deadCharacter() {
        let i = 0;
        if (this.isDead() && i < 7) {
            this.playAnimation(this.deadImages);
            i++;
        }
    }
}
