/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Ball(canvas, radius, speed, pos){   
    Visual.call(this, canvas, pos);
    this.radius = radius;
    this.xSpeed = speed;
    this.ySpeed = speed;
}

Ball.prototype = new Visual();
Ball.prototype.draw = function(g){
   
    g.beginPath();
    g.arc(this.pos.getX(), this.pos.getY(), 
            this.radius, 0, Math.PI*2, true);
    g.closePath();
    g.fill();
    
}

Ball.prototype.update = function(){
    this.pos.setX(this.pos.getX() + this.xSpeed);
    this.pos.setY(this.pos.getY() + this.ySpeed);
}

Ball.prototype.hitWall = function(){
    if((this.pos.getX() >= this.canvas.width) || (this.pos.getX() <= 0)){
        this.hitSide = true;
        
    }else{
        this.hitSide = false;
       
    }
    
           if (this.pos.getY() >= this.canvas.height || (this.pos.getY() <= 0) ){
      //  this.changeDirection();
      this.hitHorizontal = true;
     // return true;
    }else{
        this.hitHorizontal = false;
    }
    if(this.hitHorizontal||this.hitSide){
        return true;
    }else{
        return false;
    }
    
}
Ball.prototype.changeDirection = function(){
  
    if(this.hitHorizontal){
        this.ySpeed = this.ySpeed *-1;
    }
    if(this.hitSide){
        this.xSpeed = this.xSpeed *-1;
    }
    
}

