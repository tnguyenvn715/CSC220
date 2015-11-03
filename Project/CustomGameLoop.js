/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CustomGameLoop() {
    
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    this.g = this.canvas.getContext("2d");
    this.input = new inputBox();
    this.timer = new Timer(10, 420, this.g, 600, this.input.year, '2015' );
    this.year = this.input.year;
    
}

CustomGameLoop.prototype.setCanvasSize = function(width, height) {
   this.canvas.width = width;
   this.canvas.height = height;
}

CustomGameLoop.prototype.update = function(elapsedMilliseconds) { 
    this.moveSlider(); 
   
}
CustomGameLoop.prototype.draw = function(g) {
    this.timer.draw();
}

CustomGameLoop.prototype.moveSlider = function(){
    var increment = this.timer.width/(parseInt(this.timer.endYear)- parseInt(this.timer.startYear));
    

    
    if (parseInt(this.timer.label) >= 2015){
    
        //do nothing
        return null;
    }
    else{
        var nextYear = parseInt(this.timer.label) + 1;
        var newx = this.timer.x + increment; 
        this.timer.updatePosition(newx, this.timer.y);
        this.timer.updateYear(nextYear);
        document.getElementById("demo").innerHTML = this.timer.label ;
        
        
    }
    
}