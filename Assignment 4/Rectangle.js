/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Rectangle(position, width, height, thickness, fillColor, strokeColor){
    Shape.call(this,position, width, height, thickness, fillColor, strokeColor);
}

Rectangle.prototype = new Shape();


Rectangle.prototype.draw = function(g){
    g.save();
    
    g.beginPath();
    g.rect(this.position.x,this.position.y,this.width,this.height);
    g.closePath();
    g.fillStyle = this.fillColor;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(g);
    }
    //g.restore();
 }

