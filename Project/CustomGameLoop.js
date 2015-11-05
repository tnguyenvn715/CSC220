// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    this.inputManager = new InputManager();
    this.g = this.canvas.getContext("2d");
    this.input = new inputBox();
    this.timer = new Timer(10, 20, this.g, 600, this.input.year, '2015' );
    this.year = this.input.year;
    this.data = new Resource("N_01_area.txt");
    this.data.beginLoad(this, this.onDataLoaded);
    
    
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
    var test = this.data.getLoadedString();
    var dataSet = new DataSet("Ice Data"); 
    dataSet.convertToArray(test);
    this.moveSlider();
    this.timer.draw(this.g);
    if (this.data.getIsLoadingStatusAvailable() &&
            !this.data.getIsLoaded()) {
        var barWidth = 300;
        var barHeight = 50;
        var progressWidth = this.data.getLoadedPercentage() / 100 * barWidth;
        g.strokeStyle = "black";
        g.fillStyle = "lightgreen";
        g.beginPath();
        g.rect((this.canvas.width - barWidth) / 2, 
            (this.canvas.height - barHeight) / 2, 
            progressWidth, barHeight);
        g.fill();
        g.beginPath();
        g.rect((this.canvas.width - barWidth) / 2, 
            (this.canvas.height - barHeight) / 2, 
            barWidth, barHeight);
        g.stroke();
        g.fillStyle = "black";
        g.font = "20px Arial";
        var size = g.measureText(this.data.getLoadedPercentage().toString());
        g.fillText(this.data.getLoadedPercentage() + "%", 
            (this.canvas.width - size.width) / 2, 
            (this.canvas.height + 20) / 2);
        

    }
    
    
   
    //document.getElementById("data").innerHTML = test;
}

CustomGameLoop.prototype.moveSlider = function(){
    var increment = this.timer.getScaleIncrement();
    
    if (parseInt(this.timer.label) >= 2015){
        //do nothing
        return null;
    }
    else{
        var nextYear = parseInt(this.timer.label) + 1;
        var newx = this.timer.x + increment; 
        this.timer.updatePosition(newx, this.timer.y);
        this.timer.updateYearLabel(nextYear);
        document.getElementById("demo").innerHTML = this.timer.label ;
        
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

InputManager.prototype.drawPointerDebugOverlay = function(g) {
    for (var id in this.pointers) {
        this.pointers[id].drawDebugOverlay(g);
    }
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

Pointer.prototype.drawDebugOverlay = function(g) {
    g.strokeStyle = "black";
    g.fillStyle = "black";
    g.font = "10px Arial"
    g.lineWidth = this.getIsActive() ? 3 : 1;
    g.globalAlpha = this.getIsActive() ? 1 : 0.5;
    var position = this.getPosition();
    g.beginPath();
    g.rect(position.getX() - 20, position.getY() - 20, 40, 40);
    g.stroke();
    g.fillText(this.id, position.getX() - 20, position.getY() - 20 - 3);
    g.globalAlpha = 1.0;
}

Pointer.prototype.activate = function() {
    this.isActive = true;
}

Pointer.prototype.deactivate = function() {
    this.isActive = false;
}
// </editor-fold>

function initialize() {
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(document.getElementById("canvas"));
    customGameLoop.setCanvasSize(640, 480);
    
}

window.onload = initialize;