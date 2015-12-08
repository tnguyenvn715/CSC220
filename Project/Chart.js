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
Chart.prototype.initializeInputs = function(){
    //credited to Professor Block
    this.canvas.forwardInputTo = this;
    this.canvas.onmousemove = function(e){
        this.forwardInputTo.onMouseMove(e);
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
Chart.prototype.onMouseMove = function(e){
    var pos = this.getMousePos(this.canvas, e);
    for (var i = 0; i < this.elements.length; i++) { //credit: Professor Block
        this.elements[i].isHit(pos);
    }
    this.draw();
}
    
Chart.prototype.draw = function(g) {
    this.drawYAxis(g, 70, 0, 400, 50);
    this.drawXAxis(g, 200, 70, 835);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }
}
Chart.prototype.clearElements = function() {
    this.elements = [];
}
Chart.prototype.addElement = function(dataPoint, timer) {
    var value = dataPoint.getValue();
    var label = dataPoint.getLabel();
    var height = value * 50;
    var ypos = 200 - height;
    var yearSpan = timer.getEndYear() - timer.getStartYear();
    var width = 5;
    var xpos = timer.getPosition().getX();
    var element = this.initializeChartElement
                    (label, value, xpos, ypos, width, height);
    this.elements.push(element); 
}
Chart.prototype.drawYAxis = function(g, xpos, ymin, ymax, yincrement) {
    g.beginPath();
    g.moveTo(xpos,ymin);
    g.lineTo(xpos,ymax);
    g.stroke();
    g.closePath(); 
    for(var i = ymax; i >= ymin; i --) {
        if (i%yincrement === 0){     
            g.beginPath();
            g.moveTo(xpos - 5,i);
            g.lineTo(xpos,i);
            g.stroke();
            g.closePath(); 
        }   
    }
}
Chart.prototype.clearChart = function(g){
    this.elements = [];
    this.draw(g);
}
Chart.prototype.drawXAxis = function(g, ypos, xmin, xmax) {
    g.beginPath();
    g.moveTo(xmin,ypos);
    g.lineTo(xmax,ypos);
    g.stroke();
    g.closePath(); 
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

ChartElement.prototype.drawElement = function(g) {
    g.beginPath();
    g.fillStyle =  this.isHover ? "black": "white"; 
    g.font = "13px Calibri";
    g.fillText(this.label + ': ' + this.value, this.x, 100);
    g.closePath();
}
ChartElement.prototype.isHit = function(mousePos) {
    if((mousePos.x > this.x  && mousePos.x < (this.x+ this.width)) 
            && ((mousePos.y > this.y && mousePos.y < (this.y + this.height)) || 
            (mousePos.y < this.y && mousePos.y > (this.y + this.height)))){
        this.isHover = true;    
    }
    else{
        this.isHover = false;
    }
}
    
 