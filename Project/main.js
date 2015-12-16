function initialize() {
    var canvas = document.getElementById("canvas");    
    var input = new inputPrompter(1901, 2014);
    var startYear = parseInt(input.getInputYear());
    
    var timerBar = new TimerBar(new Point(70, 410), 850, 5, "white");
    var timerSlider = new TimerSlider(new Point(70, 400), 10, 20, "#003366", startYear, 2014);
    timerSlider.setInitialPosition(new Point(70, 400));
    
    var timerManager = new TimerManager(timerSlider, timerBar);
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(canvas, timerManager);
    customGameLoop.setCanvasSize(1000, 600);
    //customGameLoop.fillWindow();


}
window.onload= initialize;