/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Shape(thickness, fillColor, strokeColor){
	
	this.strokeThickness = thickness;
	this.fillColor = fillColor;
	this.strokeColor = strokeColor;
}

Shape.prototype.setFillColor = function(newFill){
	this.fillColor = newFill;
}

Shape.prototype.setStrokeColor = function(newStroke){
	this.strokeColor = newStroke;
}

Shape.prototype.setStrokeThickness = function(newthickness){
	this.strokeThickness = newthickness;
}
