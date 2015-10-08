/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function PointerManager(elManager){
    this.pointers = {};
    this.elementManager = elManager;
}
PointerManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
}

PointerManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
}

PointerManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
    //retrieve the draggable element here
    this.pointers[id].dragElement = 
        this.elementManager.retrieveElement(position);
}

PointerManager.prototype.onPointerDeactivate = function(id, position) {
    this.pointers[id].deactivate();
    //make dragElement null when not active
    this.pointers[id].dragElement = null;
}

PointerManager.prototype.onPointerLeave = function(id, position) {
    this.removePointer(id, position);
}

PointerManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

PointerManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

PointerManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
    if (this.pointers[id].dragElement != null){
        this.pointers[id].dragElement.updatePosition(position);
    }
}

PointerManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}