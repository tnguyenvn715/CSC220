/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function spaceShip(height,width){
    this.height = height;
    this.width = width;
    this.img = new Image();
}
spaceShip.prototype = new visual();

spaceShip.prototype.loadUrl = function(url){
    this.url = url;
    this.img.src = this.url;
}
spaceShip.prototype.draw = function(g){
    g.drawImage(this.img, this.pos.getX(), this.pos.getY(), this.width, this.height);
}

