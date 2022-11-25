class World {
    gameIsRunning = false;
    startScreen;
    game;
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
    pain_sound = new Audio('audio/pain.mp3');
    chickenSmall_sound = new Audio('audio/chickenSmall.mp3');
    collectBottle_sound = new Audio('audio/bottle.mp3');
    collectCoin_sound = new Audio('audio/coin.mp3');
    theme_sound = new Audio('audio/theme.mp3');
    win_sound = new Audio('audio/win.mp3');
    loss_sound = new Audio('audio/loss.mp3');
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    muted = false;




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard; // die Variable keyboard aus der Klasse game wird zu der eigenen Variable keyboard
        this.start = new Start();
        this.drawStartScreen();
        window.addEventListener('keypress', (e) => {
            if (e.keyCode == 13 && this.gameIsRunning == false) {
                this.gameIsRunning = true;
                this.initGame();
            }
            if (e.keyCode == 70 && this.muted == false ) {
                console.log('mute');
                this.pain_sound.volume = 0;
                this.chickenSmall_sound.volume = 0;
                this.collectBottle_sound.volume = 0;
                this.collectCoin_sound.volume = 0;
                this.theme_sound.volume = 0;
                this.win_sound.volume = 0;
                this.loss_sound.volume = 0;
                this.walking_sound.volume = 0;
                this.jumping_sound.volume = 0;
                this.muted = true;
            }
            if (e.keyCode == 70 && this.muted == true) {
                this.pain_sound.volume = 1;
                this.chickenSmall_sound.volume = 1;
                this.collectBottle_sound.volume = 1;
                this.collectCoin_sound.volume = 1;
                this.theme_sound.volume = 0.25;
                this.win_sound.volume = 1;
                this.loss_sound.volume = 1;
                this.walking_sound.volume = 1;
                this.jumping_sound.volume = 1;
                this.muted = false;
            }
        })
    }


    /**
     * start screen is drawn
     * 
     */
    drawStartScreen() {
        cancelAnimationFrame(this.game);
        this.addToMap(this.start);
        let self = this;
        this.startScreen = requestAnimationFrame(function () {
            self.drawStartScreen()
        });
    }


    /**
     * the game starts after clicking
     * 
     */
    initGame() {
        if (this.gameIsRunning == true) {
            cancelAnimationFrame(this.startScreen);
            this.character = new Character();
            this.level = initLevel();
            this.setWorld();
            this.run();
            this.shallMute();
            this.draw();
            this.endOfGame();
        }
    }

    shallMute(){
        setInterval(() => {
            if(this.keyboard.F == true){
                console.log('mute')
            }
        }, 250);
    }

    endOfGame() {
        let endOfGame = setInterval(() => {
            if (this.character.energy == 0 || this.level.endboss[0].energy == 0) {
                clearInterval(endOfGame);
                this.pauseThemeSound();
                this.startEndSounds();
                this.resetIntervals();
                this.prepareRestart();
            }
        }, 500);
    }


    /**
    * clearing all intervals of the game
    * 
    */
    resetIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }

    resetStatusbars() {
        this.updateBottleBar();
        this.updateCoinBar();
        this.healthBar.setPercentage(this.character.energy, this.healthBar.ImagesHealth);
    }

    /**
   * go back to start screen and reset the game
   * 
   */
    prepareRestart() {
        setTimeout(() => {
            this.resetVariables();
            this.drawStartScreen();
            this.gameIsRunning = false;
        }, 7000);
    }


    pauseThemeSound() {
        this.theme_sound.pause();
    }

    startEndSounds() {
        if (this.character.energy == 0) {
            this.loss_sound.play();
            setTimeout(() => {
                this.loss_sound.pause();
            }, 7000);
        }
        if (this.level.endboss[0].energy == 0) {
            this.win_sound.play();

            setTimeout(() => {
                this.win_sound.pause();
            }, 7000);
        }
    }

    /**
     * Passing the world as whole to the class character
     * 
     */
    setWorld() {
        this.character.world = this;  // setWorld übergibt die komplette Instanz World an die Variable World in der Klasse character
    }

    /**
     * all intervals running in the world class
     * 
     */
    run() {
        this.theme_sound.play();
        this.theme_sound.loop = true;
        this.theme_sound.volume = 0.25;
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
        this.intervalIDsWorld.push(interval1, interval2, interval3)

    }


    /**
     * drawing the loss screen 
     * 
     */
    drawLossScreen() {
        if (this.character.energy == 0) {
            this.addToMap(this.loss);
        }
    };

    drawWinScreen() {
        if (this.level.endboss[0].energy == 0) {
            this.addToMap(this.gameOver);
        }
    }






    // resetRemainingIntervals() {
    //     clearInterval(83);
    // }


    // clearIntervalChickens() {
    //     for (let i = 0; i < this.level.enemies.length; i++) {
    //         let chicken = this.level.enemies[i];
    //         chicken.intervalIDsChicken.forEach(clearInterval);
    //     }
    // }

    resetVariables() {
        this.character.x = 120;
        this.character.energy = 100;
        this.level.endboss[0].energy = 100;
        this.character.bottles = 0;
        this.character.coins = 0;
        this.level.endboss.x = 2500;
        this.throwableObjects = [];
        this.resetStatusbars();
        this.level = '';
    }


    /**
     * central function for throwing objects
     * 
     */
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

    removeThrownBottle(id) {
        setTimeout(() => {
            console.log(id);
            for (let i = 0; i < this.throwableObjects.length; i++) {
                let bottleID = this.throwableObjects[i].id;
                if (bottleID == id) {
                    clearInterval(this.throwableObjects[i].splashSound);
                    console.log(this.throwableObjects[i].splashSound);
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
        console.log('done')
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
        this.game = requestAnimationFrame(function () {
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