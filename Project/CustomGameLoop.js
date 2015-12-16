// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas, timerManager) {
    GameLoop.prototype.initialize.call(this, canvas);   
    this.inputManager = new InputManager();
    
    this.timerManager = timerManager;
    this.data = new Resource("temperature_fig-2.csv");
    this.data.beginLoad(this, this.onDataLoaded);  
    this.chart = new BarChart(this.canvas);
   
}

CustomGameLoop.prototype.onDataLoaded = function(resource) {
    var test = 1;
}

CustomGameLoop.prototype.setCanvasSize = function(width, height) {
   this.canvas.width = width;
   this.canvas.height = height;
}
CustomGameLoop.prototype.onDataLoaded = function(resource) {
    var test = 1;
}

CustomGameLoop.prototype.onPointerEnter = function(id, position) {
    this.inputManager.onPointerEnter(id, position);
}

CustomGameLoop.prototype.onPointerMove = function(id, position) {
    this.inputManager.onPointerMove(id, position);
}

CustomGameLoop.prototype.onPointerActivate = function(id, position) {
    this.inputManager.onPointerActivate(id, position);
}

CustomGameLoop.prototype.onPointerDeactivate = function(id, position) {
    this.inputManager.onPointerDeactivate(id, position);
}

CustomGameLoop.prototype.onPointerLeave = function(id, position) {
    this.inputManager.onPointerLeave(id, position);
}

CustomGameLoop.prototype.draw = function(g) {
    GameLoop.prototype.draw.call(this, g);    
    this.chart.draw(this.g); 
    this.timerManager.draw(this.g); 
}
/**
 * 
 * @param {type} g
 * @param {type} canvas
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
function InputManager() {
    this.pointers = { };
}

InputManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
}

InputManager.prototype.onPointerMove = function(id, position) {
    this.movePointer(id, position);
}

InputManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

InputManager.prototype.onPointerDeactivate = function(id, position) {
    this.pointers[id].deactivate();
}

InputManager.prototype.onPointerLeave = function(id, position) {
    this.removePointer(id, position);
}

InputManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

InputManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

InputManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

InputManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}

// </editor-fold>

// <editor-fold desc="Pointer">
function Pointer(id, initialPosition) {
    this.id = id;
    this.position = initialPosition.clone();
    this.isActive = false;
}

Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

Pointer.prototype.getPosition = function(position) {
    return this.position.clone();
}

Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

Pointer.prototype.activate = function() {
    this.isActive = true;
}

Pointer.prototype.deactivate = function() {
    this.isActive = false;
}

// </editor-fold>
