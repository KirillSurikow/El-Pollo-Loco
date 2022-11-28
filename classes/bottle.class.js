class Bottle extends CollectableObject{
    id;
    width = 75;
    height = 75;
    y = 350;
    offset = {
        top : 15,
        bottom : 15,
        left : 23,
        right : 23
    }
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor(id){
        super();
        this.id = id;
        this.loadImage(this.randomImage(this.IMAGES));
        this.positionRandom();
    }

     
    /**
     * 
     * @param {*} array with avaiable images of the bottle
     * @returns random path
     */
    randomImage(array){
        return array[Math.floor(Math.random()*array.length)];  
    }
}