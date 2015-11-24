/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
       
function Chart(canvas) {
    if (typeof canvas !== "undefined") { //credit: Professor Block
        this.canvas = canvas;
        this.elements = [];
        this.g = canvas.getContext("2d");
    }
}  
Chart.prototype.initializeChart = function(dataSeries) {
    for (var i = 0; i < dataSeries.getData().length; i++) {
        var value = dataSeries.getData()[i].getValue();
        var label = dataSeries.getData()[i].getLabel();
        var height = value * 50;
        var xpos = (i+1) * 7 + 30;
        var ypos = 200- height;
        
        //credit: Professor Block
        var element = this.initializeChartElement
                    (label, value, xpos, ypos, 5, height);
        this.elements.push(element);            
    }
}
Chart.prototype.draw = function(g) {
    this.drawYAxis(30, 0, 400, 50);
    this.drawXAxis(200, 30, 835);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }
}

Chart.prototype.drawYAxis = function(xpos, ymin, ymax, yincrement) {
    this.g.beginPath();
    this.g.moveTo(xpos,ymin);
    this.g.lineTo(xpos,ymax);
    this.g.stroke();

    for(var i = ymax; i >= ymin; i --) {
        if (i%yincrement === 0){     
            this.g.beginPath();
            this.g.moveTo(25,i);
            this.g.lineTo(30,i);
            this.g.stroke();
        }   
    }
    
}
Chart.prototype.drawXAxis = function(ypos, xmin, xmax) {
    this.g.beginPath();
    this.g.moveTo(xmin,ypos);
    this.g.lineTo(xmax,ypos);
    this.g.stroke();
}
//ChartElement Constructor
function ChartElement(label, value, x, y, width, height) {
    this.label = label;
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height= height; 
}
ChartElement.prototype.drawLabel= function(g, index) {
    g.fillStyle =  "black"; 
    var textWidth = g.measureText(this.label).width; //credit: Professor Block
    var xpos = index * 60 + 25 - textWidth/2;
    g.fillText(this.label, xpos, 310);
}
ChartElement.prototype.drawElement = function(g, index) {
    //override
}   