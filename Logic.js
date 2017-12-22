/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX=0,gameSpaceY=0;
var gameSpaceW=0,gameSpaceH=0;

var totalWidth = 5;//Колличество блоков в строку
var totalHeight = 5;//Колличество блоков в стлобец
var robotMoveDelay=500;//Задержка при движении робота в милисекундах

var totalMiliSeconds = 0;//Для зранения колличества секунд которые прошли с начала прохождения уровня
var totalCommandsAllowed = 0;//Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalAttempts = 0;//Счетчик попыток прохождения уровня
//ПАРАМЕТРИЗУЕМЫЕ ПАРАМЕТРЫ
//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var difficultyLevel = "EASY";
var totalTokensOnMap = 2;//Сколько всего монеток генерится в лабиринте

var lastClickedIndx = -1;//Номер элемента лабиринта по которому кликнул пользователь
//Переменная для хранения состояний меню ввода команд:
//0 - ввод команд в клетку поля
//1 - ввод команд в команду COUNT или blockA (верхний элемент в левом скроле)
//2 - ввод команд в команду COMMANDSBLOCK или blockB(второй элемент в левом скроле)
//3 - ввод команд в команду COMMANDSBLOCK(третий элемент в левом скроле)
var inputCommandStates = 0;

//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
	//Код для старта игры
	this.entry = function(){
	  //Смотрим смартфон или ПК у нас
	  isMobile = touch.isMobileDevice();
	  //Создаем все объекты для игры
	  initializeGame();
	  //Запускаем таймер который следит за изменением экрана(для правильного ресайза)
	  resizeTimer();
	  //Инициализируем таймер времени
	  totalTimeTimer()
	};
	//Код для завершения игры
	this.exit = function(){
	  
	};
	//Код для апдейта игры
	this.update = function(){
	  //Обрабатываем ввод пользователя
	  processClick();
	  //Обновляем графику
	  updateScreen();
	};
});


function totalTimeTimer()
{
  totalMiliSeconds++;
  setTimeout("totalTimeTimer()", 1);
}

//Инициализация лабиринта
function initializeGame(){
  //Создаем новое поле
  field = new Array();
  //Инициализируем элементы интерфейса
  initGUI();
  //Генерируем лабиринт(или пересчитываем параметры существующего)
  generateMap(gameSpaceW,gameSpaceH,gameSpaceX,gameSpaceY,totalWidth, totalHeight);
  //Рассчитываем сколько команд можно поставить на этом поле для прохождения
  totalCommandsAllowed = (totalWidth + totalHeight) * 2;
  //Создаем игрока
  playerSetStart();
  //Сбрасываем счетчик времени
  totalMiliSeconds = 0;
  totalAttempts = 0;
}

//Расчет глобальных параметров игровой области
function initGameSpace()
{   var ind = 0;
    if(width < height)
    {
      /*gameSpaceX = 0;
      gameSpaceY = 0;
      gameSpaceW = width;
      gameSpaceH = height/100*55;*/
      
      gameSpaceX = height/100 * 15;
      gameSpaceY = 0;
      gameSpaceH = height/100 * 85;
      gameSpaceW = gameSpaceH
      
    }
    else
    {
    
    gameSpaceX = height/100 * 15;
    gameSpaceY = 0;
    gameSpaceH = height/100 * 85;
    gameSpaceW = gameSpaceH
 
    }
    log(gameSpaceX + " " + gameSpaceY + " " + gameSpaceW + " " + gameSpaceH);
}

//Перерасчитывает размеры существующего поля и элементов
function resizeAllElements(){
  Scrolls = new Array();
  //Инициализируем элементы интерфейса
  initGUI();
  //Пересчитываем параметры существующего лабиринта
  calcField(gameSpaceW,gameSpaceH,gameSpaceX,gameSpaceY,totalWidth, totalHeight);
  //Пересчитываем позицию игрока
  movePlayerToFieldElement(field[playerPozition]);
}

//Возвращает число команд на поле всего
function getTotalCommandsOnField(){
  var counter = 0;
  OOP.forArr(field,function(el){
    counter += el.getTotalCommands();
  });
  //counter += playerCommands.length;
  return counter;
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
  //Инициализируем верхний скролл
  initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
  //Инициализируем левый скролл
  initLeftScroll(undefined,undefined);
  //Выделяем в рамку объект по которому нажали
  field[indx].setStroke(true);
  //Скрываем кнопку старт/стоп
  startB.setVisible(false);
}

//Функция обработчик для добавления команды в клетку
function addCommandToCell(commandImg){
  
  if(commandImg.command.name == "none") 
  field[lastClickedIndx].commandsClear();
  else field[lastClickedIndx].addCommand(commandImg.command,"TOP");//Добавляем команду к этой клетке
  //Инициализируем нижний скролл обновившимся множеством команд в клетке
  initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
  //Если выбранная команда относится к сложным и требует дополнительного ввода - инициализируем левый скролл
  if(commandImg.command.name == "repeat"){
    inputCommandStates = 1;
    initLeftScroll(commandImg,getRepeatScrollBarPattern(inputCommandStates));
  }
  if(commandImg.command.name == "repeatif"){
    inputCommandStates = 1;
    initLeftScroll(commandImg,getIFScrollBarPattern(inputCommandStates));
  }
}

//Обработчик кликов по левому скролу
function leftScrollBarItemsClick(element){
  
  if(element.command.name == "commandsblock"){
    
  }
  if(element.command.name == "counter"){
    
  }
  else if(element.command.name == "ok"){//Если нажали на команду OK
    isDifficultCommandInput = false;
    initLeftScroll(undefined,undefined);
  }
}

//indexArray - индекс массива команд клетки в стеке команд клетки, indexELem - индекс элемента из этого массива команд для удаления
function removeCommandFromCell(indexArray,indexElem){
  log("Индекс в графике: " + indexElem);
  //Удаляем команду из списка команд
  field[lastClickedIndx].removeCommand(indexArray,indexElem);
  //инициазируем скролл новым списком
  initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
}

//Обработчик поведения робота
function processRobotMove(){
  
  var res = playerMove();
	  
	 if(res == "end"){//Если мы прошли до конца карты
	    robotOn = false;
	    totalWidth+=2;
	    totalHeight+=2;
	    if(totalWidth > 8){
	      totalWidth = 9;
	      totalHeight = 9;
	    }
	    //Перезагружаем уровень с новым лабиринтом
	    initializeGame();
	  }
	  else if(res == "stop") {
	    alert("Робот остановился и ждет дальнейших команд");
	    startB.isPlay = false;
	  }
	  else if(res != "")//Если у робота возникли проблемы
	  {
	    alert(res);//Выводим их на экран
	    //Останавливаем цикл движения игры, меняя свойство кнопки
	    startB.isPlay = false;
	    //Очищаем все команды на поле
	    //clearAllCommandsOnField();
	    //Ставим робота на вход в лабиринт
	    playerSetStart();
	  }
	  else if(startB.isPlay) setTimeout("processRobotMove()",robotMoveDelay);
}

//game.startLoop('Labyrinth'); 
game.startLoop('menu'); 