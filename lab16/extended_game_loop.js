

// <editor-fold desc="ExtendedGameLoop">
function ExtendedGameLoop() {

}

ExtendedGameLoop.prototype = new GameLoop();

ExtendedGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);

    this.devicePixelRatio = window.devicePixelRatio;

    var _this = this;
    window.addEventListener('resize',
                           function() {
                               _this.onWindowResize();
                            }, false);
//
//    var g = this.canvas.getContext("2d");
    g.scale(2, 2);
}

ExtendedGameLoop.prototype.setWidth = function(width) {
    this.canvas.width = width;
}

ExtendedGameLoop.prototype.setHeight = function(height) {
    this.canvas.height = height;
}

ExtendedGameLoop.prototype.fillWindow = function() {
    this.setWidth(window.innerWidth * this.devicePixelRatio) ;
    this.setHeight(window.innerHeight * this.devicePixelRatio);
}


ExtendedGameLoop.prototype.draw = function(g) {



    g.fillStyle = "#CCCCCC";
    g.fillRect(0, 0, window.innerWidth, window.innerHeight);

    g.fillStyle = "black";
    var size = "Width: " + window.innerWidth + ", Height: " + window.innerHeight;
    g.fillText(size, 10,20);

    var ratios = "devicePixelRatio: " + window.devicePixelRatio + ", backingStoreRatio: " + g.webkitBackingStorePixelRatio;
    g.fillText(ratios, 10,40);

    g.fillStyle = "teal";
    var x = window.innerWidth - 50;
    var y = window.innerWidth - 50;
    g.fillRect(x, y, 50, 50);


    g.fillStyle = "purple";
    //drawEllipse(ctx, x, y, w, h)
    var x = window.innerWidth/2 - 40;
    var y = window.innerWidth/2 - 40;

    drawEllipse(g, x, y, 80, 80);
//    g.stroke();
    g.fill();

}
// </editor-fold>

function initialize() {
    var extendedGameLoop = new ExtendedGameLoop();
    extendedGameLoop.initialize(document.getElementById("canvas"));
    extendedGameLoop.fillWindow();



}

ExtendedGameLoop.prototype.onWindowResize = function() {
    this.fillWindow();
}


function drawEllipse(ctx, x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
//    ctx.stroke();
}

window.onload = initialize;
