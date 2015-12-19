// <editor-fold desc="TimerButton">

/**
 * @constructor
 * @extends TimerElement
 * @param {type} button
 * @returns {TimerButton}
 */
function TimerButton(position, radius, backgroundColor, foregroundColor) {
    TimerElement.call(this, position);
    this.radius = radius;
    this.backgroundColor = backgroundColor;
    this.foregroundColor = foregroundColor;
    this.isPlaying = false;
    this.isClicked = false;
}

TimerButton.prototype.drawPlayButton = function(g){
    g.beginPath();
    var x = this.position.getX();
    var y = this.position.getY();
    //Draw background circle
    g.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    g.fillStyle = this.backgroundColor;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = this.foregroundColor;
     
    //Draw triangle
    var path=new Path2D();
    g.fillStyle = this.foregroundColor;
    path.moveTo(x - this.radius/2 + 2, y - this.radius/2);
    path.lineTo(x + this.radius/2, y);
    path.lineTo(x - this.radius/2 + 2, y + this.radius/2);
    g.fill(path);
    g.closePath();
}

TimerButton.prototype.draw = function(g){
    this.drawPlayButton(g);
}
TimerButton.prototype.drawPauseButton = function(g){
    
}

TimerButton.prototype.hitTest = function(mousePos) {
    var x = mousePos.getX();
    var y = mousePos.getY();
    var centerX = this.x;
    var centerY = this.y;
    var dx = x - centerX;
    var dy = x - centerY;
    if ((dx*dx + dy*dy) <= (this.radius * this.radius)){
        this.isClicked == true;
    }
    else {
        this.isClicked == false;
    }
}
//</editor-fold>