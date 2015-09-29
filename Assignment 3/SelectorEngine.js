/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function SelectorEngine(numOptions, x, y, minH, maxH, w){
    GameEngine.call(this);
    this.numOptions = numOptions;
    this.origX = x;
    this.origY = y;
    this.minHeight = minH;
    this.maxHeight = maxH;
    this.width = w;
    this.options = [];
    this.isExpanded = false;
}
SelectorEngine.prototype = new GameEngine();
SelectorEngine.prototype.onMouseClick = function(position){
    GameEngine.prototype.onMouseClick.call(this, position);
    for (var i = 0; i < this.options.length; i++) { //credit: Professor Block
        this.options[i].isClicked(position);
    }
    this.draw();
    
}
SelectorEngine.prototype.onMouseMove = function(position){
    GameEngine.prototype.onMouseMove.call(this,position);
    //override
    this.isHit(position);   
}
SelectorEngine.prototype.isHit = function(mousePos){
    if((mousePos.x > 0  && mousePos.x < this.width) 
            && (mousePos.y > 0 && mousePos.y < this.maxHeight) ){
     
        this.isExpanded = true;    
    }
    else{
        this.isExpanded = false;
    }
    
   
    
}

SelectorEngine.prototype.addOption = function(option){
    this.options.push(option);
    console.log(option.label);
    console.log(option.x + " ," + option.y );
}

SelectorEngine.prototype.draw = function(g){
    // override
    GameEngine.prototype.draw.call(this, g);
    
    if (this.isExpanded === true){
        for (var i = 0; i < this.numOptions; i++){
            this.options[i].drawElement(g);
        }
    }
    else{
        this.options[0].drawElement(g);
    }    
}