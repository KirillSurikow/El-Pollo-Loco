class World {

    character = new Character(); /* ruft die Klasse Character auf*/
    enemies = level1.enemies ;
    clouds = level1.clouds;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;  //
    camera_x = 0;  
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // die Variable keyboard aus der Klasse game wird zu der eigenen Variable keyboard
        this.draw();
        this.setWorld();

    }

    setWorld(){
        this.character.world = this;  // setWorld übergibt die komplette Instanz World an die Variable World in der Klasse character
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)  // Das Bild verschiebt sich um die vordefinierte Pixelzahl
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera_x, 0)
           let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }
    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        })

    }

    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save(); // der context hat Eigenschaften, die nachdem gespiegelten Bild wieder angenommen werden sollen 
            this.ctx.translate(mo.width,0); // Die drei folgenden Zeilen geben das folgende Bild gespiegelt zurück
            this.ctx.scale(-1,1); 
            mo.x = mo.x *-1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)   /*drawImage ist eine vordefinierte Funktion. er erwartet an für img ein Bild*/
        if (mo.otherDirection){
            mo.x = mo.x *-1;
            this.ctx.restore();  // hier werden wieder die alten Eigenschaften vom Canvas angenommen
        }
    }

  
}