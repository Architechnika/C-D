//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними


var startB = null; //ктопка старт
var menuB = null; //ктопка меню
var okB = null; // кнопка ок(при нажатии на которую заканчивается ввод команд в клетку)
var reloadB = null;//Кнопка перезагрузки лабиринта
var timerText = null; //текст таймера
var progressText = null; // количество ходов
var inputCounterText = null;//Текстовое поле для ввода чисел

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
  menuB.draw();
  //reloadB.draw();
  
  //Отрисовываем текстовые поля
  textbackGroundItem.draw();
  updateTextOnGui();
  timerText.textDraw();
  progressText.textDraw();
  if (inputCounterText !== null) inputCounterText.draw();
  
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
  //inputCounterTextInit();
  
  textbackGroundInit("#ffba42",1);
  //ИНИЦИАЛИЗИРУЕМ ИНТЕРФЕЙС РЕДАКТОРА КОМАНД  
  if(Scrolls.length == 0){
    Scrolls = new Array();
    initRightScroll(getAllCommandsMenu(50,50));
  }
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui(){
  //Смотрим сколько комманл уже есть на поле
  var totalCommands = getTotalCommandsOnField();
  //Обновляем текст об этом
  progressText.setText("Батареек собрано: " + playerInventory.length);
  //Обновляем инфу о времени
  var min = Math.floor(totalSeconds / 60);
  var sec = totalSeconds - (min * 60);//Math.floor(totalMiliSeconds / 200 - min * 60);
  //Обновляем инфу о времени
  timerText.setText("Прошло времени: " + (min < 10 ? "0" + min:min) + ":" + (sec < 10 ? "0" + sec:sec))
}

//Функция для инициализации кнопки старт/стоп
function startBInit()
{
  
  if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  if(startB == null)
    startB = game.newImageObject({x : 0, y : 0,w : (gameSpaceX), h : gameSpaceX, file : buttonStartImgSrc});
  
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
  
  if(menuB == null)
    menuB = game.newImageObject({x : 0, y : 0,w : gameSpaceX, h : gameSpaceX, file : menuButtonImgSrc});
  
  if(width < height)
  {
  menuB.setPositionS(point(gameSpaceW - menuItemW-5, height- startB.h - 5));
  }else
  {
    menuB.setPositionS(point(gameSpaceX+gameSpaceW, (height-gameSpaceX) ));
  }
  
}

function reloadBInit(){
  
   if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  if(reloadB == null)
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
  /*if(menuItemW > menuItemH)
  {
    menuItemH = menuItemW;
  }
  else menuItemW = menuItemH;
  
  okB = game.newImageObject({x : startB.x, y : startB.y,w : startB.w, h : startB.h, file : okButtonImgSrc});*/
}

function timerTextInit()
{
    var siz = ((width - gameSpaceW)/100)*5;
    timerText = new Label(0,0,"Прошло времени: 00:00");
    timerText.setTextPosition((gameSpaceX + gameSpaceW)+5, 5);
    timerText.setTextSize(siz);
    timerText.setTextColor(guiTextColor);
}

function progressTextInit()
{
    var siz = ((width - gameSpaceW)/100)*5;
    progressText = new Label(0,0,"Ходов: 00");
    progressText.setTextPosition(gameSpaceX+gameSpaceW+5, timerText.getTextObject().size+5);
    progressText.setTextSize(siz);
    progressText.setTextColor(guiTextColor);
}

function inputCounterTextInit() {

    var lImg = undefined;
    OOP.forArr(Scrolls, function (el) {
        if (el.name == "LEFT") {
            lImg = el.getArrayItems()[1];
            return;
        }
    });
    if (lImg === undefined) return;

    W = width / 100 * 5;
    H = height / 100 * 5;
    
    if(inputCounterText == null)
        inputCounterText = game.newTextObject({ x: lImg.x + (lImg.w / 4), y: lImg.y + (lImg.h / 4), w : 0, h : 0, text : " ", size : lImg.h / 2, color : "blue"});
    inputCounterText.text = " ";
    inputCounterText.visible = false;
}

function textbackGroundInit(color,alpha)
{
   if(textbackGroundItem == null)
        textbackGroundItem = game.newRoundRectObject({x : (gameSpaceX + gameSpaceW), y : 0, w : width- (gameSpaceX+gameSpaceW), h :  height/100 * 15, radius : 20, fillColor : color});
   textbackGroundItem.setAlpha(alpha);
}

function initRightScroll(initArray){
  var found = -1;
    OOP.forArr(Scrolls,function(scroll,i){
      //Ищем верхний скролл
      if(scroll.name == "RIGHT"){
        found = i;
        return;
      }
    });
    if(found == -1){
      //Инииализируем скролл БАР ВСЕХ КОМАНД(ПРАВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
      Scrolls.push(new ScrollBar(gameSpaceX+gameSpaceW,(height/100 * 15),"Vertical",initArray,"RIGHT"));
      Scrolls[0].setLineCount(2);
      Scrolls[0].setWidthScroll(width - (gameSpaceX+gameSpaceW))
      Scrolls[0].setHeightScroll(gameSpaceH-1);
      found = Scrolls.length - 1;
    } 
    Scrolls[found].initArrayItems(initArray);
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
        if (isGameSpaseUp)
            Scrolls.push(new ScrollBar(0, (gameSpaceY + gameSpaceH), "Horizontal", initArray, "DOWN"));
        else
            Scrolls.push(new ScrollBar(0, 0, "Horizontal", initArray, "DOWN"));
      found = Scrolls.length - 1;
    } 
    if(!Scrolls[found].isCaseVisible())
    {
      Scrolls[found].setCaseVisible(true);
    }
    Scrolls[found].initArrayItems(initArray);
    Scrolls[found].scrollToEnd();
    //ИНИТИМ КНОПКУ ОК
    var sz = Scrolls[found].getScrollBarCase().getLeftImg();
    okB = game.newImageObject({
        file: COMMANDS[17].imgSource,
        x: sz.x,
        y: sz.y,
        w: sz.w,
        h: sz.h
    });
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
    if(inputCounterText != null) inputCounterText.visible = false;
    return;
  }
  //Добавляем картинку на верх скролл бара
  if(blockImg !== undefined && blockImg != "SAME"){//SAME - оставить картинку вверху скрола такой же как и была
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

