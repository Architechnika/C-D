/*
Содержит методы и данные для отрисовки графики(Графическая часть игры)
*/

//Путь к файлам отображения лабиринта
var wallPaths = [//Стенки внутри лабиринта
  "img/wall1.png",
  "img/wall2.png",
  "img/wall3.png"
];

var bordersPath = "img/border.png";//Крайние стенки(те что вокруг лабиринта)
var nonePath = "img/commands/none.png";
var groundPath = "img/ground.png";//Картинка для дороги
var backgroundPath = "img/background.png";//Картинка для фона за либиринтом
var exitPath = "img/exit.png";//Картинка для выхода из лабиринта
var entryPath = "img/entry.png";//Картинка для входа в лабиринт
var coinPath = "img/coin.png";//Картинка для отображения монетки
//Пути до файлов с изображениями для интерфейса
var buttonStartImgSrc = "img/interface/startButton.png";
var buttonStopImgSrc = "img/interface/stopButton.png";
var menuButtonImgSrc = "img/interface/menuButton.png";
var reloadButtonImgSrc = "img/interface/reloadButton.png";
var okButtonImgSrc = "img/interface/okButton.png";
//Пути до файлов с изображением робота
var playerImgSrc = "img/player.png";
var playerImageObj = null;

var width  = game.getWH().w; // Ширина всего экрана
var height = game.getWH().h; // Высота всего экрана

//ПЕРЕМЕННЫЕ ГРАФИЧЕСКИХ СЛОЕВ
var guiLayer = layers.newLayer(4,{alpha : 0.8, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИЧЕСКИХ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
var commandsMenuLayer = layers.newLayer(3,{alpha : 1, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ВЫБОРА КОМАНД ПОЛЬЗОВАТЕЛЕМ
var playerLayer = layers.newLayer(2,{alpha : 1, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТБРАЖЕНИЯ ГРАФИКИ ИГРОКА
var commandsLayer = layers.newLayer(1,{alpha : 0.5, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИКИ НАЗНАЧЕННЫХ ЭЛЕМЕНТАМ КОММАНДЕ
//Переменные для интерфейсных задач
var commandsMenuElements = [];//getAllCommandsMenu(oneTileWidth,oneTileHeight);//Массив, хранящий про  раммное представление меню выбора команда
var mainbackGround = undefined;
var checkScreenTimeout = 40;//Таймаут для метода который следит за изменениями размера экрана

pjs.system.setTitle('Лабиринт'); // Set Title for Tab or Window

//Обновление графики на экране
function updateScreen(){
  //mainBackGroundDrow();
  mainbackGround.drawBG();
  //Отрисовываем слой команд
  commandsLayer.on(function(){
    drawCommandsOnField();
  });
  //Отрисовываем поле
	for(var i = 0; i < field.length; i++){
	  field[i].draw();
  } 
    
    
       
  //Отрисовываем элементы интерфейса
  guiLayer.on(function(){
    drawGUI();
  });
  //Рисуем на графическом слое игрока для отображения игрока и игровых обьектов
  playerLayer.on(function(){
    OOP.forArr(gameObjects,function(el){
      el.draw();
    });
    playerImageObj.draw();
  });
}

function mainBackGroundDrow()
{
  var arr = [];
  var bg = []
 // var mainBackGroung = game.newImageObject({x: 0, y: 0, h: oneTileHeight, w: oneTileWidth, file: entryPath});
  var lineCount = Math.floor(height/oneTileWidth);
  var columnCount = Math.floor(width/oneTileHeight);
  for(var i = 0; i < lineCount+1;i++)
  {
    arr[i] = [];
    for(var j= 0 ; j< columnCount+1;j++)
    {
      arr[i][j] = "B";
    }
  }
  
  levels.forStringArray({w:oneTileHeight, h: oneTileHeight, source:arr},function(S,X,Y,W,H)
  {
    bg.push(game.newImageObject({x: X, y: Y, h: H, w: W, file: groundPath}))
  });
  
  this.drawBG = function()
 {
      OOP.forArr(bg,function(el){
        el.draw();
      });
 }
}

//Запускает таймер который следит за изменениями параметров экрана 
function resizeTimer(){
    //var scrParams = game.getWH();

    //сохраняем состояние игры 
    if (userData !== undefined) {
       userData.save(isGameSpaseUp,totalSeconds,field,playerInventory,gameObjects,entrySide,totalWidth);
    }
    //

  /*if(scrParams.w != width || scrParams.h != height){//Если изменились
    width = scrParams.w;
    height = scrParams.h;
    //Перерасчитываем все элементы игры
    resizeAllElements();
  }*/
  setTimeout("resizeTimer()",checkScreenTimeout);
}

//Отрисовывает команды на слое команд
function drawCommandsOnField(){
  OOP.forArr(field,function(el){
      //Если это дорога
      if(el.code == roadCode || el.code == entryCode){
        //Если команда назначена
        if(el.getTotalCommands() > 0){
          var img = game.newImageObject({
            file : COMMANDS[0].imgSource,
            x : el.X,
            y : el.Y,
            w : el.W,
            h : el.H
          });
          img.draw();
        }   
      }
  });
}

//Рисует на экране меню команд
function showCommandsMenu(){
  
  commandsMenuLayer.on(function(){

      if(lastClickedIndx == -1) {
        return;
      }
      //Отображаем скролл бары для выбора команд в клетке
      OOP.forArr(Scrolls,function(scroll){
        scroll.DrawScrollBar();
      });
      //Отображаем кнопку ОК
      okB.draw();
  });
}