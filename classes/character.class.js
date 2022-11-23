class Character extends moveableObject {
    height = 250;
    y = 0;
    speed = 10;
    intervalIDsCharacter = [];
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
    world;  // character nimmt hier die Instanz World auf und kann somit auf die Variablen der world zugreifen wie z.B. keyboard
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3')
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);          /* Befehl wird an die superklasse weitergegeben*/
        this.loadImages(this.jumpingImages);
        this.loadImages(this.deadImages);
        this.loadImages(this.hurtImages);
        this.animate();                                /*mit einem Parameter (dem Array)*/
        this.applyGravity();
    };

    hitByEndboss() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    animate() {
        let i = 0;
       let interval1 = setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy > 0) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            
            if (this.world.keyboard.LEFT && this.x > 0 && this.energy > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
           
            if (this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0) {
                this.walking_sound.pause();
                this.jumping_sound.play();
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)


        let interval2 = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.hurtImages);
            } else
                if (this.isAboveGround()) {
                    this.playAnimation(this.jumpingImages);
                } else {
                    if (this.world.keyboard.RIGHT && this.energy > 0 || this.world.keyboard.LEFT && this.energy > 0) { // man fragt ab, ob die Taste rechts gedrückt ist
                        this.playAnimation(this.walkingImages);
                    }
                }
        } , 50)
        let interval3 = setInterval(() => {
            if (this.isDead() && i < 7) {
                this.playAnimation(this.deadImages);
                i++;
            }
        }, 200);
        this.intervalIDsCharacter.push(interval1, interval2, interval3)
    }


}