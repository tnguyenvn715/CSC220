// <editor-fold desc="Point">
/**
 * Represents a 2D point
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @returns {Point}
 */
function Point(x, y)
{
    /**
     * x-coordinate
     * @private
     * @type {Number}
     */
    this.x = null;
    
    /**
     * y-coordinate
     * @private
     * @type {number}
     */
    this.y = null;
    
    this.setX(x);
    this.setY(y);
}

/**
 * Returns the point's x-coordinate
 * @returns {Number}
 */
Point.prototype.getX = function() {
    return this.x;
}

/**
 * Returns the point's y-coordinate
 * @returns {Number}
 */
Point.prototype.getY = function() {
    return this.y;
}

/**
 * Sets the point's x-coordinate
 * @param {Number} x
 * @returns {undefined}
 */
Point.prototype.setX = function(x) {
    this.x = x;
}

/**
 * Sets the point's y-coordinate
 * @param {Number} y
 * @returns {undefined}
 */
Point.prototype.setY = function(y) {
    this.y = y;
}

/**
 * Creates a copy of the point
 * @returns {Point}
 */
Point.prototype.clone = function() {
    return new Point(this.x, this.y);
}

/**
 * Returns a point that is this point - p
 * @param {Point} p
 * @returns {Point}
 */
Point.prototype.subtract = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
}

/**
 * Returns a point that is the sum of this point and p
 * @param {Point} p
 * @returns {Point}
 */
Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
}

/**
 * Returns a string represenation of the point
 * @returns {String}
 */
Point.prototype.toString = function() {
    return "(" + (Math.round(this.getX() * 1000) / 1000) + ", " + 
            (Math.round(this.getY() * 1000) / 1000) + ")";
}

/**
 * Returns the length of a point's vector
 * @returns {Number}
 */
Point.prototype.getLength = function() {
    return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
}

/**
 * Normalizes the point's vector
 * @returns {undefined}
 */
Point.prototype.normalize = function() {
    var length = this.getLength();
    this.divideBy(length);
}

/**
 * Divides the point's vector by s
 * @param {Number} s
 * @returns {undefined}
 */
Point.prototype.divideBy = function(s) {
    this.x /= s;
    this.y /= s;
}

/**
 * Calculates the dot-product of the point's vector
 * @param {type} p
 * @returns {Number}
 */
Point.prototype.dotProduct = function(p) {
    return this.getX() * p.getX() + this.getY() * p.getY();
}
// </editor-fold> 

function GameLoop() {
}

GameLoop.Settings = {
    Input : {
        MOUSE_ID : "MOUSE"
    }
}

/**
 * Internal method for graphics initialization
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.initializeGraphics = function() {
    /**
     * @private
     * @type {CanvasContext2D}
     */
    this.g = this.canvas.getContext("2d");
    this.canvas.width = 600;
    this.canvas.height = 400;
}

/**
 * Internal method for input initialization
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.initializeInput = function() {
    this.canvas.associatedGameLoop = this;
    this.canvas.onmouseenter = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseEnter(localCoordinate);
    }
    this.canvas.onmousemove = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseMove(localCoordinate);
    }
    this.canvas.onmousedown = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseDown(localCoordinate);
    }
    this.canvas.onmouseup = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseUp(localCoordinate);
    }
    this.canvas.onmouseleave = function(e) {
        e.preventDefault();
        var localCoordinate = 
                this.associatedGameLoop.getLocalCanvasCoordinates(e);
        this.associatedGameLoop.onMouseLeave(localCoordinate);
    }
    this.canvas.ontouchstart = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchStart(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchmove = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchMove(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchend = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchEnd(t.identifier, localCoordinate);
        }
    }
    this.canvas.ontouchcancel = function(e) {
        e.preventDefault();
        for (var i = 0; i < e.changedTouches.length; i++) 
        {
           var t = e.changedTouches[i];
           var localCoordinate = 
                   this.associatedGameLoop
                   .getLocalCanvasCoordinates(t.clientX, t.clientY);
           this.associatedGameLoop.onTouchEnd(t.identifier, localCoordinate);
        }
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
    this.lastFrameTime = null;
    var requestAnimationFrame = window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    var engine = this;
//    setInterval(function() {
//        engine.onTimerTick();
//    }, 10);
    this.requestFrame();
}

/**
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.requestFrame = function() {
    var engine = this;
    requestAnimationFrame(function() {
        engine.onTimerTick();
    });
}

/**
 * @private
 * @returns {undefined}
 */
GameLoop.prototype.onTimerTick = function() {
    this.requestFrame();
    var frameDuration = 10;
    var currentTime = new Date().getTime();
    if (this.lastFrameTime != null) {
        frameDuration = currentTime - this.lastFrameTime;
    }
    this.lastFrameTime = currentTime;
    this.update(frameDuration);
    this.clear(this.g);
    this.draw(this.g);
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
GameLoop.prototype.update = function(elapsedMilliseconds) {
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