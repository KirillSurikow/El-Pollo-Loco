class DrawAbleObject{
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    img;
    otherDirection = false;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {     /* diese Funktion ist in Verbindung mit animate() zubetrachten*/
        arr.forEach(path => {  /*jedes Element wird der Variable path zugeordnet*/
            let img = new Image();  /* für jedes Element aus dem Array wird wird ein img erstellt und je der Variable img zugeordnet*/
            img.src = path;     /*die src des imgs wird der Variable path zugeordnet*//*beachte this. wird nicht verwendet*/
            this.imageCache[path] = img;  /*der path ist der Schlüssel zum img mit dem selben path*/
        });
    }

     
    draw(ctx) {
      
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
       
           /*drawImage ist eine vordefinierte Funktion. er erwartet an für img ein Bild*/
   
    }

    // drawBorder(ctx) {
    //     if (this instanceof Character || this instanceof Chicken){
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();

    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom) ;
    //         ctx.stroke();

    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'green';
    //         ctx.rect(this.x + this.landZone.left, this.y + this.landZone.top, this.width - this.landZone.left - this.landZone.right, this.height - this.landZone.top - this.landZone.bottom) ;
    //         ctx.stroke();
    //     }
    // }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
        this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    }

    isJLandingOn(obj) {
        return this.x + this.width - this.landZone.right > obj.x + obj.landZone.left &&
        this.y + this.height - this.landZone.bottom > obj.y + obj.landZone.top &&
        this.x + this.landZone.left < obj.x + obj.width - obj.landZone.right &&
        this.y + this.landZone.top < obj.y + obj.height - obj.landZone.bottom
    }

}