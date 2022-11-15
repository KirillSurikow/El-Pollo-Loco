class Character extends moveableObject {
    height = 250;
    y = 0;
    speed = 10;
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
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-40.png'
    ]
    world;  // character nimmt hier die Instanz World auf und kann somit auf die Variablen der world zugreifen wie z.B. keyboard
    walking_sound = new Audio('audio/walking.mp3')
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);          /* Befehl wird an die superklasse weitergegeben*/
        this.loadImages(this.jumpingImages);
        this.animate();                                /*mit einem Parameter (dem Array)*/
        this.applyGravity();
    };

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)


        setInterval(() => {
            if (this.isAboveGround) {
                this.playAnimation(this.jumpingImages);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // man fragt ab, ob die Taste rechts gedrückt ist
                    this.playAnimation(this.walkingImages);
                }
            }
        }
            , 50)

    }
    jump() {

    };
}