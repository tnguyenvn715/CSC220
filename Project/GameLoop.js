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

/**
 * Returns the location in canvas coordinates.
 * @param {MouseEvent|Number} Either the mouse event, or the screen x-coordinate
 * @param {type} Either not supplied, or the screen y-coordinate
 * @returns {{x: Number, y: Number}}
 */
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

/**
 * Fired when the mouse enters the canvas
 * @private
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseEnter = function(position) {
    // override
    this.onPointerEnter(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * Fired when the mouse button is pressed
 * @private
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseDown = function(position) {
    // override
    this.onPointerActivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * Fired when the mouse button is released
 * @private
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseUp = function(position) {
    // override
    this.onPointerDeactivate(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * Fired when the mouse moves around the canvas
 * @private
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseMove = function(position) {
    // override
    this.onPointerMove(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y));
}

/**
 * Fired when the mouse leaves the canvas
 * @private
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onMouseLeave = function(position) {
    // override
    this.onPointerLeave(
            GameLoop.Settings.Input.MOUSE_ID, 
            new Point(position.x, position.y))
}

/**
 * Fired when a finger touches the display
 * @private
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchStart = function(id, position) {
    var point = new Point(position.x, position.y);
    this.onPointerEnter(id, point);
    this.onPointerActivate(id, point);
}


/**
 * Fired when a finger moves
 * @private
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchMove = function(id, position) {
    this.onPointerMove(id, new Point(position.x, position.y));
}

/**
 * Fired when a finger is removed from the display
 * @private
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchEnd = function(id, position) {
    this.onPointerDeactivate(id, position);
    this.onPointerLeave(id, new Point(position.x, position.y));
}

/**
 * Fired when a finger touch is cancelled by the system
 * @private
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onTouchCancelled = function(id, position) {
    this.onPointerLeave(id, new Point(position.x, position.y));
}

/**
 * Fired when a pointer enters the canvas
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerEnter = function(id, position) {
    
}

/**
 * Fired when a pointer moves
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerMove = function(id, position) {
    
}

/**
 * Fired when a pointer activates
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerActivate = function(id, position) {
    
}

/**
 * Fired when a pointer deactivates
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerDeactivate = function(id, position) {
    
}

/**
 * Fired when a pointer leaves the canvas
 * @param {String} id
 * @param {Point} position
 * @returns {undefined}
 */
GameLoop.prototype.onPointerLeave = function(id, position) {
    
}

/**
 * Internal method that initializes the frame timer
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.initializeTimer = function() {
    /**
     * Stores the last time a frame was triggered
     * @private
     */
    /*this.lastFrameTime = null;
    var requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    var engine = this;
//    setInterval(function() {
//        engine.onTimerTick();
//    }, 10);
    this.requestFrame();*/
    
    var engine = this;
    setInterval(function() {
        engine.onTimerTick();
    }, 500);
}

/**
 * @private
 * @returns {undefined}
 */
/*GameLoop.prototype.requestFrame = function() {
    var engine = this;
    requestAnimationFrame(function() {
        engine.onTimerTick();
    });
}*/

/**
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.onTimerTick = function() {
    /*this.requestFrame();
    var frameDuration = 10;
    var currentTime = new Date().getTime();
    if (this.lastFrameTime != null) {
        frameDuration = (currentTime - this.lastFrameTime) ;
    }
    this.lastFrameTime = currentTime;
    this.update(frameDuration);
    this.clear(this.g);
    this.draw(this.g);*/
    
    this.clear(this.g);
    this.draw(this.g);
    this.update();
    
}

/**
 * Logic to clear the canvas before every frame
 * @param {CanvasContext2D} g
 * @returns {undefined}
 */
GameLoop.prototype.clear = function(g) {
    g.fillStyle = "white";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 * Call containing update logic, fired before the draw call
 * @param {Number} elapsed time in milliseconds
 * @returns {undefined}
 */
GameLoop.prototype.update = function() {
    // override
}

/**
 * Call containing drawing logic, fired on every frame
 * @param {CanvasContext2D} g
 * @returns {undefined}
 */
GameLoop.prototype.draw = function(g) {
    // override
}

/**
 * Initializes the game loop
 * @param {HTMLCanvasElement} canvas that hosts the game loop (input and output)
 * @returns {undefined}
 */
GameLoop.prototype.initialize = function(canvas) {
    /**
     * @private
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas;
    this.isInputDebugModeEnabled = false;
    this.initializeGraphics();
    this.initializeInput();
    this.initializeTimer();
}