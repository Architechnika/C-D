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
var totalLabCompleted = 0; //Счетчик пройденных лабиринтов
var totalAttempts = 0; //Счетчик попыток прохождения уровня
var lastClickedElement = undefined; //Последний элемент карты по которому кликал пользователь(нужно для построения карты кода)
var choosenCommandInElement = undefined; //Индекс команды в массиве команд которую редактирует игрок
var menuStatesArr = new Array();
var isEntried = false; //Флаг для обозначения того, что игра уже была инициализирована и не нужно пересоздавать всю игру при перезагрузке
var isStarted = false; //Флаг для старта/стопа игры
var itemToReplaceInCodeMap = undefined; //Переменная для хранения ссылки на обьект который нужно заменить в codeView
var itemToAddAfterInCodeMap = -1; //Переменная которая хранит обьект из codeMap после которого надо добавить элемент
var timeTimerLaunched = false;
var isSecondScreen = false;
var isVerticalScreen = undefined;
var widthBuff = width;
//Переменная для хранения состояний меню ввода команд:
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - counter или repeat
// 4 - commandBlock или count
// 5 - elseBlock
//тестовый комент
var inputCommandStates = 0;
var labView, codeView;
//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
    //Код для старта игры
    this.entry = function () {
        var userID = sessionStorage.getItem("userdata")
        var isNewGame = sessionStorage.getItem("typeGame") //получаем информацию о том, загружаемся или это новая игра
        sessionStorage.removeItem("typeGame") //удаляем из сессии информацию о том загрузка это или новая игра
        var buf = localMemory.loadAsObject(userID);
        userData = new UserAccaunt();
        if (buf && isNewGame != "NewGame") {
            //userData = new UserAccaunt();
            userData.copy(buf);
        }
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
            totalTimeTimer();
            logicEventTimer();
        }
        timeTimerLaunched = true;
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
function logicEventTimer(){
    //Проверяем смену ориентации экрана
    if(game.getWH().w != width){
        if(isSecondScreen){
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
        labView.checkGameObjects();//Ставим обьекты на место
        Scrolls.splice(0,Scrolls.length);
        initGUI();
        //Инициализируем обьект для вывода карты кода
        if (!codeMapBG) {
            codeView = new CodeMapView(0, 0, 0, 0, "white");
        } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
    }
    if(toolTip && !toolTip.isVisible() && toolTipTimeCounter >= toolTipDelay){
        toolTipShowEvent(clickCoord.x,clickCoord.y);
        toolTipTimeCounter = 0;
    }
    else toolTipTimeCounter += 40;
    setTimeout("logicEventTimer()", 40);
}

function totalTimeTimer() {
    totalSeconds++;
    setTimeout("totalTimeTimer()", 1000);
}

//Инициализация лабиринта
function initializeGame(isInit) {
    game.clear();
    initGameSpace();
    menuStatesArr = null;
    menuStatesArr = new Array();
    //Создаем новое поле
    if (isInit) {
        if (userData) {
            field = userData.load(true, gameObjects, playerInventory, initGUI)
            if (field.length <= 0)
                generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
        } else {
            initLabirint();
        }
    } else {
        initLabirint();
    }
    allButtons = new Buttons();
    //Рассчитываем сколько команд можно поставить на этом поле для прохождения
    totalCommandsAllowed = (totalWidth + totalHeight) * 2;
    //Создаем игрока
    playerSetStart();
    totalAttempts = 0;
    //mainbackGround = new mainBackGroundDrow();
    //Инициализируем обьекты для вывода графики лабиринта
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    //Инициализируем обьект для вывода карты кода
    if (!codeMapBG) {
        codeView = new CodeMapView(0, 0, 0, 0, "white");
    } else codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
}

function initLabirint() {
    //Запоминаем команды в клетке с входом, чтобы перенести их в следующий лабиринт(Если там больше одной команды)
    var comms = undefined;
    if (field) {
        OOP.forArr(field, function (el) {
            if (el.code == entryCode && el.commands.length > 1) {
                comms = el.commands;
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
        gameSpaceY = height / 100 * 15
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
    if (fieldElem.code != roadCode && fieldElem.code != entryCode) {
        return;
    }
    //Cохраняем номер текущего
    lastClickedIndx = indx;
    if (lastClickedElement) lastClickedElement.setStroke(false);
    //Запоминаем последний кликнутый пользователь элемент
    lastClickedElement = field[lastClickedIndx];
    inputCommandStates = 0;
    //Выделяем в рамку объект по которому нажали
    field[indx].setStroke(true);
    //Если ориентация экрана горизонтальная, то
    if (!isVerticalScreen) {
        //Инициализируем левый скролл
        initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
        initRightScroll([]);
        codeView.resetZoomer();
        codeView.createCodeMap(0, textbackGroundItem.h, lastClickedElement.commands, true, true, 1, true);
    } else { //Если ориентация экрана вертикальная
        clearAllLayers();
        allButtons.backToStartButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepDownButton.setAlpha(inactiveItemsAlpha);
        allButtons.stepUpButton.setAlpha(inactiveItemsAlpha);
        game.setLoop("SecondScreen")
    }
    //Показываем кнопку ok
    allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
}

//Функция обработчик для добавления команды в клетку
//CommandImg - ImgObj по которому кликнули
//dontAdd - флаг для того чтобы не добавлять элемент а выбирать как активный
function addCommandToCell(commandImg, dontAdd) {

    if (!dontAdd) { //Если добавляем команду

        if (inputCommandStates == 1) { //Если у нас простая команда и мы добавляем ее тупо в клетку
            choosenCommandInElement.push(getCopyOfObj(commandImg.command));
            if (commandImg.command.commandsBlock) onOkBClick();
            else initLeftScroll(getCommandsImgArr(choosenCommandInElement));
        } else if (inputCommandStates == 2) { //Если выбираем blockA
            var comm = getCopyOfObj(COMMANDS[10]); //Инициализируем команду whatisit
            comm.lookCommand = commandImg.command; //Инитим параметр lookCommand
            choosenCommandInElement.blockA = comm;
            inputCommandStates = 0;
            if(isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 3) { //Если выбираем blockB
            choosenCommandInElement.blockB = commandImg.command;
            inputCommandStates = 0;
            if(isVerticalScreen) initLeftScroll();
            else initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 0) { //Если редактируем команды из codeView
            if (itemToReplaceInCodeMap) { //Если нужно заменить элемент
                //Находим массив в котором хранится команда для замены
                var elemStor = findObjStorage(lastClickedElement.commands, itemToReplaceInCodeMap.command);
                //Находим ее в массиве и заменяем
                OOP.forArr(elemStor, function (el, i) {
                    if (el == itemToReplaceInCodeMap.command) {
                        elemStor[i] = commandImg.command;
                        return;
                    }
                });
                //Очищаем буфер для хранения обьекта для замены и скролл
                itemToReplaceInCodeMap = undefined;
                initRightScroll([]);
                if(isVerticalScreen) initLeftScroll();
                codeView.createCodeMap(codeMapBG.x,codeMapBG.y, lastClickedElement.commands, true, true);
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
        initLeftScroll([]);
        initRightScroll(getAllCommandsMenu(commandImg.commandName && commandImg.commandName != "empty"));
    } else if (commName == "blockA" || commName == "whatisit") {
        inputCommandStates = 2;
        initLeftScroll([]);
        initRightScroll(getAllDirections());

    } else if (commName == "blockB") {
        inputCommandStates = 3;
        initLeftScroll([]);
        initRightScroll(getAllInteractGameObjects());

    } else if (commName == "counter") {
        inputCommandStates = 4;
        initLeftScroll([]);
        //Инициализируем клавиатуру для ввода цифр
        initRightScroll(getDigitKeyboardImages());
        infoText.setText(choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count + "");
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

//Обработчик поведения робота
function processRobotMove() {
    var res = playerMove();

    if (res == "end") { //Если мы прошли до конца карты
        robotOn = false;
        if (isLabyrinthGrow) {
            if (labyrinthMaxSize !== 0 && totalWidth + 2 > labyrinthMaxSize && totalHeight + 2 > labyrinthMaxSize) {
                log("Лабиринт достиг максимально допустимого размера");
            } else {
                totalWidth += 2;
                totalHeight += 2;
            }
        }
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
        totalLabCompleted++;
        //Перезагружаем уровень с новым лабиринтом
        initializeGame();
    } else if (res == "stop") {
        showMessage("Робот остановился и ждет дальнейших команд");
        isStarted = false;
        //allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    } else if (res != "") //Если у робота возникли проблемы
    {
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
    } else if (isStarted) setTimeout("processRobotMove()", robotMoveDelay);
    //camera.follow( playerImageObj, 1 );
}

function showMessage(text) {
    infoText.setText(text);
    allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
}

game.startLoop('Labyrinth');
//game.startLoop('menu');
