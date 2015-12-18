function validateForm() {
    var x = document.forms["myForm"]["inputYear"].value;
    if(isNaN(x) === true) {   
        alert("This is not valid.\n\Please enter again. ");
        return false;
    }
    else if(isNaN(x) === false && x % 1 != 0) {  
        alert("Your birth year should be an integer" + 
                                "\n\Please enter again. "); 
        return false;
    }
    else if(isNaN(x) === false && x < 1901) {   
        alert("I doubt you are " + (2015 - x) + 
                                " years old.\n\Please enter again. ");
        return false;
    }
    else if(isNaN(x) === false && x > 2013) {    
        alert("I doubt you are born that year." + 
                                "\n\Please enter again. ");
        return false;
    }
    else {
        return true;
    }
}
function initialize() {
    
    var canvas = document.getElementById("canvas");
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(canvas);
    customGameLoop.setCanvasSize(1000,500);
}
window.onload= initialize;