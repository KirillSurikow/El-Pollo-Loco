let canvas;
let ctx;




function init(){

    canvas = document.getElementById('canvas');
    world = new World(canvas);
   
    console.log('My character is', world.character);
}