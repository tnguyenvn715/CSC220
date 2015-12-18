// <editor-fold desc="TimerManager">

/**
 * Contains properties of timer manager
 * @constructor
 */
function TimerManager(timerSlider, timerBar) {
    /**
     * The TimerSlider
     * @private
     * @type TimerSlider
     */
    this.timerSlider = timerSlider;
    
    /**
     * The TimerBar
     * @private 
     * @type TimerBar
     */
    this.timerBar = timerBar; 
    
    /**
     * Signifier for when timer is being played
     * @private
     * @type Boolean
     */
    this.isPlayed = true;
    this.initializeTimer();
}



/**
 * Set the increment for the timer slider
 */
TimerManager.prototype.initializeTimer = function() {
    this.timerSlider.setIncrement(this.getHorizontalIncrement());
    
}

/**
 * Get the year label of the slider
 * @returns {Number} The label of the slider
 */
TimerManager.prototype.getLabel = function() {
    return this.timerSlider.getLabel();
}

/**
 * Get the position of the slider
 * @returns {Point} position The slider's position
 */
TimerManager.prototype.getSliderPosition = function() {
    return this.timerSlider.getPosition();
}

/**
 * Set the position of the slider
 * @param {Point} position The new position
 */
TimerManager.prototype.setSliderPosition = function(position) {
    this.timerSlider.setPosition(position);
}

/**
 * Get the starting year of the timer
 * @returns {Number} year The current starting year 
 */
TimerManager.prototype.getStartYear = function(){
    return this.timerSlider.getStartYear();
}
/**
 * Set the starting year of the timer
 * @param {Number} year The new starting year 
 */
TimerManager.prototype.setStartYear = function(year){
    this.timerSlider.setStartYear(year);
}

/**
 * Get the ending year of the timer
 * @return {Number} year The current ending year
 */
TimerManager.prototype.getEndYear = function(){
    return this.timerSlider.getEndYear();
}

/**
 * Set the ending year of the timer
 * @param {Number} year The new ending year
 */
TimerManager.prototype.setEndYear = function(year){
    this.timerSlider.setEndYear(year);
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
*/
TimerManager.prototype.updateTimer = function() {
    this.timerSlider.moveSlider();
    this.updateHTMLLabel(this.getLabel());
}


/**
 * Reset the timer to the initial year and position
 */
TimerManager.prototype.resetTimer = function() {
    this.timerSlider.resetSlider();
    this.initializeTimer();
}

/**
 * Update the HTML label to new year
 * @param {String} Label The string for updated label
 */
TimerManager.prototype.updateHTMLLabel = function(label) {
    document.getElementById("year").style.font = "bold 65px times,serif";
    document.getElementById("year").innerHTML = label ;
}

/**
 * Draw the elements belonging to the timer manager
 * @param {Graphics} g  The graphics context
 */
TimerManager.prototype.draw = function(g) {
    this.timerBar.draw(g);
    this.timerSlider.draw(g);
}
//</editor-fold>