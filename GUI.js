//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними


var startB = null; //ктопка старт
var menuB = null; //ктопка меню
var reloadB = null;//Кнопка перезагрузки лабиринта
var timerText = null; //текст таймера
var progressText = null; // количество ходов

var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню

var scrollSpeed = 0.5;
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
//   var result = false;
//   if(commandsMenuElements === null || commandsMenuElements.length === 0)
//     commandsMenuElements = getAllCommandsMenu();
//   //Если открыт интерфейс выбор команды для клетки
// 	if(lastClickedIndx != -1){
//     OOP.forArr(commandsMenuElements,function(el){
//   	        //Если выбрали команду, то назначем этому элементу поля эту команду
// 	          if(isLeftClicked(el) && el.visible){
// 	            //Если выбрали пустую команду, то очищаем весь стек команд на этом элементе
//     	        if(el.command == COMMANDS[0]) field[lastClickedIndx].commands = new Array();
//     	        else {
//     	          //Добавляем в стек команду если ещё есть место на этом полеоля
//     	          if(getTotalCommandsOnField() < totalCommandsAllowed)
//     	            field[lastClickedIndx].commands.push(el.command);
//     	          else alert("Память робота переполнена");
//     	        }
// 	            lastClickedIndx = -1;
// 	            result = true;
// 	            return;
// 	          }
// 	          else showCommandsMenu();
// 	        });
// 	 }
// 	 else {
// 	   commandsMenuLayer.clear();
// 	   //Обрабатывае нажатия на кнопк
      showCommandsMenu();
 	   isButtonPressed();
// 	 }
// 	 return result;
	 
// 	 if(lastClickedIndx != -1){
// 	   if(scrollBar())
// 	    result = true;
// 	 }
// 	 return result;
      return true;
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
    reloadB.setPositionS(point(5, height- startB.h - 5));
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

function ScrollBar(itemsArray,locationBar){
  
  if(itemsArray.length < 1)
    return;
  this.allItems = itemsArray;
  this.locationBar = locationBar;
  
  var fristItemW = this.allItems[this.allItems.length-1].w;
  var fristItemH = this.allItems[this.allItems.length-1].h;
  var fristItemX = this.allItems[this.allItems.length-1].x;
  var fristItemY = this.allItems[this.allItems.length-1].y;
  
  var lastItemW = this.allItems[this.allItems.length-1].w;
  var lastItemH = this.allItems[this.allItems.length-1].h;
  var lastItemX = this.allItems[this.allItems.length-1].x;
  var lastItemY = this.allItems[this.allItems.length-1].y;

        //ИНИЦИАЛИЗИРУЕМ BACKGROND
         var X,Y,W,H;
        switch (this.locationBar) {
          case 'UP':
            X = gameSpaceW / 100 * 20;//20%
            Y = 0;
            W = gameSpaceW / 100 * 60;
            H = gameSpaceW / 100 * 30;
            break;
          case 'DOWN':
            X = gameSpaceW / 100 * 20;//20%
            Y = gameSpaceH-(gameSpaceH/100*30);
            W = gameSpaceW / 100 * 60;
            H = gameSpaceW / 100 * 30;
            break;
          case 'LEFT':
            X = 0;
            Y = gameSpaceH / 100 * 20;
            W = gameSpaceH / 100 * 30;
            H = gameSpaceH / 100 * 60;
            break;
          case 'RIGHT':
            X = gameSpaceH / 100 * 70;
            Y = gameSpaceH / 100 * 20;
            W = gameSpaceH / 100 * 30;
            H = gameSpaceH / 100 * 60;
            break;
          case 'CENTER':
            X = gameSpaceW / 100 * 20;
            Y = gameSpaceH / 100 * 35;
            W = gameSpaceH / 100 * 60;
            H = gameSpaceH / 100 * 30;
          default:
            return;
        } 
        var backGround = game.newRectObject({x : X, y : Y, h: H, w: W , fillColor : "transparent"}); //задний фон от которого зависит прозрачность элементв
        OOP.forArr(this.allItems,function(el){
           backGround.addChild(el);
        });
        log("backGroundX: "+backGround.x + " backGroundY: "+backGround.y + " backGroundW: "+ backGround.w+ " backGroundH: "+backGround.h);
       // bar = game.newRectObject({x : 100, y : 175, h: 5, w: 160, fillColor : "red"});  //полоска бара
//Функция реализующая скролл с командами на экране
this.scrollUpdate = function()
{
  var rXElLast = this.allItems[this.allItems.length-1].x + lastItemW; // координаты правого верхнего по Х  угла 0 элемента
  var FrsElemX =  this.allItems[this.allItems.length-1].x;
  var rXBG =  backGround.x +  backGround.w;   // координаты правого верхнегопо Х заднего
  //обход всех дочерных элементов (графические элементы меню)
	OOP.forArr(backGround.children,function(el)
	{
	  el.draw();
	  //если палец зажат
	  if(touch.isDown() && touch.isInObject(backGround))
     { 
             //var speed = touch.getSpeed().x * scrollSpeed;
            if(touch.getSpeed().x > 0 )// палец вправо
            {
              if(FrsElemX < backGround.x)
              {log(FrsElemX);
               el.x +=touch.getSpeed().x * scrollSpeed; // перемещаем элементы по Х с динамической скоростью
              }
            }else if (touch.getSpeed().x <= 0) // палец влево
            {
              if(rXElLast >= 0)
              {
                el.x +=touch.getSpeed().x* scrollSpeed; // перемещаем элементы по Х с динамической скоростью
              }
            }
     }
    //else if(touch.isPeekObject(el)) return true;//Если элемент выбрали
	  //изчезновение элементов
	  if(el.x < rXBG || el.x > backGround.x)
	  {
	    var alpha = 0.03;
	    el.setVisible(true);
	    
	    if(el.x+el.w > rXBG)
	    {
	      var aX = rXBG - el.x;
	      el.setAlpha(aX*alpha);
	    }
	    if(el.x < backGround.x)
	    {
	      var aX = (el.x + el.w)- backGround.x;
	      el.setAlpha(aX*alpha);
	    }
	    if(el.alpha <= 0)
	      el.setVisible(false);
	  }else
	  {
	    el.setVisible(false);
	  }
	});
	//return false;
} 
  
}