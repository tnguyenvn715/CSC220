/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Rectangle(){
    Shape.call(this);
}

Rectangle.prototype = new Shape(this, this.borderThickness, this.fillColor, this.borderColor);



Rectangle.prototype.drawPath = function(g){


}

