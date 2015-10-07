/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Circle(){
    Shape.call(this);
}

Circle.prototype = new Shape(this, this.borderThickness, this.fillColor, this.borderColor);
Circle.prototype.draggingMode = function(g, mouseX, mouseY){
	this.position.x =mouseX;
	this.position.y =mouseY;
	g.clear;
	g.drawPath(g);
}

Circle.prototype.drawPath = function(g){
	g.beginPath();
    g.arc(c.centerX,c.centerY,c.radius,0,Math.PI*2);
    g.closePath();
    g.fillStyle= this.fillColor;
    g.fill();

}