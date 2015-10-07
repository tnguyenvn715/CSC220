/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ElementManager(){
    this.visuals = [];
}
ElementManager.prototype.addVisual = function(visual){
    this.visuals.append(visual);
}

ElementManager.prototype.drawAllVisuals = function(){
    for (var i = 0; i < this.visuals.length; i++){
	this.visuals[i].draw();
    }
}