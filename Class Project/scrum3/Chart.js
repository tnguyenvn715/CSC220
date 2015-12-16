/**
 * Class representing a chart.
 * @constructor
 * @param {Canvas} name description
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

/**
 * 
 * @returns {undefined}
 */
Chart.prototype.initializeInputs = function(){
    //credited to Professor Block
    this.canvas.forwardInputTo = this;
    this.canvas.onmousemove = function(e){
        this.forwardInputTo.onMouseMove(e);
    }
}

/**
 * 
 * @param {Canvas} canvas
 * @param {MouseEvent} e
 * @returns {Chart.prototype.getMousePos.ChartAnonym$0}
 */
Chart.prototype.getMousePos = function(canvas, e) {
    //credit: Professor Block
    var offset = canvas.getBoundingClientRect();
    return {
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
    };
}

/**
 * 
 * @param {MouseEvent} e
 * @returns {undefined}
 */
Chart.prototype.onMouseMove = function(e){
    var pos = this.getMousePos(this.canvas, e);
    for (var i = 0; i < this.elements.length; i++) { //credit: Professor Block
        this.elements[i].isHit(pos);
    }
    this.draw();
}

/**
 * 
 * @param {Graphics} g
 * @returns {undefined}
 */
Chart.prototype.draw = function(g) {
    this.drawYAxis(g, 70, 0, 400, 80);
    this.drawXAxis(g, 240, 70, 950);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(g);
    }
    
}
Chart.prototype.clearElements = function() {
    this.elements = [];
}

/**
 * 
 * @param {Number} yearSpan
 * @returns {Number}
 */
Chart.prototype.calculateWidth = function(yearSpan) {
    var width = 0;
    if(yearSpan >= 0 && yearSpan <= 10){
        width = 50;
    }
    if(yearSpan > 10 && yearSpan <= 20){
        width = 40;
    }
    if(yearSpan > 20 && yearSpan <= 25){
        width = 25;
    }
    if(yearSpan > 25 && yearSpan <= 40){
        width = 15;
    }
    if(yearSpan > 40 && yearSpan <= 60){
        width = 10;
    }
    if(yearSpan > 60){
        width = 5;
    }
    return width;
    
}

/**
 * 
 * @param {Point} dataPoint
 * @param {Number} xpos
 * @param {Number} width
 * @returns {undefined}
 */
Chart.prototype.addElement = function(dataPoint, xpos, width) {
    var value = dataPoint.getValue();
    var label = dataPoint.getLabel();
    var height = value * 80;
    var ypos = 240 - height;
    
    var element = this.initializeChartElement
                    (label, value, xpos, ypos, width, height);
    this.elements.push(element); 
}

/**
 * 
 * @param {TimeManager} timerManager
 * @param {DataPoint} point
 * @returns {undefined}
 */
Chart.prototype.updateChart = function(timerManager, point){
    //override
}

/**
 * 
 * @param {Graphics} g
 * @param {Number} xpos
 * @param {Number} ymin
 * @param {Number} ymax
 * @param {Number} yincrement
 * @returns {undefined}
 */
Chart.prototype.drawYAxis = function(g, xpos, ymin, ymax, yincrement) {
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

/**
 * 
 * @param {Graphics} g
 * @returns {undefined}
 */
Chart.prototype.clearChart = function(g){
    this.elements = [];
    this.draw(g);
}

/**
 * 
 * @param {Graphics} g
 * @param {Number} ypos
 * @param {Number} xmin
 * @param {Number} xmax
 * @returns {undefined}
 */
Chart.prototype.drawXAxis = function(g, ypos, xmin, xmax) {
    g.beginPath();
    g.moveTo(xmin,ypos);
    g.lineTo(xmax,ypos);
    g.stroke();
    g.closePath(); 
}

/**
 * @constructor
 * @param {String} label
 * @param {Number} value
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @returns {ChartElement}
 */
function ChartElement(label, value, x, y, width, height) {
    this.label = label;
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height= height; 
    this.isHover = false;
    this.highlightColor = "#8acc25";
    this.normalColor= "#cf2435";
}

/**
 * 
 * @param {Graphics} g
 * @returns {undefined}
 */
ChartElement.prototype.drawElement = function(g) {
    if(this.isHover == true) {
        //add transparency here to make box overlap if needed
        var text = this.label + ': ' + this.value;
        g.fillStyle = "gray";
        g.fillRect(this.x, 50, 80, 40);
        g.fillStyle = "white";
        g.font="10pt Times";
        var textWidth = g.measureText(text).width;
        g.fillText(text, this.x + 40 - (textWidth/ 2), 65);
    }
}

/**
 * 
 * @param {Position} mousePos
 * @returns {undefined}
 */
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
    
 