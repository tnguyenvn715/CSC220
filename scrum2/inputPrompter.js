/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function inputPrompter(minYear, currentYear) {
    this.isValid = false;
    this.minYear = minYear;
    this.currentYear = currentYear;
    this.inputYear = parseInt(prompt("Please enter your birth year: "));
    while (this.isValid === false){
        this.checkYearValidity();
    }
}
inputPrompter.prototype.getMinYear = function() {
    return this.minYear;
}
inputPrompter.prototype.getCurrentYear = function() {
    return this.currentYear;
}
inputPrompter.prototype.getInputYear = function() {
    if (this.isValid === true){
        return parseInt(this.inputYear);
    }
}

inputPrompter.prototype.checkYearValidity = function() {
    if(isNaN(this.inputYear) === true) {   
        this.inputYear = prompt("This is not valid.\n\Please enter again: ");
    }
    else if(isNaN(this.inputYear) === false && this.inputYear % 1 != 0) {  
        this.inputYear = prompt("Your birth year should be an integer" + 
                                "\n\Please enter again: "); 
    }
    else if(isNaN(this.inputYear) === false && this.inputYear < this.minYear) {   
        this.inputYear = prompt("I doubt you are " + 
                                (this.currentYear - this.inputYear) + 
                                " years old.\n\Please enter again: ");
    }
    else if(isNaN(this.inputYear) === false 
                                       && this.inputYear > this.currentYear) {    
        this.inputYear = prompt("I doubt you are born that year." + 
                                "\n\Please enter again: ");
    }
    else {
        this.isValid = true;
    }
}


