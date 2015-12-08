/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function ElementManager(){
    this.elements = [];
}
ElementManager.prototype.addElement = function(element){
    this.elements.push(element);
}

ElementManager.prototype.draw = function(g){
    for (var i = 0; i < this.elements.length; i++){        
	this.elements[i].draw(g);
    }
}