/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Visual (position,  width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.children = [];
    this.isClicked = false;
}


Visual.prototype.getWidth = function(){
    return this.width;
}
Visual.prototype.setWidth = function(newwidth){
    this.width = newwidth;
}
Visual.prototype.getHeight = function(){
    return this.height;
}
Visual.prototype.setHeight = function(newheight){
    this.height = newheight;
}
Visual.prototype.setPosition = function(position) {
    this.position = position.clone();
}

Visual.prototype.getPosition = function() {
    return this.position.clone();
}
Visual.prototype.setFillColor = function(color) {
    this.fillColor = color;
}
Visual.prototype.draw = function(g) {
    //
}

Visual.prototype.addChild = function(element) {
    this.children.push(element);
}

Visual.prototype.propagateOnPointerActive = function(e) {
    
}

Visual.prototype.onPreviewPointerActive = function(e) {
    
}

Visual.prototype.onPointerActive = function(e) {
    
}

Visual.prototype.parentPointToLocal = function(p) {
    
}


Visual.prototype.hitTest = function(mousePos) {
    if((mousePos.x > this.position.x  && mousePos.x < (this.position.x+ this.width)) 
            && (mousePos.y > this.position.y && mousePos.y < (this.position.x+ this.width)) ){
        return true;
       
    }
    else{
        return false;
    }
}