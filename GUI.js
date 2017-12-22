//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними


var startB = null; //ктопка старт
var menuB = null; //ктопка меню
var okB = null; // кнопка ок(при нажатии на которую заканчивается ввод команд в клетку)
var reloadB = null;//Кнопка перезагрузки лабиринта
var timerText = null; //текст таймера
var progressText = null; // количество ходов

var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню
var textbackGroundItem = null; //задний фон текстов
var scrollSpeed = 0.5;
var guiTextColor = "red";

var Scrolls = new Array();// массив всех скролбаров

//Отрисовывает элементы интерфейса
function drawGUI(){
  //Отрисовываем кнопки
  startB.draw();
  //menuB.draw();
  //reloadB.draw();
  
  //Отрисовываем текстовые поля
  textbackGroundItem.draw();
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
  menuItemH = (height / 100) * 8;
  menuItemW = (width / 100) * 8;
  
  initGameSpace();
  
  startBInit();
  menuBInit();
  reloadBInit();
  okBInit();  
  
  timerTextInit();
  progressTextInit(); 
  textbackGroundInit("#ffba42",1);
  //ИНИЦИАЛИЗИРУЕМ ИНТЕРФЕЙС РЕДАКТОРА КОМАНД
  if(Scrolls.length == 0){
    Scrolls = new Array();
    //Инииализируем скролл БАР ВСЕХ КОМАНД(ПРАВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
    Scrolls.push(new ScrollBar(gameSpaceX+gameSpaceW,(height/100 * 15),"Vertical",getAllCommandsMenu(50,50),"RIGHT"));
    Scrolls[0].setLineCount(2);
    Scrolls[0].setWidthScroll(width - (gameSpaceX+gameSpaceW))
    Scrolls[0].setHeightScroll(gameSpaceH-1);
  }
  else{
    /*var result = [];
    OOP.forArr(Scrolls,function(scr){
      result.push(new ScrollBar(scr.allItems,scr.locationBar,scr.lineCount));
    });
    Scrolls = result;*/
  }
  //Scrolls.push(new ScrollBar(getAllCommandsMenu(100,100),"UP",1));
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui(){
  //Смотрим сколько комманл уже есть на поле
  var totalCommands = getTotalCommandsOnField();
  //Обновляем текст об этом
  progressText.text = "Батареек собрано: " + playerInventory.length;// totalCommands + " из " + totalCommandsAllowed;
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
  
  startB.setPositionS(point(0, height- startB.h));
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
    var siz = ((width - gameSpaceW)/100)*5;
    timerText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Прошло времени: 00:00", size : siz, color : guiTextColor} );
    timerText.setPositionS(point((gameSpaceX + gameSpaceW)+5, 5));
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
    var siz = ((width - gameSpaceW)/100)*5;
    progressText = game.newTextObject({x : 0, y : 0,h : menuItemH, w : menuItemW, text : "Ходов: 00", size : siz, color :  guiTextColor} );
    progressText.setPositionS(point(gameSpaceX+gameSpaceW+5, timerText.h));
  }
  
}
function textbackGroundInit(color,alpha)
{
   textbackGroundItem = game.newRoundRectObject({x : (gameSpaceX + gameSpaceW), y : 0, w : width- (gameSpaceX+gameSpaceW), h :  height/100 * 15, radius : 20, fillColor : color});
   textbackGroundItem.setAlpha(alpha);
}

//Функция для инициализации верхнего скрола командами
function initDownScroll(initArray){
  var found = -1;
    OOP.forArr(Scrolls,function(scroll,i){
      //Ищем верхний скролл
      if(scroll.name == "DOWN"){
        found = i;
        return;
      }
    });
    if(found == -1){
      Scrolls.push(new ScrollBar(0,(gameSpaceY+gameSpaceH),"Horizontal",initArray,"DOWN"));
      found = Scrolls.length - 1;
    } 
    if(!Scrolls[found].isCaseVisible())
    {
      Scrolls[found].setCaseVisible(true);
    }
    Scrolls[found].initArrayItems(initArray);
}

//Возвращает графическое представление ЛЕВОГО БОКОВОГО СКРОЛА которое соответствует текущему состоянию в интерфейсе
function initLeftScroll(blockImg,initMass){
  //Берем верхнюю команду из стека редактора вложенных комманд
  //Если стек пуст - инициализируем меню редактором скриптов в клетке
  //ИНИЦИАЛИЗИРУЕМ СКРОЛЛ БАР СТЕКА ВЛОЖЕННЫХ КОМАНД(ЛЕВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
  var found = -1;
  OOP.forArr(Scrolls, function(el,i){
    if(el.name == "LEFT"){
      el.initArrayItems(initMass);
      found = i;return;
    }
  });
  
  if(found == -1){
    Scrolls.push(new ScrollBar(0,0,"Vertical",initMass,"LEFT"));
    found = Scrolls.length - 1;
    Scrolls[found].setCaseVisible(true);
  }

  //Сбрасываем скролл если нужно
  if(blockImg === undefined && Scrolls[found].getScrollBarCase().getLeftImg().file !== nonePath){
    Scrolls[found] = new ScrollBar(0,0,"Vertical",initMass,"LEFT");
    Scrolls[found].setCaseVisible(true);
    return;
  }
  //Добавляем картинку на верх скролл бара
  if(blockImg !== undefined){
    //Создаем полную копию обьекта картинки
    var itm = game.newImageObject({
      x : blockImg.x, y : blockImg.y, w : blockImg.w, h : blockImg.h,
      file : blockImg.file
    });
    itm.setUserData({ command : blockImg.command});
    Scrolls[found].getScrollBarCase().setLeftImg(itm);
  }
  if(initMass !== undefined)    //Инициализируем массив элементов скролла
    Scrolls[found].initArrayItems(initMass);  
}

//Класс получает на вход координаты  по X,Y ориентацию Vertical или Horizontal и arr - массив элементов скролла и рисует скролла
//внутри класса есть объект обрисовку которой нужно будет сделать отдельно в другом слое...
function ScrollBar(posX,posY,orientation,arr, name)
{
	//Локализуем полученные данные внутри класса
	this.name = name;
  var barPositionX = posX;
  var barPositionY = posY;
  var backGroundPosX = barPositionX;
  var backGroundPosY = barPositionY;
  var backGroundW = 0;
  var backGroundH = 0;
  var barOrientation = orientation;
  var arrayForBar = arr;
  var lineCount = 1;
  var backGroundAplha = 0.4;
  var backGround = undefined;
  var indicator = undefined;
  var scrollBarCase = undefined;
  var items = undefined;
  var caseVisible = false;
   if(orientation == "Vertical")
      {
        // backGroundH = gameSpaceH - (height - gameSpaceH);
        // backGroundW = (height - gameSpaceH)*lineCount;
        backGroundH = height/100 * 85;
        backGroundW = (height/100 * 15)*lineCount;
      }
    if(orientation == "Horizontal")
      {
        // backGroundW = gameSpaceW - (height - gameSpaceH);
        // backGroundH = (height - (gameSpaceY+gameSpaceH))*lineCount;
        backGroundH = (height/100 * 15)*lineCount;
        backGroundW = height/100*70;
      }
  //методы для установкии получения  координат скролл скроллБара
  this.setPosition = function(x,y)
  {
    barPositionX = x;
    barPositionY = y;
  }
  
  this.getScrollBarCase = function(){
    return scrollBarCase;
  }
  
  // this.setItemsAlpha = function(alpha)
  // {
  //   //OOR.forArr()
  // }
  this.getPositionX = function()
  {
    var tmpX = barPositionX;
    return tmpX;
  }
  this.getPositionY = function()
  {
    var tmpY = barPositionY;
    return tmpY;
  }
  //
  this.setWidthScroll = function(w)
  {
    backGround.setWidth(w)
    items = sortElements(arrayForBar,this.GetBackGround());
    indicator = new Indicator(this.GetBackGround());
    this.setArrayItems(items);
  }
  this.setHeightScroll = function(h)
  {
    backGround.setHeight(h)
    items = sortElements(arrayForBar,this.GetBackGround());
    indicator = new Indicator(this.GetBackGround());
    this.setArrayItems(items);
  }
  //методы для работы с массивом элементов скролл бара
  this.setArrayItems = function(arrayItems)
  {
    arrayForBar = arrayItems;
  }
  
  this.initArrayItems = function(arrayToInit){
    //arrayForBar = arrayToInit;
    items = sortElements(arrayToInit,backGround.getBackGround());
    indicator = new Indicator(backGround.getBackGround());
    this.setArrayItems(items);
  }
  this.getArrayItems = function()
  {
    var tmpArray = arrayForBar;
    return tmpArray;
  }
  this.AddItem = function(item)
  {
    if(imte.type == "ImageObject()") //проверяем тип объекта, который передали для добавления
    {
      arrayForBar.push(item);
      items = sortElements(arrayForBar,backGround.getBackGround());
      this.setArrayItems(items);
    }
    else
      log("Тип передоваемого объекта не  ImageObject()");
  }
  this.getItem = function(i)
  {
    if(arrayForBar.length > 0 && (arrayForBar.length-1) >= i)
      return arrayForBar[i];
    else
      log("Всего элементов в массиве: "+arrayForBar.length+ " Вы хотете получить из массива: "+i+" Элемент, правильно?");
  }
  this.removeItem = function(i)
  {
    if(arrayForBar.length > 0 && (arrayForBar.length-1) >= i)
    {
      arrayForBar.splice(i,1);
      items = sortElements(arrayForBar,backGround.getBackGround());
      this.setArrayItems(items);
    }
    else
      log("Всего элементов в массиве: "+arrayForBar.length+ " Вы хотете удалить из массива: "+i+" Элемент, правильно?");
  }
  this.isEmptyBarArray = function()
  {
    if(arrayForBar === undefined || arrayForBar.length<=0)
     return true;
    else return false;
  }
  //
  this.getIndicator = function()
  {
    var tmpInd = indicator;
    return tmpInd;
  }
  //Задний фон скороллбара, кнему будут привязаны элементы движения, изчезнования будут зависить от него, это не просто обычный фон, это основа бара
  function BackGround(x,y,w,h)
  {
    var bgX = x;
    var bgY = y;
    var bgW = w;
    var bgH = h;
    var alpha = 1;
    var bgColor = "red";
    if(orientation == "Vertical")
      {
        bgW*=lineCount;
      }
    if(orientation == "Horizontal")
      {
        bgH*=lineCount;
      }
    var tmpBackGround = game.newRoundRectObject({x : bgX, y : bgY, w : bgW, h : bgH, radius : 20, fillColor : bgColor});
    this.setWidth = function(w)
    {
      tmpBackGround.w = w;
  //       items = sortElements(arrayForBar,this.GetBackGround());
  // indicator = new Indicator(this.GetBackGround());
  // this.setArrayItems(items);
    }
    this.setHeight = function(h)
    {
      tmpBackGround.h = h;
    }
    this.setX = function(x)
    {
      tmpBackGround.x = x;
    }
    this.setY = function(y)
    {
      tmpBackGround.y = y; 
    }
    this.setColor = function(color)
    {
      tmpBackGround.fillColor = color;
    }
    this.setAlphaBG = function (alph)
    {
      if(alph >=0 && alph <=1)
          tmpBackGround.setAlpha(alph);
    }
    this.getBackGround = function()
    {
      return tmpBackGround;
    }
    this.getActivityArea = function(){
      var area = game.newRoundRectObject({x : bgX, y : bgY-bgH, w : bgW, h : bgH * 3, radius : 20, fillColor : bgColor});
      return area;
    }
  }
  //кейс для скроллБара на вход получаем задний фон Скролла и левую и правую картинку дальше рисуем кейс соответствующим методом
  //внимание!! рисовать кейс для бара нужно обязательно на слове выше чем сам скроллБар
  function ScrollBarrCase(scrollBackGround,leftImg,rightImg)
  {
    var X = scrollBackGround.x;
    var Y = scrollBackGround.y;
    var W = scrollBackGround.w;
    var H = scrollBackGround.h;
    var LImg = leftImg;
    var RImg = rightImg;
    var tmpH = 0;
    var tmpX = 0;
    var tmpY = 0;
    var tmpW = 0;
    if(orientation == "Vertical")
    {
      tmpH = -W;
      tmpW =  W;
      tmpY =  Y+H+W;
    }
    if(orientation == "Horizontal")
    {
      tmpH = H;
      tmpW = W;
      tmpY = Y;
    }
    
    this.setLeftImg = function(img)
    {
      /*if(img === undefined) 
        img = game.newImageObject({x: 0, y: 0, h: 0, w: 0, file: nonePath});*/
      img.x = X - tmpH;
      img.y = Y;
      img.h = tmpH;
      img.w = tmpH;
      LImg = img;
    }
    this.setRightImg = function(img)
    {
      img.x = X + tmpW;
      img.y = tmpY;
      img.h = tmpH;
      img.w = tmpH;
      RImg = img;
    }
    this.setLeftImgVisible = function(visible)
    {
      LImg.setVisible(visible);
    }
    this.setRightImgVisible = function(visible)
    {
      RImg.setVisible(visible);
    }
    
    this.getLeftImg = function()
    {
      var tmpLImg = LImg;
      return tmpLImg;
    }
    this.getRightImg = function()
    {
      var tmpRImg = RImg;
      return tmpRImg;
    }
    this.getImgWidth = function()
    {
      return tmpH;
    }
    if(LImg == undefined)
    {
       var tmp = game.newImageObject({x: 0, y: 0, h: 0, w: 0, file: nonePath});
       this.setLeftImg(tmp);
    }else this.setLeftImg(LImg);
    if(RImg == undefined)
    {
      var tmp = game.newImageObject({x: 0, y: 0, h: 0, w: 0, file: nonePath});
      this.setRightImg(tmp);
    }else this.setRightImg(RImg);
    
    this.DrawCase = function()
    {
      if(LImg != undefined)
        LImg.draw();
      if(RImg != undefined)
        RImg.draw();
    }
  }
  //индикатор который показывает сколько в скоролле элементов полоской, на вход получает задний фон скролла и по соответствии него рисует полоску
  function Indicator(scrollBackGround)
  {
    var X = 0;
    var Y = 0;
    var W = 0;
    var H = 0;
    var barBackGroud = undefined;
    var bar = undefined;
    var tmpW = 0;
    var tmpH = 0;
    
    if(orientation == "Vertical")
    {
      X = scrollBackGround.x;
      Y = scrollBackGround.y; 
      W = scrollBackGround.w;
      H = scrollBackGround.h;
      tmpW = 10;
      tmpH = H;
    }
    if(orientation == "Horizontal")
    {
      X = scrollBackGround.x;
      Y = scrollBackGround.y;
      W = scrollBackGround.w;
      H = scrollBackGround.h;
      tmpW = W;
      tmpH = 10;
    }
    
    this.setBarAlpha = function(alpha)
    {
      if(indicator != undefined)
      {
        if(alpha >=0 && alpha <=1)
          bar.setAlpha(alpha);
      }
    }
    this.setBarBackGroundAlpha = function(alpha)
    {
      if(barBackGroud != undefined)
      {
        if(alpha >=0 && alpha <=1)
          barBackGroud.setAlpha(alpha);
      }
    }
    
    this.setBarReletion = function()
    {
      if(arrayForBar === undefined || arrayForBar.length == 0) return;
      if(orientation == "Horizontal")
       bar.w *= backGround.getBackGround().w/((arrayForBar.length*(backGround.getBackGround().h/lineCount))/lineCount);
       else if (orientation == "Vertical")
        bar.h *= backGround.getBackGround().h/((arrayForBar.length*(backGround.getBackGround().w/lineCount))/lineCount);
    }
    
    this.getBar = function()
    {
      if(bar != undefined)
        return bar;
    }
    this.setX = function(x)
    {
      bar.x = x;
      barBackGroud.x = x;
    }

    bar = game.newRoundRectObject({x : X, y : Y, h: H, w: W ,radius: 8, fillColor : "red"});
    
    bar.x = X;
    bar.h = tmpH;
    bar.y = Y + H - bar.h;
    bar.w = tmpW;
    this.setBarReletion();
    barBackGroud = game.newRoundRectObject({x : X, y : bar.y, h: tmpH, w: tmpW ,radius: 8, fillColor : "#ffba42"});
    
    this.DrawIndicator = function()
    {
      if(arrayForBar != undefined)
      {
        if(barOrientation == "Vertical")
        {
          var tmp = (backGround.getBackGround().w/lineCount)*arrayForBar.length/lineCount; //видемые элементы, если больше то врубаем скролл
          if(tmp > backGround.getBackGround().h)
          {
              barBackGroud.draw();
              bar.draw();
          }
        }else
        {
          var tmp = (backGround.getBackGround().h/lineCount)*arrayForBar.length/lineCount; //видемые элементы, если больше то врубаем скролл
          if(tmp > backGround.getBackGround().w)
          {
              barBackGroud.draw();
              bar.draw();
          }
        }
      }
    }
  }
  
  this.setLineCount = function(count)
  {
    lineCount = count;
    backGround = new BackGround(backGroundPosX,backGroundPosY,backGroundW,backGroundH);
    items = sortElements(arrayForBar,backGround.getBackGround());
    indicator = new Indicator(backGround.getBackGround());
    this.setArrayItems(items);
    backGround.setAlphaBG(backGroundAplha);
    this.scrollUpdate(0);
  }
  this.getLineCount = function()
  {
    var tmpCount = lineCount;
    return tmpCount;
  }
  
  function sortElements(array, scrollBackGround)
  {
    if(array === undefined || array.length <=0)
      return;
    var X = 0;
    var Y = 0;
    var W = 0;
    var H = 0;
    var oldX = 0;
    var oldY = 0;
    var tmpH = 0;
    var tmpX = 0;
    var bgW = scrollBackGround.w;
    var bgH = scrollBackGround.h;
    var scrollLineCount = lineCount;
    var sortArr = array;
    var arrMediana = Math.ceil(sortArr.length/scrollLineCount);
    var itemHW = 0;
    if(orientation == "Vertical")
    {
      X = scrollBackGround.x;
      Y = scrollBackGround.y; 
      W = scrollBackGround.w;
      H = scrollBackGround.h;
      tmpH = W;
      oldX = Y;
      oldY = X;
      tmpX = Y;
    }
    if(orientation == "Horizontal")
    {
      X = scrollBackGround.x;
      Y = scrollBackGround.y;
      W = scrollBackGround.w;
      H = scrollBackGround.h;
      tmpH = H;
      oldX = X;
      oldY = Y;
      tmpX = X;
    }
    //считываем сколько процентов размер беграунда составляет от общего размера, делим на 10 и берем по меньшей части через floor это и будет количество строк элементов
    if(tmpH >= ( height/100 * 40))
    {
     var d = tmpH*100/width;
     d = Math.floor(d/10);
     scrollLineCount = d;
     lineCount = d;
     arrMediana = Math.ceil(sortArr.length/scrollLineCount);
    }
    itemHW = tmpH/scrollLineCount;
    //
    var iter = 0;
    var rowCount = 1;
    OOP.forArr(sortArr,function(el,i)
    {
      iter ++;
      el.w = itemHW;
      el.h = itemHW;
      if(orientation == "Vertical")
      {
        el.x = oldY;
        el.y = oldX;
        if(iter % scrollLineCount == 0)
        { 
          rowCount++;
          oldY = X- itemHW;
          oldX +=itemHW
          iter = 0;
        }
        oldY+=itemHW;
        if(lineCount > 1)
          scrollBackGround.h = (rowCount*itemHW)+3
      }
      else
      {
      el.x = oldX;
      el.y = oldY;
      // if(iter % scrollLineCount == 0)
      // {
      //   oldY = X- itemHW;
      //   oldX +=itemHW
      //   iter = 0;
      // }
      oldX += itemHW;
      }
     if(!el.isIntersect(backGround.getBackGround()))
      {
        el.setVisible(false);
      }
    });
    return sortArr;
  }
  this.GetBackGround = function()
   {
     if(backGround != undefined)
     {
      return backGround.getBackGround();
     }
   } 
   //ВОЗВРАЩАЕТ ОБЛАСТЬ ВОКРУГ ЗАДНЕГО ФОНА СКРОЛА
   this.GetActivityArea = function()
   {
     if(backGround != undefined)
     {
      return backGround.getActivityArea();
     }
   } 
   
   this.getOrientation = function()
   {
     var tmpOrin = barOrientation;
     return tmpOrin;
   }
   
   this.setCaseVisible = function(visible)
   {
     if(lineCount == 1)
     {
       if(visible)
       {
        if(orientation == "Vertical")
          {
            backGround.setY(backGroundPosY+backGroundW);
          }
        if(orientation == "Horizontal")
          {
            backGround.setX(backGroundPosX+backGroundH);
          }
           scrollBarCase = new ScrollBarrCase(this.GetBackGround());
           items = sortElements(arrayForBar,this.GetBackGround());
           indicator = new Indicator(this.GetBackGround());
           this.setArrayItems(items);
           caseVisible = true;
       }
       else
       {
          caseVisible = false;
       }
     }
   }
   
   this.isCaseVisible = function()
   {
     return caseVisible;
   }

  backGround = new BackGround(backGroundPosX,backGroundPosY,backGroundW,backGroundH);
  if (arrayForBar != undefined)
  {
    items = sortElements(arrayForBar,this.GetBackGround());
    indicator = new Indicator(this.GetBackGround());
    this.setArrayItems(items);
  }
  backGround.setAlphaBG(backGroundAplha);
  
  this.scrollUpdate = function(scrollVal)
  {
    if(!this.isEmptyBarArray())
    {
       var rXElLast = arrayForBar[0].x + arrayForBar[0].w; // координаты правого верхнего по Х  угла 0 элемент
       var rYElLast = arrayForBar[0].y + arrayForBar[0].w;
       var FrsElemX = arrayForBar[arrayForBar.length-1].x;
       var FrsElemY =  arrayForBar[arrayForBar.length-1].y;
       var rXBG =  backGround.getBackGround().x +  backGround.getBackGround().w;   // координаты правого верхнегопо Х заднего
       var rYBG =  backGround.getBackGround().y +  backGround.getBackGround().h;
       var dx =0;
       var dy=0;
       var ctxtW = (arrayForBar.length / lineCount) * arrayForBar[0].w;
       var ctxtH = arrayForBar.length / lineCount * arrayForBar[0].w;
       indicator.setBarAlpha(1);
       this.lastElRX = rXElLast;
       this.fristElX = FrsElemX;
         //обход всех дочерных элементов (графические элементы меню)
	OOP.forArr(arrayForBar,function(el)
	{
	  //if(scroll.x !== 0 || scroll.y !== 0)
   // {
    if(barOrientation === "Horizontal")
      {
        if(scrollVal.x > 0 )
        {
              if(FrsElemX < backGround.getBackGround().x)
              {
                dx = scrollVal.x* scrollSpeed;
                if(FrsElemX + dx > backGround.getBackGround().x)
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
        
        if(el.x < rXBG || el.x > backGround.getBackGround().x)
    	  {
    	    var alpha = 0.1;
    	    el.setVisible(true);

    	    if(el.x+el.w >= rXBG)
    	    {
    	      var aX = rXBG - el.x;
    	      el.setAlpha(aX*alpha); 
    	    }
    	    if(el.x < backGround.getBackGround().x )
    	    {
    	      var aX = (el.x + el.w)- backGround.getBackGround().x;
    	      el.setAlpha(aX*alpha);
    	    }
    	    if(el.x+5 > backGround.getBackGround().x && (el.x+el.w < rXBG))
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
              if(FrsElemY < backGround.getBackGround().y)
              {
                dy = scrollVal.y * scrollSpeed;
              if(FrsElemY + dy >  backGround.getBackGround().y)
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
            
  if(el.y < rYBG || el.y > backGround.getBackGround().y)
	  {
	    var  alpha = 0.01;
	    el.setVisible(true);
	    if(el.y+el.h >= (backGround.getBackGround().h+backGround.getBackGround().y)+50)
	    {
	      var aY = rYBG - el.y;
	      el.setAlpha(aY*alpha); // не удалять, потом разобраться и сделать альфу
	    }
	    if(el.y < backGround.getBackGround().y)
	    {
	      var aY = (el.y + el.w)- backGround.getBackGround().y;
	      el.setAlpha(aY*alpha);
	    }
	    if(el.alpha <= 0)
	      el.setVisible(false);
	  }else
	  {
	    el.setVisible(false);
	  }
      }
  //  }
	  //изчезновение элементов
	});
	

	indicator.getBar().x += (this.GetBackGround().w /100)*-((dx/ctxtW)*100);
 	indicator.getBar().y += (this.GetBackGround().h /100)*-((dy/ctxtH)*100);
  }
 }
  
  
  this.DrawScrollBar = function()
  {
        this.GetBackGround().draw();
        if(arrayForBar !=undefined)
        {
        OOP.forArr(arrayForBar,function(el)
        {
          el.draw();
        });
        indicator.DrawIndicator();
        }
    if(this.isCaseVisible())
    {
       scrollBarCase.DrawCase();
    }
  }
}

