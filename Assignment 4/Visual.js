/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Visual (position,  width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
}

Visual.prototype.getPosition = function(){
    return this.position;
}
Visual.prototype.setPosition = function(newpos){
    this.position = newpos;
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
Visual.prototype.setBackgroundColor = function(newColor){
	
}

Visual.prototype.hitTest = function(position){
	
}

Visual.prototype.propagateOnPointerActivate = function(e){


}

Visual.prototype.addChild = function ( visual){
}


Visual.prototype.parentPointToLocal = function (p){
}

Visual.prototype.onPreviewPointerActivate  = function(  p ){

}

Visual.prototype.onPointerActivate  = function(  p ){

}

