// <editor-fold desc="CustomGameLoop">
/**
 * @constructor
 * @extends GameLoop
 */
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

/**
 * Initialize data and chart and pointer manager
 * @param {Canvas} canvas - The area where graphics are drawn 
 */
CustomGameLoop.prototype.initialize = function(canvas, chart, type) {
    GameLoop.prototype.initialize.call(this, canvas);  
    this.devicePixelRatio = window.devicePixelRatio;
    var _this = this;
    window.addEventListener('resize',
                           function() {
                               _this.onWindowResize();
                            }, false);
    this.type = type;
    this.chart = chart;
    this.pointerManager = new PointerManager(this.chart);
    this.initializeUI();
}

/**
 * Initialize the timerManager
 * @param {Number} year - The starting year for the timer
 */
CustomGameLoop.prototype.initializeChartTimer = function(timerManager) {
    this.timerManager = timerManager;
}

/**
 * Reset the timerManager and clear chart elements on canvas
 */
CustomGameLoop.prototype.refresh = function(){
    this.timerManager.resetTimer();
    this.chart.clearElements();
}

/**
 * Set the start year and data based on UI inputs
 */
CustomGameLoop.prototype.initializeUI = function() {
    // year input works but not data type selection
    var year = this.getParameterByName("inputYear");
    var datatype = document.getElementById("changeType").value;
    if(datatype != "") {
        this.type = datatype;
    } 
    if (this.type == "current_temp"){
        if (year != "") {
            this.timerManager.setStartYear(Number(year));
            this.timerManager.resetTimer();  
        
        }
        var data = new Resource("temperature_fig-2.csv");
        data.beginLoad(this, this.onDataLoaded);
        this.data = data;
    }
    if (this.type == "sea_ice"){
        if (year != "") {
            if (Number(year) < 1979) {
                this.timerManager.setStartYear(Number(1979));
            }
            else {
                this.timerManager.setStartYear(Number(year));
            }
            this.timerManager.resetTimer();  
        }
        var data = new Resource("sea-ice.csv");
        data.beginLoad(this, this.onDataLoaded);
        this.data = data;
    } 
    document.getElementById("inputYear").value = this.timerManager.getStartYear();
    this.chart.clearElements();
}

/**
 * Retrieve value from input field
 * @param {String} name - The name of the input field
 * @returns {String} results - The value from the input field 
 */
CustomGameLoop.prototype.getParameterByName = function(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : 
            decodeURIComponent(results[1].replace(/\+/g, " ")); 
    
}
CustomGameLoop.prototype.onDataLoaded = function(resource) {
    var test = 1;
}
/**
 * Set the width and height for canvas space
 * @param {Number} width Canvas' width in pixels
 * @param {Number} height Canvas' height in pixels
 */
CustomGameLoop.prototype.setCanvasSize = function(width, height) {
   this.canvas.width = width;
   this.canvas.height = height;
}

/**
 * Set the width for canvas space
 * @param {Number} width Canvas' width in pixels
 */
CustomGameLoop.prototype.setWidth = function(width) {
    this.canvas.width = width;
}

/**
 * Set the height for canvas space
 * @param {Number} height Canvas' height in pixels
 */
CustomGameLoop.prototype.setHeight = function(height) {
    this.canvas.height = height;
}

/**
 * Resize to fill window based on device pixel ratio
 */
CustomGameLoop.prototype.fillWindow = function() {
    this.setWidth(window.innerWidth * this.devicePixelRatio) ;
    this.setHeight(window.innerHeight * this.devicePixelRatio);
}

/**
 * Fill window when resize
 */
CustomGameLoop.prototype.onWindowResize = function() {
    this.fillWindow();
}

/**
 * Event when pointer enter canvas
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
}

/**
 * Event when pointer move on canvas
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.pointerManager.onPointerMove(id, position);
}

/**
 * Event when pointer is activated
 * @param {Number} id
 * @param {point} position
 */
CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
}
/**
 * Event when pointer is deactivated
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.pointerManager.onPointerDeactivate(id, position);
}

/**
 * Event when pointer leaves canvas
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.pointerManager.onPointerLeave(id, position);
}

/**
 * Draw the chart and timerManager elements in the frame
 * @param {Graphics} g The graphics context
 */
CustomGameLoop.prototype.draw = function(g) {
    GameLoop.prototype.draw.call(this, g);
    this.chart.draw(this.g); 
    this.timerManager.draw(this.g); 
}

/**
 * Clear the graphics on canvas 
 * @param {Graphics} g The graphics context
 * @param {Canvas} canvas The area where graphics are drawn
 */
CustomGameLoop.prototype.clear = function(g, canvas) {
    GameLoop.prototype.clear.call(this, g);
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);    
}

/**
 * Load the data set 
 * @return {DataSet} The dataset loaded
 */
CustomGameLoop.prototype.loadDataset = function(data) {
    
    var dataText = data.getLoadedString();
    var dataSet = new DataSet(this.type, dataText, 
                            this.timerManager.getStartYear());  
    return dataSet;                   
}

/**
 * Set up properties for new chart element and return the element
 * @param {DataSet} dataSet The data set where data point is retrieved from
 * @param {TimerManager} timer The current timer manager
 * @returns {ChartElement} The chart element created
 */
CustomGameLoop.prototype.setChartElementProperties = function(dataSet, timer) {
    var dataPoint = dataSet.getDataPointFromLabel(timer.getLabel());
    var value = dataPoint.getValue();
    var label = dataPoint.getLabel();
    var width = this.chart.calcElementWidth(timer.getNumYears());
    var height = value * (this.chart.getPixeltoScaleRatio());
    var x = timer.getSliderPosition().getX();
    var y = this.chart.getOriginY() - height;
    return this.chart.initializeChartElement(label, value, x, 
                            y , width, height);
}

/**
 * Update each frame of game loop
 */
CustomGameLoop.prototype.update = function() {
    GameLoop.prototype.update.call(this);
    //if first year don't call update timer otherwise it skips drawing 
    if (this.timerManager.getLabel() == this.timerManager.getStartYear() && 
                        this.timerManager.isPlayed == true) {
        
        var dataSet = this.loadDataset(this.data); 
        var timer = this.timerManager;
        var chartElement = this.setChartElementProperties(dataSet, timer);
        this.chart.addElement(chartElement) ;
    }
    
    //if last year stop draw
    if (this.timerManager.getLabel() >= this.timerManager.getEndYear() && 
                        this.timerManager.isPlayed == true) {
        this.timerManager.isPlayed == false;
    }
    
    //if other keep updating timer and draw
    else {
        this.timerManager.updateTimer(); 
        this.timerManager.isPlayed == true; 
        var dataSet = this.loadDataset(this.data); 
        var timer = this.timerManager;
        var chartElement = this.setChartElementProperties(dataSet, timer);
        this.chart.addElement(chartElement) ;    
    }
    
}
// </editor-fold>
