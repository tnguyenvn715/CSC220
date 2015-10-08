/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Pointer(id, position){
    this.id = id;
    this.position = position;
    this.isActive = false;
    this.dragElement = null;
}
Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}
Pointer.prototype.getPosition = function(){
    return this.position;
}
Pointer.prototype.getId = function(){
    return this.id;
}	
Pointer.prototype.getIsActive = function() {
    return this.isActive;
}
Pointer.prototype.activate = function() {
    this.isActive = true;
}
Pointer.prototype.deactivate = function() {
    this.isActive = false;
}

Pointer.prototype.getOffSet = function(){
    var pos = this.dragElement.getPosition();
    var xdiff = this.position.subtract(pos).getX();
    var ydiff = this.position.subtract(pos).getY();
    return [xdiff,ydiff];
}