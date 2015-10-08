/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Circle(position, width, height, thickness, fillColor, strokeColor){
    Shape.call(this, position, width, height, thickness, fillColor, strokeColor);
}

Circle.prototype = new Shape();

Circle.prototype.draw = function(g){
    g.save();
    g.beginPath();
    g.arc(this.position.x + this.width/2, this.position.y + this.width/2, this.width/2, 0, 2 * Math.PI);
    g.fillStyle = this.fillColor;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    g.restore();
}