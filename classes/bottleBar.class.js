class BottleBar extends StatusBar{
    ImagesBottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png', 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',  
    ]

    constructor (){
        super();
        this.loadImages(this.ImagesBottle);
        this.setPercentage(100,this.ImagesBottle);
        this.y = 100;
    }
} 