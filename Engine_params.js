/*
Содержит переменные для работы с движком
*/

var pjs = new PointJS(640, 480, {
	//backgroundColor : '#4b4843' // optional
	background : 'url(img/background.png) no-repeat center',
	backgroundSize : 'cover'
});
 pjs.system.initFullPage(); // for Full Page mode

//Переменные для взаимодействия с движком
var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var layers = pjs.layers;
var levels = pjs.levels;
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Objects manager
var math   = pjs.math;           // More Math-methods
var key   = pjs.keyControl.initKeyControl();
var mouse = pjs.mouseControl.initMouseControl();
var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();