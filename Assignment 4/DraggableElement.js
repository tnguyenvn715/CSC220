/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function DraggableElement(position,  width, height, thickness, fillColor, strokeColor){
    Visual.call(this, position,  width, height);
    this.draggable = true;
}
DraggableElement.prototype = new Visual();
    
DraggableElement.prototype.update = function(position){
    this.x =  position.x;
    this.y = position.y;
   
}


DraggableElement.prototype.draw = function(g){
    //
}