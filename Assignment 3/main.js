/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function addAreaSelector(){
    var x = 0;
    var y = 0;
    var minHeight = 20;
    var maxHeight = data.length*20;
    var width = 100;
    var areaSelector = new Selector(x, y, minHeight, maxHeight, width);
    for (var i = 0; i < data.length; i++){
        var label = data[i].getName();
        var opt = new OptionElement(0, i*20, 100, 20, label);
        areaSelector.addOption(opt);
    }
    return areaSelector;
}
function addTypeSelector(canvas){
    var x = 150;
    var y = 0;
    var minHeight = 20;
    var maxHeight = 40;
    var width = 100;
    var typeSelector = new Selector(x, y, minHeight,maxHeight, width);
    var barOption = new OptionElement(x, y, width, minHeight, "Bar Graph");
    var lineOption = new OptionElement(x, y + minHeight, width,
                                        minHeight, "Line Graph");
    typeSelector.addOption(barOption);
    typeSelector.addOption(lineOption);
    return typeSelector;
}
function initialize(){
    var c = document.getElementById("myCanvas");
    var customEngine = new CustomEngine();
    customEngine.addSelector(this.addAreaSelector());
    customEngine.addSelector(this.addTypeSelector());
    customEngine.initialize(c);   
}
window.onload= initialize;