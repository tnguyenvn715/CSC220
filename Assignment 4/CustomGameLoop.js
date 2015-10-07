/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CustomGameLoop(){
    GameLoop.call(this);
}
CustomGameLoop.prototype = new GameLoop();
CustomGameLoop.prototype.updateElement = function(image){
    image.draw();
}