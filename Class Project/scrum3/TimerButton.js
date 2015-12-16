/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function TimerButton(button) {
 /**
     * @type {HTMLInputElement}
     * @private
     */
    this.button = button;
    
    /**
     * Event handler that is called when the button gets activated
     * @function
     */
    this.onActivated = null;
    
    this.linkDOMEvents();
}

/**
 * Re-routes all DOM events to the class's internal handler
 * @returns {undefined}
 */
TimerButton.prototype.linkDOMEvents = function() {
    var _this = this;
    this.button.onclick = function() {
        if (_this.onActivated != null) {
            _this.onActivated();
        }
    }
}
