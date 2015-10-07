/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function BackgroundImage(){
    Visual.call(this);
}
BackgroundImage.prototype = new Visual();
BackgroundImage.prototype.loadUrl = function(url){
    var can = document.getElementById('canvas');
    var g = can.getContext('2d');
    var img = new Image();
    this.draw(g, img);
    img.src = url;
    
}

BackgroundImage.prototype.setPosition =function(position){
    this.x = position.getX;
    this.y = position.getY;
}

BackgroundImage.prototype.setWidth =function(width){
    this.width = width;
}

BackgroundImage.prototype.setHeight =function(height){
    this.height= height;
}
BackgroundImage.prototype.draw = function(g, img){
    img.onload = function(){
        g.canvas.width  = window.innerWidth;
        g.canvas.height = window.innerHeight;
        g.drawImage(img, 0, 0);
    };
    
}

