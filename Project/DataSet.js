/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function DataSet(name){
    this.name = name;
    this.data = [];
}
DataSet.prototype.convertToArray = function(allText){
    var allTextLines = [];
    var text = "";
    allTextLines = allText.split(/\r\n|\n/);
    for(var i = 0; i < allTextLines.length; i++){
        //text  = text + allTextLines[i];
        //document.getElementById("data").innerHTML = text;
        console.log(allTextLines[i]);
        if(i > 0) {
            var year = allTextLines[i].split(" ")[0]; //get year
            var value = allTextLines[i].split(" ")[3]; // get value
            this.addDataPoint(year, value);
        }
    }
}

DataSet.prototype.addDataPoint = function(label, value)
{
    this.data.push(new DataPoint(label, value));
}

DataSet.prototype.getName = function()
{
    return this.name;
}


DataSet.prototype.getData = function()
{
    return this.data;
}

DataSet.prototype.addDataPoint = function(label, value)
{
    this.data.push(new DataPoint(label, value));
}

DataSet.prototype.getName = function()
{
    return this.name;
}

function DataPoint(label, value)
{
    this.label = label;
    this.value = value;
}

DataPoint.prototype.getLabel = function()
{
    return this.label;
}

DataPoint.prototype.getValue = function()
{
    return this.value;
}

function initializeData()
{
    //
}

var data = [];
initializeData();
