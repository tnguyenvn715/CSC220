/**
 * Class representing a chart.
 * @constructor
 * @returns {Chart} 
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
    this.drawYAxis(g, 70, 0, 400, 80);
    this.drawXAxis(g, 240, 70, 870);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }
}
Chart.prototype.clearElements = function() {
    this.elements = [];
}
Chart.prototype.addElement = function(dataPoint, timer, span) {
    var value = dataPoint.getValue();
    var label = dataPoint.getLabel();
    var height = value * 80;
    var ypos = 240 - height;
    var yearSpan = timer.getEndYear() - timer.getStartYear();
    if(span >= 15 && span <= 20){
        var width = 30;
    }
    if(span >= 20 && span <= 25){
        var width = 25;
    }
    if(span >= 25 && span <= 40){
        var width = 15;
    }
    if(span >= 40 && span <= 60){
        var width = 10;
    }
    if(span >= 60){
        var width = 5;
    }
    var xpos = timer.getPosition().getX();
    var element = this.initializeChartElement
                    (label, value, xpos, ypos, width, height);
    this.elements.push(element); 
}
Chart.prototype.drawYAxis = function(g, xpos, ymin, ymax, yincrement) {
    /*var textlength = g.measureText("Temperature Anomaly in F"); 
    var tx = 10 + (textlength.width/2);
    var ty = 240 + 5;
    g.save();
    g.fillStyle =  "black"; 
    g.font = "13px Calibri";
    g.translate(tx, ty);
    g.rotate(Math.PI / 2);
    g.fillStyle = "black";
    g.fillText("Temperature Anomaly in F", 10, 240);
    g.translate(-tx, -ty);
    g.restore();*/
    g.beginPath();
    g.moveTo(xpos,ymin);
    g.lineTo(xpos,ymax);
    g.stroke();
    g.closePath(); 
    var num = -1.0;
    for(var i = ymax; i >= ymin; i --) {
        
        if (i%yincrement === 0){
            g.fillStyle =  "black"; 
            g.font = "13px Calibri";
            var n = num.toFixed(2);
            g.fillText(n, xpos- 30, i + 10);
            g.beginPath();
            g.moveTo(xpos - 5,i);
            g.lineTo(xpos,i);
            g.stroke();
            g.closePath(); 
            num += 0.5;
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
    g.font = "9px Calibri";
    g.fillText(this.value, this.x , this.y + this.height + 40);
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
    
 