// <editor-fold desc="DataPoint">

/**
 * Represents a datapoint in series of data
 * @constructor
 * @param {String} label
 * @param {Number} value
 * @returns {DataPoint}
 */
function DataPoint(label, value) {
    /**
     * label of data
     * @private
     * @type {String}
     */
    this.label = label;
    
    /**
     * value of data
     * @private
     * @type {Number}
     */
    this.value = value;
}

/**
 * Return the data point's label
 * @returns {String}
 */
DataPoint.prototype.getLabel = function() {
    return this.label;
}

/**
 * Return the data point's value
 * @returns {Number}
 */
DataPoint.prototype.getValue = function() {
    return this.value;
}

/**
 * Set the data point's label
 * @param {String} label
 * @returns {undefined}
 */
DataPoint.prototype.setLabel = function(label) {
    this.label = label;
}

/**
 * Set the data point's value
 * @param {Number} value
 * @returns {undefined}
 */
DataPoint.prototype.setValue = function(value) {
    this.value = value;
}
// </editor-fold>
