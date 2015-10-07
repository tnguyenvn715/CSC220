/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LineChart(canvas){
    Chart.call(this, canvas);
    this.verticalScale();
    this.horizontalScale();
}
LineChart.prototype = new Chart();
LineChart.prototype.draw = function(){
    Chart.prototype.draw.call(this);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(this.g, i+1);
        var g = this.canvas.getContext("2d");
        
        if (i != this.elements.length-1){
            g.strokeStyle = "#52bab3";
            g.beginPath();
            g.moveTo(this.elements[i].x,this.elements[i].y);
            g.lineTo(this.elements[i+1].x,this.elements[i+1].y);
            g.stroke();
        }
    }
}
LineChart.prototype.verticalScale = function(){
    this.g.beginPath();
    this.g.moveTo(30,300);
    this.g.lineTo(30,50);
    this.g.stroke();

    var count = 0;
    for(var i = 300; i > 50; i --){
        if (i%20 === 0){
            
            this.g.beginPath();
            this.g.moveTo(25,i);
            this.g.lineTo(30,i);
            this.g.stroke();
            this.g.font = "10px Calibri";
            
            //credit: Professor Block
            var textWidth = this.g.measureText(count).width;
            
            this.g.fillText(count, 15- textWidth/2, i);
            count += 10;
        }   
    }
    
}
LineChart.prototype.horizontalScale = function(){
    this.g.beginPath();
    this.g.moveTo(30,300);
    this.g.lineTo(740,300);
    this.g.stroke();
}
LineChart.prototype.initializeChartElement = 
        function(label, value, x, y, width, height){
    //credit: Professor Block
    return new LineElement(label, value, x, y, width, height);
}

function LineElement(label, value, x, y, width, height){
    ChartElement.call(this,label, value, x, y, width, height );
    this.radius = 5;
    this.x = x + 25;
    this.width = 3 * this.radius;
    this.height = 3 * this.radius;
    
}
LineElement.prototype = new ChartElement();

LineElement.prototype.drawElement = function(g,index){
    //credit: Professor Block
    ChartElement.prototype.drawElement.call(this,g, index); 
    g.fillStyle = this.isHover ? this.highlightColor: this.normalColor; 
    
    g.strokeStyle = "black";
    g.beginPath();
    g.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    g.closePath();
    g.fill();
    g.stroke();
    
}
