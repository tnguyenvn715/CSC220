
/**
 * Validate whether year input is appropriate by testing cases
 * @returns {Boolean}
 */
function validateForm() {
    var x = document.forms["myForm"]["inputYear"].value;
    if(isNaN(x) === true) {   
        alert("This is not valid.\n\Please enter again. ");
        return false;
    }
    else if(isNaN(x) === false && x % 1 != 0) {  
        alert("Your birth year should be an integer" + 
                                "\n\Please enter again. "); 
        return false;
    }
    else if(isNaN(x) === false && x < 1901) {   
        alert("I doubt you are " + (2015 - x) + 
                                " years old.\n\Please enter again. ");
        return false;
    }
    else if(isNaN(x) === false && x > 2013) {    
        alert("I doubt you are born that year." + 
                                "\n\Please enter again. ");
        return false;
    }
    else {
        return true;
    }
}

 /**
  * Initialize timer, chart, and custom game loop
  */
function initialize() {
    var canvas = document.getElementById("canvas");
    var x = document.getElementById("changeType").value;
    
    var timerButton = new TimerButton(new Point (25, 410), 20, "red", "white");
    var timerBar = new TimerBar(new Point(90, 410), 850, 5, "white");
    var timerSlider = new TimerSlider(new Point(90, 400), 10, 20, 
                       "#003366", 1901, 2014);
    timerSlider.setInitialPosition(new Point(90, 400));
    var timerManager = new TimerManager(timerButton, timerSlider, timerBar);
    var chart = new BarChart(canvas, 90, 0, 900, 400, 80, 0.5); 
    chart.initializeOriginPos(90, 240);
    chart.initializeYMinValue(-1.00);
    chart.initializeYMaxValue(1.50);
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initializeChartTimer(timerManager);
    customGameLoop.initialize(canvas, chart, x);
    customGameLoop.setCanvasSize(1000,500);

}

window.onload= initialize;