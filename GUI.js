//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними

var buttonStartImgSrc = "img/interface/startButton.png";
var buttonStopImgSrc = "img/interface/stopButton.png";
var menuButtonImgSrc = "img/interface/menuButton.png";
var reloadButtonImgSrc = "img/interface/reloadButton.png";
var startB = null; //ктопка старт
var menuB = null; //ктопка меню
var reloadB = null;//Кнопка перезагрузки лабиринта
var timerText = null; //текст таймера
var progressText = null; // количество ходов
var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX=0,gameSpaceY=0;
var gameSpaceW=0,gameSpaceH=0;
var guiTextColor = "white";



//Отрисовывает элементы интерфейса
function drawGUI(){
  startB.draw();
  menuB.draw();
  reloadB.draw();
  timerText.draw();
  updateTextOnGui();
  progressText.draw();
}

//Обработчик нажатий нвсе кнопки интерфейса
function isButtonPressed(){
  
  if(isLeftClicked(startB)){//КНОПКА СТАРТА/СТОПА
    startB.isPlay = !startB.isPlay;
    if(startB.isPlay)
      setTimeout("processRobotMove()", robotMoveDelay);
  }
  else if(isLeftClicked(reloadB)){//КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
    if(!startB.isPlay)
      initializeGame();
  }
  else if(isLeftClicked(menuB)){//КНОПКА МЕНЮ
  
  }
}

//Возвращает true если пользователь нажал на отображенный элемент GUI
function isGuiClick(){
  var result = false;
  //Если открыт интерфейс выбор команды для клетки
	if(lastClickedIndx != -1){
	      
	 commandsMenuLayer.on( function(){
    OOP.forArr(commandsMenuElements,function(el){
  	        //Если выбрали команду, то назначем этому элементу поля эту команду
	          if(isLeftClicked(el.image)){
	            //Если выбрали пустую команду, то очищаем весь стек команд на этом элементе
    	        if(el.command == COMMANDS.NONE) field[lastClickedIndx].commands = new Array();
    	        else {
    	          //Добавляем в стек команду если ещё есть место на этом полеоля
    	          if(getTotalCommandsOnField() < totalCommandsAllowed)
    	            field[lastClickedIndx].commands.push(el.command);
    	          else alert("Память робота переполнена");
    	        }
	            lastClickedIndx = -1;
	            result = true;
	            return;
	          }
	          else showCommandsMenu();
	        });
	      });
	 }
	 else {
	   commandsMenuLayer.clear();
	   //Обрабатывае нажатия на кнопки
	   isButtonPressed();
	 }
	 return result;
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui(){
  //Смотрим сколько комманл уже есть на поле
  var totalCommands = getTotalCommandsOnField();
  //Обновляем текст об этом
  progressText.text = "Ходов: " + totalCommands + " из " + totalCommandsAllowed;
  //Обновляем инфу о времени
  var min = Math.floor(totalSeconds / 60);
  var sec = Math.floor(totalSeconds - min * 60);
  //Обновляем инфу о времени
  timerText.text = "Прошло времени: " + (min < 10 ? "0" + min:min) + ":" + (sec < 10 ? "0" + sec:sec);
}

//Функция для инициализации кнопки старт/стоп
function startBInit()
{
  
  if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  
  startB = game.newImageObject({x : 0, y : 0,w : menuItemW, h : menuItemH, file : buttonStartImgSrc});
  
  //Задаем стартовое состояние кнопки
  startB.setUserData({
    isPressed : false
  });
  
  //Описываем обработчик для отрисовки кнопки
  startB.ondraw = function(){
    if(this.isPlay)
      this.setImage(buttonStopImgSrc);
    else this.setImage(buttonStartImgSrc);
  };
  
  if(width < height)
  {
  startB.setPositionS(point(width/2 - startB.w/2, height- startB.h - 5));
  }else
  {
    startB.setPositionS(point(gameSpaceW+5, gameSpaceH - startB.h - 5));
  }
  
}

function menuBInit()
{
  
  if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  
  menuB = game.newImageObject({x : 0, y : 0,w : menuItemW, h : menuItemH, file : menuButtonImgSrc});
  
  if(width < height)
  {
  menuB.setPositionS(point(gameSpaceW - menuItemW-5, height- startB.h - 5));
  }else
  {
    menuB.setPositionS(point(width - menuItemW-5, gameSpaceH - startB.h - 5));
  }
  
}

function reloadBInit(){
  
   if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  
  reloadB = game.newImageObject({x : 0, y : 0,w : menuItemW, h : menuItemH, file : reloadButtonImgSrc});
  
  if(width < height)
  {
    reloadB.setPositionS(point((startB.x + menuB.x) / 2, height- startB.h - 5));
  }else
  {
    reloadB.setPositionS(point((startB.x + menuB.x) / 2, gameSpaceH - startB.h - 5));
  }
  
}

function timerTextInit()
{
  if(width < height)
  {
    var siz = (width/100)*4;
    timerText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Прошло времени: 00:00", size : siz, color : guiTextColor} );
    timerText.setPositionS(point(5, 5));
  }else
  {
    var siz = ((width - gameSpaceW)/100)*8;
    timerText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Прошло времени: 00:00", size : siz, color : guiTextColor} );
    timerText.setPositionS(point(gameSpaceW+5, 5));
  }
  
}

function progressTextInit()
{
  if(width < height)
  {
    var siz = (width/100)*4;
    progressText = game.newTextObject({x : 0, y : 0, text : "Ходов: 00 из 00", size :siz, color : guiTextColor} );
    progressText.setPositionS(point(width - progressText.w, 5));
  }else
  {
    var siz = ((width - gameSpaceW)/100)*8;
    progressText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Ходов: 00", size : siz, color :  guiTextColor} );
    progressText.setPositionS(point(gameSpaceW+5, timerText.h+5));
  }
  
}

function initGUI()
{//поочередность иницилизаии ОБЯЗАТЕЛЬНА для правильного расположения меню
//1 - initGameSpace
//2 - startBInit
//3 - menuBInit 
//..timerTextInit();
// progressTextInit();
  menuItemH = (height / 100) * 10;
  menuItemW = (width / 100) * 10;
  
  initGameSpace();
  startBInit();
  menuBInit();
  reloadBInit();
  timerTextInit();
  progressTextInit();
}


function initGameSpace()
{   var ind = 0;
    if(width < height)
    {
      gameSpaceX = ind;
      gameSpaceW = width;
      gameSpaceH = gameSpaceW;
      if(height - gameSpaceH < (menuItemH*2)+20)
        gameSpaceY = menuItemH+10;
        else
        gameSpaceY = menuItemH + 10;
    }
    else
    {
    // gameSpaceH = height - (menuItemH*1.3)*2;
    // gameSpaceW = gameSpaceH;
    // if(height - gameSpaceH >= (menuItemH*1.3)*2)
    // {
    //   gameSpaceY = (menuItemH*1.3)
    // }else
    // gameSpaceY = (height / 4)-(menuItemH*1.3);
    //   gameSpaceX = (width / 2) - gameSpaceW/2;// - (h / 2);
    
    gameSpaceX = 0;
    gameSpaceY = 0;
    gameSpaceH = height;
    gameSpaceW = gameSpaceH;
 
    }
}
