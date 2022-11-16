class StatusBar extends DrawAbleObject {



   IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    ]

    percentage;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
        this.img = this.imageCache[path];              /*das img tag wird das img Element aus dem JSON mit dem benannten Schlüssel*/
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage >= 80) {
            return 1;
        } else if (this.percentage >= 60) {
            return 2;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 20) {
            return 4;
        } else if (this.percentage >= 0) {
            return 5;
        }
    }
}