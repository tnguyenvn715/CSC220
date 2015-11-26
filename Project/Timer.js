/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(g, position, length, startYear, endYear){
    this.g = g;
    this.position = position;
    this.length= length;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
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
Timer.prototype.setLabel = function(newYear) {
    this.label = newYear;
}
Timer.prototype.setPosition = function(position) {
    this.position.x = position.getX();
    this.position.y = position.getY();
}

Timer.prototype.getPosition = function() {
    return this.position.clone();
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

Timer.prototype.moveSlider = function(g) {
    var increment = this.getScaleIncrement();
    
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
}

Timer.prototype.drawLabel = function(g) {
    g.fillStyle = 'black';
    g.font = '12pt Times'; 
    g.fillText(this.label, this.position.getX() - 20 , this.position.getY() + 25);
}
Timer.prototype.draw = function(g) {
    var timerBarPosition = new Point(30, this.position.getY());
    this.drawTimerBar(g, timerBarPosition, this.length, 5, false);
    this.drawLabel(g);
    this.drawSlider(g, 'white', 'black');
    this.updateHTMLLabel(this.label);
}

Timer.prototype.drawSlider = function(g, fillColor, strokeColor){
    g.beginPath();
    g.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    g.fillStyle = fillColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    g.stroke();
}
Timer.prototype.updateHTMLLabel = function(label){
    document.getElementById("year").innerHTML = label ;
}
