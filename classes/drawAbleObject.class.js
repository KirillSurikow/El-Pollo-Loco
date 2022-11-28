class DrawAbleObject{
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    img;
    otherDirection = false;
    imageCache = {};
    currentImage = 0;

    /**
     * 
     * @param {string} path of image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {array} arr with the avaiable images for an animation
     */
    loadImages(arr) {     
        arr.forEach(path => {  
            let img = new Image(); 
            img.src = path;     
            this.imageCache[path] = img;  
        });
    }

     
    draw(ctx) {
      try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch (error) {
        console.log(this.img);
      }
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
        this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
        this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
        this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    }
}