class StatusBar extends DrawAbleObject {
    x = 40;
    width = 200;
    height = 60;
    percentage;
    array;

    constructor (){
        super();
    }

   

    setPercentage(percentage,array) {
        this.percentage = percentage;
        let path = array[this.resolveImageIndex()];  /*mit currentImage steuert man die verschiedenen Schlüssel des JSONs imageCache an*/
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