// <editor-fold desc="CustomGameLoop">
/**
 * @constructor
 * @augments GameLoop
 * @returns {CustomGameLoop}
 */
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

/**
 * 
 * @param {Canvas} canvas
 * @param {TimerManager} timerManager
 * @returns {undefined}
 */
CustomGameLoop.prototype.initialize = function(canvas, timerManager) {
    GameLoop.prototype.initialize.call(this, canvas);  
    this.devicePixelRatio = window.devicePixelRatio;
    var _this = this;
    window.addEventListener('resize',
                           function() {
                               _this.onWindowResize();
                            }, false);
                            
    this.inputManager = new InputManager(); 
    this.timerManager = timerManager;
    this.data = new Resource("temperature_fig-2.csv");
    this.data.beginLoad(this, this.onDataLoaded);  
    this.chart = new BarChart(this.canvas);  
}

/**
 * 
 * @param {Resource} resource
 * @returns {undefined}
 */
CustomGameLoop.prototype.onDataLoaded = function(resource) {
    var test = 1;
}

/**
 * 
 * @param {Number} width
 * @param {Number} height
 * @returns {undefined}
 */
CustomGameLoop.prototype.setCanvasSize = function(width, height) {
   this.canvas.width = width;
   this.canvas.height = height;
}

/**
 * 
 * @param {Number} width
 * @returns {undefined}
 */
CustomGameLoop.prototype.setWidth = function(width) {
    this.canvas.width = width;
}

/**
 * 
 * @param {Number} height
 * @returns {undefined}
 */
CustomGameLoop.prototype.setHeight = function(height) {
    this.canvas.height = height;
}

/**
 * 
 * @returns {undefined}
 */
CustomGameLoop.prototype.fillWindow = function() {
    this.setWidth(window.innerWidth * this.devicePixelRatio) ;
    this.setHeight(window.innerHeight * this.devicePixelRatio);
}

/**
 * 
 * @returns {undefined}
 */
CustomGameLoop.prototype.onWindowResize = function() {
    this.fillWindow();
}

/**
 * 
 * @param {Resource} resource
 * @returns {undefined}
 */
CustomGameLoop.prototype.onDataLoaded = function(resource) {
    var test = 1;
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.inputManager.onPointerEnter(id, position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.inputManager.onPointerMove(id, position);
}

/**
 * 
 * @param {type} id
 * @param {type} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.inputManager.onPointerActivate(id, position);
}
/**
 * 
 * @param {type} id
 * @param {type} position
 * @returns {undefined}
 */
CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.inputManager.onPointerDeactivate(id, position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.inputManager.onPointerLeave(id, position);
}

/**
 * 
 * @param {Graphics} g
 * @returns {undefined}
 */
CustomGameLoop.prototype.draw = function(g) {
    GameLoop.prototype.draw.call(this, g);
    
    this.chart.draw(this.g); 
    this.timerManager.draw(this.g); 
}

/**
 * 
 * @param {Graphics} g
 * @param {Canvas} canvas
 * @returns {undefined}
 */
CustomGameLoop.prototype.clear = function(g, canvas) {
    GameLoop.prototype.clear.call(this, g);
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);    
}

/**
 * 
 * @returns {undefined}
 */
CustomGameLoop.prototype.update = function() {
    GameLoop.prototype.update.call(this);
    if (this.timerManager.getLabel() >= 2014 && 
                        this.timerManager.isPlayed == true) {
        this.timerManager.isPlayed == false;
        
    }
    else {
        this.timerManager.isPlayed == true; 
        this.timerManager.updateTimer(); 
        var currentYear = this.timerManager.getLabel();
        var dataText = this.data.getLoadedString();
        var currentData = new DataSet("CurTempData", dataText, 
                            this.timerManager.getStartYear());  
        var point = currentData.getDataPointFromYear(currentYear);
        this.chart.updateChart(this.timerManager, point);  
    }
    
}
// </editor-fold>

// <editor-fold desc="InputManager">
/**
 * 
 * @returns {InputManager}
 */
function InputManager() {
    this.pointers = { };
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.onPointerDeactivate = function(id, position) {
    this.pointers[id].deactivate();
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.onPointerLeave = function(id, position) {
    this.removePointer(id, position);
}

/**
 * 
 * @param {Number} id
 * @returns {Boolean}
 */
InputManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

/**
 * 
 * @param {Number} id
 * @param {Point} initialPosition
 * @returns {undefined}
 */
InputManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
InputManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}

// </editor-fold>

// <editor-fold desc="Pointer">
/**
 * 
 * @param {Number} id
 * @param {Point} initialPosition
 * @returns {Pointer}
 */
function Pointer(id, initialPosition) {
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
}

/**
 * 
 * @param {Point} position
 * @returns {undefined}
 */
Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

/**
 * 
 * @param {Point} position
 * @returns {Point}
 */
Pointer.prototype.getPosition = function(position) {
    return this.position.clone();
}

/**
 * 
 * @returns {Boolean}
 */
Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

/**
 * 
 * @returns {undefined}
 */
Pointer.prototype.activate = function() {
    this.isActive = true;
}

/**
 * 
 * @returns {undefined}
 */
Pointer.prototype.deactivate = function() {
    this.isActive = false;
}

// </editor-fold>
