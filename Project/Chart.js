/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
    /* global data */

    
function Chart(canvas){
    if (typeof canvas !== "undefined"){ //credit: Professor Block
        this.canvas = canvas;
        this.elements = [];
        this.g = canvas.getContext("2d");
        this.initializeInputs();
    }
}
    
Chart.prototype.initializeChart = function(dataSeries){
    for (var i = 0; i < dataSeries.getData().length; i++) {
        var value = dataSeries.getData()[i].getValue();
        var label = dataSeries.getData()[i].getLabel();
        var height = value * 2;
        var xpos = (i+1) * 60;
        var ypos = 300- height;
            
        //credit: Professor Block
        var element = this.initializeChartElement(label, value, xpos, ypos, 50, height);
        
        element.drawLabel(this.g, i+1);
        this.elements.push(element);            
    }
}

Chart.prototype.draw = function(){
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(this.g, i+1);
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
    var pos = getMousePos(this.canvas, e);
    for (var i = 0; i < this.elements.length; i++) { //credit: Professor Block
        this.elements[i].isHit(pos);
    }
    this.draw();
}
    
//ChartElement Constructor
function ChartElement(label, value, x, y, width, height){
    this.label = label;
    this.value = value;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height= height;
        
    //next three lines credited to Professor Block
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

ChartElement.prototype.drawElement = function(g, index){
    g.fillStyle =  this.isHover ? "gray": "white"; 
    g.font = "13px Calibri";
    var xpos = index * 60 + 20;
    g.fillText(this.value, xpos, this.y - 10);
}

ChartElement.prototype.isHit = function(mousePos){
    if((mousePos.x > this.x  && mousePos.x < (this.x+ this.width)) 
            && (mousePos.y > this.y && mousePos.y < 300) ){
        this.isHover = true;    
    }
    else{
        this.isHover = false;
    }
}
    
 
    
   
    
 