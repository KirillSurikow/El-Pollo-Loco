class moveableObject extends DrawAbleObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    img;
    

    constructor(){
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 330;
        } else if ( this instanceof Chick){
            return this.y < 350;
        } 
        else {
            return this.y < 180;
        }
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed;
    };

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
        this.img = this.imageCache[path];              /*das img tag wird das img Element aus dem JSON mit dem benannten Schlüssel*/
        this.currentImage++;
    }

    jump() {
        this.speedY = 30;
    }
   
    hit() {
        this.energy -= 5;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }
    
    /**
     * limits the amount of damage, that can be took by one collision
     * 
     * @returns a boolean
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1.5;
    }
    
    /**
     * decides wheter the character's feetzone collides with enemy's headzone
     * 
     * @param {object} obj 
     * @returns boolean
     */
    isLandingOn(obj) {
        return this.x + this.width - this.landZone.right > obj.x + obj.landZone.left &&
        this.y + this.height - this.landZone.bottom > obj.y + obj.landZone.top &&
        this.x + this.landZone.left < obj.x + obj.width - obj.landZone.right &&
        this.y + this.landZone.top < obj.y + obj.height - obj.landZone.bottom
    }
}