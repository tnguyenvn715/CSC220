function initialize() {
    var customGameLoop = new CustomGameLoop();
    var canvas =document.getElementById("canvas"); 
    customGameLoop.initialize(canvas);
}

window.onload= initialize;

