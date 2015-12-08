/**
 * Encapsulates all game logic and elements
 * @constructor
 * @extends GameLoop
 * @returns {Arkanoid}
 */
function Arkanoid() {
    
}

Arkanoid.prototype = new GameLoop();

Arkanoid.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    /**
     * @type {Ball}
     */
    this.ball = new Ball(this.canvas, 3, 10, new Point(10, 10));
    this.movingRect = new movingRectangle(5,5);
    console.info(this.ball.radius);
}

Arkanoid.prototype.update = function(elapsedMilliseconds) {
    // your update logic here
    this.ball.update();
    if(this.ball.hitWall()){
        this.ball.changeDirection();
    }
}

Arkanoid.prototype.onPointerEnter = function(id,pos){
    this.movingRect.setPosition(pos);
}

Arkanoid.prototype.draw = function(g) {
    // your draw logic here
    g.fillStyle = "#CCCCCC";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //this.ball.draw(g);
    g.beginPath();
    g.fillStyle = "red";
    this.ball.draw(g);
    //this.movingRect.draw(g);
    /*.fillRect(this.ball.pos.getX() + this.ball.speed, this.ball.pos.getY()+ this.ball.speed, 
            this.ball.radius, this.ball.radius);*/
    /*console.log(this.ball.pos.getX());      
    g.closePath();
    g.fill()*/
}
// </editor-fold>

function initialize() {
    var arkanoid = new Arkanoid();
    arkanoid.initialize(document.getElementById("canvas"));
    
    
    
}

window.onload = initialize;