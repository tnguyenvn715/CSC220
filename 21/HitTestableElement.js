function HitTestableElement(canvas, pos){
    Visual.call(this, canvas, pos);
    this.isHitTest = false;
}
HitTestableElement.prototype = new Visual();

HitTestableElement.prototype.hitTest = function(pos){
    //if pos
    if((pos.getX()>=this.pos.getX()&&pos.getX()<=this.pos.getX()+this.width)||
            (pos.getY()>=this.pos.getY()&&pos.getY()>=this.pos.getY()+this.height)){
        this.isHitTest = true;
    }
    else{
        this.isHitTest = false;
    }
    return this.isHitTest;
}

//hits wall -> change direction
//hits left or right wall: only x changes
//if it's up or down wall: only y changes
//all of the obstacles have a boolean - returns if it is hit