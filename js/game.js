let canvas;
let ctx;
let keyboard = new Keyboard();  // es entsteht eine Variable keyboard, die aus der Klasse Keyboard entspringt




function init(){

    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // keyboard wird an die nächste Klasse world geschickt
   
    console.log('My character is', world.character);
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
    console.log(e);
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
    console.log(e);
});