/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Triangle(position, width, height, thickness, fillColor, strokeColor){
    Shape.call(this,position, width, height, thickness, fillColor, strokeColor);
}

Triangle.prototype = new Shape();

Triangle.prototype.draw = function(g){
    g.save();
    g.beginPath();
    g.moveTo(this.position.x , this.position.y + this.height);
    g.lineTo(this.position.x + this.width / 2, this.position.y);
    g.lineTo(this.position.x + this.width, this.position.y + this.height);
    g.closePath();
    g.fillStyle = this.fillColor;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle =  this.strokeColor;
    g.stroke();
    g.restore();
}