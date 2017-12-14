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
  //Отрисовываем кнопки
  startB.draw();
  menuB.draw();
  reloadB.draw();
  
  //Отрисовываем текстовые поля
  updateTextOnGui();
  timerText.draw();
  progressText.draw();
  
  //Отрисовываем интерфейс выбора команд
  showCommandsMenu();
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
  if(Scrolls.length == 0){
    Scrolls = new Array();
    //Инииализируем скролл бары
    Scrolls.push(new ScrollBar(getAllCommandsMenu(100,100),"DOWN",2));
  }
  else{
    var result = [];
    OOP.forArr(Scrolls,function(scr){
      result.push(new ScrollBar(scr.allItems,scr.locationBar,scr.lineCount));
    });
    Scrolls = result;
  }
  //Scrolls.push(new ScrollBar(getAllCommandsMenu(100,100),"UP",1));
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui(){
  //Смотрим сколько комманл уже есть на поле
  var totalCommands = getTotalCommandsOnField();
  //Обновляем текст об этом
  progressText.text = "Команд: " + totalCommands + " из " + totalCommandsAllowed;
  //Обновляем инфу о времени
  var min = Math.floor(totalMiliSeconds / 200 / 60);
  var sec = Math.floor(totalMiliSeconds / 200 - min * 60);
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
    if(lastClickedIndx != -1) this.setVisible(false);
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
  
  okB = game.newImageObject({x : startB.x, y : startB.y,w : startB.w, h : startB.h, file : okButtonImgSrc});
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
    progressText = game.newTextObject({x : 0, y : 0, text : "Команд: 00 из 00", size :siz, color : guiTextColor} );
    progressText.setPositionS(point(width - progressText.w, 5));
  }else
  {
    var siz = ((width - gameSpaceW)/100)*8;
    progressText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Команд: 00", size : siz, color :  guiTextColor} );
    progressText.setPositionS(point(gameSpaceW+5, timerText.h+5));
  }
  
}

//Функция для инициализации верхнего скрола командами
function initUpScroll(initArray){
  var found = false;
  OOP.forArr(Scrolls,function(scroll,i){
    //Ищем верхний скролл
    if(scroll.locationBar == "UP"){
      
      Scrolls[i] = new ScrollBar(initArray,"UP",1);//Реинициализируем его
      
      found = true;
      return;
    }
  });
  
  if(!found) Scrolls.push(new ScrollBar(initArray,"UP",1));
}

function ScrollBar(itemsArray,locationBar,_lineCount,posX,posY){
  //проверяем входящий массив на пустосу
  this.allItems = itemsArray;
  this.locationBar = locationBar; //орентация скролбара
  var backGround = null;
  var bar = null;
  this.lastElRX = 0;
  this.fristElX = 0;
  var dHW = 0.8; //сжатие background
  var scrollItemsSize = 20; // размер окна скрола на экране устройств в процентном соотношении %
  var lineCount ;  //количество линий элементов в строке
  var barBackGround = null;
  if(_lineCount == null)
      lineCount = 1;
      else
      lineCount = _lineCount;
  var speedVector = 0;
  var scrollOrientXorY=0;
  
  this.isItemsArrEmpty = function()
  {
    if (this.allItems.length > 0)
    return false
    else 
    return true;
  }
  
  
  //ИНИЦИАЛИЗИРУЕМ BACKGROND
  var X,Y,W,H;
  var barX,barY,barW,barH;
  switch (this.locationBar) {
    case 'UP':
      if(posX == null)
       X = gameSpaceX + (gameSpaceW - W*dHW)/2;
      else
        X = posX
      if(posY == null)
        Y = gameSpaceY;
      else
        Y = poxY;
      W = gameSpaceW/dHW;
         //если рабочая область в зависимости от эркана устройства  меньше 400 то увеличиваем для него размер элементов скролла
    if(gameSpaceW <= 400)
       scrolItemsSize = 25;
      H = gameSpaceW / 100 * (scrollItemsSize*lineCount);
      barX = X;
      barH = 10;
      barY = Y + (H*dHW);
      barW = W*dHW;
      break;
    case 'DOWN':
        W = gameSpaceW;
        //если рабочая область в зависимости от эркана устройства  меньше 400 то увеличиваем для него размер элементов скролла
        if(gameSpaceW <= 400)
          scrollItemsSize = 25;
        H = gameSpaceW / 100 * (scrollItemsSize*lineCount);
        if(posX == null)
          X = gameSpaceX + (gameSpaceW - W*dHW)/2;
        else
          X = posX;
        if(posY == null)
          Y = gameSpaceY + ((gameSpaceH - H*dHW) - 10);
        else
          Y = posY;
        barX = X;
        barH = 10;
        barY = Y + (H*dHW);
        barW = W*dHW;
      
      break;
    case 'LEFT':
      if(posX == null)
        X = gameSpaceX + (gameSpaceW / 100 * 5);
      else
        X = posX
      if(posY == null)
        Y = gameSpaceY + (gameSpaceH / 100 *10);
      else
        Y = posY;
         //если рабочая область в зависимости от эркана устройства  меньше 400 то увеличиваем для него размер элементов скролла
      if(gameSpaceW <= 400)
         scrollItemsSize = 25;
      W = gameSpaceH / 100 * (scrollItemsSize*lineCount);
      H = gameSpaceH / 100 * 50;
      barH = H*dHW;
      barW = 10;
      barX = X-barW;
      barY = Y;
      break;
    case 'RIGHT':
      if(posX == null)
        X = gameSpaceH / 100 * 70;
      else
        X = posX
      if(posY == null)
        Y = gameSpaceY + (gameSpaceH / 100 *10);
      else
        Y = poxY;
      W = gameSpaceH / 100 * (scrollItemsSize*lineCount);
      H = gameSpaceH / 100 * 50;
      barH = H*dHW;
      barW = 10;
      barX = X+(W*dHW);
      barY = Y;
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
      barX = X;
      barH = 10;
      barY = Y + (H*dHW)-barH;
      barW = W*dHW;
    default:
      return;
  } 
  backGround = game.newRectObject({x : X, y : Y, h: H, w: W , fillColor : "transpatent"}); //задний фон от которого зависит прозрачность элементв
 // if(gameSpaceW >=400)
  //{
  backGround.w *=dHW;
  backGround.h *=dHW;
 // }
  
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
    OOP.forArr(this.sortArr,function(el,i)
    {
       el.drawDynamicBox("black");
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
       if(!el.isIntersect(backGround))
        {
          el.setVisible(false)
        }
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
      if(!el.isIntersect(backGround))
        {
          el.setVisible(false)
        }
    });
    return this.sortArr;
  }
  
  var items;
  if(locationBar == "UP" || locationBar == "DOWN" || locationBar == "CENTER")
    {
      items = sortElementsUpDownCenter(this.allItems);
      bar = game.newRoundRectObject({x : barX, y :  barY, h: barH, w: barW, radius : 5, fillColor : "red"})
      barBackGround = game.newRoundRectObject({x : barX, y : barY, h: barH, w: backGround.w, radius : 10, fillColor : "#ffba42"})
       bar.w *= backGround.w/((items.length*(backGround.h/lineCount))/lineCount);
      if(items.length <=5){
        bar.w = 0; 
        barBackGround.setVisible(false);
        bar.setVisible(false);
      }
      else {
        barBackGround.setVisible(true);
        bar.setVisible(true);
      }
    }
    else
    {
      items = sortElementsLeftRight(this.allItems);
      bar = game.newRoundRectObject({x : barX, y :  barY, h: barH, w: barW, radius : 5, fillColor : "red"})
      barBackGround = game.newRoundRectObject({x : barX, y :  barY, h: barH, w: barW, radius : 5, fillColor : "#ffba42"})
       bar.h *= backGround.h/((items.length*(backGround.w/lineCount))/lineCount);
      if(items.length <=5){
        bar.h = 0;
        barBackGround.setVisible(false);
        bar.setVisible(false);
      }
      else {
       
        barBackGround.setVisible(true);
        bar.setVisible(true);
      }
    }
    
this.setBarAlpha = function (alpha)
{
  bar.setAlpha(alpha);
  barBackGround.setAlpha(bar.getAlpha()+0.5)
}  
    
//Функция реализующая скролл с командами на экране
this.scrollUpdate = function(scrollVal)
{
  if(!this.isItemsArrEmpty())
  {
  backGround.draw();
  var rXElLast = this.allItems[0].x + this.allItems[0].w; // координаты правого верхнего по Х  угла 0 элемент
  //var rXElLast = items[0].x + lastItemW;
  var rYElLast = this.allItems[0].y + this.allItems[0].w;
  var FrsElemX =  this.allItems[this.allItems.length-1].x;
  var FrsElemY =  this.allItems[this.allItems.length-1].y;
  var rXBG =  backGround.x +  backGround.w;   // координаты правого верхнегопо Х заднего
  var rYBG =  backGround.y +  backGround.h;
  var dx =0;
  var dy=0;
  var ctxtW = items.length / lineCount * items[0].w;
  var ctxtH = items.length / lineCount * items[0].w;
  bar.setAlpha(1);
  this.lastElRX = rXElLast;
  this.fristElX = FrsElemX;
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
                 dx = scrollVal.x* scrollSpeed;
                 if(FrsElemX + dx >  backGround.x)
                 {
                  // var dSpeed =(FrsElemX+dx) - backGround.x;
                   dx = 0;
                 }
              }
         }else if (scrollVal.x < 0) 
            {
              if(rXElLast >= rXBG)
              {
                 dx = scrollVal.x* scrollSpeed;
                 if(rXElLast + dx <  rXBG)
                 {
                   var dSpeed = rXBG - (rXElLast+dx)
                   dx = dSpeed-5;
                 }
              }
        }
        el.x += dx; // перемещаем элементы по Х с динамической скорость
        
        if(el.x < rXBG || el.x > backGround.x)
    	  {
    	    var alpha = 0.0095;
    	    el.setVisible(true);

    	    if(el.x+el.w >= rXBG)
    	    {
    	      var aX = rXBG - el.x;
    	      el.setAlpha(aX*alpha);
    	    }
    	    if(el.x < backGround.x )
    	    {
    	      var aX = (el.x + el.w)- backGround.x;
    	      el.setAlpha(aX*alpha);
    	    }
    	    if(el.x+5 > backGround.x && (el.x+el.w < rXBG))
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
                dy = scrollVal.y * scrollSpeed;
              if(FrsElemY + dy >  backGround.y)
                {
                // var dSpeed = (FrsElemY+dy) - backGround.y;
                  dy = 0;
                }
              }
           }else if (scrollVal.y <= 0) 
            {
              if(rYElLast >= rYBG)
              {
                dy = scrollVal.y * scrollSpeed;
                if(rYElLast + dy <  rYBG)
                {
                  var dSpeed = rYBG - (rYElLast+dy);
                  dy = dSpeed;
                }
              }
            }
            el.y += dy;
            
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
	bar.x += (backGround.w /100)*-((dx/ctxtW)*100);
	bar.y += (backGround.h /100)*-((dy/ctxtH)*100);
  }
}

this.draw = function(){
      OOP.forArr(this.allItems,function(el)
      	{
      	  if(el !== null || el.length !== 0)
      	  el.draw();
      	});
      	barBackGround.draw();
      	bar.draw();
      }
  this.scrollUpdate(new point(0,0));
}
