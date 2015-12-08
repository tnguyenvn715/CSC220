/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LineChart(canvas) {
    Chart.call(this, canvas);
    this.drawYAxis(30, 0, 400, 50);
    this.drawXAxis(200, 30, 835);
}
LineChart.prototype = new Chart();
LineChart.prototype.draw = function() {
    Chart.prototype.draw.call(this);
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].drawElement(this.g, i+1);
        var g = this.canvas.getContext("2d");
        
        if (i != this.elements.length-1) {
            g.strokeStyle = "red";
            g.beginPath();
            g.moveTo(this.elements[i].x,this.elements[i].y);
            g.lineTo(this.elements[i+1].x,this.elements[i+1].y);
            g.stroke();
        }
    }
}

LineChart.prototype.initializeChartElement = 
        function(label, value, x, y, width, height) {
    //credit: Professor Block
    return new LineElement(label, value, x, y, width, height);
}

function LineElement(label, value, x, y, width, height) {
    ChartElement.call(this,label, value, x, y, width, height );
    this.radius = 2;
    this.x = x + 25;
    this.width = 3 * this.radius;
    this.height = 3 * this.radius;
}
LineElement.prototype = new ChartElement();

LineElement.prototype.drawElement = function(g,index) {
    //credit: Professor Block
    ChartElement.prototype.drawElement.call(this,g, index); 
    g.fillStyle = "white";   
    g.strokeStyle = "gray";
    g.beginPath();
    g.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    g.closePath();
    g.fill();
    g.stroke();
}