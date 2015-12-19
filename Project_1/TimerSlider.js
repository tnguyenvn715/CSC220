// <editor-fold desc="TimerSlider">

/**
 * Represent a Timer slider
 * @constructor
 * @@extends TimerElement
 */
function TimerSlider(position, width, height, 
                        fillColor, startYear, endYear) {
    TimerElement.call(this, position, width, height, fillColor);
    /**
     * The starting year of the timer
     * @private
     * @type Number
     */
    this.startYear = startYear;
    
    /**
     * The last year of the timer
     * @private
     * @type Number
     */
    this.endYear = endYear;
    
    /**
     * The label of the slider
     * @private
     * @type Number
     */
    this.label = startYear;
    
    /**
     * The signifier for when slider is clicked
     * @private
     * @type Boolean
     */
    this.isClicked = false;
    
    /**
     * The signifier for when slider is dragged
     * @private
     * @type Boolean
     */
    this.isDragged = false;
    
}

TimerSlider.prototype = new TimerElement();

/**
 * Set the increment for the slider to move by
 * @param {Number} increment The number of pixels 
 */
TimerSlider.prototype.setIncrement = function(increment) {
    this.increment = increment;
}
/**
 * Set the initial position of the slider
 * @param {Point} position The first position
 */
TimerSlider.prototype.setInitialPosition = function(position) {
    this.initialPosition = position;
}

/**
 * Get the initial position of the slider
 * @returns {Point} 
 */
TimerSlider.prototype.getInitialPosition = function() {
    return this.initialPosition;
}

/* 
 * Get the starting year of the slider
 * @returns {Number}
 */
TimerSlider.prototype.getStartYear = function() {
    return this.startYear;
}

/**
 * Get the ending year of the slider
 * @returns {Number}
 */
TimerSlider.prototype.getEndYear = function() {
    return this.endYear;
}

/**
 * Set the starting year of the slider
 * @param {Number} newStartYear The new starting year
 */
TimerSlider.prototype.setStartYear = function(newStartYear)
{
    this.startYear = newStartYear;
}

/**
 * Set the ending year of the slider
 * @param {Number} newEndYear The new ending year
 */
TimerSlider.prototype.setEndYear = function(newEndYear) {
    this.endYear = newEndYear;
}

/**
 * Get the slider's year label
 * @returns {Number} label The slider's label
 */
TimerSlider.prototype.getLabel = function() {
    return this.label;
}

/**
 * Set the slider's year label
 * @param {Number} newLabel The new label
 */
TimerSlider.prototype.setLabel = function(newLabel) {
    this.label = newLabel;
}

/**
 * Move the slider by the increment
 */
TimerSlider.prototype.moveSlider = function() {
    if (this.label < this.endYear) {
        var nextYear = this.label + 1;
        var newx = this.position.getX() + this.increment;
        var newPosition = new Point(newx, this.position.getY());
        this.setPosition(newPosition);
        this.setLabel(nextYear);   
    }  
    else{
        this.updatePosition(this.initialPosition);
        this.setLabel(this.startYear);
    }
}

/**
 * Draw the label of the timer slider
 * @param {Graphics} g The graphics context
 */
TimerSlider.prototype.drawLabel = function(g) {
    g.beginPath();
    g.fillStyle = 'black';
    g.font = '12pt Times'; 
    var xpos = this.position.getX() - 20;
    var ypos = this.position.getY() + 40;
    g.fillText(this.label, xpos , ypos);
    g.closePath();
}

/**
 * Draw the slider
 * @param {Graphics} g The graphics context
 */
TimerSlider.prototype.draw = function(g) {
    TimerElement.prototype.draw.call(this, g);
    g.beginPath();
    g.fillStyle = this.fillColor;
    g.fillRect(this.position.getX(), this.position.getY(), this.width, this.height);
    g.closePath();
    this.drawLabel(g);
}

/**
 * Set the timer slider back to inital position
 */
TimerSlider.prototype.resetSlider = function() {
    this.updatePosition(this.initialPosition);
    this.setLabel(this.startYear);
}
//</editor-fold>


