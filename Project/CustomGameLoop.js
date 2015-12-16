// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);   
    this.inputManager = new InputManager();
    this.elementManager = new ElementManager();
    this.charts = [];
    this.charts.push(new BarChart(this.canvas));
    var input = new inputPrompter(1901, 2014);
    var startyear = input.getInputYear();
    var initialPos = new Point(70, 410);
    this.timer = new Timer(new Point(70, 410), 805, 5, startyear , 2014); //INTERESTING, WHEN YOU USE INITITAL POS IT MOVES ALONG
    this.timer.setInitialPosition(initialPos);
    this.data = new Resource("temperature_fig-2.csv");
    this.data.beginLoad(this, this.onDataLoaded);   
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
    this.charts[0].draw(g); 
    this.timer.draw(g);    
}

CustomGameLoop.prototype.clear = function(g, canvas) {
    GameLoop.prototype.clear.call(this, g);
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);    
}

CustomGameLoop.prototype.update = function() {
    GameLoop.prototype.update.call(this);
    if (parseInt(this.timer.getLabel()) >= 2014){
        this.charts[0].clearChart(this.g);
        this.timer.resetSlider();
    }
    else{
        var span = this.timer.getEndYear()- this.timer.getStartYear();
        var dataText = this.data.getLoadedString();
        var currentData = new DataSet("CurTempData", dataText, 0, 
                            this.timer.getStartYear());        
        this.timer.moveSlider();   
        var currentyear = this.timer.getLabel();
        var point = currentData.getDataPointFromYear(currentyear);
        this.charts[0].addElement(point, this.timer, span);   
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
