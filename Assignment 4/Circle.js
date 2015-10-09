/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Circle(position, width, height, thickness, fillColor, strokeColor){
    Shape.call(this, position, width, height, 
                thickness, fillColor, strokeColor);
}

Circle.prototype = new Shape();

Circle.prototype.draw = function(g){
    //CODE TO DRAW ELLIPSE PROVIDED BY PROFESSOR BLOCK
    var kappa = .5522848,
    ox = (this.width / 2) * kappa, // control point offset horizontal
    oy = (this.height / 2) * kappa, // control point offset vertical
    xe = this.position.getX() + this.width,           // x-end
    ye = this.position.getY() + this.height,          // y-end
    xm = this.position.getX() + this.width / 2,       // x-middle
    ym = this.position.getY() + this.height / 2;       // y-middle
    g.save();
    g.beginPath();
    g.moveTo(this.position.getX(), ym);
    g.bezierCurveTo(this.position.getX(), ym - oy, xm - ox, 
                        this.position.getY(), xm, this.position.getY());
    g.bezierCurveTo(xm + ox, this.position.getY(), xe, ym - oy, xe, ym);
    g.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    g.bezierCurveTo(xm - ox, ye, this.position.getX(), 
                        ym + oy, this.position.getX(), ym);
    g.fillStyle = this.fillColor;
    g.fill();
    g.lineWidth = this.strokeThickness;
    g.strokeStyle = this.strokeColor;
    g.stroke();
    g.restore();
}