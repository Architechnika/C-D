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
var groundPath = "img/ground.png";//Картинка для дороги
var backgroundPath = "img/background.png";//Картинка для фона за либиринтом
var exitPath = "img/exit.png";//Картинка для выхода из лабиринта
var entryPath = "img/entry.png";//Картинка для входа в лабиринт

var width  = game.getWH().w; // Ширина всего экрана
var height = game.getWH().h; // Высота всего экрана

//ПЕРЕМЕННЫЕ ГРАФИЧЕСКИХ СЛОЕВ
var guiLayer = layers.newLayer(4,{alpha : 0.8, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИЧЕСКИХ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
var commandsMenuLayer = layers.newLayer(3,{alpha : 1, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ВЫБОРА КОМАНД ПОЛЬЗОВАТЕЛЕМ
var playerLayer = layers.newLayer(2,{alpha : 1, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТБРАЖЕНИЯ ГРАФИКИ ИГРОКА
var commandsLayer = layers.newLayer(1,{alpha : 0.5, backgroundColor : "transparent"});//СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИКИ НАЗНАЧЕННЫХ ЭЛЕМЕНТАМ КОММАНДЕ
//Переменные для интерфейсных задач
var lastClickedIndx = -1;//Номер элемента лабиринта по которому кликнул пользователь
var commandsMenuElements = getAllCommandsMenu();//Массив, хранящий программное представление меню выбора команда

var checkScreenTimeout = 40;//Таймаут для методы который следит за изменениями размера экрана

//Класс для хранения последнего элемента на который нажал пользователь(нужно для того, чтобы пользователь мог одновременно выбрать только мент поля)один эле
function onefieldElement(obj,index){
  this.object = obj;
  this.indx = index;
} 

//pjs.system.setSyle( {backgroundColor : "black"});
pjs.system.setTitle('Лабиринт'); // Set Title for Tab or Window

//Обновление графики на экране
function updateScreen(){
  //Очищаем экран
  //game.clear();
  //Проверяем нажал ли пользователь на элемент интерфейса
  var clicked = isGuiClick();
  //Отрисовываем слой команд
  drawCommandsOnField();
  //Отрисовываем поле
	for(var i = 0; i < field.length; i++){
	  //Проверяем не было ли нажатие на элемент лабиринта
	 if(!clicked){
	    processClickField(i);
    }
    //Отрисовываем поле
	  field[i].getImageObject().draw();
  }
  //Отрисовываем элементы интерфейса
  drawGUI();
  //Рисуем на графическом слое для отображения игрока
  playerLayer.on(function(){
    playerImageObj.draw();
  });
}

//Запускает таймер который следит за изменениями параметров экрана 
function startResizeTimer(){
  var scrParams = game.getWH();
  if(scrParams.w != width || scrParams.h != height){//Если изменились
    width = scrParams.w;
    height = scrParams.h;
    //Перерасчитываем все элементы игры
    resizeAllElementsOnScreen();
  }
  setTimeout("startResizeTimer()",checkScreenTimeout);
}
  
//Обработка нажатий на поле
function setFocused(fieldElem,indx){
  
  //Если нажали на недоспустимый элемент 
  if(fieldElem.code != roadCode){
    
      if(lastClickedIndx != -1){
        lastClickedIndx = -1;
      }
      return;
  }
  
  if(lastClickedIndx != -1){
    //Если все ок, то убираем выделение с предыдущего объекта
    field[lastClickedIndx].setStroke(false);
  }
  //Cохраняем номер текущего
  lastClickedIndx = indx;

  //Выделяем в рамку объект по которому нажали
  field[indx].setStroke(true);
}

//Отрисовывает команды на слое команд
function drawCommandsOnField(){
  commandsLayer.on(function(){
    OOP.forArr(field,function(el){
      //Если это дорога
      if(el.code == roadCode || el.code == entryCode){
        //Если команда назначена
        if(el.commands.length > 0){
          var img = game.newImageObject({
            file : el.commands[0].imgSource,
            x : el.X,
            y : el.Y,
            w : el.W,
            h : el.H
          });
          img.draw();
        }   
      }
    });
  });
}

//Рисует на экране меню команд
function showCommandsMenu(){
  
  commandsMenuLayer.on(function(){
    if(lastClickedIndx == -1) {
      return;
    }
    //Получаем представление меню команд
    commandsMenuElements = getAllCommandsMenu(oneTileWidth,oneTileHeight);
    //alert(mouse.getPosition().x + " " + mouse.getPosition().y);
    //Расчитываем позицию расположения элементов
    var X,Y;
    //Если элементы не влезут в экране то мы их рисуем относительно квадрата повыше
    if(commandsMenuElements[0].image.x + (field[lastClickedIndx].X+field[lastClickedIndx].W) > width){
      X = field[lastClickedIndx + 2].X;
      Y = field[lastClickedIndx].Y;
    }
    else{
      X = field[lastClickedIndx].X;
      Y = field[lastClickedIndx].Y;
    }
    OOP.forArr(commandsMenuElements,function(c)
    {
      c.image.y += Y;
      c.image.x += X;
      c.image.draw();
    });
    
  });
}