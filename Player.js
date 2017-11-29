//СКРИПТ ОПИСЫВАЕТ МЕТОДЫ И ДАННЫЕ ИГРОКА, КОТОРЫЙ ПРОХОДИТ ЛАБИРИНТ

//Исходный файл с изображением игрока
var playerImgSrc = "img/player.png";
//Файл картинки игрока для графики, генерится в скрипте Logic.json
var playerImageObj = null;
//Позиция игрока на поле
var playerPozition = 0, lastPlayerPoz = 0;
//Текущая команда для выполнения
var playerCommands = new Array();
//Текущая лицевая сторона
var playerFrontSide = 0;//0 верх, 1 право, 2 низ, 3 лево

//Инициализация игрока
function playerSetStart(){
  //Ищем местоположение двери
  OOP.forArr(field,function(f,indx){
    //Если нашли вход в лабиринт
    if(f.code == entryCode){
      //Запоминаем позицию на поле
      playerPozition = indx;
      //Генерим графическое представление игрока для отображение
      movePlayerToFieldElement(field[playerPozition]);
      //Задаем направление, куда смотрит персонаж
      playerSetDirection(getPlayerDirFromSide());
      //Инициализируем стек команд
      playerCommands = new Array();
      return;
    }
  });
}

//Делает ход. Обрабатывает исходную команду и запоминает новую
//Возвращает end - если робот достиг выхода из лабиринта
//Возвращает "", если робот все сделал правильно и выполнил команду
//Возвращает любую другую строку с текстом, если у робота возникли сложности
function playerMove(){
  
  var code = field[playerPozition].code;
  var pPoz = playerPozition;
  var dir = playerFrontSide;
  var isTrueDir = true;
  //Добавляем команды из текущего элемента поля в стек
  addCommandsToPlayer(field[playerPozition].commands);
  //Если стек пустой, то возвращаем ошибку
  if(playerCommands.length === 0) return "Робот не знает что ему делать";
  //Обрабатываем самую верхнюю команду
  var comm = playerCommands[0];
  
  //Обрабатываем команды
  switch(comm.name){//Обрабатываем верхнюю команду
    case "up"://Вверх
        code = field[playerPozition + totalWidth].code;
        pPoz += totalWidth; 
        isTrueDir = dir == 0;
      break;
    case "down"://Вниз
        code = field[playerPozition - totalWidth].code;
        pPoz -= totalWidth;
        isTrueDir = dir == 2;
      break;
    case "left"://Влево
        code = field[playerPozition + 1].code;
        pPoz++;
        isTrueDir = dir == 3;
      break;
    case "right"://Вправо
        code = field[playerPozition - 1].code;
        pPoz--;
        isTrueDir = dir == 1;
      break;
    case "clockwise"://Повернуться по часовой стрелке
        dir++;
        //Задаем направление того, куда смотрит робот
        playerSetDirection(dir);
      break;  
    case "unclockwise"://Повернуться против часовой стрелк
        dir--;
        //Задаем направление того, куда смотрит робот
        playerSetDirection(dir);
      break;
    case "stop"://Остановиться на текущей клетке
        playerCommands = new Array();
        //Очищаем стек команд на этом элементе поля(так как мы его уже считали)
        field[playerPozition].commands = new Array();
        //Запоминаем новую позицию игрока на поле
        playerPozition = pPoz;
        return "stop";
      break;
  }
  
  //Если направление в котором планирует сдвинутся робот не совпадает с его передней стороной
  if(!isTrueDir) return "Робот смотрит не в ту сторону";
  //Проверяем - сможет ли робот сдвинуться в эту сторону или нет
  if(code == roadCode || code == exitCode){
    
    //Убираем из стека обработанную команду
    playerCommands.shift();  
    //Запоминаем предыдущее местоположение робота
    lastPlayerPoz = playerPozition;
    //Запоминаем новую позицию игрока на поле
    playerPozition = pPoz;
    //Если достигли выхода из лабиринта
    if(code == exitCode) {
      return "end";
    }
  }
  else return "Робот врезался в стену";
  //Передвигаем игрока в нужную клетку
  movePlayerToFieldElement(field[playerPozition]);
	return "";
}

//Добавляет набор команд в текущий буфер(стек) команд игрока
function addCommandsToPlayer(comm){
  //Если добавлять нечего
  if(comm === null || comm.length === 0) return;
  
  var isStop = false;
  //Если найдем команду стоп в стеке команд то сбрасываем весь стек и останавливаем робота
  OOP.forArr(comm,function(el){
    if(el == COMMANDS.STOP){
      isStop = true;
      return;
    }
  });
  if(isStop){
    playerCommands = new Array();
    playerCommands.push(COMMANDS.STOP);
    return;
  }

  //Добавляем все элементы из comm В КОНЕЦ стека
  if(lastPlayerPoz != playerPozition){//Только если мы сдвинулись с прошлой клетки(Запись в буфер команд происходит только один раз с клетки)
    for(var i = 0; i < comm.length; i++){
      playerCommands.push(comm[i]);
    }
  }
  //alert(playerCommands.length);
}

//Устанавливает текущее направление обзора робота
function playerSetDirection(direction){
  //Контролируем идентификаторы поворота робота
  if(direction < 0) direction = 3;
  else if(direction > 3) direction = 0;
  //Обрабатываем сторону
  if(direction === 0) playerImageObj.angle = 0;
  else if(direction == 2) playerImageObj.angle = 180;
  else if(direction == 3) playerImageObj.angle = -90;
  else if(direction == 1) playerImageObj.angle = 90;
  playerFrontSide = direction;
}

//Перемещает игрока на заданный элемент поля
function movePlayerToFieldElement(fEl){
  //Если объект игрока ещё не создан
  if(playerImageObj === null){
    playerImageObj = game.newImageObject({
        file : playerImgSrc,
        x : fEl.X,
        y : fEl.Y,
        w : fEl.W,
        h : fEl.H
      }); 
  }
  else//Если он уже есть, то просто смещаем его в нужную позицию
  {
    playerImageObj.x = fEl.X;
    playerImageObj.y = fEl.Y;
    playerImageObj.w = fEl.W;
    playerImageObj.h = fEl.H;
  }
}

//Задает направление для персонажа, исходя из того, где находится вход в лабиринт
function getPlayerDirFromSide(){
  if(entrySide == "LEFT") return 1;
  if(entrySide == "UP") return 2;
  if(entrySide == "RIGHT") return 3;
  return 0;
}
