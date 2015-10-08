/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    this.g = this.canvas.getContext("2d");
    this.elementManager = new ElementManager();
    this.pointerManager = new PointerManager(this.elementManager);
}

CustomGameLoop.prototype.setCanvasSize = function(width, height) {
   this.canvas.width = width;
   this.canvas.height = height;
}

CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
}

CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.pointerManager.onPointerMove(id, position);
}


CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
}

CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.pointerManager.onPointerDeactivate(id, position);
}

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.pointerManager.onPointerLeave(id, position);
}

CustomGameLoop.prototype.addElement = function (element) {
    this.elementManager.addElement(element);
}


CustomGameLoop.prototype.draw = function(g) {
    this.elementManager.draw(g);
    
}