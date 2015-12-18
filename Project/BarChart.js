// <editor-fold desc="BarChart">

/**
 * Encapsulates features of a bar chart along with functions
 * @augments Chart
 * @constructor 
 */
function BarChart(canvas) {
    Chart.call(this, canvas);   
}

BarChart.prototype = new Chart();

/**
 * Creating a new bar for chart
 * @param {Number} label The x-label of the bar
 * @param {Number} value The y-value of the bar
 * @param {Number} x Bar's x-posiiton
 * @param {Number} y Bar's y-position
 * @param {Number} width Bar's width
 * @param {Number} height Bar's height
 * @returns {BarElement}
 */
BarChart.prototype.initializeChartElement = function(label, value, x, y, width, height){
    //credit: Professor Block
    return new BarElement(label, value, x, y, width, height);
}

/**
 * Adding new data point to the chart 
 * @param {TimerManager} timerManager
 * @param {DataPoint} point
 */
BarChart.prototype.updateChart = function(timerManager, point) {
    Chart.prototype.updateChart.call(this, timerManager, point);
    var yearSpan = timerManager.getNumYears();
    var xpos = timerManager.getSliderPosition().getX();
    var currentyear = timerManager.getLabel();
    var width = this.calculateWidth(yearSpan);
    this.addElement(point, xpos, width); 
}
//</editor-fold>

// <editor-fold desc="BarElement">

/**
 * Encapsulates features of a bar along with functions
 * @constructor
 * @augments ChartElement 
 */
function BarElement(label, value, x, y, width, height){
    ChartElement.call(this,label, value, x, y, width, height );
    
}
BarElement.prototype = new ChartElement();

/**
 * Draw the individual representation of data point for chart
 * @param {Graphics} g The graphics context 
 */
BarElement.prototype.drawElement = function(g) {
    // credit: Professor Block
    ChartElement.prototype.drawElement.call(this, g);
    g.save();
    g.beginPath(); 
    g.fillStyle = this.isHover ? this.highlightColor: this.normalColor; 
    g.fillRect(this.x,this.y, this.width, this.height);
    g.closePath(); 
    g.restore();
    
}

//</editor-fold>
