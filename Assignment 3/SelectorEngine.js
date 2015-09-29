/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SelectorEngine(){
    GameEngine.call(this);
    
    this.options = [];
    this.isExpanded = true;
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
/*SelectorEngine.prototype.initializeInput = function(){
    GameEngine.prototype.initializeInput.call(this);
    
}*/


SelectorEngine.prototype.initializeOptions = function(data){
    for (var i = 0; i < data.length; i++){
        var label = data[i].getName();
        var option = new OptionElement(0, i*20, 100, 20, label);
        this.options.push(option);
        //console.log(this.options[i].label);
    }
    this.draw(this.g);
}
SelectorEngine.prototype.draw = function(g){
    // override
    GameEngine.prototype.draw.call(this, g);
    
    if (this.isExpanded === true){
        for (var i = 0; i < data.length; i++){
            this.options[i].drawElement(g);
        }
    }
    else{
        this.options[0].drawElement(g);
    }    
}