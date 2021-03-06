// <editor-fold desc="TimerElement">

/**
 * Represents a Timer element
 * @constructor
 */
function TimerElement(position, width, height, fillColor) {
    /**
     * The position of the element
     * @private
     * @type Point 
     */
    this.position = position;
    
    /**
     * The width of the element
     * @private
     * @type Number
     */
    this.width = width;
    
    /**
     * The height of the element
     * @private
     * @type Number
     */
    this.height = height;
    
    /**
     * The color of the element
     * @private
     * @type String
     */
    this.fillColor = fillColor;
    
}

/**
 * Update position of timer element
 * @param {Point} position
 * @returns {undefined}
 */
TimerElement.prototype.updatePosition = function(position) {
    this.position.x =  position.x;
    this.position.y = position.y;
}

/**
 * Retrieve width of timer element
 * @returns {Number}
 */
TimerElement.prototype.getWidth = function() {
    return this.width;
}

/**
 * Set width of timer element to new width
 * @param {Number} newwidth
 * @returns {undefined}
 */
TimerElement.prototype.setWidth = function(newwidth) {
    this.width = newwidth;
}

/**
 * Retrieve height of timer element
 * @returns {Number}
 */
TimerElement.prototype.getHeight = function() {
    return this.height;
}

/**
 * Set height of timer element to new height
 * @param {Number} newheight
 * @returns {undefined}
 */
TimerElement.prototype.setHeight = function(newheight) {
    this.height = newheight;
}

/**
 * Set position of timer element to new position
 * @param {Point} position
 * @returns {undefined}
 */
TimerElement.prototype.setPosition = function(position) {
    this.position = position.clone();
}

/**
 * Retrieve position of timer element
 * @returns {Point}
 */
TimerElement.prototype.getPosition = function() {
    return this.position.clone();
}

/**
 * Set fill color of timer element to new color
 * @param {String} newColor
 * @returns {undefined}
 */
TimerElement.prototype.setColor = function(newColor) {
    this.fillColor = newColor;
}

/**
 * Get fill color of timer element
 * @returns {String}
 */
TimerElement.prototype.setColor = function() {
    return this.fillColor;
}

/**
 * Check if mouse position is within bounds of the timer element
 * @param {Point} mousePos
 * @returns {Boolean}
 */
TimerElement.prototype.hitTest = function(mousePos) {
    if((mousePos.x > this.position.x  && mousePos.x < (this.position.x+ this.width)) 
        && (mousePos.y > this.position.y && mousePos.y < (this.position.x+ this.width)) ){
        return true; 
    }
    else{
        return false;
    }
}

/**
 * Draw timer element
 * @param {Graphics} g
 * @returns {undefined}
 */
TimerElement.prototype.draw = function(g) {
    //override
}
//</editor-fold>