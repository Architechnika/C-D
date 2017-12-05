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

var totalSeconds = 0;//Для зранения колличества секунд которые прошли с начала прохождения уровня
var totalCommandsAllowed = 0;//Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)

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
  totalSeconds++;
  setTimeout("totalTimeTimer()", 1000);
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
  totalSeconds = 0;
}

//Расчет глобальных параметров игровой области
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
    
    gameSpaceX = 0;
    gameSpaceY = 0;
    gameSpaceH = height;
    gameSpaceW = gameSpaceH;
 
    }
}

//Перерасчитывает размеры существующего поля и элементов
function resizeAllElements(){
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
    counter += el.commands.length;
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

  //Выделяем в рамку объект по которому нажали
  field[indx].setStroke(true);
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

game.startLoop('Labyrinth'); 