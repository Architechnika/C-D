//СКРИПТ ОПИСЫВАЕТ МЕТОДЫ И ДАННЫЕ ИГРОКА, КОТОРЫЙ ПРОХОДИТ ЛАБИРИНТ
//Позиция игрока на поле
var playerPozition = 0,
    lastPlayerPoz = 0;
//Текущая команда для выполнения
var playerCommands = new Array(); //стек команд игрока
var lastReadedCommands = new Array(); //буфер для хранения последнего считанного с карты набора команд(для отображения его в код мапе)
var playerStatesBuff = new Array(); //стек состояний игрока
//Текущая лицевая сторона
var playerFrontSide = 0; //0 верх, 1 право, 2 низ, 3 лево
//Время старта движения робота, с отсчетом от глобального таймера в милисекундах
var startPlayerMoveTime = 0;
var startPoz = 0;
var freezCounter = 0;//Счетчик того сколько ходов уже робот стоит на месте
var localEXP = 0;//Переменная для хранения опыта робота набираемого за один лабиринт
var globalEXP = 0;
//Инициализация игрока
function playerSetStart() {
    //Ищем местоположение двери
    OOP.forArr(field, function (f, indx) {
        //Если нашли вход в лабиринт
        if (f.code == entryCode) {
            //Запоминаем позицию на поле
            playerPozition = indx;
            startPoz = indx;
            //Генерим графическое представление игрока для отображение
            movePlayerToFieldElement(field[playerPozition]);
            if(labView)
                labView.setFocusOnElement(field[playerPozition],false, true);
            //Задаем направление, куда смотрит персонаж
            playerSetDirection(getPlayerDirFromSide());
            //Обнуляем счетчик времени
            startPlayerMoveTime = 0;
            freezCounter = 0;
            //Обнуляем счетчик ходов робота
            playerMoveCount = 0;
            lastPlayerPoz = -1;
            //Инициализируем стек команд
            playerCommands = new Array();
            //Инициализируем стек состояний игрока
            playerStatesBuff = new Array();
            //Инициализируем буфер для хранения последнего считанного с карты набора команд(для отображения его в код мапе)
            lastReadedCommands = new Array();
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
    var dir = 0;

    var pPoz = playerPozition;
    var pozBuff = pPoz;
    var isTrueDir = true;
    var isShift = true;
    if (!canRead) { //Добавляем команды из текущего элемента поля в стек команд игрока
        addCommandsToPlayer(field[playerPozition].getCommands(true));
    }
    //Если стек пустой, то возвращаем ошибку
    if (playerCommands.length === 0) return lang[selectLang]['robot_not_know'];
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
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[3];
            return playerMove(false);
            break;
        case "back":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[4];
            return playerMove(false);
            break;
        case "onleft":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[1];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[2];
            return playerMove(false);
            break;
        case "onright":
            if (playerFrontSide == 0) playerCommands[0] = COMMANDS[4];
            else if (playerFrontSide == 1) playerCommands[0] = COMMANDS[2];
            else if (playerFrontSide == 2) playerCommands[0] = COMMANDS[3];
            else if (playerFrontSide == 3) playerCommands[0] = COMMANDS[1];
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
            audio_object_up.play();
            if (res != "") return res;
            break;
        case "drop":
            if (playerInventory === undefined || playerInventory.length == 0) return lang[selectLang]['inventory_is_empty'];
            //Если инвентарь не пуст, то выгружаем последний подобранный элемент на текущую позицию карты
            audio_object_down.play();
            playerInventory[0].setNewPosition(playerPozition);
            playerInventory[0].startRotation();
            gameObjects.push(playerInventory[0]);
            playerInventory.splice(0, 1);
            break;
        case "repeat":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionREPEAT(comm.countBlock, comm.commandsBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //addCommandsToPlayer(comms, true);
                insertArrayAt(playerCommands, 0, comms);
                drawCommState();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else {//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
        case "repeatif":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA, comm.blockB, comm.commandsBlock, undefined);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //addCommandsToPlayer(comms, true);
                insertArrayAt(playerCommands, 0, comms);
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else {//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
        case "if":
            //Выполняем итерацию цикла(получаем команды)
            var comms = checkConditionIF(comm.blockA, comm.blockB, comm.commandsBlock, comm.elseBlock);
            //Добавляем их в стек команд
            if (comms && comms.length != 0) {
                isShift = false;
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                insertArrayAt(playerCommands, 0, comms);
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            else{//Если блок условия не дал true
                //Удаляем верхнюю команду их стека команд
                removeUpperCommandFromPlayer();
                if(isVerticalScreen)
                    return playerMove(false);
                else {
                    drawCommState();
                    return "";
                }
            }
            break;
    }

    //Если направление в котором планирует сдвинутся робот не совпадает с его передней стороной
    if (!isTrueDir) {
        if (difficultyLevel == "EASY") { //Если уровень сложности изи то поворачиваем робота в нужную сторону
            turnToTrueDirection(dir);
            return playerMove(false);
        } else return lang[selectLang]['robot_not_look_there'];
    }
    //Проверяем на бесконечный цикл
    if(freezCounter >= infinityCycleSteps){
        return lang[selectLang]['robot_enter_infinity_cycle'];
    }
    freezCounter++;
    //Проверяем - сможет ли робот сдвинуться в эту сторону или нет
    if (code == roadCode || code == exitCode || code == entryCode) {

        //Убираем из стека обработанную команду
        if (isShift) {
            removeUpperCommandFromPlayer();
        }
        //Запоминаем предыдущее местоположение робота
        lastPlayerPoz = playerPozition;
        //Запоминаем новую позицию игрока на поле
        playerPozition = pPoz;
        //Если достигли выхода из лабиринта
        if (code == exitCode) {
            return "end";
        }
    } else if(pozBuff !== pPoz) return lang[selectLang]['crashed_the_wall'];
    //Передвигаем игрока в нужную клетку
    movePlayerToFieldElement(field[playerPozition]);
    getLocalEXP();
    if(pPoz !== pozBuff) freezCounter = 0;//Если робот дошёл до этой строчки кода, значит он ствинулся следовательно сбрасываем счетчик
    drawCommState();
    return "";
}

function getLocalEXP(){
    for(var i = 0 ; i < optimalRoute.length; i++){
        if(optimalRoute[i].isActive && playerPozition == optimalRoute[i].id){
            localEXP = localEXP + (playerInventory.length + 1);
            optimalRoute[i].isActive = false;
        }
    }
    log("LOCAL: " + localEXP);
}

//Вызывает отрисовку текущей выполняемой команды на карте кода
function drawCommState(isRegenCodeMap){
    if(!isVerticalScreen) {
        if(isRegenCodeMap)
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastReadedCommands, undefined, undefined, passiveItemsAlpha, playerCommands[0], true);
        codeView.setAlphaToElement(passiveItemsAlpha,playerCommands[0]);
    }
}

//Удаляет верхнюю команду из стека команд робота и сохраняет состояние робота в буфер состояний
function removeUpperCommandFromPlayer() {
    //Сохранаяем текущее состояние стека команд в буфер
    var copy = [];
    OOP.forArr(playerCommands, function (el) {
        copy.push(el);
    });
    //ДОбавляем состояние игрока в буфер состояний
    playerStatesBuff.unshift(new PlayerState(playerPozition, playerFrontSide, copy));
    //Удаляем верхнюю команду из стека команд игрока
    playerCommands.shift();
}

//Возвращает робота на шаг назад
function setPreviousStateToPlayer() {
    if (playerStatesBuff && playerStatesBuff.length > 0) {
        playerPozition = playerStatesBuff[0].position;
        //Возвращаем игрока на предыдущую позицию
        if (playerStatesBuff[0].position == startPoz) {
            playerSetStart();
            addCommandsToPlayer(field[playerPozition].getCommands());
            //СБрасываем флаг для чтения команд
            OOP.forArr(field, function (el) {
                el.isCommandsReaded = false;
            });
            return;
        } else movePlayerToFieldElement(field[playerStatesBuff[0].position]);
        //Разворачиваем его куда нужно
        playerSetDirection(playerStatesBuff[0].direction);
        //Инициализируем стек команд робота
        playerCommands = [];
        OOP.forArr(playerStatesBuff[0].commands, function (el) {
            playerCommands.push(el);
        });
        //Убираем обработанный элемент
        playerStatesBuff.shift();
        drawCommState(true);
    }
}

//Добавляет набор команд в текущий буфер(стек) команд игрока
function addCommandsToPlayer(comm, dontClear) {
    //Если добавлять нечего
    if (!comm || comm.length === 0) return;
    //Если считали команды с клетки поля
    if (!dontClear) {
        playerCommands = new Array();
    }
    //Добавляем все элементы из comm в НАЧАЛО стека
    //Только если мы сдвинулись с прошлой клетки(Запись в буфер команд происходит только один раз с клетки) ну или робот не знает что делать
    //if(lastPlayerPoz != playerPozition){
    for (var i = comm.length - 1; i >= 0; i--) {
        playerCommands.unshift(getCopyOfObj(comm[i]));
    }
    //Если команды были считаны с клетки поля то сохраняем их в буфер для построения карты кода
    if (!dontClear) {
        lastReadedCommands = new Array();
        OOP.forArr(playerCommands, function (el) {
            lastReadedCommands.unshift(el);
        });
    }
    drawCommState(true);
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
                gameObjects[i].stopRotating();
                //Переносим его в инвентарь
                playerInventory.push(gameObjects[i]);
                playerInventory[playerInventory.length - 1].__proto__ = gameObjects[i].__proto__;
                gameObjects.splice(i, 1);
                return "";
            }
        }
    }
    return lang[selectLang]['robot_not_find_object'];
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
function movePlayerToFieldElement(fEl, dontFocus) {
    //Если объект игрока ещё не создан
    if (playerImageObj === null) {
        playerImageObj  = game.newAnimationObject(   { 
     animation : pjs.tiles.newImage("animations/carExhaust.png").getAnimation(0, 0, 128, 128, 8), 
    x: fEl.x,
    y: fEl.y,
    w: fEl.w,
    h: fEl.h,
     angle : 0, 
     alpha : 1, 
     visible : true 
   });
    playerImageObj.setDelay(1);
    } else //Если он уже есть, то просто смещаем его в нужную позицию
    {
        playerImageObj.x = fEl.x;
        playerImageObj.y = fEl.y;
        playerImageObj.w = fEl.w;
        playerImageObj.h = fEl.h;
    }
    if(labView && !dontFocus) labView.setFocusOnElement(field[playerPozition],false);
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

function PlayerState(pos, dir, comms) {
    this.position = pos;
    this.direction = dir;
    this.commands = comms;
}

function wait(miliSec){
    var e = new Date().getTime() + miliSec;
    while (new Date().getTime() <= e) {

    };
}

//Возвращает массив команд для прохождения лабиринта оптимальным маршрутом от старта до финиша
function getOptimalRouteCommands(){
    var r=[];
    var p = playerPozition;
    var f = field;
    var o = optimalRoute;
    for(var i = 0 ; i < o.length; i++){//for(var i = o.length - 1; i >= 0; i--){
        if(p + 1 == o[i].id){//Лево
            r.push(getCopyOfObj(COMMANDS[3]));
            p += 1;
        }
        else if(p - 1 == o[i].id){//Право
            r.push(getCopyOfObj(COMMANDS[4]));
            p -= 1;
        }
        else if(p + totalWidth == o[i].id){//Верх
            r.push(getCopyOfObj(COMMANDS[1]));
            p += totalWidth;
        }
        else if(p - totalWidth == o[i].id){//Низ
            r.push(getCopyOfObj(COMMANDS[2]));
            p -= totalWidth;
        }
    }
    return r;
}
