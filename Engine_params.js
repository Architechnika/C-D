/*
Содержит переменные для работы с движком
*/
var backgroundImgPath = "img/interface/interface_font.png"; //Картинка для фона за либиринтом
var pjs = new PointJS(640, 480, {
    //backgroundColor : '#3333ff',
    //backgroundColor : '#4b4843' ,// optional
    background: 'url(' + backgroundImgPath + ') no-repeat center ',
    backgroundSize: 'cover'
});
pjs.system.initFullPage(); // for Full Page mode

//Переменные для взаимодействия с движком
var log = pjs.system.log; // log = console.log;
var localMemory = pjs.memory.local;
var system = pjs.system;
var game = pjs.game; // Game Manager
var point = pjs.vector.point; // Constructor for Point
var camera = pjs.camera; // Camera Manager
var layers = pjs.layers;
var levels = pjs.levels;
var brush = pjs.brush; // Brush, used for simple drawing
var OOP = pjs.OOP; // Objects manager
var math = pjs.math; // More Math-methods
var key = pjs.keyControl.initKeyControl();
//var mouse = pjs.mouseControl.initMouseControl();
var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();
system.initFPSCheck();

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function sleep(milliseconds) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start <= milliseconds) {}
}
