

function initialize() {
    var customGameLoop = new CustomGameLoop();
    
    customGameLoop.initialize(document.getElementById("canvas"));

    
}
window.onload= initialize;