// <editor-fold desc="PointerManager">
/**
 * Encapsulate a manager class that keep tracks of input events
 * @constructor
 */
function PointerManager(chart) {
    /**
     * List of pointers
     * @private
     * @type Array
     */
    this.pointers = { };
    
    /**
     * The chart being display
     * @private
     * @type Chart
     */
    this.chart = chart;
    
    /**
     * The x-offset of pointer
     * @private
     * @type Number
     */
    this.offsetX;
    
    /**
     * The y-offset of pointer
     * @private
     * @type Number
     */
    this.offsetY;
}

/**
 * Add a new pointer when new touch event is recognized
 * @param {Number} id The id of the pointer 
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
    if (id != GameLoop.Settings.Input.MOUSE_ID) {
        if (this.hasPointer(GameLoop.Settings.Input.MOUSE_ID)) {
            this.onPointerLeave(GameLoop.Settings.Input.MOUSE_ID, 
                new Point(0, 0));
        }
    }
}
/**
 * Move the pointer and trigger hit test on chart
 * @param {Number} id The id of the pointer 
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.onPointerMove = function(id, position) {
    if (this.hasPointer(id)) {
        this.movePointer(id, position);
    }  
    var elements = this.chart.getChartElements();
    for (var i = 0; i < elements.length; i++) { //credit: Professor Block
        this.chart.elements[i].isHit(position);
    }
}

/**
 * Activate the pointer on the canvas
 * @param {Number} id The id of the pointer 
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

/**
 * Deactivate the pointer on the canvas
 * @param {Number} id The id of the pointer 
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.onPointerDeactivate = function(id, position) {
    if (this.hasPointer(id)) {
        this.pointers[id].deactivate();
    }
}

/**
 * Remove the pointer info when it leaves canvas
 * @param {Number} id The id of the pointer 
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.onPointerLeave = function(id, position) {
    if (this.hasPointer(id)) {
        this.removePointer(id, position);
    }
}

/**
 * Check if array has a pointer
 * @param {Number} id The id of the pointer
 * @returns {Boolean} Signify whether pointer manager has pointer
 */
PointerManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

/**
 * Add a new pointer to the array of pointers
 * @param {Number} id The id of the pointer
 * @param {Point} initialPosition The initial position of the new pointer
 */
PointerManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

/**
 * Move the pointer to new position
 * @param {Number} id The id of the pointer
 * @param {Point} position The new position the pointer will move to
 */
PointerManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

/**
 * Remove the pointer from array of pointers
 * @param {Number} id The id of the pointer
 * @param {Point} position The position of the pointer
 */
PointerManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}
// </editor-fold>

// <editor-fold desc="Pointer">
/**
 * Represents an input for either mouse or touch
 * @constructor
 */
function Pointer(id, initialPosition) {
    /**
     * The ID of pointer input
     * @private
     * @type Number
     */
    this.id = id;
    
    /**
     * The position of pointer input
     * @private
     * @type Point
     */
    this.position = initialPosition.clone();
    /**
     * The boolean showing whether pointer is active
     * @private
     * @type Boolean
     */
    this.isActive = false;
}

/**
 * Move the pointer to specified position
 * @param {Point} position The new position the pointer will move to
 */
Pointer.prototype.move = function(position) {
    this.position.setX(position.getX());
    this.position.setY(position.getY());
}

/**
 * Get the position of the pointer
 * @returns {Point} The position of the pointer
 */
Pointer.prototype.getPosition = function( ) {
    return this.position.clone();
}

/**
 * Returns boolean of whether pointer is active
 * @returns {Boolean} isActive The boolean of whether pointer is active
 */
Pointer.prototype.getIsActive = function() {
    return this.isActive;
}

/**
 * Activate the pointer
 */
Pointer.prototype.activate = function() {
    this.isActive = true;
}

/**
 * Deactivate the poiner
 */
Pointer.prototype.deactivate = function() {
    this.isActive = false;
}
// </editor-fold>