/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(x, y, g, width, startYear, endYear){
    this.x = x;
    this.y = y;
    this.g = g;
    this.width= width;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
    
    
}
Timer.prototype.updatePosition = function(x, y){
    this.x = x;
    this.y = y;
   
}
Timer.prototype.updateYear = function(newYear){
    this.label = newYear;
}
Timer.prototype.drawScale = function( x, y, width, height, radius, fill, stroke){
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
  
    this.g.beginPath();
    this.g.rect(x, y,width, height);
    this.g.closePath();
    this.g.fillStyle = 'gray';
   
    this.g.lineWidth = 2;
    this.g.strokeStyle = 'black';

    if (stroke) {
        this.g.stroke();
     }
    if (fill) {
        this.g.fill();
    }        
}

Timer.prototype.drawLabel = function(){
    this.g.fillStyle = 'black';
    this.g.font = '12pt Times'; 
    this.g.fillText(this.label, this.x - 20 ,this.y + 25);
}
Timer.prototype.draw = function(){
    this.drawScale(10, this.y , this.width, 5, 10, true);
    this.drawLabel();
    this.g.beginPath();
    this.g.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    this.g.fillStyle = 'red';
    this.g.fill();
    this.g.lineWidth = 1;
    this.g.strokeStyle = 'black';
    this.g.stroke();
    
    
}

