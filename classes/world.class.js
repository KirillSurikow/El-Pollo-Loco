class World {
    gameIsRunning = false;
    start;
    character;
    level = level1;
    canvas;
    ctx;
    keyboard;  //
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    collisionFromAbove = false;
    gameOver = new GameOver();
    loss = new Loss();
    intervalIDsWorld = [];
    gameIsFinished = false;
    pain_sound = new Audio('audio/pain.mp3');
    chickenSmall_sound = new Audio('audio/chickenSmall.mp3');
    collectBottle_sound = new Audio('audio/bottle.mp3');
    collectCoin_sound = new Audio('audio/coin.mp3');
    theme_sound = new Audio('audio/theme.mp3');
    win_sound = new Audio('audio/win.mp3');
    loss_sound = new Audio('audio/loss.mp3');
   



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // die Variable keyboard aus der Klasse game wird zu der eigenen Variable keyboard
        this.start = new Start();
        this.drawStartScreen();
        window.addEventListener('keypress', (e) => {
            if (e.keyCode == 13) {
                this.gameIsRunning = true;
                this.initGame();
            }
        })
        // this.checkPlaying();
        // this.draw();
        // this.setWorld();
        // this.checkCollisions();
        // this.run()
    }

    drawStartScreen() {
        this.addToMap(this.start);
        let self = this;
        requestAnimationFrame(function () {
            self.drawStartScreen()
        });
    }



    initGame() {
        if (this.gameIsRunning == true) {
            this.character = new Character();
            this.level = initLevel();
            this.setWorld();
            this.run();
            this.draw();
        }


        // this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;  // setWorld übergibt die komplette Instanz World an die Variable World in der Klasse character
    }



    run() {
        let interval1 = setInterval(() => {
            this.checkCollisions();
            this.checkContactWithEndBoss();
        }, 50);
        let interval2 = setInterval(() => {
            this.checkThrowObjects();
        }, 200);
        let interval3 = setInterval(() => {
            this.hitEndBoss();
        }, 650);
        let interval4 = setInterval(() => {
            if (this.gameIsRunning == true && this.theme_sound)
                this.theme_sound.play();
                // this.theme_sound.loop = true;
        }, 20);
        this.intervalIDsWorld.push(interval1, interval2, interval3, interval4)

    }

    drawLossScreen() {
        if (this.character.energy == 0) {
            this.theme_sound.pause();
            setTimeout(() => {
                this.loss_sound.play();
            }, 1000);
            this.addToMap(this.loss);
            this.prepareRestart()
        }
    };

    prepareRestart() {
        setTimeout(() => {
            this.drawStartScreen();
            this.gameIsFinished = true;
            this.resetIntervals();
            this.resetVariables();
            this.pauseSounds();
            init();
        }, 7000);
    }

    resetIntervals() {
        this.intervalIDsWorld.forEach(clearInterval);
        this.character.intervalIDsCharacter.forEach(clearInterval);
        this.level.endboss[0].intervalIDsEndboss.forEach(clearInterval);
        this.clearIntervalChickens();
    }

    clearIntervalChickens() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let chicken = this.level.enemies[i];
            chicken.intervalIDsChicken.forEach(clearInterval);
        }
    }

    resetVariables() {
        this.character.x = 120;
        this.character.energy = 100;
        this.level.endboss[0].energy = 100;
        this.character.bottles = 0;
        this.character.coins = 0;
        this.level.endboss.x = 2500;
        this.throwableObjects = [];
        this.level = level1;
    }

    pauseSounds() {
        this.pain_sound = '';
        this.chickenSmall_sound = '';
        this.collectBottle_sound = '';
        this.collectCoin_sound = '';
        this.theme_sound = '';
        this.win_sound = '';
        this.loss_sound = '';

    }

    drawWinScreen() {
        if (this.level.endboss[0].energy == 0) {
            this.addToMap(this.gameOver);
            this.theme_sound = '';
            this.prepareRestart();
            setTimeout(() => {
                this.win_sound.play();
            }, 1000);
        }
    }

    checkThrowObjects() {
        let id = 0;
        if (this.keyboard.D && this.character.bottles > 0 && this.character.energy > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, id);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.updateBottleBar();
            this.removeThrownBottle(id);
            id++;
        }
    }

    removeThrownBottle(id){
        setTimeout(() => {
            console.log(id);
            for (let i = 0; i < this.throwableObjects.length; i++) {
                let bottleID = this.throwableObjects[i].id;
                if (bottleID == id) {
                    this.throwableObjects.splice(i, 1);
                }
            }   
        }, 1500);
    }

    checkCollisions() {
        this.collisionWithEnemies();
        this.collisionWithEndboss();
        this.collisionWithCoins();
        this.collisionWithBottles();
        this.hitBottle();
        this.landOnEnemy();
    }

    collisionWithEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.collisionFromAbove == false && enemy.dead == false) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy, this.healthBar.ImagesHealth)
                this.pain_sound.play();
            }
        })
    }

    collisionWithEndboss() {
        if (this.character.isColliding(this.level.endboss[0])) {
            this.character.hitByEndboss();
            this.healthBar.setPercentage(this.character.energy, this.healthBar.ImagesHealth)
            this.pain_sound.play();
        }
    }

    collisionWithCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoin_sound.play();
                this.removeCoin(coin.id);
                this.character.coins++;
                this.updateCoinBar();
            }
        })
    }

    removeCoin(id) {
        for (let i = 0; i < this.level.coins.length; i++) {
            let coinID = this.level.coins[i].id;
            if (coinID == id) {
                this.level.coins.splice(i, 1);
            }
        }
    }

    updateCoinBar() {
        let progress = Math.round((this.character.coins / this.level.coins.length) * 100);
        this.coinBar.setPercentage(progress, this.coinBar.ImagesCoin);
    }

    collisionWithBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.removeBottle(bottle.id)
                this.character.bottles++
                this.updateBottleBar();
                this.collectBottle_sound.play()
            }
        })
    }

    updateBottleBar() {
        let progress = Math.round((this.character.bottles / this.level.bottles.length) * 100);
        this.bottleBar.setPercentage(progress, this.bottleBar.ImagesBottle);
    }

    removeBottle(id) {
        for (let i = 0; i < this.level.bottles.length; i++) {
            let bottleID = this.level.bottles[i].id;
            if (bottleID == id) {
                this.level.bottles.splice(i, 1);
            }
        }
    }

    hitBottle() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.chickenSmall_sound.play();
                    this.showDeadChicken(enemy)
                }
            });
        })
    }

    hitEndBoss() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.isColliding(this.level.endboss[0])) {
                this.level.endboss[0].removeEnergyEndBoss();
            }
        });
    }

    showDeadChicken(enemy) {
        for (let i = 0; i < this.level.enemies.length; i++) {
            let chickenHit = this.level.enemies[i];
            let chickenID = this.level.enemies[i].id;
            if (enemy.id == chickenID) {
                this.level.enemies[i].dead = true;
                clearInterval(chickenHit.chickenMoving);
            }

        }
    }

    landOnEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isJLandingOn(enemy)) {
                this.collisionFromAbove = true;
                this.showDeadChicken(enemy);
                this.chickenSmall_sound.play();
                setTimeout(() => {
                    this.collisionFromAbove = false;
                }, 500);
            }
        })
    }

    checkContactWithEndBoss() {
        if (this.character.x > 1930) {
            this.level.endboss.contactWithCharacter = true;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)  // Das Bild verschiebt sich um die vordefinierte Pixelzahl
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawWinScreen();
        this.drawLossScreen();
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0)
        this.ctx.translate(-this.camera_x, 0)
        let self = this;
        requestAnimationFrame(function () {
            self.draw()
        });
    }
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })

    }

    addToMap(mo) {
        try {
            if (mo.otherDirection) {
                this.flipImage(mo)
            }
        } catch (error) {
            console.log(mo.otherDirection);
        }



        mo.draw(this.ctx); // mo steht stellvertretend für die Instanz object. Die Instanz moveableObject wird hier als mo durchgereicht.
        // mo.drawBorder(this.ctx);


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