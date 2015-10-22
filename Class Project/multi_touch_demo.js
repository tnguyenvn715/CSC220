/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    this.inputManager = new InputManager();
}

CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.inputManager.onPointerEnter(id, position);
}

CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.inputManager.onPointerMove(id, position);
}

CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.inputManager.onPointerActivate(id, position);
}

CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.inputManager.onPointerDeactivate(id, position);
}

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.inputManager.onPointerLeave(id, position);
}

CustomGameLoop.prototype.draw = function(g) {
    g.fillStyle = "lightgray";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.inputManager.drawPointerDebugOverlay(g);
}
// </editor-fold>

// <editor-fold desc="InputManager">
function InputManager() {
    this.pointers = { };
}

InputManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
}

InputManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
}

InputManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

InputManager.prototype.onPointerDeactivate = function(id, position) {
    this.pointers[id].deactivate();
}

InputManager.prototype.onPointerLeave = function(id, position) {
    this.removePointer(id, position);
}

InputManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

InputManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

InputManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

InputManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}

InputManager.prototype.drawPointerDebugOverlay = function(g) {
    for (var id in this.pointers) {
        this.pointers[id].drawDebugOverlay(g);
    }
}
// </editor-fold>

// <editor-fold desc="Pointer">
function Pointer(id, initialPosition) {
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
}

Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

Pointer.prototype.getPosition = function(position) {
    return this.position.clone();
}

Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

Pointer.prototype.drawDebugOverlay = function(g) {
    g.strokeStyle = "black";
    g.fillStyle = "black";
    g.font = "10px Arial"
    g.lineWidth = this.getIsActive() ? 3 : 1;
    g.globalAlpha = this.getIsActive() ? 1 : 0.5;
    var position = this.getPosition();
    g.beginPath();
    g.rect(position.getX() - 20, position.getY() - 20, 40, 40);
    g.stroke();
    g.fillText(this.id, position.getX() - 20, position.getY() - 20 - 3);
    g.globalAlpha = 1.0;
}

Pointer.prototype.activate = function() {
    this.isActive = true;
}

Pointer.prototype.deactivate = function() {
    this.isActive = false;
}
// </editor-fold>

function initialize() {
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(document.getElementById("canvas"));
}

window.onload = initialize;

