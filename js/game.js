let canvas;
let ctx;
let keyboard = new Keyboard();  // es entsteht eine Variable keyboard, die aus der Klasse Keyboard entspringt
let world;




function init(){

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // keyboard wird an die nächste Klasse world geschickt 
}

function restartGame(){
   if(this.world.gameIsFinished == true){
    console.log('restart');
   }
}

window.addEventListener('keydown',(e) =>{  // es wird eine Abfrage gemacht , welche Taste gedrückt wird und mit den beiden Variablen keyboard und der Taste verknüft
    if (e.keyCode == 39){
        keyboard.RIGHT= true;  // mit keyboard.RIGHT kann man die Variablen von Keyboader() ansteuern
    }
    if (e.keyCode == 37){
        keyboard.LEFT= true;
    }
    if (e.keyCode == 38){
        keyboard.UP= true;
    }
    if (e.keyCode == 40){
        keyboard.DOWN= true;
    }
    if (e.keyCode == 32){
        keyboard.SPACE= true;
    }
    if (e.keyCode == 68){
        keyboard.D= true;
    }
    

});

window.addEventListener('keyup',(e) =>{
    if (e.keyCode == 39){
        keyboard.RIGHT= false;
    }
    if (e.keyCode == 37){
        keyboard.LEFT= false;
    }
    if (e.keyCode == 38){
        keyboard.UP= false;
    }
    if (e.keyCode == 40){
        keyboard.DOWN= false;
    }
    if (e.keyCode == 32){
        keyboard.SPACE= false;
    }
    if (e.keyCode == 68){
        keyboard.D= false;
    }
});

window.addEventListener('keypress',(e) =>{
    if (e.keyCode == 13){
        keyboard.ENTER= true;
    }
    if (e.keyCode == 68){
        keyboard.D= true;
    }
})