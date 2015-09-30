/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Selector(numOptions, x, y, minH, maxH, w){
    CustomEngine.call(this);
    this.numOptions = numOptions;
    this.origX = x;
    this.origY = y;
    this.minHeight = minH;
    this.maxHeight = maxH;
    this.width = w;
    this.options = [];
    this.isExpanded = false;
}
Selector.prototype = new CustomEngine();
Selector.prototype.setPosition = function(x, y){
    this.origX = x;
    this.origY = y;
}

Selector.prototype.setWidth = function(w){
    this.width = w;
}
Selector.prototype.setMinHeight = function(minH){
    this.minHeight = minH;
}


Selector.prototype.isHit = function(mousePos){
    if((mousePos.x > 0  && mousePos.x < this.width) 
            && (mousePos.y > 0 && mousePos.y < this.maxHeight) ){
     
        this.isExpanded = true;    
    }
    else{
        this.isExpanded = false;
    } 
}

Selector.prototype.addOption = function(option){
    this.options.push(option);
    console.log(option.label);
    console.log(option.x + " ," + option.y );
}

Selector.prototype.draw = function(g){
    //override 
    if (this.isExpanded === true){
        for (var i = 0; i < this.numOptions; i++){
            this.options[i].drawElement(g);
        }
    }
    else{
        this.options[0].drawElement(g);
    }    
}

