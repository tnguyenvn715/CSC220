/**
 * 
 * @constructor
 * @augments TimerElement
 * @param {Point} position
 * @param {Number} width
 * @param {Number} height
 * @param {String} fillColor
 * @param {Point} initialPosition
 * @param {Number} startYear
 * @param {Number} endYear
 * @param {String} label
 * @returns {TimerSlider}
 */
function TimerSlider(position, width, height, 
                        fillColor, startYear, endYear) {
    TimerElement.call(this, position, width, height, fillColor);
    /**
     * @type Number
     */
    this.startYear = startYear;
    
    /**
     * @type Number
     */
    this.endYear = endYear;
    
    /**
     * @type Number
     */
    this.label = startYear;
    
    /**
     * @type Boolean
     */
    this.isClicked = false;
    
    /**
     * @type Boolean
     */
    this.isDragged = false;
    
}


TimerSlider.prototype = new TimerElement();

TimerSlider.prototype.setIncrement = function(increment) {
    this.increment = increment;
}
/**
 * Set the initial position of the slider
 * @param {Point} position
 * @returns {undefined}
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
 * @param {Number} newStartYear
 * @returns {undefined}
 */
TimerSlider.prototype.setStartYear = function(newStartYear)
{
    this.startYear = newStartYear;
}

/**
 * Set the ending year of the slider
 * @param {Number} newEndYear
 * @returns {undefined}
 */
TimerSlider.prototype.setEndYear = function(newEndYear) {
    this.endYear = newEndYear;
}

/**
 * Get the label of the slider's year value
 * @returns {Number} label of the current year
 */
TimerSlider.prototype.getLabel = function() {
    return this.label;
}

/**
 * Set the label of the slider's year value
 * @param {Number} newLabel
 * @returns {undefined}
 */
TimerSlider.prototype.setLabel = function(newLabel) {
    this.label = newLabel;
}

/**
 * Move the slider by the increment
 * @param {Number} Pixel increment to move
 * @returns {undefined}
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
 * @param {Graphics} g
 * @returns {undefined}
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
 * @param {Graphics} g
 * @returns {undefined}
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
 * @returns {undefined}
 */
TimerSlider.prototype.resetSlider = function() {
    this.updatePosition(this.initialPosition);
    this.setLabel(this.startYear);
}



