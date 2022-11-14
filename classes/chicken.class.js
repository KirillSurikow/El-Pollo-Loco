class Chicken extends moveableObject{
   height = 75;
    y = 350;
    walkingImages = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.walkingImages);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        
    };

    animate(){
        this.moveLeft();
        setInterval(()=>{
        let i = this.currentImage % this.walkingImages.length;
        let path = this.walkingImages[i];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
        this.img = this.imageCache[path];              /*das img tag wird das img Element aus dem JSON mit dem benannten Schlüssel*/
        this.currentImage++;},200)
     }
}