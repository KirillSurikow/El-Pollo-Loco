class BackgroundObject extends moveableObject{

    width = 720;
    height = 480;

    /**
     * 
     * @param {path} imagepath path of image
     * @param {number} x x-coordinate 
     */
    constructor(imagepath, x){    // bekommt den relativen Pfad des Imgs von BackgroundObject (in der World) als Parameter übergeben. 
        super().loadImage(imagepath)   // super wird per default immer aufgerufen und greift auf den Constructor von moveableObjects zu. Danach greift er auf die 
        this.x = x;                                     // die Funktion loadImage zu und fügt den relativen Pfad als Parameter in die Funktion ein.
        this.y = 480 - this.height;
    }                                  
                                        
}

 