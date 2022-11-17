class HealthBar extends StatusBar{
    ImagesHealth = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    ]

    constructor (){
        super();
        this.loadImages(this.ImagesHealth);
        this.setPercentage(100,this.ImagesHealth);
        this.y = 0;
    }
}