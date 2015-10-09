/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setupTestScenario(g) {
    var gameLoop = new CustomGameLoop();
    gameLoop.initialize(document.getElementById("canvas"));
    gameLoop.setCanvasSize(640, 480);
    
    var backgroundImage = new BackgroundImage();
    backgroundImage.loadUrl("kitten1.jpg");
    backgroundImage.setPosition(new Point(200, 30));
    backgroundImage.setWidth(350);
    backgroundImage.setHeight(420);
    gameLoop.addElement(backgroundImage);
    
    var rectangle = new Rectangle();
    rectangle.setPosition(new Point(100, 60));
    rectangle.setWidth(150);
    rectangle.setHeight(150);
    rectangle.setFillColor("orange");
    rectangle.setStrokeColor("gold");
    rectangle.setStrokeThickness(5);
    gameLoop.addElement(rectangle);
    
    var circle = new Circle();
    circle.setPosition(new Point(170, 140));
    circle.setWidth(150);
    circle.setHeight(110);
    circle.setFillColor("aquamarine");
    circle.setStrokeColor("SteelBlue");
    circle.setStrokeThickness(5);
    gameLoop.addElement(circle);

    var triangle = new Triangle();
    triangle.setPosition(new Point(500, 200));
    triangle.setWidth(100);
    triangle.setHeight(200);
    triangle.setFillColor("red");
    triangle.setStrokeColor("white");
    triangle.setStrokeThickness(3);
    gameLoop.addElement(triangle);
}

function initialize() {
    setupTestScenario();
}

window.onload = initialize;