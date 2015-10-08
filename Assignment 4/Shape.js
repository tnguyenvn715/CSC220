/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Shape(position, width, height, thickness, fillColor, strokeColor){
    DraggableElement.call(this, position, width, height);
    this.strokeThickness = thickness;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
}
Shape.prototype = new DraggableElement();
Shape.prototype.setFillColor = function(newFill){
    this.fillColor = newFill;
}

Shape.prototype.setStrokeColor = function(newStroke){
    this.strokeColor = newStroke;
}

Shape.prototype.setStrokeThickness = function(newthickness){
    this.strokeThickness = newthickness;
}

Shape.prototype.draw = function(g){
    //override
}
