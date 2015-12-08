/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(position, length, height, startYear, endYear) {
    this.position = position;
    this.length= length;
    this.height= height;
    this.label = startYear;
    this.startYear = startYear;
    this.endYear = endYear;
    this.initialPosition = position;
}
Timer.prototype.setInitialPosition = function(position){
    this.initialPosition = position;
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
        this.setPosition(this.initialPosition);
        this.setLabel(this.startYear);
    }
}
Timer.prototype.drawTimerBar = function(g, fillColor, strokeColor) {
    g.beginPath();
    var x = this.initialPosition.getX();
    var y = this.initialPosition.getY();
    g.rect(x, y, this.length, this.height);
    g.fillStyle = fillColor; 
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    g.stroke();
    g.fill();
    g.closePath();
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

Timer.prototype.play = function(mousePos){
    var x = mousePos.getX();
    var y = mousePos.getY();
    if((x >=this.pos.getX() && x <=this.pos.getX()+this.width)||
            (y >=this.pos.getY()&& y >=this.pos.getY()+this.height)){
        this.isPlayed = true;
    }
    else{
        this.isPlayed= false;
    }
    return this.isPlayed;
}
Timer.prototype.resetSlider = function(){
    this.setPosition(this.initialPosition);
    this.setLabel(this.startYear);
}
Timer.prototype.drawPlayButton = function(g, radius, fillColor, strokeColor){
    g.beginPath();
    var x = this.initialPosition.getX() - 2 * radius;
    var y = this.initialPosition.getY();
    //Draw background circle
    g.arc(x, y, radius, 0, 2 * Math.PI, false);
    g.fillStyle = fillColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    
    //Draw triangle
    var path=new Path2D();
    g.fillStyle = 'white';
    path.moveTo(x - radius/2 + 2, y - radius/2);
    path.lineTo(x + radius/2, y);
    path.lineTo(x - radius/2 + 2, y + radius/2);
    g.fill(path);
    g.closePath();
}

Timer.prototype.drawPauseButton = function(g, radius, fillColor, strokeColor){
    g.beginPath();
    var x = this.initialPosition.getX() - radius;
    var y = this.initialPosition.getY();
    //Draw background circle
    g.arc(x, y, radius, 0, 2 * Math.PI, false);
    g.fillStyle = fillColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = strokeColor;
    
    //Draw triangle
    var path=new Path2D();
    g.fillStyle = 'white';
    g.fillRect(x - radius/2 + 2 , y - radius/2, radius/3, radius);
    g.fillRect(x + 2 , y - radius/2, radius/3, radius);
    g.fill(path);
    g.closePath();
}


Timer.prototype.draw = function(g) {
    this.drawTimerBar(g, 'gray', 'gray');
    this.drawPauseButton(g, 25, 'red');
    this.drawLabel(g);
    this.drawSlider(g, 'black', 'black');
}