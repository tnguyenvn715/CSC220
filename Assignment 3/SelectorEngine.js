/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SelectorEngine(){
    GameEngine.call(this);
    this.x = 50; //this is initial x
    this.y = 20; //this is initial y
    this.options = [];
    this.isExpanded = false;
}

SelectorEngine.prototype = new GameEngine();
SelectorEngine.prototype.onMouseClicked = function(){
    GameEngine.prototype.onMouseClicked.call(this);
    //override onMouseClicked
    
}
SelectorEngine.prototype.onMouseMove = function(){
    GameEngine.prototype.onMouseMove.call(this);
    //override
    
}
SelectorEngine.prototype.initializeInput = function(){
    GameEngine.prototype.initializeInput.call(this);
    
}
SelectorEngine.prototype.add = function(option){
    this.options.push(option);
}
SelectorEngine.prototype.draw = function(g){
    // override
    GameEngine.prototype.draw.call(this);
    
    
}
SelectorEngine.prototype.initial_state = function(){
    
}
SelectorEngine.prototype.expanded_state = function(){
    
}