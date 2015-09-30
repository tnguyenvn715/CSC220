/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function CustomEngine(){
    GameEngine.call(this);
    this.selectors = [];
}
CustomEngine.prototype = new GameEngine();

CustomEngine.prototype.addSelector = function(selector){
    selector.draw(this.g);
    this.selectors.push(selector);
}

CustomEngine.prototype.onMouseClick = function(position){
    GameEngine.prototype.onMouseClick.call(this, position);
    for (var i = 0; i < this.selectors.length; i++) { //credit: Professor Block
        var optionsList = this.selectors[i].options;
        for (var j = 0; j < optionsList.length; j++){
            optionsList[j].isClicked(position);
            this.selectors[i].draw(this.g);
        }
    }
}
CustomEngine.prototype.onMouseMove = function(position){
    GameEngine.prototype.onMouseMove.call(this,position);
    //override
    for (var i = 0; i < this.selectors.length; i++) { //credit: Professor Block
        this.selectors[i].isHit(position);
        this.selectors[i].draw(this.g);
    }
}
CustomEngine.prototype.draw = function(g){
    //override
    GameEngine.prototype.draw.call(this, g);
    for (var i = 0; i < this.selectors.length; i++) {
        this.selectors[i].draw(this.g);
    }
}