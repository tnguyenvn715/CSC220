/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setupTestScenario(g) {
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize(document.getElementById("canvas"));
    //gameLoop.setCanvasSize(640, 480);
    
    var backgroundImage = new BackgroundImage();
    backgroundImage.loadUrl("voyager.png");
    backgroundImage.setPosition(new Point(200, 30));
    backgroundImage.setWidth(350);
    backgroundImage.setHeight(420);
    gameLoop.addElement(backgroundImage);
    
    
}

function initialize() {
    setupTestScenario();
}

window.onload = initialize;