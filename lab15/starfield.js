/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function starfield (bufferCanvas,bufferCanvas2,density,depth,speed,posX, posY,starSize){
    this.density = density;
    this.stars = [];
    this.depth = depth;
    this.speed = speed;
    
    this.starSize = starSize;
    this.bufferCanvas = bufferCanvas;
    this.bufferCanvas2 = bufferCanvas2;
    this.transpos = new Point(posX, posY);
    //initialize the position of two canvas
    //this.bufferg = bufferCanvas.getContext("2d");
   // this.buffer = document.createElement("canvas");
}
starfield.prototype = new visual();
starfield.prototype.set = function(density,depth,speed,screenSize,starSize){
    
}
starfield.prototype.get = function(){
    
}
starfield.prototype.initializeStars = function(){
    for (var i=0;i<this.density;i++){
        
        this.stars.push(new star(this.starSize,new Point(Math.random()*this.bufferCanvas.width,Math.random()*this.bufferCanvas.height)));
        console.info(this.stars[i].center);
    }
}
starfield.prototype.draw = function(g){

    //two transposes with same speed
    g.drawImage(this.bufferCanvas,this.transpos.getX(),this.transpos.getY());
    //g.drawImage(this.bufferCanvas2,this.transpos.getX(),this.transpos.getY());
    this.transpos.setX(this.transpos.getX()-this.speed);
    
    g.save();
    if (this.transpos.getX() <= 0){
        this.transpos.setX(this.bufferCanvas.width);
    }
    g.translate(this.transpos.getX(),this.transpos.getY());
    for(var i=0;i<this.stars.length;i++){
       
        this.stars[i].drawPath(g);
        
    }
    g.restore();
}
 
