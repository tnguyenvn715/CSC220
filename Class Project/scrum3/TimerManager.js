/**
 * Contains properties of timer manager
 * @constructor
 * @param {TimerSlider} timerSlider
 * @param {TimerBar} timerBar
 */
function TimerManager(timerSlider, timerBar) {
    /**
     * @type TimerSlider
     */
    this.timerSlider = timerSlider;
    
    /**
     * @type TimerBar
     */
    this.timerBar = timerBar; 
    
    /**
     * @type Boolean
     */
    this.isPlayed = true;
    this.initializeTimer();
}

TimerManager.prototype.initializeTimer = function() {
    this.timerSlider.setIncrement(this.getHorizontalIncrement());
}

/**
 * Retrieve year label of slider
 * @returns {Number}
 */
TimerManager.prototype.getLabel = function() {
    return this.timerSlider.getLabel();
}

/**
 * Retrieve the slider position of the slider
 * @returns {Point} position of the slider
 */
TimerManager.prototype.getSliderPosition = function() {
    return this.timerSlider.getPosition();
}


/**
 * Get the starting year of the timer
 * @returns {Number}
 */
TimerManager.prototype.getStartYear = function(){
    return this.timerSlider.getStartYear();
}

/**
 * Get the ending year of the timer
 * @returns {Number}
 */
TimerManager.prototype.getEndYear = function(){
    return this.timerSlider.getEndYear();
}
/**
 * Calculate number of years span over time
 * @return {Number} Number of years
 */
TimerManager.prototype.getNumYears = function() {
    var endYear = this.timerSlider.getEndYear();
    var startYear = this.timerSlider.getStartYear();
    var numYears = endYear - startYear;
    return numYears;
}
/**
 * Calculate and return the number of pixel increment for slider to move
 * @returns {Number} Number for pixel increment
 */
TimerManager.prototype.getHorizontalIncrement = function() {
    var lengthOfBar = this.timerBar.getWidth();
    var increment = lengthOfBar/ this.getNumYears();
    return increment;
}

/**
 * Update the timer by calling methods to move the slider and update year label 
 * @returns {undefined}
 */
TimerManager.prototype.updateTimer = function() {
    
    this.timerSlider.moveSlider();
    this.updateHTMLLabel(this.getLabel());
   
}


/**
 * Reset the timer to the initial year and position
 * @returns {undefined}
 */
TimerManager.prototype.reset = function() {
    this.timerSlider.resetSlider();
}

/**
 * Update the HTML label of the year
 * @param {String} Label of updated year
 * @returns {undefined}
 */
TimerManager.prototype.updateHTMLLabel = function(label) {
    document.getElementById("year").style.font = "bold 65px times,serif";
    document.getElementById("year").innerHTML = label ;
}

/**
 * Draw the elements belonging to the timer manager
 * @param {Graphics} g  
 * @returns {undefined}
 */
TimerManager.prototype.draw = function(g) {
    this.timerBar.draw(g);
    this.timerSlider.draw(g);
}