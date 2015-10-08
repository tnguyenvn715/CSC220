/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function BackgroundImage(position, width, height){
    Visual.call(this, position, width, height);
}
BackgroundImage.prototype = new Visual();
BackgroundImage.prototype.loadUrl = function(url){
    this.img = new Image();
    this.img.src  = url;
}
BackgroundImage.prototype.draw = function(g){
    g.save();
    g.drawImage(this.img, this.position.x, this.position.y,this.width, this.height);
    g.restore();

}

