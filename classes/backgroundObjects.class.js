class BackgroundObject extends moveableObject{

    width = 720;
    height = 480;

    /**
     * 
     * @param {path} imagepath path of image
     * @param {number} x x-coordinate 
     */
    constructor(imagepath, x){   
        super().loadImage(imagepath)   
        this.x = x;                                     
        this.y = 480 - this.height;
    }                                  
                                        
}

 