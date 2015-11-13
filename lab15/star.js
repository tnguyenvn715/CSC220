/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function star (size,center){
    this.size = size;
    this.center = center;
}
star.prototype = new visual();
star.prototype.setSize = function(radius){
    this.size = radius;
}
star.prototype.drawPath = function(g){
    g.fillStyle = "white";
    g.beginPath();
    g.arc(this.center.getX(), this.center.getY(),this.size,0,Math.PI*2,true);
    g.closePath();
    g.fill();
    
}
star.prototype.getSize = function(){
    return this.size;
}



