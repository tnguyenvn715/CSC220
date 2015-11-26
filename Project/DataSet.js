/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DataSet(name, textFile, type, year) {
    this.name = name;
    this.data = [];
    this.type = type;
    this.textFile = textFile;
    this.initializeData(year);
}
DataSet.prototype.initializeData = function(startYear) {
    this.readFileToArray(this.textFile, this.type, startYear);
}
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
                //console.log(typeof(year));
                this.addDataPoint(year, value);
            }
        }
    }
}


DataSet.prototype.addDataPoint = function(label, value) {
    this.data.push(new DataPoint(label, value));
}

DataSet.prototype.getName = function() {
    return this.name;
}

DataSet.prototype.getData = function() {
    return this.data;
}

DataSet.prototype.addDataPoint = function(label, value) {
    this.data.push(new DataPoint(label, value));
}

DataSet.prototype.getName = function() {
    return this.name;
}

function DataPoint(label, value) {
    this.label = label;
    this.value = value;
}

DataPoint.prototype.getLabel = function() {
    return this.label;
}

DataPoint.prototype.getValue = function() {
    return this.value;
}