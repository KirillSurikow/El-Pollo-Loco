let level1;

 function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0,),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0,),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0,),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0,), // ruft den Constructor von BackgroundObject auf und übergibt den Pfad als Parameter

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        ],
        [
            new Bottle(0),
            new Bottle(1),
            new Bottle(2),
            new Bottle(3),
            new Bottle(4),
            new Bottle(5),
            new Bottle(6),
            new Bottle(7),
            new Bottle(8),
            new Bottle(9),
            new Bottle(10),
            new Bottle(11),
            new Bottle(12),
            new Bottle(13),
            new Bottle(14),
        ],
        [
            new Coin(0),
            new Coin(1),
            new Coin(2),
            new Coin(3),
            new Coin(4),
            new Coin(5),
            new Coin(6),
            new Coin(7),
            new Coin(8),
            new Coin(9),
            new Coin(10),
            new Coin(11),
            new Coin(12),
            new Coin(13),
            new Coin(14),
            new Coin(15),
            new Coin(16),
            new Coin(17),
        ]
    );

    
    return level1
}

