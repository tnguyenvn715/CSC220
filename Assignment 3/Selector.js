/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Selector(x, y, minH, maxH, w){
    this.x = x;
    this.y = y;
    this.minHeight = minH;
    this.maxHeight = maxH;
    this.width = w;
    this.options = [];
    this.isExpanded = false;
}
Selector.prototype.setPosition = function(x, y){
    this.x = x;
    this.y = y;
}
Selector.prototype.setWidth = function(w){
    this.width = w;
}
Selector.prototype.setMinHeight = function(minH){
    this.minHeight = minH;
}
Selector.prototype.isHit = function(mousePos){
    if((mousePos.x > this.x  && mousePos.x < (this.x + this.width)) 
            && (mousePos.y > this.y && mousePos.y < (this.y + this.maxHeight))){
        this.isExpanded = true;    
    }
    else{
        this.isExpanded = false;
    } 
}
Selector.prototype.addOption = function(option){
    this.options.push(option);
}

Selector.prototype.draw = function(g){
    //override 
    if (this.isExpanded === true){
        for (var i = 0; i < this.options.length; i++){
            this.options[i].drawElement(g);
        }
    }
    else{
        this.options[0].drawElement(g);
    }    
}

