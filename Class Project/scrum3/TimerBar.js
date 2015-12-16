/**
 * @constructor
 * @augments TimerElement
 */
function TimerBar(position, width, height, fillColor) {
    TimerElement.call(this, position, width, height, fillColor);
}

TimerBar.prototype = new TimerElement();

/**
 * Draws the bar for the timer
 * @param {Graphics} g
 * @returns {undefined}
 */
TimerBar.prototype.draw = function(g) {
    TimerElement.prototype.draw.call(this, g);
    g.beginPath();
    var x = this.position.getX();
    var y = this.position.getY();
    g.rect(x, y, this.width, this.height);
    g.fillStyle = this.fillColor; 
    g.lineWidth = 1;
    g.strokeStyle = "black";
    g.stroke();
    g.fill();
    g.closePath();
}

