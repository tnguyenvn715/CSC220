/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(position, length, startYear, endYear) {
    this.position = position;
    this.length= length;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
    this.isPlayed = false;
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
    g.beginPath();
    g.rect(position.getX(), position.getY(),length, height);
    g.fillStyle = 'gray'; 
    g.lineWidth = 1;
    g.strokeStyle = 'black';
    if (stroke) {
        g.stroke();
    }
    if (fill) {
        g.fill();
    }      
    g.closePath();
    this.drawPlayButton();

}

Timer.prototype.drawLabel = function(g) {
    g.beginPath();
    g.fillStyle = 'black';
    g.font = '12pt Times'; 
    var xpos = this.position.getX() - 20;
    var ypos = this.position.getY() + 25;
    g.fillText(this.label, xpos , ypos);
    g.closePath();
}
Timer.prototype.draw = function(g) {
    g.save();
    var timerBarPosition = new Point(30, this.position.getY());
    this.drawTimerBar(g, timerBarPosition, this.length, 5, true);
    this.drawLabel(g);
    this.drawSlider(g, 'black', 'black');
    this.updateHTMLLabel(this.label);
    g.restore();
}

Timer.prototype.drawSlider = function(g, fillColor, strokeColor){
    g.beginPath();
    g.arc(this.position.getX(), this.position.getY(), 10, 0, 2 * Math.PI, false);
    g.fillStyle = fillColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    g.stroke();
    g.closePath();
}
Timer.prototype.updateHTMLLabel = function(label){
    document.getElementById("year").innerHTML = label ;
}

Timer.prototype.play = function(pos){
    if((pos.getX()>=this.pos.getX()&&pos.getX()<=this.pos.getX()+this.width)||
            (pos.getY()>=this.pos.getY()&&pos.getY()>=this.pos.getY()+this.height)){
        this.isPlayed = true;
    }
    else{
        this.isPlayed= false;
    }
    return this.isPlayed;
}

Timer.prototype.drawPlayButton = function(g){
    g.beginPath();
    g.arc(10, 10, 40, 0, 2 * Math.PI, false);
    g.fillStyle = 'red';
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = 'red';
    g.closePath();
}