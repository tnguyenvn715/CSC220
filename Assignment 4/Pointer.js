/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Pointer(id, position ){
	this.id = id;
	this.position = position;
	this.isPropagationCancelled = false;
}

Pointer.prototype.getPosition = function(){
	return this.position;
}
Pointer.prototype.getId = function(){
	return this.id;
}	

Pointer.prototype.cancelPropagation = function(){

}