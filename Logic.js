/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/

var totalWidth = 5;//Колличество блоков в строку
var totalHeight = 5;//Колличество блоков в стлобец

var robotMoveDelay=500;//Задержка при движении робота в милисекундах

var totalSeconds = 0;//Для зранения колличества секунд которые прошли с начала прохождения уровня
var totalCommandsAllowed = 0;//Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)

//Игровой цикл
game.newLoopFromConstructor('myGame', function () {
	//Код для старта игры
	this.entry = function(){
	  log('myGame is started');
	  //Создаем все объекты для игры
	  initializeGame();
	  //Запускаем таймер который следит за изменением экрана(для правильного ресайза)
	  startResizeTimer();
	  
	};
	//Код для завершения игры
	this.exit = function(){
	  log('myGame is stopped');
	};
	//Код для апдейта игры
	this.update = function(){
	  //Обновляем графику
	  updateScreen();
	};
});


function timer()
{
  totalSeconds++;
  setTimeout("timer()", 1000);
}

//Инициализация лабиринта
function initializeGame(){
  //Создаем новое поле
  field = new Array();
  //Инициализируем элементы интерфейса
  initGUI();
  //Генерируем лабиринт(или пересчитываем параметры существующего)
  genMap(totalWidth, totalHeight);
  //Рассчитываем сколько команд можно поставить на этом поле для прохождения
  totalCommandsAllowed = (totalWidth + totalHeight) * 2;
  //Создаем игрока
  playerSetStart();
  //Инициализируем таймер времени
  if(totalSeconds !== 0)
    totalSeconds = 0;
  else timer();
}

//Перерасчитывает размеры существующего поля и элементов
function resizeAllElementsOnScreen(){
  //Инициализируем элементы интерфейса
  initGUI();
  //Пересчитываем параметры существующего лабиринта
  calcField(gameSpaceW,gameSpaceH,gameSpaceX,gameSpaceY,totalWidth, totalHeight);
  //Пересчитываем позицию игрока
  movePlayerToFieldElement(field[playerPozition]);
}

//Проверка - нажали ли на объект checkObject левой кнопкой мыши
function isLeftClicked(checkObject){
  //Если у нас мобильное устройство
  if(touch.isMobileDevice()){
    return touch.isPeekObject(checkObject);
  }
  //Если пк с мышкой
  if(mouse.isPeekObject('LEFT',checkObject)){
    return true;
  }
  return false;
}

//Проверка - нажали ли на объект checkObject правой кнопкой мыши  
function isRightClicked(checkObject){
  
  //Если у нас мобильное устройство
  if(touch.isMobileDevice()){
    return false;
  }
  //Если пк с мышкой
  if(mouse.isPeekObject('RIGHT',checkObject)){
    return true;
  }
  return false;
}

function processClickField(indx){
  //Обрабатываем клики мышкой
	if(isLeftClicked(field[indx].getImageObject())){
	  //Перерисовываем кликнутый элемент
    setFocused(field[indx],indx);
	}
	else if(isRightClicked(field[indx].getImageObject())){
	  if(field[indx].code == roadCode)
	    field[indx].commands.pop(); 
	}
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

//Возвращает число команд на поле всего
function getTotalCommandsOnField(){
  var counter = 0;
  OOP.forArr(field,function(el){
    counter += el.commands.length;
  });
  counter += playerCommands.length;
  return counter;
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
	    //Возвращаем игру к исходному состоянию
	    robotOn = false;
	    //Останавливаем цикл движения игры, меняя свойство кнопки
	    startB.isPlay = false;
	    //Очищаем все команды на поле
	    //clearAllCommandsOnField();
	    //Ставим робота на вход в лабиринт
	    playerSetStart();
	  }
	  else if(startB.isPlay) setTimeout("processRobotMove()",robotMoveDelay);
}

game.startLoop('myGame'); 