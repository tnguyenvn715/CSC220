/**
 * Encapulates properties of series of data
 * @constructor
 * @param {String} name
 * @param {String} textFile
 * @param {Number} type
 * @param {Number} year
 * @returns {DataSet}
 */
function DataSet(name, textFile, type, year) {
    /**
     * 
     */
    this.name = name;
    /**
     * 
     */
    this.data = [];
    /**
     * 
     */
    this.type = type;
    /**
     * 
     */
    this.textFile = textFile;
    this.initializeData(year);
}

/**
 * 
 * @param {Number} startYear
 * @returns {undefined}
 */
DataSet.prototype.initializeData = function(startYear) {
    this.readFileToArray(this.textFile, this.type, startYear);
}

/**
 * 
 * @param {String} file
 * @param {Number} type
 * @param {Number} startYear
 * @returns {undefined}
 */
DataSet.prototype.readFileToArray = function(file, type, startYear) {
    // type = 0 : temperature anomaly to present
    // type = 1 : future projection of temperature 
    // type = 2 : ice data to present
    // type = 3 : future projection of ice data
    if (type == 0){
        var lines = [];
        lines = file.split(/\r\n|\n/);
        for(var i = 0; i < lines.length; i++){
            if(i > 6 ) {
                
                var year = lines[i].split(",")[0]; //get year
                if (parseInt(year) < parseInt(startYear)){
                    continue;
                }
                var value = lines[i].split(",")[1]; // get value
                this.addDataPoint(year, value);
            }
        }
    }
}

DataSet.prototype.getData = function() {
    return this.data;
}

/**
 * 
 * @param {Number} year
 * @returns {DataPoint}
 */
DataSet.prototype.getDataPointFromYear = function(year) {
    for (var i = 0; i < this.data.length; i++){
        if(parseInt(this.data[i].getLabel()) === parseInt(year)){
            return this.data[i];
        }
    }

}

/**
 * 
 * @param {Number} year
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
 * 
 * @param {Array} data
 * @returns {undefined}
 */
DataSet.prototype.setData = function(data) {
    this.data = data;
}

/**
 * 
 * @returns {String}
 */
DataSet.prototype.getName = function() {
    return this.name;
}

/**
 * 
 * @param {String} name
 * @returns {undefined}
 */
DataSet.prototype.setName = function(name) {
    this.name = name;
}

/**
 * 
 * @param {String} label
 * @param {Number} value
 * @returns {undefined}
 */
DataSet.prototype.addDataPoint = function(label, value) {
    this.data.push(new DataPoint(label, value));
}

