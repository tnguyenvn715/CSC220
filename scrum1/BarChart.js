/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function BarChart(canvas){
    Chart.call(this, canvas);
    this.drawYAxis(30, 0, 400, 50);
    
}
BarChart.prototype = new Chart();

BarChart.prototype.initializeChartElement = function(label, value, x, y, width, height){
    //credit: Professor Block
    return new BarElement(label, value, x, y, width, height);
}

function BarElement(label, value, x, y, width, height){
    ChartElement.call(this,label, value, x, y, width, height );
    
}
BarElement.prototype = new ChartElement();

BarElement.prototype.drawElement = function(g, index){
    // credit: Professor Block
    ChartElement.prototype.drawElement.call(this,g, index);
    g.fillStyle = "red"; 
    g.fillRect(this.x,this.y, this.width, this.height );
}

