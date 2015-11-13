function setupTestScenario() {
    var gameLoop = new CustomGameLoop();

    gameLoop.initialize(document.getElementById("canvas"));
    var bufferCanvas = document.createElement("canvas");
    bufferCanvas.width = document.getElementById("canvas").width;
    bufferCanvas.height = document.getElementById("canvas").height;

   // document.body.appendChild(bufferCanvas);
    //var buffer = bufferCanvas.getContext("2d");
    var bufferCanvas2 = document.createElement("canvas");
    bufferCanvas2.width = document.getElementById("canvas").width;
    bufferCanvas2.height = document.getElementById("canvas").height;

    var bufferCanvas3 = document.createElement("canvas");
    bufferCanvas3.width = document.getElementById("canvas").width;
    bufferCanvas3.height = document.getElementById("canvas").height;
    
    var stars = new starfield(bufferCanvas,bufferCanvas2, 50,1,5,0,0,1);
    stars.initializeStars();
    gameLoop.addElement(stars);
    
    var stars2 = new starfield(bufferCanvas2,bufferCanvas3,50,1,10,bufferCanvas2.width, 0,5);
    stars2.initializeStars();
    gameLoop.addElement(stars2);
    
    var spaceshipImage = new spaceShip(100,100);
    spaceshipImage.loadUrl("voyager.png");
    spaceshipImage.setPosition(new Point(150, 150));
    
    gameLoop.addElement(spaceshipImage);
    
    
}

function initialize() {
    setupTestScenario();
}

window.onload = initialize;