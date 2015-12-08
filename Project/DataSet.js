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
                this.addDataPoint(year, value);
            }
        }
    }
}

DataSet.prototype.getData = function() {
    return this.data;
}

DataSet.prototype.getDataPointFromYear = function(year) {
    //var datapoint;
    for (var i = 0; i < this.data.length; i++){
        if(parseInt(this.data[i].getLabel()) === parseInt(year)){
            console.log(year);
            return this.data[i];
        }
    }

}


DataSet.prototype.getIndex = function(year) {
    //var datapoint;
    var data = this.getData();
    //console.info(data[2].getLabel());
    for (var i = 0; i < data.length; i++){
        if(parseInt(data[i].getLabel()) === parseInt(year)){
            return i;
        }
    }

}

DataSet.prototype.setData = function(data) {
    this.data = data;
}
DataSet.prototype.getName = function() {
    return this.name;
}
DataSet.prototype.setName = function(name) {
    this.name = name;
}
DataSet.prototype.addDataPoint = function(label, value) {
    this.data.push(new DataPoint(label, value));
}

