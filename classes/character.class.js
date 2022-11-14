class Character extends moveableObject {
    height = 250;
    y = 180
    speed = 10;
    walkingImages = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]
    world;  // character nimmt hier die Instanz World auf und kann somit auf die Variablen der world zugreifen wie z.B. keyboard
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);          /* Befehl wird an die superklasse weitergegeben*/
        this.animate();                                /*mit einem Parameter (dem Array)*/                      
    };

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60)

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) { // man fragt ab, ob die Taste rechts gedrückt ist
                let i = this.currentImage % this.walkingImages.length;
                let path = this.walkingImages[i];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
                this.img = this.imageCache[path];              /*das img tag wird das img Element aus dem JSON mit dem benannten Schlüssel*/
                this.currentImage++;
            }
        }
            , 50)
    }

    jump() {

    };
}