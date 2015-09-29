/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initialize(){
    var c = document.getElementById("myCanvas");
   
    var areaSelector = new SelectorEngine(data.length, 0,0, 20, data.length*20, 100);
    for (var i = 0; i < data.length; i++){
        var label = data[i].getName();
        var opt = new OptionElement(0, i*this.minHeight, this.width, this.minHeight, label);
        areaSelector.addOption(opt);
    }
    
    areaSelector.initialize(c);
}
window.onload= initialize;