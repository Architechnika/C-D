//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними


var startB = null; //ктопка старт
var menuB = null; //ктопка меню
var okB = null; // кнопка ок(при нажатии на которую заканчивается ввод команд в клетку)
var reloadB = null;//Кнопка перезагрузки лабиринта
var timerText = null; //текст таймера
var progressText = null; // количество ходов

var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню

var scrollSpeed = 0.5;
var guiTextColor = "white";

var Scrolls = new Array();// массив всех скролбаров

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
  okBInit();  
  
  timerTextInit();
  progressTextInit();
  Scrolls = new Array();
  //Инииализируем скролл бары
  Scrolls.push(new ScrollBar(getAllCommandsMenu(100,100),"DOWN",2));
  Scrolls.push(new ScrollBar(getAllCommandsMenu(100,100),"UP",1));
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

function okBInit(){
  if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  okB = game.newImageObject({x : 0, y : 0,w : gameSpaceW / 100 * 30, h : gameSpaceH / 100 * 10, file : okButtonImgSrc});
  okB.setPositionS(point(gameSpaceX + (gameSpaceW/2 - okB.w/2),gameSpaceY + (gameSpaceH - okB.h)));
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

function ScrollBar(itemsArray,locationBar,_lineCount,posX,posY){
  //проверяем входящий массив на пустосу
  if(itemsArray.length < 1)
    return;
  this.allItems = itemsArray;
  this.locationBar = locationBar; //орентация скролбара
  var backGround = null;
  
  var lineCount ;  //количество линий элементов в строке
  if(_lineCount == null)
      lineCount = 2;
      else
      lineCount = _lineCount;
  var speedVector = 0;
  var scrollOrientXorY=0;
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
      if(posX == null)
        X = gameSpaceX + (gameSpaceW / 100 * 20);//20%
      else
        X = posX
      if(posY == null)
        Y = gameSpaceY + (gameSpaceH / 100 * 6);
      else
        Y = poxY;
      W = gameSpaceW / 100 * 80;
      H = gameSpaceW / 100 * (15*lineCount);
      break;
    case 'DOWN':
      W = gameSpaceW / 100 * 80;
      H = gameSpaceW / 100 * (15*lineCount);
      if(posX == null)
        X = gameSpaceX + (gameSpaceW / 100 * 20);//20%
      else
        X = posX;
      if(posY == null)
        Y = (gameSpaceH+gameSpaceY) - (H + 100);//(gameSpaceH / 100 * 25));
      else
        Y = posY;
      break;
    case 'LEFT':
      if(posX == null)
        X = gameSpaceX + (gameSpaceW / 100 * 5);
      else
        X = posX
      if(posY == null)
        Y = gameSpaceY + (gameSpaceH / 100 * 6);
      else
        Y = poxY;
      W = gameSpaceH / 100 * (15*lineCount);
      H = gameSpaceH / 100 * 50;
      break;
    case 'RIGHT':
      if(posX == null)
        X = gameSpaceH / 100 * 70;
      else
        X = posX
      if(posY == null)
        Y = gameSpaceH / 100 * 20;
      else
        Y = poxY;
      W = gameSpaceH / 100 * (15*lineCount);
      H = gameSpaceH / 100 * 50;
      break;
    case 'CENTER':
      if(posX == null)
        X = gameSpaceW / 100 * 20;
      else
        X = posX
      if(posY == null)
        Y = gameSpaceH / 100 * 35;
      else
        Y = poxY;
      W = gameSpaceH / 100 * 50;
      H = gameSpaceH / 100 * (15*lineCount);
    default:
      return;
  } 
  backGround = game.newRectObject({x : X, y : Y, h: H, w: W , fillColor : "transpatent"}); //задний фон от которого зависит прозрачность элементв
  // OOP.forArr(this.allItems,function(el,i){
  //   backGround.addChild(el);
  //   // log(el.x+" "+el.y+ " "+i);
  // });
  backGround.w *=0.8;
  backGround.h *=0.8;
  
  this.getBackGround = function(){
    return backGround;
  }
  
  function sortElementsUpDownCenter(arr)
  {
    this.sortArr = arr;
    var arrMediana = Math.ceil(this.sortArr.length/lineCount);
    var itemHW = backGround.h/lineCount;
    var itemX = backGround.x;
    var itemY = backGround.y;
  //  while(arrMediana % lineCount != 0)
     // arrMediana++;
    OOP.forArr(this.sortArr,function(el,i)
    {
       el.x = itemX;
       el.y = itemY;
       el.w = itemHW;
       el.h = itemHW;
       if(i % arrMediana == 0)
       {
         itemX = backGround.x;
         itemY +=itemHW;
       }else
       itemX+=itemHW;
    });
    return this.sortArr;
  }
  
  function sortElementsLeftRight(arr)
  {
    this.sortArr = arr;
    var arrMediana = Math.ceil(this.sortArr.length/lineCount);
    var itemHW = backGround.w/(lineCount);
    var itemX = backGround.x;
    var itemY = backGround.y;
    OOP.forArr(this.sortArr,function(el,i)
    {
       el.x = itemX;
       el.y = itemY;
       el.w = itemHW;
       el.h = itemHW;
       if(i % arrMediana == 0)
       {
         itemY = backGround.y;
         itemX +=itemHW;
       }else
       itemY+=itemHW;
       log(el.x+" "+el.y+ " "+i);
    });
    return this.sortArr;
  }
  
  var items;
  if(locationBar == "UP" || locationBar == "DOWN" || locationBar == "CENTER")
    items = sortElementsUpDownCenter(this.allItems);
    else
    items = sortElementsLeftRight(this.allItems);
  log("backGroundX: "+backGround.x + " backGroundY: "+backGround.y + " backGroundW: "+ backGround.w+ " backGroundH: "+backGround.h);
  // bar = game.newRectObject({x : 100, y : 175, h: 5, w: 160, fillColor : "red"});  //полоска бара
  

//Функция реализующая скролл с командами на экране
this.scrollUpdate = function(scrollVal)
{
  backGround.draw();
  var rXElLast = this.allItems[0].x + lastItemW; // координаты правого верхнего по Х  угла 0 элемента
  var rYElLast = this.allItems[0].y + lastItemW;
  var FrsElemX =  this.allItems[this.allItems.length-1].x;
  var FrsElemY =  this.allItems[this.allItems.length-1].y;
  var rXBG =  backGround.x +  backGround.w;   // координаты правого верхнегопо Х заднего
  var rYBG =  backGround.y +  backGround.h; 
  //обход всех дочерных элементов (графические элементы меню)
	OOP.forArr(items,function(el)
	{
	  if(scroll.x !== 0 || scroll.y !== 0)
     {
     if(locationBar == "UP" || locationBar == "DOWN" || locationBar == "CENTER")
      {
        if(scrollVal.x > 0 )
         {
              if(FrsElemX < backGround.x)
              {
               el.x +=scrollVal.x * scrollSpeed; // перемещаем элементы по Х с динамической скоростью
              }
         }else if (scrollVal.x <= 0) 
            {
              if(rXElLast >= rXBG)
              {
                el.x +=scrollVal.x* scrollSpeed; // перемещаем элементы по Х с динамической скоростью
              }
            }
            
        if(el.x < rXBG || el.x > backGround.x)
    	  {
    	    var alpha = 0.004;
    	    el.setVisible(true);
    	    
    	    if(el.x+el.w > rXBG)
    	    {
    	      var aX = rXBG - el.x;
    	      el.setAlpha(aX*alpha);
    	    }
    	    if(el.x < backGround.x )
    	    {
    	      var aX = (el.x + el.w)- backGround.x;
    	      el.setAlpha(aX*alpha);
    	    }
    	    if(el.x > backGround.x && (el.x+el.w < rXBG))
    	    el.setAlpha(1);
    	    if(el.alpha <= 0)
    	      el.setVisible(false);
    	  }else
    	  {
    	    el.setVisible(false);
    	  }
      }
    else
      {
        if(scrollVal.y > 0 )
           {
              if(FrsElemY < backGround.y)
              {
               el.y +=scrollVal.y * scrollSpeed; 
              }
           }else if (scrollVal.y <= 0) 
            {
              if(rYElLast >= rYBG)
              {
                el.y +=scrollVal.y* scrollSpeed; 
              }
            }
            
   if(el.y < rYBG || el.y > backGround.y)
	  {
	    var alpha = 0.05;
	    el.setVisible(true);
	    if(el.y+el.h >= backGround.h+backGround.y)
	    {
	      var aY = rYBG - el.y;
	      el.setAlpha(aY*alpha);
	    }
	    if(el.y < backGround.y)
	    {
	      var aY = (el.y + el.w)- backGround.y;
	      el.setAlpha(aY*alpha);
	    }
	    if(el.alpha <= 0)
	      el.setVisible(false);
	  }else
	  {
	    el.setVisible(false);
	  }
      }
     }
	  //изчезновение элементов
	});
	//return false;
}

this.draw = function(){
        OOP.forArr(items,function(el)
      	{
      	  el.draw();
      	});
      }
  
}