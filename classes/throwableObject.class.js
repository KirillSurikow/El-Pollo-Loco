class ThrowableObject extends moveableObject{

    constructor(){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 90;
        this.throw();
    }
    throw(){
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
          this.x += 10  
        }, 25);
    }
}