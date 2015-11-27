/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function inputPrompter(minYear, currentYear) {
    this.isValid = false;
    this.minYear = minYear;
    this.currentYear = currentYear;
    this.year = prompt("Please enter your birth year: ");
    while (this.isValid === false){
        this.checkYearValidity();
    }
}

inputPrompter.prototype.checkYearValidity = function() {
    if (isNaN(this.year) === true) {   
        this.year = prompt("This is not valid.\n\Please enter again: ");
    }
    else if (isNaN(this.year) === false && this.year % 1 != 0) {  
        this.year = prompt("Your birth year should be an integer.\n\Please enter again: "); 
    }
    else if (isNaN(this.year) === false && this.year < this.minYear) {   
        this.year = prompt("I doubt you are " + (this.currentYear - this.year) + 
                            " years old.\n\Please enter again: ");
    }
    else if (isNaN(this.year) === false  && this.year > this.currentYear ) {    
        this.year = prompt("I doubt you are born that year.\n\Please enter again: ");
    }
    else {
        this.isValid = true;
    }
}

