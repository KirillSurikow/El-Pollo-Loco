class Coin extends CollectableObject{
    id;
    width = 75;
    height = 75;
    y;
    offset = {
        top : 23,
        bottom : 23,
        left : 23,
        right : 23
    }
    
    /**
     * 
     * @param {number} id to identify individual coins
     */
    constructor(id){
        super();
        this.id = id;
        this.loadImage('img/8_coin/coin_1.png');
        this.positionRandom();
        this.positionRandomY();
    }
    
    positionRandomY(){
        this.y = 150 + Math.random() * 200;
    }
    
}