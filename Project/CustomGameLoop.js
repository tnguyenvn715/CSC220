// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);   
    this.inputManager = new InputManager();
    
    this.g = this.canvas.getContext("2d"); 
    var input = new inputPrompter(1901, 2015);
    this.inputYear = input.year;
    this.timer = new Timer(30, 410, this.g, 805, this.inputYear , '2014');
    this.data = new Resource("temperature_fig-2.csv");
    this.data.beginLoad(this, this.onDataLoaded);
    this.chart = new BarChart(this.canvas);
    
    
    
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

var currentIndex = 0
CustomGameLoop.prototype.draw = function(g) {
    GameLoop.prototype.draw.call(this, g);
    this.timer.draw(g);
    this.chart.draw(g); 
}

 
CustomGameLoop.prototype.update = function() {
    GameLoop.prototype.update.call();
    if (currentIndex >= (2014 - this.inputYear)){
        
        GameLoop.prototype.clear.call(this, this.g);
        currentIndex = 0;
    }
    else{
        this.timer.moveSlider();
        
        var textContent = this.data.getLoadedString();
        var dataSet = new DataSet("CurTempData", textContent, 0, this.inputYear);
        
        var value = dataSet.getData()[currentIndex].getValue();
        var label = dataSet.getData()[currentIndex].getLabel();
        var height = value * 50;
        var ypos = 200- height;
        var width = (this.timer.getLength()/ (2014 - this.inputYear)) - (this.timer.getLength()/ (2014 - this.inputYear))/2;
        var xpos = this.timer.getX();
        var element = this.chart.initializeChartElement
                    (label, value, xpos, ypos, width, height);
        this.chart.elements.push(element);
        currentIndex += 1;
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
