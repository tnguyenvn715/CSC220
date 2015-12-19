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
 * @param {String} type - The type of data to be displayed 
 */
CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);  
    this.devicePixelRatio = window.devicePixelRatio;
    var _this = this;
    window.addEventListener('resize',
                           function() {
                               _this.onWindowResize();
                            }, false);

    this.initializeChartTimer(1901);
    this.data = new Resource("temperature_fig-2.csv");
    this.data.beginLoad(this, this.onDataLoaded);  
    this.chart = new BarChart(this.canvas);  
    this.pointerManager = new PointerManager(this.chart);
    this.initializeUI();
    
}

/**
 * Set the timer elements for timerManager
 * @param {Number} year - The starting year for the timer
 */
CustomGameLoop.prototype.initializeChartTimer = function(year) {
    var timerBar = new TimerBar(new Point(70, 410), 850, 5, "white");
    var timerSlider = new TimerSlider(new Point(70, 400), 10, 20, "#003366", year, 2014);
    timerSlider.setInitialPosition(new Point(70, 400));
    this.timerManager = new TimerManager(timerSlider, timerBar);
}

/**
 * Reset the timerManager and clear chart elements on canvas
 */
CustomGameLoop.prototype.refresh = function(){
    this.timerManager.resetTimer();
    this.chart.clearElements();
   
}

/**
 * Set the start year for timerManager from UI input
 */
CustomGameLoop.prototype.initializeUI = function() {
    var year = this.getParameterByName("inputYear");
    if (year != "") {
        this.timerManager.setStartYear(Number(year));
        this.timerManager.resetTimer();      
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

/**
 * 
 * @param {Resource} resource
 */
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
 * 
 */
CustomGameLoop.prototype.onWindowResize = function() {
    this.fillWindow();
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.pointerManager.onPointerEnter(id, position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 */
CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.pointerManager.onPointerMove(id, position);
}

/**
 * 
 * @param {type} id
 * @param {type} position
 */
CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.pointerManager.onPointerActivate(id, position);
}
/**
 * 
 * @param {type} id
 * @param {type} position
 */
CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.pointerManager.onPointerDeactivate(id, position);
}

/**
 * 
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
 * Update the frame
 */
CustomGameLoop.prototype.update = function() {
    GameLoop.prototype.update.call(this);
    if (this.timerManager.getLabel() >= this.timerManager.getEndYear() && 
                        this.timerManager.isPlayed == true) {
        this.timerManager.isPlayed == false;
        
    }
    else {
        this.timerManager.isPlayed == true; 
        this.timerManager.updateTimer(); 
        var currentYear = this.timerManager.getLabel();
        var dataText = this.data.getLoadedString();
        var currentData = new DataSet("current_temp", dataText, 
                            this.timerManager.getStartYear());  
        var point = currentData.getDataPointFromYear(currentYear);
        this.chart.updateChart(this.timerManager, point);  
    }
    
}
// </editor-fold>
