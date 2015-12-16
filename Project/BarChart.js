/**
 * @augments Chart
 * @constructor
 * @param {Canvas} canvas
 * @returns {BarChart}
 */
function BarChart(canvas) {
    Chart.call(this, canvas);   
}
BarChart.prototype = new Chart();

/**
 * 
 * @param {Number} label
 * @param {Number} value
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {BarElement}
 */
BarChart.prototype.initializeChartElement = function(label, value, x, y, width, height){
    //credit: Professor Block
    return new BarElement(label, value, x, y, width, height);
}

/**
 * 
 * @param {TimerManager} timerManager
 * @param {DataPoint} point
 * @returns {undefined}
 */
BarChart.prototype.updateChart = function(timerManager, point) {
    Chart.prototype.updateChart.call(this, timerManager, point);
    var yearSpan = timerManager.getNumYears();
    var xpos = timerManager.getSliderPosition().getX();
    var currentyear = timerManager.getLabel();
    var width = this.calculateWidth(yearSpan);
    this.addElement(point, xpos, width); 
}

/**
 * @augments ChartElement 
 * @param {Number} label
 * @param {Number} value
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {BarElement}
 */
function BarElement(label, value, x, y, width, height){
    ChartElement.call(this,label, value, x, y, width, height );
    
}
BarElement.prototype = new ChartElement();

/**
 * 
 * @param {Graphics} g
 * @returns {undefined}
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

