class Level{
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;
    level_end_x = 4355;

    constructor(enemies,endboss,clouds,backgroundObjects,bottles,coins){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}