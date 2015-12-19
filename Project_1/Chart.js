// <editor-fold desc="Chart">
/**
 * Encapsulate features of a chart along with functions
 * @constructor
 */       
function Chart(canvas) {
    if (typeof canvas !== "undefined") { //credit: Professor Block
        /**
         * The area where graphics are drawn
         * @private
         * @type Canvas
         */
        this.canvas = canvas;
        
        /**
         * An array of chart elements
         * @private
         * @type Array
         */
        this.elements = [];
        
        /**
         * The graphic context
         * @private
         * @type Graphics
         */
        this.g = canvas.getContext("2d");
    }
}  

/**
 * Get the array of chart elements
 * @returns {Array}
 */
Chart.prototype.getChartElements = function() {
    return this.elements;
}

/**
 * Add chart element to chart
 * @param {Point} dataPoint The data point to be mapped
 * @param {Number} xpos The x-pos of chart element
 * @param {Number} width The width of chart element
 */
Chart.prototype.addElement = function(dataPoint, xpos, width) {
    var value = dataPoint.getValue();
    var label = dataPoint.getLabel();
    var height = value * 80;
    var ypos = 240 - height;
    
    var element = this.initializeChartElement
                    (label, value, xpos, ypos, width, height);
    this.elements.push(element); 
}

/**
 * Reset the array of elements to none
 */
Chart.prototype.clearElements = function() {
    this.elements = [];
}

/**
 * Update the chart with next data point
 * @param {TimeManager} timerManager The timer components
 * @param {DataPoint} point The data point to be mapped
 * @returns {undefined}
 */
Chart.prototype.updateChart = function(timerManager, point){
    //override
}

/**
 * Calculate the most fit width for chart element
 * @param {Number} yearSpan - Number of years between start year and end year
 * @returns {Number}
 */
Chart.prototype.calculateElementWidth = function(yearSpan) {
    var width = 0;
    if(yearSpan >= 0 && yearSpan <= 10){
        width = 50;
    }
    if(yearSpan > 10 && yearSpan <= 20){
        width = 40;
    }
    if(yearSpan > 20 && yearSpan <= 25){
        width = 25;
    }
    if(yearSpan > 25 && yearSpan <= 40){
        width = 15;
    }
    if(yearSpan > 40 && yearSpan <= 60){
        width = 10;
    }
    if(yearSpan > 60){
        width = 5;
    }
    return width; 
}

/**
 * Draw the y axis
 * @param {Graphics} g The graphics context
 * @param {Number} xpos The position x of axis
 * @param {Number} ymin The highest position of axis
 * @param {Number} ymax The lowest position of axis
 * @param {Number} yincrement The pixels between scale increments
 */
Chart.prototype.drawYAxis = function(g, xpos, ymin, ymax, yincrement) {
    g.beginPath();
    g.moveTo(xpos,ymin);
    g.lineTo(xpos,ymax);
    g.stroke();
    g.closePath(); 
    var num = -1.0;
    for(var i = ymax; i >= ymin; i --) {
        
        if (i%yincrement === 0){
            g.fillStyle =  "black"; 
            g.font = "13px Calibri";
            var n = num.toFixed(2);
            g.fillText(n, xpos- 30, i + 10);
            g.beginPath();
            g.moveTo(xpos - 5,i);
            g.lineTo(xpos,i);
            g.stroke();
            g.closePath(); 
            num += 0.5;
        }
        
    }
}

/**
 * Draw the x axis
 * @param {Graphics} g The graphics context
 * @param {Number} ypos The position y of axis
 * @param {Number} xmin The minimum x position of axis
 * @param {Number} xmax The maximum x position of axis
 */
Chart.prototype.drawXAxis = function(g, ypos, xmin, xmax) {
    g.beginPath();
    g.moveTo(xmin,ypos);
    g.lineTo(xmax,ypos);
    g.stroke();
    g.closePath(); 
}

/**
 * Draw the chart
 * @param {Graphics} g The graphics context
 */
Chart.prototype.draw = function(g) {
    this.drawYAxis(g, 70, 0, 400, 80);
    this.drawXAxis(g, 240, 70, 950);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }  
}
// </editor-fold>

// <editor-fold desc="ChartElement">
/**
 * Encapsulates features of a chart element along with functions
 * @constructor
 */
function ChartElement(label, value, x, y, width, height) {
    /**
     * The x-label of chart element
     * @private
     * @type Number
     */
    this.label = label;
    
    /**
     * The y-value of chart element
     * @private
     * @type Number
     */
    this.value = value;
    
    /**
     * The x-pos of chart element
     * @private
     * @type Number
     */
    this.x = x;
    
    /**
     * The y-pos of chart element
     * @private
     * @type Number
     */
    this.y = y;
    
    /**
     * The width of chart element
     * @private
     * @type Number
     */
    this.width = width;
    
    /**
     * The height of chart element
     * @private
     * @type Number
     */
    this.height= height; 
    
    /**
     * The boolean signify when chart element is hovered
     * @private
     * @type Boolean
     */
    this.isHover = false;
    
    /**
     * The color when chart element is hovered
     * @private
     * @type Color
     */
    this.highlightColor = "#8acc25";
    
    /**
     * The normal color of chart element
     * @private
     * @type Color
     */
    this.normalColor= "#cf2435";
}

/**
 * Draw the chart element's stats when hovered
 * @param {Graphics} g The graphics context
 * @returns {undefined}
 */
ChartElement.prototype.drawElement = function(g) {
    if(this.isHover == true) {
        var text = this.label + ': ' + this.value;
        g.fillStyle = "gray";
        g.fillRect(this.x, 50, 80, 40);
        g.fillStyle = "white";
        g.font="10pt Times";
        var textWidth = g.measureText(text).width;
        g.fillText(text, this.x + 40 - (textWidth/ 2), 65);
    }
}

/**
 * Check if pointer event is within bounds of a chart element
 * @param {Position} mousePos Position of pointer event
 */
ChartElement.prototype.isHit = function(position) {
    if((position.x > this.x  && position.x < (this.x+ this.width)) 
            && ((position.y > this.y && position.y < (this.y + this.height)) || 
            (position.y < this.y && position.y > (this.y + this.height)))){
        this.isHover = true;    
    }
    else{
        this.isHover = false;
    }
}
// </editor-fold>
 
 