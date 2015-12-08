/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function LineChart(canvas) {
    Chart.call(this, canvas);
    
}
LineChart.prototype = new Chart();
LineChart.prototype.initializeChartElement = 
        function(label, value, x, y, width, height) {
    //credit: Professor Block
    return new LineElement(label, value, x, y, width, height);
}
LineChart.prototype.draw = function(g) {
    Chart.prototype.draw.call(this, g);
    for (var i = 0; i < this.elements.length+1; i++) {
       console.log(this.elements[i].x);
        if (i > 0){    
            g.strokeStyle = "black";
            g.beginPath();
            g.moveTo(this.elements[i-1].x,this.elements[i-1].y);
            g.lineTo(this.elements[i].x,this.elements[i].y);
            g.stroke();
            g.closePath();
        }
    }
}
function LineElement(label, value, x, y, width, height) {
    ChartElement.call(this,label, value, x, y, width, height );
    this.radius = 1;
    this.width = 3 * this.radius;
    this.height = 3 * this.radius;
}
LineElement.prototype = new ChartElement();

LineElement.prototype.drawElement = function(g) {
    //credit: Professor Block
    ChartElement.prototype.drawElement.call(this, g);
    g.save();
    g.fillStyle = "red";   
    g.beginPath();
    g.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    g.fill();
    g.stroke();
    g.closePath();
    g.restore();
}



