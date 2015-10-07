/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function setupTestScenario() {
    
    var gameLoop = new CustomGameLoop();
    var backgroundImage = new BackgroundImage();
    backgroundImage.loadUrl('img_the_scream.jpg');
    
  
  
    
}

function initialize() {
    setupTestScenario();
}

window.onload = initialize;