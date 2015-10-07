
function selectedSeries(element, canvas, isBar){
    var seriesValue = element.options[element.selectedIndex].value;
    var series = data[seriesValue];
    var chart = isBar ? new BarChart(canvas): new LineChart(canvas);
    chart.initializeChart(series);
    chart.draw();
    document.getElementById("header").innerHTML = series.getName();
}
function getMousePos(canvas, e) {
    //credit: Professor Block
    var offset = canvas.getBoundingClientRect();
    return {
        x: e.clientX - offset.left,
        y: e.clientY - offset.top
    };
}
    
function initialize(){
    var canvas = document.getElementById("myCanvas");
    canvas.width = 800;
    canvas.height = 330;
    var isBar = true;
    var el = document.getElementById("dataselector");
    var el2 = document.getElementById("typeselector");
    if (el2.options[el2.selectedIndex].value === "1"){
        isBar = false;
    }
    else{
        isBar = true;
    }
    selectedSeries(el, canvas, isBar);
}

window.onload= initialize;