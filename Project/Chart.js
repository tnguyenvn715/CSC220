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
        this.initializeInputs();
    }
}  
Chart.prototype.getMousePos = function(canvas, e) {
    //credit: Professor Block
    var offset = canvas.getBoundingClientRect();
    return {
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
    };
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

Chart.prototype.initializeInputs = function(){
    //credited to Professor Block
    this.canvas.forwardInputTo = this;
    this.canvas.onmousemove = function(e){
        this.forwardInputTo.onMouseMove(e);
    }
}

Chart.prototype.onMouseMove = function(e){
    var pos = this.getMousePos(this.canvas, e);
    for (var i = 0; i < this.elements.length; i++) { //credit: Professor Block
        this.elements[i].isHit(pos);
    }
    this.draw();
}
Chart.prototype.draw = function(g) {
    this.drawYAxis(30, 0, 400, 50);
    this.drawXAxis(200, 30, 835);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }
}
Chart.prototype.addElement= function(dataSet, currentIndex, timer){
    var value = dataSet.getData()[currentIndex].getValue();
    var label = dataSet.getData()[currentIndex].getLabel();
    var height = value * 50;
    var ypos = 200- height;
    var yearSpan = timer.getEndYear() - timer.getStartYear();
    var width = 5;
    var xpos = timer.getPosition().getX();
    var element = this.initializeChartElement
                    (label, value, xpos, ypos, width, height);
    this.elements.push(element);
    
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
    this.isHover = false;
    this.highlightColor = "#cf2435";
    this.normalColor= "#52bab3";
}
ChartElement.prototype.drawLabel= function(g, index){
    g.fillStyle =  "black"; 
    var textWidth = g.measureText(this.label).width; //credit: Professor Block
    var xpos = index * 60 + 25 - textWidth/2;
    g.fillText(this.label, xpos, 310);
}
ChartElement.prototype.drawElement = function(g){
    //g.fillStyle =  this.isHover ? "gray": "red"; 
    //g.font = "13px Calibri";
    //g.fillText(this.value, this.x, this.y - 10);
}

ChartElement.prototype.isHit = function(mousePos){
    if((mousePos.x > this.x  && mousePos.x < (this.x+ this.width)) 
            && ((mousePos.y > this.y && mousePos.y < (this.y + this.height)) || 
            (mousePos.y < this.y && mousePos.y > (this.y + this.height)))){
        this.isHover = true;    
    }
    else{
        this.isHover = false;
    }
}
    
 