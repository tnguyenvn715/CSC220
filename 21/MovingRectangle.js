/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function movingRectangle(width,height){
    
    this.width = width;
    this.height = height;
}
movingRectangle.prototype = new HitTestableElement();

movingRectangle.prototype.draw = function(g){
    g.fillStyle = "green";
    g.beginPath();
    g.fillRect(this.pos.getX(),this.pos.getY(),this.width,this.height);
    g.closePath();
    g.fill();
}

movingRectangle.prototype.setPosition = function(pos){
    this.pos = pos;
}

