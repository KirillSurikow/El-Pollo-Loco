class World {
    start = new Start();
    character = new Character(); /* ruft die Klasse Character auf*/
    level = level1;
    canvas;
    ctx;
    keyboard;  //
    camera_x = 0;
    statusbar = new StatusBar();
    throwableObjects = []


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // die Variable keyboard aus der Klasse game wird zu der eigenen Variable keyboard
        this.drawStartScreen();
        this.requestStart();
        // this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run()
    }

    drawStartScreen(){
        this.addToMap(this.start);
    }

    requestStart(){
        if(this.keyboard.ENTER){
            // this.draw();
        }
    }

    setWorld() {
        this.character.world = this;  // setWorld übergibt die komplette Instanz World an die Variable World in der Klasse character
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x +100 , this.character.y + 100);
            this.throwableObjects.push(bottle)
        }
    }

    checkCollisions() {

        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                console.log('collision with character', this.character.energy);
                this.character.hit()
                this.character.energy -= 5;
                this.statusbar.setPercentage(this.character.energy)
            }
        })

    }

    // draw() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.ctx.translate(this.camera_x, 0)  // Das Bild verschiebt sich um die vordefinierte Pixelzahl
    //     this.addObjectsToMap(this.level.backgroundObjects);
    //     this.addToMap(this.character);
    //     this.addObjectsToMap(this.level.enemies);
    //     this.addObjectsToMap(this.level.clouds);
    //     this.addObjectsToMap(this.throwableObjects);
    //     this.ctx.translate(-this.camera_x, 0)
    //     this.addToMap(this.statusbar);
    //     this.ctx.translate(this.camera_x, 0)
    //     this.ctx.translate(-this.camera_x, 0)
    //     let self = this;
    //     requestAnimationFrame(function () {
    //         self.draw()
    //     });
    // }
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })

    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx); // mo steht stellvertretend für die Instanz object. Die Instanz moveableObject wird hier als mo durchgereicht.
        mo.drawBorder(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save(); // der context hat Eigenschaften, die nachdem gespiegelten Bild wieder angenommen werden sollen 
        this.ctx.translate(mo.width, 0); // Die drei folgenden Zeilen geben das folgende Bild gespiegelt zurück
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();  // hier werden wieder die alten Eigenschaften vom Canvas angenommen
    }


}