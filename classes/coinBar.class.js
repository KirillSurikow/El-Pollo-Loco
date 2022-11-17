class CoinBar extends StatusBar{
    ImagesCoin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    ]

    constructor (){
        super();
        this.loadImages(this.ImagesCoin);
        this.setPercentage(100,this.ImagesCoin);
        this.y = 50;
    }
}