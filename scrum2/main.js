

function initialize() {
    var customGameLoop = new CustomGameLoop();
    var input = new inputPrompter(1901, 2014);
    var startyear = input.getInputYear();
    var timerPos = new Point(30, 410);
    var timer = new Timer(timerPos, 805, startyear , 2014);
    customGameLoop.initialize(document.getElementById("canvas"), timer);

    
}
window.onload= initialize;