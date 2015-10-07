/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Triangle(){
    Shape.call(this);
}

Triangle.prototype = new Shape(this, this.borderThickness, this.fillColor, this.borderColor);

Triangle.prototype.drawPath = function(g){
    //do somrthine
}