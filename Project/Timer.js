/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(x, y, g, length, startYear, endYear){
    this.x = x;
    this.y = y;
    this.g = g;
    this.length= length;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
}

Timer.prototype.getX = function(){
    return this.x;
}

Timer.prototype.getY = function(){
    return this.y;
}

Timer.prototype.getStartYear = function(){
    return this.startYear;
}

Timer.prototype.getEndYear = function(){
    return this.endYear;
}

Timer.prototype.getLabel = function() {
    return this.label;
}
Timer.prototype.updateYearLabel = function(newYear) {
    this.label = newYear;
}
Timer.prototype.setX = function(x) {
    this.x = x;
}
Timer.prototype.setY = function(y) {
    this.y = y;
}
Timer.prototype.setLength = function(length) {
    this.length = length;
}
Timer.prototype.getLength = function() {
    return this.length;
}
Timer.prototype.getScaleIncrement = function() {
    var increment = this.length/(parseInt(this.endYear)
                        - parseInt(this.startYear));
    return increment;
}
Timer.prototype.updatePosition = function(x, y) {
    this.x = x;
    this.y = y;
}
Timer.prototype.moveSlider = function() {
    var increment = this.getScaleIncrement();
    
    if (parseInt(this.label) < this.endYear) {
        
        var nextYear = parseInt(this.label) + 1;
        var newx = this.x + increment; 
        this.updatePosition(newx, this.y);
        this.updateYearLabel(nextYear);
        document.getElementById("year").innerHTML = this.label ;
    }  
    else{
        this.label = this.startYear;
        this.updatePosition(30, this.y);
        this.updateYearLabel(this.startYear);
        document.getElementById("year").innerHTML = this.label ;
   
    }
}
Timer.prototype.drawScale = 
        function(g, x, y, length, height, radius, fill, stroke) {
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    g.beginPath();
    g.rect(x, y,length, height);
    g.closePath();
    g.fillStyle = 'gray'; 
    g.lineWidth = 1;
    g.strokeStyle = 'black';
    if (stroke) {
        g.stroke();
    }
    if (fill) {
        g.fill();
    }        
}

Timer.prototype.drawLabel = function(g) {
    g.fillStyle = 'black';
    g.font = '12pt Times'; 
    g.fillText(this.label, this.x - 20 ,this.y + 25);
}
Timer.prototype.draw = function(g) {
    this.drawScale(g, 30, this.y , this.length, 5, 10, true);
    this.drawLabel(g);
    g.beginPath();
    g.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    g.fillStyle = 'red';
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = 'black';
    g.stroke();
    
}
