/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function BackgroundImage(){
    this.x = 0;
    this.y = 0;

}

BackgroundImage.prototype.loadUrl = function(url){
   
    var can = document.getElementById('canvas');
    var ctx = can.getContext('2d');

    var img = new Image();
    img.onload = function(){
        can.width = img.width;
        can.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
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
