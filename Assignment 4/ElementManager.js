/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ElementManager(){
    this.visuals = [];
}
ElementManager.prototype.addElement = function(element){
    this.visuals.push(element);
}

ElementManager.prototype.retrieveElement = function(position){
    var topMostVisual;
    for (var i = 0; i < this.visuals.length; i++){
        if (this.visuals[i].hitTest(position) == true && 
                    this.visuals[i].draggable == true){
            topMostVisual = this.visuals[i];
        }
    }
    return topMostVisual;
}
ElementManager.prototype.onPointerActivate = function(id, p) {
    
}
ElementManager.prototype.draw = function(g){
    for (var i = 0; i < this.visuals.length; i++){        
	this.visuals[i].draw(g);
    }
}