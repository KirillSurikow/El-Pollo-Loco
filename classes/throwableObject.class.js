class ThrowableObject extends moveableObject{

    offset = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0
    }

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 90;
        this.throw();
    }
    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
          this.x += 10  
        }, 25);
    }
}