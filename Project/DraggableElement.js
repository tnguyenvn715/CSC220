/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function DraggableElement(position,  width, height){
    this.position = position;
    this.width = width;
    this.height = height;
    this.children = [];
    this.isClicked = false;
    this.draggable = true;
}
    
DraggableElement.prototype.updatePosition = function(position){
    this.position.x =  position.x;
    this.position.y = position.y;
}

DraggableElement.prototype.draw = function(g){
    //override
}

DraggableElement.prototype.getWidth = function(){
    return this.width;
}
DraggableElement.prototype.setWidth = function(newwidth){
    this.width = newwidth;
}
DraggableElement.prototype.getHeight = function(){
    return this.height;
}
DraggableElement.prototype.setHeight = function(newheight){
    this.height = newheight;
}
DraggableElement.prototype.setPosition = function(position) {
    this.position = position.clone();
}

DraggableElement.prototype.getPosition = function() {
    return this.position.clone();
}
DraggableElement.prototype.setFillColor = function(color) {
    this.fillColor = color;
}
DraggableElement.prototype.draw = function(g) {
    //override
}

DraggableElement.prototype.hitTest = function(mousePos) {
    if((mousePos.x > this.position.x  && mousePos.x < (this.position.x+ this.width)) 
        && (mousePos.y > this.position.y && mousePos.y < (this.position.x+ this.width)) ){
        return true; 
    }
    else{
        return false;
    }
}