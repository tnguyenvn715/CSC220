/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function OptionElement(x, y, width, height, label){
    this.x= x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
    this.isSelected= false;
    this.highlightColor = "#cf2435";
    
}

OptionElement.prototype.drawElement = function(g){
    var c=document.getElementById("myCanvas"); //getting error when not included
    var g=c.getContext("2d");                  // these two lines
    g.fillStyle = "white"; 
    g.strokeRect(this.x, this.y,this.width,this.height);
    g.fillStyle =  this.isSelected ? this.highlightColor:"black"; 
    g.fillRect(this.x, this.y,this.width,this.height);
    this.drawText(g); 
}

OptionElement.prototype.drawText = function(g){
    g.fillStyle = "white"; 
    var textWidth = g.measureText(this.label).width; //credit: Professor Block
    var xpos = this.x + this.width/2 - textWidth/2;
    var ypos = this.y + this.height/2;
    g.fillText(this.label, xpos, ypos);
}

OptionElement.prototype.isClicked = function(mousePos){
    if((mousePos.x > this.x  && mousePos.x < (this.x+ this.width)) 
            && (mousePos.y > this.y && mousePos.y < (this.y + this.height)) ){
        this.isSelected = true;    
    }
    else{
        this.isSelected = false;
    }
}