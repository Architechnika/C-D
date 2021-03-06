/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX = 0,
    gameSpaceY = 0;
var gameSpaceW = 0,
    gameSpaceH = 0;

var totalWidth = labyrinthSize; //Колличество блоков в строку(в начале игры)
var totalHeight = labyrinthSize; //Колличество блоков в столбец(в начале игры)
var totalCommandsAllowed = 0; //Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalAttempts = 0; //Счетчик попыток прохождения уровня
var lastClickedElement = undefined; //Последний элемент карты по которому кликал пользователь(нужно для построения карты кода)
var choosenCommandInElement = undefined; //Индекс команды в массиве команд которую редактирует игрок
var menuStatesArr = new Array();
var isEntried = false; //Флаг для обозначения того, что игра уже была инициализирована и не нужно пересоздавать всю игру при перезагрузке
var isStarted = false; //Флаг для старта/стопа игры
var itemToReplaceInCodeMap = undefined; //Переменная для хранения ссылки на обьект который нужно заменить в codeView
var itemToAddAfterInCodeMap = undefined; //Переменная которая хранит обьект из codeMap после которого надо добавить элемент
var timeTimerLaunched = false;
var logicTimerLaunched = false;
var isSecondScreen = false;
var isVerticalScreen = undefined;
var widthBuff = width;
var dialog = undefined;
var loadDialog = undefined;
var lastAddedCommand = undefined;
var achievement_noErrors = true;
//Переменная для хранения состояний меню ввода команд:
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - counter или repeat
// 4 - commandBlock или count
// 5 - elseBlock
var inputCommandStates = 0;
var labView, codeView;
//Буфер для хранения стартового состояния игры(для того чтобы переигрывать уровень)
var buffGameCondition = {
    map: "",
    gObjs: "",
    gExp: "",
    opRoute: "",
    cLvl: "",
    nLvl: "",
    pLvl: "",
    labSize: "",
    entrySide: ""
}
//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
    //Код для старта игры
    this.entry = function () {
        var userID = sessionStorage.getItem("userdata")
        var isNewGame = sessionStorage.getItem("typeGame") //получаем информацию о том, загружаемся или это новая игра
        sessionStorage.removeItem("typeGame") //удаляем из сессии информацию о том загрузка это или новая игра
        var buf = localMemory.loadAsObject(userID);
        userData = new UserAccaunt();
        //if (buf && isNewGame != "NewGame") {
            //userData = new UserAccaunt();
            userData.copy(buf,isNewGame);
      //  }
        //Инициализируем события для перехвата ввода
        initInputEvents();
        if (isEntried) return;
        //Смотрим смартфон или ПК у нас
        isMobile = touch.isMobileDevice();
        //Создаем все объекты для игры
        initializeGame(true);
        //Запускаем таймер который сохраняет состояние игры
        saveTimer();
        //Инициализируем таймер времени
        if (!timeTimerLaunched) {
            timeTimerLaunched = true;
            totalTimeTimer();
        }
        if (!logicTimerLaunched) {
            logicTimerLaunched = true;
            logicEventTimer();
        }
        //mainbackGround = new mainBackGroundDrow();
        isEntried = true;
    };
    //Код для завершения игры
    this.exit = function () {
        //Удаляем обработчики ввода со странички
        removeInputEvents();
    };
    //Код для апдейта игры
    this.update = function () {
        //Обновляем графику
        updateScreen();
        //контроль поведений анимаций
        animationsControl();
    };
});

//Запускает таймер который следит за изменениями параметров экрана
function saveTimer() {
    //сохраняем состояние игры
    if (userData !== undefined) {
        userData.save(true, totalSeconds, field, playerInventory, gameObjects, entrySide);
    }
    setTimeout("saveTimer()", saveTimeout);
}

//Таймер, который контролирует логические процессы игры(Смена ориентации экрана, события тултипов)-----------------------------------------------------------
function logicEventTimer() {
    //Проверяем смену ориентации экрана
    if (game.getWH().w != width) {
        isOkClose = true;
        recalcScreen();
    }
    if (toolTip && !toolTip.isVisible() && toolTipTimeCounter >= toolTipDelay) {
        toolTipShowEvent(clickCoord.x, clickCoord.y);
        toolTipTimeCounter = 0;
    } else toolTipTimeCounter += 40;
    if (logicTimerLaunched) {
        setTimeout("logicEventTimer()", 40);
    }
}

function totalTimeTimer() {
    if (timeTimerLaunched) {
        totalSeconds++;
        setTimeout("totalTimeTimer()", 1000);
    }
}
//Функция перерасчитывает параметры всех графических элементов
function recalcScreen() {
    if (isSecondScreen) {
        allButtons.backToStartButton.setAlpha(1);
        allButtons.stepDownButton.setAlpha(1);
        allButtons.stepUpButton.setAlpha(1);
        isSecondScreen = false;
        game.setLoop("Labyrinth");
    }
    if (lastClickedElement) lastClickedElement.setStroke(false);
    width = game.getWH().w;
    height = game.getWH().h;
    //Пересчитываем позиции всех элементов
    initGameSpace();
    calcMapPosition();
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    labView.checkGameObjects(); //Ставим обьекты на место
    Scrolls.splice(0, Scrolls.length);
    initGUI();
    //Инициализируем обьект для вывода карты кода
    if (!codeMapBG) {
        codeView = new CodeMapView(0, 0, 0, 0, "white");
    } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
    //Показываем кнопку старт или стоп
    allButtons.mainButton.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
    //Если у робота есть команды в инвентаре или игра запущена
    if (isStarted || playerCommands && playerCommands.length > 0) {
        //Если игра перешла в горизонтальное отображение, то надо перегенерит кодмап
        if (!isVerticalScreen) {
            drawCommState(true);
        }
    }
    labView.setFocusOnElement(field[playerPozition], true);
}

//Инициализация лабиринта
function initializeGame(isInit, dontSaveState) {
    game.clear();
    initGameSpace();
    menuStatesArr = null;
    menuStatesArr = new Array();
    var isLoaded = false;
    var isPrevState = false;
    //Создаем новое поле
     if (isInit) {
         if (userData) {
             if (sessionStorage.getItem("prevState")) {
                 userData.copy(JSON.parse(sessionStorage.getItem("prevState")));
                 userData.gameTime = 0;
                 sessionStorage.removeItem("prevState");
             }
            field = userData.load(true, gameObjects, playerInventory, initGUI)
            if (field.length <= 0) {
                generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
            }
            else {
                movePlayerToFieldElement(field[playerPozition], undefined, playerPozition);
                playerSetDirection(getPlayerDirFromSide(), false);
                isLoaded = true;
            }
        } else {
            initLabirint();
        }
    } else {
        initLabirint();
    }

    allButtons = new Buttons();
    dialog = new Dialog();
    //Рассчитываем сколько команд можно поставить на этом поле для прохождения
    totalCommandsAllowed = (totalWidth + totalHeight) * 2;
    //Инициализируем обьекты для вывода графики лабиринта
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    totalAttempts = 0;
    //mainbackGround = new mainBackGroundDrow();
    //Инициализируем обьект для вывода карты кода
    if (!codeMapBG) {
        codeView = new CodeMapView(0, 0, 0, 0, "white");
    } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
    if (Scrolls) Scrolls.splice(0);
    recalcScreen();
    achievement_noErrors = true;
    //Создаем игрока
    if (!isLoaded)
        playerSetStart();   
    if (!dontSaveState)
        saveGameState();
}

function saveGameState() {
    //Инициализируем буфер состояния игры
    buffGameCondition.map = getCopyOfObj(field);
    buffGameCondition.gObjs = getCopyOfObj(gameObjects);
    buffGameCondition.opRoute = getCopyOfObj(optimalRoute);
    buffGameCondition.gExp = globalEXP;
    buffGameCondition.cLvl = currentPlayerLevel;
    buffGameCondition.nLvl = nextLevelEXP;
    buffGameCondition.pLvl = prevLevelEXP;
    buffGameCondition.labSize = labyrinthSize;
    buffGameCondition.entrySide = entrySide;
}

function initLabirint() {
    //Запоминаем команды в клетке с входом, чтобы перенести их в следующий лабиринт(Если там больше одной команды)
    var comms = undefined;
    if (field) {
        OOP.forArr(field, function (el) {
            if (el.code == entryCode) {//Проверяем есть ли в начальной клетке лабиринта команды, если есть, то они переносятся в следующий лабиринт
                if (el.commands && el.commands.length > 0) {//Если команды вообще есть
                    if (el.commands[0].commandsBlock) {//Если в стеке команд на первом месте сложная команда
                        if (el.commands[0].commandsBlock.actions.length > 0) {//Если в блоке команд этой команды есть блоки команд
                            comms = el.commands;
                        }
                        else if (el.commands.elseBlock && el.commands.elseBlock.actions.length > 0) {//Иначе проверяем блок else если он есть аналогично
                            comms = el.commands;
                        }
                    }
                    else if (el.commands.length > 1) {//Иначе если в стеке команд простые команды, то если их больше 1 то переносим
                        comms = el.commands;
                    }
                }
                return;
            }
        });
    }
    //Генерим лабиринт
    field = new Array();
    initGUI();
    generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
    //Сбрасываем счетчик времени
    totalSeconds = 0;
    //Если из прошлого лабиринта были команды в клетке entry то переносим их в текущий лабиринт
    if (comms) {
        OOP.forArr(field, function (el) {
            if (el.code == entryCode) {
                el.commands = comms;
                return;
            }
        });
    }
}

function initGameSpace() {

    if (width < height) {
        gameSpaceX = 0;
        gameSpaceY = ((height - (height * 0.14)) / 2) - (width / 2);
        gameSpaceW = width;
        gameSpaceH = gameSpaceW;
        isVerticalScreen = true;

    } else {
        gameSpaceX = height / 100 * 15;
        gameSpaceY = (height / 100 * 15) / 5;
        gameSpaceH = height / 100 * 85;
        gameSpaceW = gameSpaceH
        isVerticalScreen = false;
    }
    saveInput.setPosture();
}

//Возвращает число команд на поле всего
function getTotalCommandsOnField() {
    var counter = 0;
    OOP.forArr(field, function (el) {
        counter += el.getTotalCommands();
    });
    //counter += playerCommands.length;
    return counter;
}

//Обработка нажатий на поле
function setFocused(fieldElem, indx) {

    //Если нажали на недоспустимый элемент
    if ((fieldElem.code != roadCode && fieldElem.code != entryCode) || isStarted) {
        return;
    }
    if (fieldElem.isCommandsReaded) fieldElem.isCommandsReaded = false;
    //Cохраняем номер текущего
    lastClickedIndx = indx; 
    if (lastClickedElement) lastClickedElement.setStroke(false);
    //Запоминаем последний кликнутый пользователь элемент
    lastClickedElement = field[lastClickedIndx];
    inputCommandStates = 0;
    dialog.setHidden(true);
    //Выделяем в рамку объект по которому нажали
    field[indx].setStroke(true);
    //Если ориентация экрана горизонтальная, то
    if (!isVerticalScreen) {
        //Инициализируем левый скролл
        initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
        initRightScroll([]);
        codeView.resetZoomer();
        codeView.createCodeMap(0, textbackGroundItem.h, lastClickedElement.commands, true, true, 1, true);
        if (lastClickedElement.commands.length == 0) {
            onCodeMapElementClick(codeView.getAllElems()[0]);
            initSaveItems();
        }

    } else { //Если ориентация экрана вертикальная
        clearAllLayers();
        allButtons.backToStartButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepDownButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepUpButton.setAlpha(inactiveItemsAlpha);
        //Показываем кнопку ok
        allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
        allButtons.mainButton.value = "ok"
        game.setLoop("SecondScreen")
    }
}

//Функция обработчик для добавления команды в клетку
//CommandImg - ImgObj по которому кликнули
//dontAdd - флаг для того чтобы не добавлять элемент а выбирать как активный
function addCommandToCell(commandImg, dontAdd) {

    if (!dontAdd) { //Если добавляем команду

        if (inputCommandStates == 1) { //Если у нас простая команда и мы добавляем ее тупо в клетку
            lastAddedCommand = getCopyOfObj(commandImg.command);
            choosenCommandInElement.push(lastAddedCommand);
            if (commandImg.command.commandsBlock) onOkBClick();
            else initLeftScroll(getCommandsImgArr(choosenCommandInElement));
        } else if (inputCommandStates == 2) { //Если выбираем blockA
            lastAddedCommand = undefined;
            var comm = getCopyOfObj(COMMANDS[10]); //Инициализируем команду whatisit
            comm.lookCommand = commandImg.command; //Инитим параметр lookCommand
            choosenCommandInElement.blockA = comm;
            inputCommandStates = 0;
            if (isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 3) { //Если выбираем blockB
            lastAddedCommand = undefined;
            if (blockBElemIndx != -1) {
                choosenCommandInElement.blockB[blockBElemIndx] = commandImg.command;
                if (choosenCommandInElement.blockB[choosenCommandInElement.blockB.length - 1].code !== COMMANDS[15].code) {
                    choosenCommandInElement.blockB.push(getCopyOfObj(COMMANDS[15]));
                }
                blockBElemIndx = -1;
            } else choosenCommandInElement.blockB.push(commandImg.command);
            inputCommandStates = 0;
            if (isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 0) { //Если редактируем команды из codeView
            if (itemToReplaceInCodeMap) { //Если нужно заменить элемент
                lastAddedCommand = undefined;
                //Находим массив в котором хранится команда для замены
                var elemStor = findObjStorage(lastClickedElement.commands, itemToReplaceInCodeMap.command);
                var elem = elemStor[elemStor.indexOf(itemToReplaceInCodeMap.command)];
                //Копируем содержимое команды
                if (commandImg.command.commandsBlock && elem.commandsBlock) {
                    if (elem.commandsBlock.actions && elem.commandsBlock.actions.length > 0)
                        commandImg.command.commandsBlock.actions = elem.commandsBlock.actions;
                }
                if (commandImg.command.elseBlock && elem.elseBlock) {
                    if (elem.elseBlock.actions && elem.elseBlock.actions.length > 0)
                        commandImg.command.elseBlock.actions = elem.elseBlock.actions;s
                }
                if (commandImg.command.blockA && elem.blockA)
                    commandImg.command.blockA = elem.blockA;
                if (commandImg.command.blockB && elem.blockB)
                    commandImg.command.blockB = elem.blockB;
                //Заменяем команду в этом массиве
                elemStor[elemStor.indexOf(itemToReplaceInCodeMap.command)] = commandImg.command;
                //Очищаем буфер для хранения обьекта для замены и скролл
                itemToReplaceInCodeMap = undefined;
                initLeftScroll(getCommandsImgArr(elemStor));
                initRightScroll([]);
                if (isVerticalScreen) initLeftScroll();
                codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
            }
            if (itemToAddAfterInCodeMap) { //Если нужно добавить элемент не в конец списка а после опредленного
                //Находим массив в котором хранится команда для замены
                var elemStor = findObjStorage(lastClickedElement.commands, itemToAddAfterInCodeMap.command);
                var indx = 0;
                //Находим ее в массиве и заменяем
                OOP.forArr(elemStor, function (el, i) {
                    if (el == itemToAddAfterInCodeMap.command) {
                        indx = i + 1;
                        return;
                    }
                });
                var clone = getCopyOfObj(commandImg.command);
                elemStor.splice(indx, 0, clone);
                itemToAddAfterInCodeMap.command = clone;
                lastAddedCommand = clone;
                if (commandImg.command.commandsBlock) onOkBClick();
                initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            }
        }
        return;
    }
    //Меняем состояние меню в зависимости от типа команды
    changeMenuState(commandImg);
}

//Задает состояние меню в зависимости от типа команды
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - blockC
// 4 - commandBlock или count
// 5 - elseBlock
function changeMenuState(commandImg) {
    var commName = commandImg.name ? commandImg.name : commandImg.command.name;
    //Скрываем текстовое поле ввода итераций в цикле, если оно не скрыто
    if (inputCounterText && inputCounterText.visible && choosenCommandInElement.name != "repeat") inputCounterText.visible = false;

    if (commName == "plus") {
        inputCommandStates = 1;
        if (choosenCommandInElement && choosenCommandInElement.length == 0) {
            initLeftScroll(saveItems);
        }
        else initLeftScroll(getCommandsImgArr(choosenCommandInElement));
        initRightScroll(getAllCommandsMenu(commandImg.commandName && commandImg.commandName != "empty"));
    } else if (commName == "blockA" || commName == "whatisit") {
        inputCommandStates = 2;
        initLeftScroll([]);
        initRightScroll(getAllDirections());

    } else if (commName == "blockB") {
        inputCommandStates = 3;
        initLeftScroll([]);
        if (choosenCommandInElement.blockB && choosenCommandInElement.blockB.length > 1 && commandImg.command.code != "B") {
            initRightScroll(getAllInteractGameObjects(true, commandImg.command));
        }
        else initRightScroll(getAllInteractGameObjects());

    } else if (commName == "counter") {
        inputCommandStates = 4;
        initLeftScroll([]);
        //Инициализируем клавиатуру для ввода цифр
        if (!isVerticalScreen) {
            initRightScroll(getDigitKeyboardImages());
            infoText.setText(choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count + "");
        } else {
            //при вертикальном положении экрана коректируем окно ввода чисел
            var rScroll = initRightScroll(getDigitKeyboardImages()); //получаем скрол с числами чтобы позицанировать
            initLeftScroll();
            //позицанируем скрол - общая высота экрана минус "элемент скрола на количество строк в скроле этим узнаем высоту скрола" минус высота кнопок GUI
            rScroll.GetBackGround().x = 0;
            rScroll.GetBackGround().w = width;
            rScroll.GetBackGround().y = height - rScroll.getArrayItems()[0].h * rScroll.scrollRowCount - allButtons.mainButton.h;
            //реиницилизируем для потверждение позицианирования
            rScroll.initArrayItems(getDigitKeyboardImages());
            rScroll.GetBackGround().y = height - rScroll.getArrayItems()[0].h * rScroll.scrollRowCount - allButtons.mainButton.h;
            rScroll.initArrayItems(getDigitKeyboardImages());
            //меняем позиции и высоту текстового окна
            infoText.BG.x = rScroll.GetBackGround().x;
            infoText.BG.y = textbackGroundItem.h;
            infoText.BG.h = rScroll.GetBackGround().y - textbackGroundItem.h; // textbackGroundItem.h это высота верхней части экрана где время и количество очков 
            //
            infoText.setText(choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count + "");
        }
    }
}

//indexArray - индекс массива команд клетки в стеке команд клетки, indexELem - индекс элемента из этого массива команд для удаления
function removeCommandFromCell(indexArray, indexElem) {
    if (inputCommandStates == 0) { //ОБЫЧНЫЙ ЭЛЕМЕНТ НА ПОЛЕ
        //Удаляем команду из списка команд
        field[lastClickedIndx].removeCommand(indexElem);
        //инициазируем скролл новым списком
        //initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
        initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
    } else if (menuStatesArr.length > 0 && (inputCommandStates == 4 || inputCommandStates == 5)) { //COMMANDSBLOCK

        if (menuStatesArr[0].name == "if") {
            if (menuStatesArr[0].redacted == "commands") {
                var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
                //initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
                initLeftScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
            } else if (menuStatesArr[0].redacted == "else") {
                var indx = menuStatesArr[0].elseBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].elseBlock.actions.splice(indx, 1);
                //initDownScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
                initLeftScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
            }
        } else if (menuStatesArr[0].name == "repeatif" || menuStatesArr[0].name == "repeat") {
            var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
            menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
            //initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
            initLeftScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
        }
    }
}

//Рассчитываем точки по которым должен пройти робот в процессе анимации
var animSteps = [];
//Обработчик поведения робота
function processRobotMove() {
    var res = playerMove();

    if (res == "end") { //Если мы прошли до конца карты
        timeTimerLaunched = false;
        //Переходим на страничку вывода результата игры
        showLastWindow();
    } else if (res == "stop") {
        showMessage(lang[selectLang]['robot_is_waiting']);
        isStarted = false;
        //allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    } else if (res != "") //Если у робота возникли проблемы
    {
        achievement_noErrors = false;
        //alert(res); //Выводим их на экран
        //Останавливаем цикл движения игры
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
        //СБрасываем флаг для чтения команд
        OOP.forArr(field, function (el) {
            el.isCommandsReaded = false;
        });
        //Ставим робота на вход в лабиринт
        playerSetStart();
        //Очищаем карту кода
        codeView.clear();
        showMessage(res);
    } else if (isStarted) {
        movePlayerToFieldElement(field[playerPozition], true, playerPozition, true);
        if (robotAnimTurn !== undefined) {
            robotAnimTurnThr();
        }
        else if (robotAnimMovePoint) {
            robotAnimMove();
        }
        else setTimeout("processRobotMove()", visualizeCommandsDelay);
    }
    else {//Это когда отладка по шагам
        movePlayerToFieldElement(field[playerPozition], true, playerPozition);
        labView.setFocusOnElement(playerImageObj, false);
    }
}

var robotAnimSteps = 10;
var robotAnimMoveDelay = robotMoveDelay / robotAnimSteps;
function robotAnimTurnThr() {//Запускает анимацию поворота робота
    if (playerImageObj.angle != robotAnimTurn) {
        playerImageObj.angle += robotAnimTurnStep;
        setTimeout(robotAnimTurnThr, robotAnimMoveDelay);
    }
    else {
        if (playerImageObj.angle == 540)
            playerImageObj.angle = 180;
        robotAnimTurn = undefined;
        if (isStarted) {
            processRobotMove();
        }
    }
}
//Запускает анимацию движения робота по карте
function robotAnimMove() {
    if (robotAnimMovePoint) {
        //Рассчитываем точки по которым должен пройти робот в процессе анимации
        animSteps = [];
        if (playerImageObj.x == robotAnimMovePoint.x) {
            var step = (robotAnimMovePoint.y - playerImageObj.y) / robotAnimSteps;
            for (var i = 1; i < robotAnimSteps + 1; i++) {
                animSteps.push(new point(playerImageObj.x, (playerImageObj.y + (i * step))));
            }
        }
        else if (playerImageObj.y == robotAnimMovePoint.y) {
            var step = (robotAnimMovePoint.x - playerImageObj.x) / robotAnimSteps;
            for (var i = 1; i < robotAnimSteps + 1; i++) {
                animSteps.push(new point((playerImageObj.x + (i * step)), playerImageObj.y));
            }
        }
        else {
            log("Ошибка в анимации робота");
            movePlayerToFieldElement(field[playerPozition], true);
            robotAnimMovePoint = undefined;
            if (isStarted) {
                processRobotMove();
            }
            return;
        }
        rAnim(animSteps, playerImageObj);
    }
}

var animIterCounter = 0;
function rAnim(arr, p) {
    labView.setFocusOnElement(playerImageObj, false);
    if (arr && arr.length > 0) {
        p.x = arr[0].x;
        p.y = arr[0].y;
        arr.splice(0, 1);
        animIterCounter++;
        setTimeout(rAnim, robotAnimMoveDelay, arr, p);
    }
    else {
        if (isStarted) {
            if (animIterCounter >= robotAnimSteps) {
                animIterCounter = 0;
                robotAnimMovePoint = undefined;
                processRobotMove();
            }
            else {
                animIterCounter++;
                setTimeout(rAnim, robotAnimMoveDelay, arr, p);
            }
        }
    }
}

function showMessage(text) {
    messageBox.setShow(true);
    messageBox.setText(text);
    //allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
}

function initSaveItems() 
{ //сортируем сохраненные пользователем скрипты в правый скрол, для того чтобы при клике на пустую дорогу можно было туда выгрузить скрипт 
    //initLeftScroll(saveItems);
}

var achievements = [];
var allAchievements = [
    lang[selectLang]['achievement_all_boxes'],
    lang[selectLang]['achievement_optimal_route'],
    lang[selectLang]['achievement_no_errors']
];
var isLevelUp = false;
function showLastWindow() {
    isUpdateGraphics = false;
    var userDataCopy = getCopyOfObj(userData);
    sessionStorage.setItem("prevState", JSON.stringify(userDataCopy));
    //Рассчитываем параметры игры на следующий уровень
    calcEXP(checkAchievements());
    //Передаем данные между страницами через session storage
    function Data() {
        this.achievements = achievements;
        this.allAchievements = allAchievements;
        this.tSecs = totalSeconds;
        this.totalLabs = totalLabCompleted;
        this.cExp = globalEXP;
        this.pExp = prevLevelEXP;
        this.nExp = nextLevelEXP;
        this.pLvl = currentPlayerLevel;
        this.buff = buffGameCondition;
    }
    var d = new Data();
    var obj = JSON.stringify(d)
    sessionStorage.setItem("dataForLastWindow", obj);
    //Инитим следующий уровень
    initNextLvl();
    saveTimer();
    //Переходим на страничку вывода результата игры
    window.location.href = 'new1/lastwindow.html'
}

//Производит расчет очков опыта набранных игроком в процессе прохождения лабиринта
function calcEXP(bonus) {
    if (totalSeconds != 0)
        globalEXP += (localEXP / (totalSeconds * 0.5)) + bonus;
    //Очищаем значения которые надо очистить
    for (var i = 0; i < playerInventory.length; i++) {
        gameObjects.push(playerInventory[i]);
    }
    if (globalEXP > nextLevelEXP) {
        isLevelUp = true;
        currentPlayerLevel++;
        prevLevelEXP = nextLevelEXP;
        nextLevelEXP = nextLevelEXP + (currentPlayerLevel * currentPlayerLevel);
    }
    playerInventory.splice(0, playerInventory.length);
    localEXP = 0;
    totalLabCompleted++;
    return false;
}

//Возвращает бонусы очков опыта от ачивок:
//"opt" - прохождение лабиринта оптимальным маршрутом
//"noerrors" - прохождение без единой ошибки
function checkAchievements() {
    if (gameObjects.length == 0) {
        bonus += nextLevelEXP * 0.1;
        achievements.push(lang[selectLang]['achievement_all_boxes']);
    }
    //Проверка на ачивки
    playerMovesHistory.push(playerPozition);
    var bonus = 0;
    //Проверяем ачивку на оптимальный маршрут
    if (playerMovesHistory.length == optimalRoute.length) {
        var isOpt = true;
        for (var i = 0; i < optimalRoute.length; i++) {
            if (playerMovesHistory[i] != optimalRoute[i].id) {
                isOpt = false;
                break;
            }
        }
        if (isOpt) { //АЧИВКА ОПТИМАЛЬНЫЙ МАРШРУТ
            bonus += nextLevelEXP * 0.1;
            achievements.push(lang[selectLang]['achievement_optimal_route']);
        }
    }
    if (achievement_noErrors) { //АЧИВКА - ПРОХОЖДЕНИЕ БЕЗ ОШИБОК
        bonus += nextLevelEXP * 0.1;
        achievements.push(lang[selectLang]['achievement_no_errors']);
    }
    return bonus;
}

function nextLevel() {
    saveGameState();
    goToLab();
}

//Переходит в игровой цикл лабиринта
function goToLab() {
    if (soundIsOn) audio_GUI_click.play();
    robotOn = false;
    isStarted = false;
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    timeTimerLaunched = true;
    totalTimeTimer();
    codeView.clear();
    achivTextCont = undefined;
    achievements = [];
    achIndx = 0;
}

function initNextLvl() {
    codeView.clear();
    if (isLabyrinthGrow && isLevelUp) {
        if (labyrinthMaxSize !== 0 && totalWidth + 2 > labyrinthMaxSize && totalHeight + 2 > labyrinthMaxSize) { } else {
            labyrinthSize = totalWidth = totalHeight += 2;
        }
    }
    initializeGame(undefined, true);
}

function replayLevel() {
    totalLabCompleted--;
    totalSeconds = 0;

    field = getCopyOfObj(buffGameCondition.map);
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    gameObjects = [];
    OOP.forArr(getCopyOfObj(buffGameCondition.gObjs), function (el) {
        /*el.setNewPosition(el.position);
        el.startRotation();*/
        gameObjects.push(new CoinBattery("coin", coinCode, el.position, coinPath, true));
        gameObjects[gameObjects.length - 1].startRotation();
    });
    optimalRoute = getCopyOfObj(buffGameCondition.opRoute);
    OOP.forArr(optimalRoute, function (el) {
        el.isActive = true;
    });
    globalEXP = getCopyOfObj(buffGameCondition.gExp);
    currentPlayerLevel = buffGameCondition.cLvl;
    nextLevelEXP = buffGameCondition.nLvl;
    prevLevelEXP = buffGameCondition.pLvl;
    labyrinthSize = totalWidth = totalHeight = buffGameCondition.labSize;
    entrySide = buffGameCondition.entrySide;

    playerImageObj = null;
    playerSetStart();
    //goToLab();
}

game.startLoop('Labyrinth');
//game.startLoop('LastLevelWindow');
