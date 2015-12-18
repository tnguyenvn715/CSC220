// <editor-fold desc="DataPoint">
/**
 * Encapulates properties of series of data points
 * @constructor
 */
function DataSet(type, textFile, startYear) {
    /**
     * the type of data
     * @type String
     */
    this.type = type;
    /**
     * the data array
     * @type array
     */
    this.data = [];
    /**
     * the string format of data file
     * @type String
     */
    this.textFile = textFile;
    /**
     * the starting year
     * @type Number
     */
    this.startYear = startYear;
    this.initializeData();
}

/**
 * Initialize the data set
 * @param {Number} startYear The first year for the dataset
 */
DataSet.prototype.initializeData = function() {
    this.readFileToArray();
}

/**
 * Convert the file string into an array of dataPoints
 * @param {Number} type The type of data 
 * @param {String} file The string of data
 * @param {Number} startYear The first year
 */
DataSet.prototype.readFileToArray = function() {
    // type = curTemp : temperature anomaly to present
    // type = ice : future projection of temperature 
    // type = 2 : ice data to present
    // type = 3 : future projection of ice data
    var numSkipLines = 0;
    if (this.type == "curren_temp"){
        numSkipLines = 6;
    }
    else if (this.type == "sea_ice")
    {
        numSkipLines = 3;
        this.startYear = 1979;

    }
    var lines = [];
    lines = this.textFile.split(/\r\n|\n/);
    for(var i = 0; i < lines.length; i++){
        if(i > numSkipLines ) {
            var year = lines[i].split(",")[0]; //get year
            if (parseInt(year) < parseInt(this.startYear)){
                continue;
            }
            var value = lines[i].split(",")[1]; // get value
            this.addDataPoint(year, value);
                
        }
    }
}

/**
 * Get the data array 
 * @returns {Array}
 */
DataSet.prototype.getDataList = function() {
    return this.data;
}

/**
 * Retrieve the data point with year parameter
 * @param {Number} year The requested year
 * @returns {DataPoint}
 */
DataSet.prototype.getDataPointFromYear = function(year) {
    for (var i = 0; i < this.data.length; i++){
        if(this.data[i].getLabel() == year){
            return this.data[i];    
        }
    }

}

/**
 * Retrieve the index of the data point with year parameter
 * @param {Number} year The requested year
 * @returns {Number}
 */
DataSet.prototype.getIndex = function(year) {
    var data = this.getData();
    for (var i = 0; i < data.length; i++){
        if(parseInt(data[i].getLabel()) === parseInt(year)){
            return i;
        }
    }
}

/**
 * Set the data array to new array
 * @param {Array} data
 */
DataSet.prototype.setData = function(data) {
    this.data = data;
}

/**
 * Get the type of the data set
 * @returns {String}
 */
DataSet.prototype.getType = function() {
    return this.type;
}

/**
 * Set the type of the data set
 * @param {String} type The new type for the data set
 */
DataSet.prototype.setName = function(type) {
    this.type = type;
}

/**
 * Add a data point to the set
 * @param {String} label The label for data point
 * @param {Number} value The value for data point
 */
DataSet.prototype.addDataPoint = function(label, value) {
    this.data.push(new DataPoint(label, value));
}
// </editor-fold>

