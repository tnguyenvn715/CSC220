/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function initialize(){
    var c = document.getElementById("myCanvas");
    var selectorMenu = new SelectorEngine();
    selectorMenu.initialize(c);
}
window.onload= initialize;