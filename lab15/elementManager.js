/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ElementManager(){
    this.elements = [];
}
ElementManager.prototype.add = function(element){
    this.elements.push(element);
}
ElementManager.prototype.drawElements = function (g) {
    for (var id in this.elements) {
        this.elements[id].draw(g);
    }
}