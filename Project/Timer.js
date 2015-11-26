/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(g, position, length, startYear, endYear) {
    this.g = g;
    this.position = position;
    this.length= length;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
}
Timer.prototype.getStartYear = function() {
    return this.startYear;
}
Timer.prototype.getEndYear = function() {
    return this.endYear;
}
Timer.prototype.getLabel = function() {
    return this.label;
}
Timer.prototype.setLabel = function(newYear) {
    this.label = newYear;
}
Timer.prototype.getPosition = function() {
    return this.position.clone();
}
Timer.prototype.setPosition = function(position) {
    this.position.x = position.getX();
    this.position.y = position.getY();
}
Timer.prototype.getPixelLength = function() {
    return this.length;
}
Timer.prototype.setPixelLength = function(length) {
    this.length = length;
}
Timer.prototype.getHorizontalncrement = function() {
    var increment = this.length/(parseInt(this.endYear)
                        - parseInt(this.startYear));
    return increment;
}

Timer.prototype.moveSlider = function(g) {
    var increment = this.getHorizontalncrement();
    
    if (this.label < this.endYear) {
        
        var nextYear = this.label + 1;
        var newx = this.position.getX() + increment;
        var newPosition = new Point(newx, this.position.getY());
        this.setPosition(newPosition);
        this.setLabel(nextYear);
        
    }  
    else{
        this.label = this.startYear;
        var newPosition = new Point(30, this.position.getY() );
        this.setPosition(newPosition);
        this.setLabel(this.startYear);

   
    }
}
Timer.prototype.drawTimerBar = 
        function(g, position, length, height, fill, stroke) {
    if (typeof stroke == "undefined" ) {
        stroke = true;
    }
    g.save();
    g.beginPath();
    g.rect(position.getX(), position.getY(),length, height);
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
    g.restore();
}

Timer.prototype.drawLabel = function(g) {
    g.save();
    g.fillStyle = 'black';
    g.font = '12pt Times'; 
    var xpos = this.position.getX() - 20;
    var ypos = this.position.getY() + 25;
    g.fillText(this.label, xpos , ypos);
    g.restore();
}
Timer.prototype.draw = function(g) {
    var timerBarPosition = new Point(30, this.position.getY());
    this.drawTimerBar(g, timerBarPosition, this.length, 5, true);
    this.drawLabel(g);
    this.drawSlider(g, 'black', 'black');
    this.updateHTMLLabel(this.label);
}

Timer.prototype.drawSlider = function(g, fillColor, strokeColor){
    g.save();
    g.beginPath();
    g.arc(this.position.getX(), this.position.getY(), 10, 0, 2 * Math.PI, false);
    g.fillStyle = fillColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    g.stroke();
    g.restore;
}
Timer.prototype.updateHTMLLabel = function(label){
    document.getElementById("year").innerHTML = label ;
}
