let canvas;
let ctx;
let keyboard = new Keyboard();  // es entsteht eine Variable keyboard, die aus der Klasse Keyboard entspringt
let world;
let fullscreenOn = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); // keyboard wird an die nächste Klasse world geschickt 
}

window.onresize = addaptDevice;

/**
 * addapts the game to the screen of the device
 * 
 */
function addaptDevice() {
    turnDevice();
    addaptScreen();
}

/**
 * turn smartphone
 * 
 */
function turnDevice() {
    let turnAlarm = document.getElementById('turnAlarm');
    if (window.innerHeight > window.innerWidth)
        turnAlarm.classList.remove('d-none');
    else
        turnAlarm.classList.add('d-none');

}

/**
 * automatic fullscreen on small devices
 * 
 */
function addaptScreen() {
    let fullSCreen = document.getElementById('fullScreen');
    if (window.innerWidth <= 720 && window.innerHeight <= 480)
        switchToFullScreen(fullSCreen);

}

function toggleFullScreen(id) {
    let fullSCreen = document.getElementById(id);
    if (fullscreenOn == false)
        switchToFullScreen(fullSCreen)
    else
        exitFullscreen(fullSCreen);
}

function switchToFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
        let canvas = document.getElementById('canvas');
        canvas.style.width = '100%';
        fullscreenOn = true;
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
        let canvas = document.getElementById('canvas');
        canvas.style.width = '100%';
        fullscreenOn = true;
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
        let canvas = document.getElementById('canvas');
        canvas.style.width = '100%';
        fullscreenOn = true;
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenOn = false;
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        fullscreenOn = false;
    }
}



function toggleTarget() {
    let popUp = document.getElementById('popUpTarget');
    popUp.classList.toggle('d-none');
    closeControls();
}

function closeControls() {
    let popUp = document.getElementById('popUpControls');
    popUp.classList.add('d-none');
}

function toggleControls() {
    let popUp = document.getElementById('popUpControls');
    popUp.classList.toggle('d-none');
    closeTarget();
}

function closeTarget() {
    let popUp = document.getElementById('popUpTarget');
    popUp.classList.add('d-none');
}


function installToggleMute() {
    let muteBtn = document.getElementById('mute');
    muteBtn.addEventListener('click', toggleMute)
}

function toggleMute() {
    if (keyboard.mute == true) {
        keyboard.mute = false;
    } else {
        keyboard.mute = true;
    }
}

/**
 * manipulate the character when pressing or releasing keys
 * 
 */
function bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {  // es wird eine Abfrage gemacht , welche Taste gedrückt wird und mit den beiden Variablen keyboard und der Taste verknüft
        if (e.keyCode == 39)
            keyboard.RIGHT = true;  // mit keyboard.RIGHT kann man die Variablen von Keyboader() ansteuern

        if (e.keyCode == 37)
            keyboard.LEFT = true;

        if (e.keyCode == 38)
            keyboard.UP = true;

        if (e.keyCode == 40)
            keyboard.DOWN = true;

        if (e.keyCode == 32)
            keyboard.SPACE = true;

        if (e.keyCode == 68)
            keyboard.D = true;


    });

    window.addEventListener('keyup', (e) => {
        if (e.keyCode == 39) 
            keyboard.RIGHT = false;
        
        if (e.keyCode == 37) 
            keyboard.LEFT = false;
        
        if (e.keyCode == 38) 
            keyboard.UP = false;
        
        if (e.keyCode == 40) 
            keyboard.DOWN = false;
        
        if (e.keyCode == 32) 
            keyboard.SPACE = false;
        
        if (e.keyCode == 68) 
            keyboard.D = false;
        
    });


    window.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) 
            keyboard.ENTER = true;
    })
}

/**
 * controls for touchscreen
 * 
 */
function bindBtsPressEvents() {
    document.getElementById('leftBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('rightBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('jumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
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
        keyboard.RIGHT = false
    });
    document.getElementById('jumpBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('bottleBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}






