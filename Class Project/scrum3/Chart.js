// <editor-fold desc="Chart">
/**
 * Encapsulate features of a chart along with functions
 * @constructor
 */       
function Chart(canvas, x, y , width, height, yPixelIncrement, yScaleIncrement) {
    if (typeof canvas !== "undefined") { //credit: Professor Block
        /**
         * The area where graphics are drawn
         * @private
         * @type Canvas
         */
        this.canvas = canvas;
        
        /**
        * The x position of the element
        * @private
        * @type Number 
        */
        this.x = x;
        
        /**
        * The y position of the element
        * @private
        * @type Number 
        */
        this.y = y;
    
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
        
        /**
         * The number of pixel increment for y axis
         * @private
         * @type Number
         */
        this.yPixelIncrement = yPixelIncrement;
        
        /**
         * The 1:1 value increment for y axis
         * @private
         * @type Number
         */
        this.yScaleIncrement = yScaleIncrement;    
    }
}  

/**
 * Initialize the x,y pixel position for the origin of chart
 * @param {Number} originx
 * @param {Number} originy
 */
Chart.prototype.initializeOriginPos = function(originx, originy) {
    this.originx = originx;
    this.originy = originy;
}

/**
 * Get the x position of origin
 * @returns {Number} 
 */
Chart.prototype.getOriginX = function() {
    return this.originx;
}

/**
 * Get the y position of origin
 * @returns {Number}
 */
Chart.prototype.getOriginY = function() {
    return this.originy;
}

/**
 * Initialize the lowest y value on y-axis scale
 * @param {Number} ymin The lowest y value on the scale
 */
Chart.prototype.initializeYMinValue = function(ymin) {
    this.ymin = ymin;
}

/**
 * Initialize the highest y value on y-axis scale
 * @param {Number} ymax The highest y value on the scale
 */
Chart.prototype.initializeYMaxValue = function(ymax) {
    this.ymax = ymax;
}

/**
 * Get the x position of chart
 * @returns {Number} The x position of chart
 */
Chart.prototype.getX = function() {
    return this.x;
}

/**
 * Set the x position of chart
 * @param {Number} The new x position for chart
 */
Chart.prototype.setX = function(x) {
    this.x = x;
}

/**
 * Get the y position of chart
 * @returns {Number} The y position of chart
 */
Chart.prototype.getY = function() {
    return this.y;
}

/**
 * Set the y position of chart
 * @param {Number} The new y position for chart
 */
Chart.prototype.setY = function(y) {
    this.y = y;
}

/**
 * Get the width of chart
 * @returns {Number} The width of chart
 */
Chart.prototype.getWidth = function() {
    return this.width;
}

/**
 * Set the width of chart to new width
 * @param {Number} newwidth The new width for chart
 */
Chart.prototype.setWidth = function(newwidth) {
    this.width = newwidth;
}

/**
 * Get the height of chart
 * @returns {Number} The height of chart
 */
Chart.prototype.getHeight = function() {
    return this.height;
}

/**
 * Set the height of chart to new height
 * @param {Number} newheight The new height for chart
 */
Chart.prototype.setHeight = function(newheight) {
    this.height = newheight;
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
Chart.prototype.addElement = function(element) {
    this.elements.push(element); 
}

/**
 * Reset the array of elements to none
 */
Chart.prototype.clearElements = function() {
    this.elements = [];
}

/**
 * Get the y pixel increment of chart
 * @returns {Number} The number of pixel increment for y axis
 */
Chart.prototype.getYPixelIncrement = function() {
    return this.yPixelIncrement;
}

/**
 * Set the y pixel increment of chart
 * @param {Number} The new number of pixel increment for y axis
 */
Chart.prototype.setYPixelIncrement = function(increment) {
    this.yPixelIncrement = increment;
}

/**
 * Get the 1:1 value increment of y axis
 * @returns {Number} The 1:1 value increment for y axis 
 */
Chart.prototype.getYScaleIncrement = function() {
    return this.yScaleIncrement;
}

/**
 * Set the 1:1 value increment of y axis
 * @param {Number} The 1:1 value increment for y axis 
 */
Chart.prototype.setYScaleIncrement = function(increment) {
    this.yScaleIncrement = increment;
}

/**
 * Get the ratio of pixel to scale values for y axis increment
 * @returns {Number} The ratio of pixel to scale values
 */
Chart.prototype.getPixeltoScaleRatio = function() {
    return (this.yPixelIncrement/this.yScaleIncrement);
}

/**
 * Calculate the most fit width for chart element
 * @param {Number} yearSpan - Number of years between start year and end year
 * @returns {Number}
 */
Chart.prototype.calcElementWidth = function(yearSpan) {
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
    var num = this.ymin;
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
            num += this.getYScaleIncrement();
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
    this.drawYAxis(g, this.originx, this.y, this.y + this.height, 
                    this.yPixelIncrement);
    this.drawXAxis(g, this.originy, this.x, this.x + this.width);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }  
}

/**
 * Check if pointer event is within bounds of any chart element
 * @param {Position} position Position of pointer event
 */
Chart.prototype.isHit = function(position) {
    for (var i = 0; i < this.elements.length; i++) { //credit: Professor Block
        /*if (this.elements[i].isHit(position)){
            this.elements[i].isHover = true;
        }
        else{
            this.elements[i].isHover = false;
        }
        */
       this.elements[i].isHit(position);
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
    this.normalColor= "red";
}

/**
 * Draw the chart element, to be override
 * @param {Graphics} g The graphics context
*/
ChartElement.prototype.drawElement = function(g) {
    if (this.isHover == true){
        this.drawInfo(g);
    }
    //override
}

/**
 * Draw the chart element's info when hovered
 * @param {Graphics} g The graphics context
*/
ChartElement.prototype.drawInfo = function(g) {
    var year = this.label;
    var value = this.value + ' F';
    g.fillStyle =  "black";
    g.fillRect(this.x - 30, 0, 60, 40);
    g.fillStyle = "white";
    g.font="7pt Arial";
    var textWidth = g.measureText(year).width;
    var textWidth2 = g.measureText(value).width;
    g.fillText(year, this.x - (textWidth/ 2), 12);
    g.fillText(value, this.x - (textWidth2/ 2), 32);
}

/**
 * Check if pointer event is within bounds of a chart element
 * @param {Position} mousePos Position of pointer event
 */
ChartElement.prototype.isHit = function(position) {
    if((position.x > this.x  && position.x < (this.x+ this.width)) 
            && ((position.y > this.y && position.y < (this.y + this.height)) || 
            (position.y < this.y && position.y > (this.y + this.height)))){
        //return true;  
        this.isHover = true;

    }
    else{
        this.isHover = false;
    }
}
// </editor-fold>
 
 