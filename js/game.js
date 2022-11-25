let canvas;
let ctx;
let keyboard = new Keyboard();  // es entsteht eine Variable keyboard, die aus der Klasse Keyboard entspringt
let world;




function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // keyboard wird an die nächste Klasse world geschickt 
}

function initFullScreen(id){
    let fullSCreen = document.getElementById(id);
    switchToFullScreen(fullSCreen)
}

function switchToFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
        let canvas = document.getElementById('canvas');
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientWidth * (2 / 3);
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }


function restartGame() {
    if (this.world.gameIsFinished == true) {
        console.log('restart');
    }
}



function bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {  // es wird eine Abfrage gemacht , welche Taste gedrückt wird und mit den beiden Variablen keyboard und der Taste verknüft
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;  // mit keyboard.RIGHT kann man die Variablen von Keyboader() ansteuern
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (e.keyCode == 68) {
            keyboard.D = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
        if (e.keyCode == 68) {
            keyboard.D = false;
        }
    });


    window.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) {
            keyboard.ENTER = true;
        }
    })
}

function bindBtsPressEvents() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Right = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('bottleBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('leftBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('rightBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Right = false
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('bottleBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}


// function touch(){
//     keyboard.Btn = true;
// }

// function releaseTouch(){
//     keyboard.Btn = false;
// }





