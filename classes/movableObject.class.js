class moveableObject{
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){     /* diese Funktion ist in Verbindung mit animate() zubetrachten*/
        arr.forEach(path => {  /*jedes Element wird der Variable path zugeordnet*/
            let img = new Image();  /* für jedes Element aus dem Array wird wird ein img erstellt und je der Variable img zugeordnet*/
            img.src = path;     /*die src des imgs wird der Variable path zugeordnet*//*beachte this. wird nicht verwendet*/
            this.imageCache[path] = img;  /*der path ist der Schlüssel zum img mit dem selben path*/
        });
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
        },1000/60);
    }

    moveRight(){
        console.log('moving Right')
    };
}