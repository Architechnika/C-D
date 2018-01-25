//СКРИПТ ОПИСЫВАЕТ МЕТОДЫ И ДАННЫЕ ИГРОКА, КОТОРЫЙ ПРОХОДИТ ЛАБИРИНТ

//Позиция игрока на поле
var playerPozition = 0,
    lastPlayerPoz = 0;
//Текущая команда для выполнения
var playerCommands = new Array();
//Инвентарь робота. На карте он может собирать и перетаскивать элементы
var playerInventory = new Array();
//Текущая лицевая сторона
var playerFrontSide = 0; //0 верх, 1 право, 2 низ, 3 лево
//Время старта движения робота, с отсчетом от глобального таймера в милисекундах
var startPlayerMoveTime = 0;
//Счетчик ходов робота
var playerMoveCount = 0;
//Инициализация игрока
function playerSetStart() {
    //Ищем местоположение двери
    OOP.forArr(field, function (f, indx) {
        //Если нашли вход в лабиринт
        if (f.code == entryCode) {
            //Запоминаем позицию на поле
            playerPozition = indx;
            //Генерим графическое представление игрока для отображение
            movePlayerToFieldElement(field[playerPozition]);
            //Задаем направление, куда смотрит персонаж
            playerSetDirection(getPlayerDirFromSide());
            //Обнуляем счетчик времени
            startPlayerMoveTime = 0;
            //Обнуляем счетчик ходов робота
            playerMoveCount = 0;
            lastPlayerPoz = -1;
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
function playerMove(canRead) {
    playerMoveCount++;
    var code = field[playerPozition].code;
    var pPoz = playerPozition;
    var dir = 0;
    var isTrueDir = true;
    var isShift = true;
    if (!canRead) { //Добавляем команды из текущего элемента поля в стек команд игрока
        addCommandsToPlayer(field[playerPozition].getCommands(true));
    }
    //Если стек пустой, то возвращаем ошибку
    if (playerCommands.length === 0) return "Робот не знает что ему делать";
    //Обрабатываем самую верхнюю команду
    var comm = playerCommands[0];

    //Обрабатываем команды
    switch (comm.name) { //Обрабатываем верхнюю команду
        case "up": //Вверх
            code = field[playerPozition + totalWidth].code;
            pPoz += totalWidth;
            isTrueDir = playerFrontSide == 0;
            dir = 0;
            break;
        case "down": //Вниз
            code = field[playerPozition - totalWidth].code;
            pPoz -= totalWidth;
            isTrueDir = playerFrontSide == 2;
            dir = 2;
            break;
        case "left": //Влево
            code = field[playerPozition + 1].code;
            pPoz++;
            isTrueDir = playerFrontSide == 3;
            dir = 3;
            break;
        case "right": //Вправо
            code = field[playerPozition - 1].code;
            pPoz--;
            isTrueDir = playerFrontSide == 1;
            dir = 1;
            break;
        case "forward":
            if(playerFrontSide == 0) playerCommands[0] = COMMANDS[1];
            else if(playerFrontSide == 1) playerCommands[0] = COMMANDS[4];
            else if(playerFrontSide == 2) playerCommands[0] = COMMANDS[2];
            else if(playerFrontSide == 3) playerCommands[0] = COMMANDS[3];
            return playerMove(false);
            break;
        case "back":
            if(playerFrontSide == 0) playerCommands[0] = COMMANDS[2];
            else if(playerFrontSide == 1) playerCommands[0] = COMMANDS[3];
            else if(playerFrontSide == 2) playerCommands[0] = COMMANDS[1];
            else if(playerFrontSide == 3) playerCommands[0] = COMMANDS[4];
            return playerMove(false);
            break;
        case "onleft":
            if(playerFrontSide == 0) playerCommands[0] = COMMANDS[3];
            else if(playerFrontSide == 1) playerCommands[0] = COMMANDS[1];
            else if(playerFrontSide == 2) playerCommands[0] = COMMANDS[4];
            else if(playerFrontSide == 3) playerCommands[0] = COMMANDS[2];
            return playerMove(false);
            break;
        case "onright":
            if(playerFrontSide == 0) playerCommands[0] = COMMANDS[4];
            else if(playerFrontSide == 1) playerCommands[0] = COMMANDS[2];
            else if(playerFrontSide == 2) playerCommands[0] = COMMANDS[3];
            else if(playerFrontSide == 3) playerCommands[0] = COMMANDS[1];
            return playerMove(false);
            break;
        case "clockwise": //Повернуться по часовой стрелке
            //Задаем направление того, куда смотрит робот
            playerSetDirection(playerFrontSide + 1);
            break;
        case "unclockwise": //Повернуться против часовой стрелк
            //Задаем направление того, куда смотрит робот
            playerSetDirection(playerFrontSide - 1);
            break;
        case "stop": //Остановиться на текущей клетке
            playerCommands = new Array();
            //Запоминаем новую позицию игрока на поле
            playerPozition = pPoz;
            lastPlayerPoz = playerPozition + 1; //Для того чтобы при следующем ходе снова считать команды
            return "stop";
            break;
        case "pickup":
            var res = tryToPickUp();
            if (res != "") return res;
            break;
        case "drop":
            if (playerInventory === undefined || playerInventory.length == 0) return "Инвентарь робота пуст";
            //Если инвентарь не пуст, то выгружаем последний подобранный элемент на текущую позицию карты
            playerInventory[0].setNewPosition(playerPozition);
            gameObjects.push(playerInventory[0]);
            playerInventory.splice(0, 1);
            break;
        case "repeat":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionREPEAT(comm.countBlock, comm.commandsBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                addCommandsToPlayer(comms, true);
                return playerMove(false);
            }
            break;
        case "repeatif":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA,comm.blockB,comm.commandsBlock,undefined);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                addCommandsToPlayer(comms, true);
                return playerMove(false);
            }
            break;
        case "if":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA,comm.blockB,comm.commandsBlock,comm.elseBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                playerCommands.shift();
                insertArrayAt(playerCommands, 0, comms);
                return playerMove(false);
            }
            break;
    }

    //Если направление в котором планирует сдвинутся робот не совпадает с его передней стороной
    if (!isTrueDir) {
        if (difficultyLevel == "EASY") { //Если уровень сложности изи то поворачиваем робота в нужную сторону
            turnToTrueDirection(dir);
            return playerMove(false);
        } else return "Робот смотрит не в ту сторону";
    }

    //Проверяем - сможет ли робот сдвинуться в эту сторону или нет
    if (code == roadCode || code == exitCode) {

        //Убираем из стека обработанную команду
        if (isShift) playerCommands.shift();
        //Запоминаем предыдущее местоположение робота
        lastPlayerPoz = playerPozition;
        //Запоминаем новую позицию игрока на поле
        playerPozition = pPoz;
        //Если достигли выхода из лабиринта
        if (code == exitCode) {
            return "end";
        }
    } else return "Робот врезался в стену";
    //Передвигаем игрока в нужную клетку
    movePlayerToFieldElement(field[playerPozition]);
    return "";
}

//Добавляет набор команд в текущий буфер(стек) команд игрока
function addCommandsToPlayer(comm, dontClear) {
    //Если добавлять нечего
    if (comm === undefined || comm.length === 0) return;
    if (dontClear === undefined)
        playerCommands = new Array();
    //Добавляем все элементы из comm в НАЧАЛО стека
    //Только если мы сдвинулись с прошлой клетки(Запись в буфер команд происходит только один раз с клетки) ну или робот не знает что делать
    //if(lastPlayerPoz != playerPozition){
    for (var i = comm.length - 1; i >= 0; i--) {
        playerCommands.unshift(getCopyOfObj(comm[i]));
    }
    //}
}

function turnToTrueDirection(dir) {

    if (dir != playerFrontSide) {
        if ((dir == 3 && playerFrontSide == 0) || (dir < playerFrontSide && dir != 0)) playerCommands.unshift(COMMANDS[6]); //Чтобы робот не крутился а просто повернулся против часовой если смотрит вверх
        else if ((dir == 0 && playerFrontSide == 3) || dir > playerFrontSide) playerCommands.unshift(COMMANDS[5]); //Поворачиваем робота по часовой
        else playerCommands.unshift(COMMANDS[6]);
    }

}

//Метод для сбор вещей в инвентарь(возвращает строку с текстом ошибки или пустую строку)
function tryToPickUp() {
    if (gameObjects !== undefined && gameObjects.length > 0) {
        //Ищем игровой обьект, который находится на той же клетке что и игрок
        for (var i = 0; i < gameObjects.length; i++) {
            //Если нашли
            if (gameObjects[i].position == playerPozition) {
                //Переносим его в инвентарь
                playerInventory.push(gameObjects[i]);
                gameObjects.splice(i, 1);
                return "";
            }
        }
    }
    return "Робот не может найти объект который можно подобрать";
}

//Устанавливает текущее направление обзора робота
function playerSetDirection(direction) {
    //Контролируем идентификаторы поворота робота
    if (direction < 0) direction = 3;
    else if (direction > 3) direction = 0;
    //Обрабатываем сторону
    if (direction === 0) playerImageObj.angle = 0;
    else if (direction == 2) playerImageObj.angle = 180;
    else if (direction == 3) playerImageObj.angle = -90;
    else if (direction == 1) playerImageObj.angle = 90;
    playerFrontSide = direction;
}

//Перемещает игрока на заданный элемент поля
function movePlayerToFieldElement(fEl) {
    //Если объект игрока ещё не создан
    if (playerImageObj === null) {
        playerImageObj = game.newImageObject({
            file: playerImgSrc,
            x: fEl.X,
            y: fEl.Y,
            w: fEl.W,
            h: fEl.H
        });
    } else //Если он уже есть, то просто смещаем его в нужную позицию
    {
        playerImageObj.x = fEl.X;
        playerImageObj.y = fEl.Y;
        playerImageObj.w = fEl.W;
        playerImageObj.h = fEl.H;
    }
}

//Задает направление для персонажа, исходя из того, где находится вход в лабиринт
function getPlayerDirFromSide() {
    if (entrySide == "LEFT") return 1;
    if (entrySide == "UP") return 2;
    if (entrySide == "RIGHT") return 3;
    return 0;
}

//Возвращает время в милисекундах от старта движения робота
function getPlayerMoveTime() {
    return totalMiliSeconds - startPlayerMoveTime;
}

function insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
}
