// <editor-fold desc="PointerManager">
/**
 * @constructor
 * @param {Chart} chart
 * @returns {PointerManager}
 */
function PointerManager(chart) {
    /**
     * List of pointers
     */
    this.pointers = { };
    /**
     * The chart being display
     * @type Chart
     */
    this.chart = chart;
    /**
     * The x-offset of pointer
     * @type Number
     */
    this.offsetX;
    /**
     * The y-offset of pointer
     * @type Number
     */
    this.offsetY;
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerEnter = function(id, position) {
    this.addPointer(id, position);
    //this.chart.updateHoveredElement(position);
    if (id != GameLoop.Settings.Input.MOUSE_ID) {
        if (this.hasPointer(GameLoop.Settings.Input.MOUSE_ID)) {
            this.onPointerLeave(GameLoop.Settings.Input.MOUSE_ID, 
                new Point(0, 0));
        }
    }
}
/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
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
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerActivate = function(id, position) {
    this.pointers[id].activate();
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerDeactivate = function(id, position) {
    if (this.hasPointer(id)) {
        this.pointers[id].deactivate();
    }
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.onPointerLeave = function(id, position) {
    if (this.hasPointer(id)) {
        this.removePointer(id, position);
    }
}

/**
 * 
 * @param {Number} id
 * @returns {Boolean}
 */
PointerManager.prototype.hasPointer = function(id) {
    return typeof this.pointers[id] != 'undefined';
}

/**
 * 
 * @param {Number} id
 * @param {Point} initialPosition
 * @returns {undefined}
 */
PointerManager.prototype.addPointer = function(id, initialPosition) {
    this.pointers[id] = new Pointer(id, initialPosition);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.movePointer = function(id, position) {
    this.pointers[id].move(position);
}

/**
 * 
 * @param {Number} id
 * @param {Point} position
 * @returns {undefined}
 */
PointerManager.prototype.removePointer = function(id, position) {
    delete this.pointers[id];
}
// </editor-fold>

// <editor-fold desc="Pointer">
/**
 * Represents a pointer for either mouse or touch
 * @constructor
 */
function Pointer(id, initialPosition) {
    /**
     * @type Number
     */
    this.id = id;
    /**
     * @type Point
     */
    this.position = initialPosition.clone();
    /**
     * @type Boolean
     */
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