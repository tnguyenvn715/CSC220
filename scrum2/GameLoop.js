// <editor-fold desc="Point">
function Point(x, y) {
    this.setX(x);
    this.setY(y);
}

Point.prototype.getX = function() {
    return this.x;
}

Point.prototype.getY = function() {
    return this.y;
}

Point.prototype.setX = function(x) {
    this.x = x;
}

Point.prototype.setY = function(y) {
    this.y = y;
}

Point.prototype.clone = function() {
    return new Point(this.x, this.y);
}

Point.prototype.substract = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
}

Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
}
// </editor-fold> 

function GameLoop() {
}

GameLoop.Settings = {
    Input : {
        MOUSE_ID : "MOUSE"
    }
}

GameLoop.prototype.initializeGraphics = function() {
    this.g = this.canvas.getContext("2d");
    this.canvas.width = 900;
    this.canvas.height = 900;
}
GameLoop.prototype.initializeInput = function() {
    this.canvas.associatedGameEngine = this;
    this.canvas.onmousemove = function(e) {
        var localCoordinate = 
                this.associatedGameEngine.getLocalCanvasCoordinates(e);
        this.associatedGameEngine.onMouseMove(localCoordinate);
    }
    this.canvas.onclick = function(e) {
        var localCoordinate = 
                this.associatedGameEngine.getLocalCanvasCoordinates(e);
        this.associatedGameEngine.onMouseClick(localCoordinate);
    }
}
GameLoop.prototype.getLocalCanvasCoordinates = function(arg1, arg2) {
    var clientX = 0;
    var clientY = 0;
    if (typeof arg2 == 'undefined') {
        var e = arg1;
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = arg1;
        clientY = arg2;
    }
    var offset = this.canvas.getBoundingClientRect();
    var positionOnCanvas = {
        x : clientX - offset.left,
        y : clientY - offset.top
    }
    return positionOnCanvas;
}

GameLoop.prototype.onMouseEnter = function(position) {
    // override
    this.onPointerEnter(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

GameLoop.prototype.onMouseDown = function(position) {
    // override
    this.onPointerActivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

GameLoop.prototype.onMouseUp = function(position) {
    // override
    this.onPointerDeactivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

GameLoop.prototype.onMouseMove = function(position) {
    // override
    this.onPointerMove(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

GameLoop.prototype.onMouseLeave = function(position) {
    // override
    this.onPointerLeave(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y))
}

GameLoop.prototype.onTouchStart = function(id, position) {
    var point = new Point(position.x, position.y);
    this.onPointerEnter(id, point);
    this.onPointerActivate(id, point);
}

GameLoop.prototype.onTouchMove = function(id, position) {
    this.onPointerMove(id, new Point(position.x, position.y));
}

GameLoop.prototype.onTouchEnd = function(id, position) {
    this.onPointerDeactivate(id, position);
    this.onPointerLeave(id, new Point(position.x, position.y));
}

GameLoop.prototype.onTouchCancelled = function(id, position) {
    this.onPointerLeave(id, new Point(position.x, position.y));
}

GameLoop.prototype.onPointerEnter = function(id, position) {
    
}

GameLoop.prototype.onPointerMove = function(id, position) {
    
}

GameLoop.prototype.onPointerActivate = function(id, position) {
    
}

GameLoop.prototype.onPointerDeactivate = function(id, position) {
    
}

GameLoop.prototype.onPointerLeave = function(id, position) {
    
}

GameLoop.prototype.initializeTimer = function() {
    var engine = this;
    setInterval(function() {
        engine.onTimerTick();
    }, 500);
}

GameLoop.prototype.onTimerTick = function() {
    this.update();
    this.clear(this.g);
    this.draw(this.g);
}

GameLoop.prototype.clear = function(g) {
    g.fillStyle = "white";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

GameLoop.prototype.update = function(g) {
    // override
}

GameLoop.prototype.draw = function(g) {
    // override
}

GameLoop.prototype.initialize = function(canvas) {
    this.canvas = canvas;
    this.initializeGraphics();
    this.initializeInput();
    this.initializeTimer();
}