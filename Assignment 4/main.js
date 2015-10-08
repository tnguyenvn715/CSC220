/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setupTestScenario(g) {
  
    var backgroundImage = new BackgroundImage(new Point(0, 0),500, 700);
    backgroundImage.loadUrl('img_the_scream.jpg');
    
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(document.getElementById("canvas"));
    var bluePanel = new Rectangle();
    bluePanel.setPosition(new Point(60, 60));
    bluePanel.setWidth(200);
    bluePanel.setHeight(200);
    bluePanel.setFillColor("blue");
    //backgroundImage.addChild(bluePanel);
    
    var redPanel = new Triangle();
    redPanel.setPosition(new Point(500, 10));
    redPanel.setWidth(200);
    redPanel.setHeight(200);
    redPanel.setFillColor("red");
    //backgroundImage.addChild(redPanel);
    //customGameLoop.addElement(redPanel);
    
    var greenPanel = new Circle();
    greenPanel.setPosition(new Point(10, 10));
    greenPanel.setWidth(100);
    greenPanel.setHeight(20);
    greenPanel.setFillColor("green");
    //backgroundImage.addChild(greenPanel);

    customGameLoop.addElement(backgroundImage);
    customGameLoop.addElement(greenPanel);
    customGameLoop.addElement(bluePanel);
    customGameLoop.addElement(redPanel);
}

function initialize() {
    
    
    setupTestScenario();
}

window.onload = initialize;