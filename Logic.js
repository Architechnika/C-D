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
var secBuff = 0;//Буфер для хранения времени старта
var totalCommandsAllowed = 0;//Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalAttempts = 0;//Счетчик попыток прохождения уровня
//ПАРАМЕТРИЗУЕМЫЕ ПАРАМЕТРЫ
//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var difficultyLevel = "EASY";
var totalTokensOnMap = 2;//Сколько всего монеток генерится в лабиринте

var lastClickedIndx = -1;//Номер элемента лабиринта по которому кликнул пользователь
var choosenCommandInElement = -1;//Индекс команды в массиве команд которую редактирует игрок
var lastCommandToRedact = undefined;//Ссылка на последний редактируемый обьект. Нужно для рекурсивного добавления команд в сложные команды
var menuStatesArr = new Array();
var isBackGroundDrawed = false;

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
	  initializeGame(true);
	  //Запускаем таймер который следит за изменением экрана(для правильного ресайза)
	  resizeTimer();
	  //Инициализируем таймер времени
	  totalTimeTimer();
      //Инициализируем события для перехвата ввода
      initInputEvents();
      //mainbackGround = new mainBackGroundDrow();
	};
	//Код для завершения игры
	this.exit = function(){
      //Удаляем обработчики ввода со странички
	  removeInputEvents();
	};
	//Код для апдейта игры
	this.update = function(){
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
function initializeGame(isInit) {
    game.clear();
    menuStatesArr = null;
    menuStatesArr = new Array();
    //Создаем новое поле
    if (isInit !== undefined) {
        if (userData !== undefined) {
            field = userData.load(isGameSpaseUp,gameObjects,playerInventory,totalHeight,totalWidth,totalSeconds,initGUI)
            if(field.length <= 0)
                generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
        }
        else {
            field = new Array();
            initGUI();
            generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
            //Сбрасываем счетчик времени
            totalSeconds = 0;
        }
    } else {
        field = null;
        field = new Array();
        initGUI();
        generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
        //Сбрасываем счетчик времени
        totalSeconds = 0;
    }

    //Рассчитываем сколько команд можно поставить на этом поле для прохождения
    totalCommandsAllowed = (totalWidth + totalHeight) * 2;
    //Создаем игрока
    playerSetStart();
    totalAttempts = 0;
    mainbackGround = new mainBackGroundDrow();
}

//Расчет глобальных параметров игровой области
function initGameSpace()
{
    var ind = 0;
    if (width < height) {
        /*gameSpaceX = 0;
        gameSpaceY = 0;
        gameSpaceW = width;
        gameSpaceH = height/100*55;*/

        gameSpaceX = height / 100 * 15;
        gameSpaceY = 0;
        gameSpaceH = height / 100 * 85;
        gameSpaceW = gameSpaceH

    }
    else {

        if (isGameSpaseUp) {
            gameSpaceX = height / 100 * 15;
            gameSpaceY = 0;
            gameSpaceH = height / 100 * 85;
            gameSpaceW = gameSpaceH
        } else {
            gameSpaceX = height / 100 * 15;
            gameSpaceY = height / 100 * 15;
            gameSpaceH = height / 100 * 85;
            gameSpaceW = gameSpaceH
        }

    }
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
  //Инициализируем правый скролл
  initRightScroll(getAllCommandsMenu());
  //Выделяем в рамку объект по которому нажали
  field[indx].setStroke(true);
  //Скрываем кнопку старт/стоп
  startB.setVisible(false);
  menuB.setVisible(false);
}

//Функция обработчик для добавления команды в клетку
function addCommandToCell(commandImg,dontAdd){
  
  if(inputCommandStates == 0){
    
      if(dontAdd === undefined){
        if(commandImg.command.name == "none") {
          field[lastClickedIndx].commandsClear();
          choosenCommandInElement = -1;
        }
        else {
          field[lastClickedIndx].addCommand(getCopyOfObj(commandImg.command),"TOP");//Добавляем команду к этой клетке
          choosenCommandInElement = field[lastClickedIndx].getTopCommands().length - 1;//Запоминаем индекс введенной команы в массиве
        }
        initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
      }

      //Если выбранная команда относится к сложным и требует дополнительного ввода - инициализируем левый скролл
      if (commandImg.command.name == "repeat") {
        //Добавляем команду в стек состояний меню
        if(menuStatesArr.length == 0)
            menuStatesArr.unshift(field[lastClickedIndx].getTopCommands()[choosenCommandInElement]);
        //else menuStatesArr.unshift(commandImg.command);
        inputCommandStates = 3;
        initLeftScroll(commandImg, getRepeatScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        initDownScroll(undefined, undefined);
        //Инитим командой counter
        leftScrollBarItemsClick({ command: menuStatesArr[0].countBlock })//getCopyOfObj(COMMANDS[16])});
      }
      if (commandImg.command.name == "repeatif") {
        //Добавляем команду в стек состояний меню
        if(menuStatesArr.length == 0)
            menuStatesArr.unshift(field[lastClickedIndx].getTopCommands()[choosenCommandInElement]);
        //else menuStatesArr.unshift(commandImg.command);
        inputCommandStates = 1;
        initLeftScroll(commandImg, getRepeatIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        initDownScroll(undefined, undefined);
        //Инитим командой blockA
        leftScrollBarItemsClick({ command: menuStatesArr[0].ifBlock.blockA });//getCopyOfObj(COMMANDS[14])});
      }
  }
  
  //Если в массиве состояний есть команда - то есть редактируем сложную команду
  if (menuStatesArr.length != 0) {
      var elem = menuStatesArr[0];//Берем верхнюю команду
      if (elem === undefined) return;

      if (inputCommandStates == 1) {//BLOCKA
          //Инициализируем blockA в команде IF командой whatisit 
          elem.ifBlock.blockA = getCopyOfObj(COMMANDS[10]);
          //Присваиваем ей направление по которому кликнули
          elem.ifBlock.blockA.lookCommand = getCopyOfObj(commandImg.command);
          //Обновляем левый скролл
          leftScrollBarItemsClick(undefined);
      }
      else if (inputCommandStates == 2) {//BLOCKB
          //Инициализируем blockB в команде IF командой которую выбрали 
          elem.ifBlock.blockB = commandImg;
          //Обновляем левый скролл
          leftScrollBarItemsClick(undefined);
      }
      else if (inputCommandStates == 3) {//COUNTERBLOCK
          //Удаляем элемент из строки
          if (commandImg.command == "backspace") {
              inputCounterText.text = inputCounterText.text.substr(0, inputCounterText.text.length - 1);
          }
          else if (inputCounterText.text.length < 2) {//Добавляем элемент к строке
              if (commandImg.command < 10 && commandImg.command >= 0) {//КОСТЫЛЬ ___________ ПОПРАВИТЬ
                  if (inputCounterText.text == " ") inputCounterText.text = commandImg.command + "";
                  else inputCounterText.text += commandImg.command;
              }
              // else if (inputCounterText.text == " ") inputCounterText.text = commandImg.command.countBlock.count + "";
              else inputCounterText.text = " ";//elem.countBlock.count + "" + commandImg.command.countBlock.count;
          }
          if (inputCounterText.text.length > 0) {
              var parsed = parseInt(inputCounterText.text);
              elem.countBlock.count = isNaN(parsed) ? 0 : parsed;
          }
      }
      else if (inputCommandStates == 4) {//COMMANDS BLOCK
          //Получаем копию обьекта
          var copyIedObj = commandImg.command.name == "repeat" ? getCopyOfObj(COMMANDS[12]) : commandImg.command.name == "repeatif" ? getCopyOfObj(COMMANDS[13]) : commandImg.command;
          var addedItm = getCopyOfObj(copyIedObj);
          //Если последняя команда в стеке состояний - сложная, то добавляем ее в стек состояний
          if (elem.name == "repeatif") {
              elem.ifBlock.commandsBlock.actions.push(addedItm);
              //Если добавилась сложная команда то инициализируем интерфейс ввода
              if (commandImg.command.name == "repeat" || commandImg.command.name == "repeatif") {
                  inputCommandStates = 0;
                  menuStatesArr.unshift(addedItm);
                  addCommandToCell(commandImg, true);
                  initDownScroll(undefined, undefined);
              }
              else initDownScroll(getCommandsImgArr(elem.ifBlock.commandsBlock.actions));
          }
          else if (elem.name == "repeat") {
              elem.commandsBlock.actions.push(addedItm);
              //Если добавилась слоожная команда то инициализируем интерфейс ввода
              if (commandImg.command.name == "repeat" || commandImg.command.name == "repeatif") {
                  inputCommandStates = 0;
                  menuStatesArr.unshift(addedItm);
                  addCommandToCell(commandImg, true);
                  initDownScroll(undefined, undefined);
              }
              else initDownScroll(getCommandsImgArr(elem.commandsBlock.actions));
          }
      }
  }
  log(menuStatesArr);
}

//Обработчик кликов по левому скролу
function leftScrollBarItemsClick(element) {

  if(inputCounterText !== null) inputCounterText.visible = false;
  //Получаем последнюю кликнутую команду
  var lastItm = menuStatesArr[0];
  initDownScroll(undefined, undefined);

  if(element !== undefined){
      if (element.command.name == "blockA" || element.command.name == "whatisit") {
          inputCommandStates = 1;
          // Инициализируем правый скролл
          initRightScroll(getAllDirections());
      }
      else if (element.command.name == "blockB") {
          inputCommandStates = 2;
          // Инициализируем правый скролл
          initRightScroll(getAllInteractGameObjects());
      }
      else if (element.command.name == "commandsblock") {
          inputCommandStates = 4;
          // Инициализируем правый скролл
          initRightScroll(getAllCommandsMenu());
          //Инициализируем нижний скролл командами из поля команд в команде
          if (lastItm.name == "repeatif")
              initDownScroll(getCommandsImgArr(lastItm.ifBlock.commandsBlock.actions));
          else if (lastItm.name == "repeat") initDownScroll(getCommandsImgArr(lastItm.commandsBlock.actions));
      }
      else if (element.command.name == "counter") {
          inputCommandStates = 3;
          inputCounterTextInit();
          inputCounterText.text = element.command.count == 0 ? " " : element.command.count + "";
          inputCounterText.visible = true;
          //Инициализируем клавиатуру для ввода цифр
          initRightScroll(getDigitKeyboardImages());
      }

      if (lastItm.name == "repeat") initLeftScroll("SAME", getRepeatScrollBarPattern(inputCommandStates, lastItm));
      else if (lastItm.name == "repeatif") initLeftScroll("SAME", getRepeatIFScrollBarPattern(inputCommandStates, lastItm));
  }
  else{
    if(lastItm.name == "repeat") initLeftScroll("SAME",getRepeatScrollBarPattern(inputCommandStates, lastItm));
    else if(lastItm.name == "repeatif") initLeftScroll("SAME",getRepeatIFScrollBarPattern(inputCommandStates,lastItm));
  }
}

//indexArray - индекс массива команд клетки в стеке команд клетки, indexELem - индекс элемента из этого массива команд для удаления
function removeCommandFromCell(indexArray,indexElem){
  if(inputCommandStates == 0) {//ОБЫЧНЫЙ ЭЛЕМЕНТ НА ПОЛЕ
    //Удаляем команду из списка команд
    field[lastClickedIndx].removeCommand(indexArray,indexElem);
    //инициазируем скролл новым списком
    initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
  }
  else if(inputCommandStates == 4){//COMMANDSBLOCK
    
    var elem = field[lastClickedIndx].getTopCommands()[choosenCommandInElement];
    if (elem === undefined) return;

    if(elem.name == "repeatif") {
      var indx = elem.ifBlock.commandsBlock.actions.length - 1 - indexElem;
      elem.ifBlock.commandsBlock.actions.splice(indx,1);
      initDownScroll(getCommandsImgArr(elem.ifBlock.commandsBlock.actions));
    }
    else if(elem.name == "repeat") {
      var indx = elem.commandsBlock.actions.length - 1 - indexElem;
      elem.commandsBlock.actions.splice(indx,1);
      initDownScroll(getCommandsImgArr(elem.commandsBlock.actions));
    }
  }
}

//Обработчик поведения робота
function processRobotMove(){
  
  var res = playerMove();
	  
	 if(res == "end"){//Если мы прошли до конца карты
	    robotOn = false;
	    totalWidth+=2;
	    totalHeight+=2;
	    if(totalWidth > 10){
	      totalWidth = 11;
	      totalHeight = 11;
	    }
        startB.isPlay = false; 
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
	    //СБрасываем флаг для чтения команд
        OOP.forArr(field, function (el) {
            el.isCommandsReaded = false;
        });
	    //Ставим робота на вход в лабиринт
	    playerSetStart();
	  }
	  else if(startB.isPlay) setTimeout("processRobotMove()",robotMoveDelay);
    //camera.follow( playerImageObj, 1 );
}

//game.startLoop('Labyrinth'); 
game.startLoop('menu'); 