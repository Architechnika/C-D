/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX = 0,
    gameSpaceY = 0;
var gameSpaceW = 0,
    gameSpaceH = 0;

var totalWidth = 25; //Колличество блоков в строку
var totalHeight = 25; //Колличество блоков в стлобец
var robotMoveDelay = 600; //Задержка при движении робота в милисекундах
var saveTimeout = 1000; //Таймаут для метода который следит за изменениями размера экрана
var totalSeconds = 0; //Для зранения колличества секунд которые прошли с начала прохождения уровня
var secBuff = 0; //Буфер для хранения времени старта
var totalCommandsAllowed = 0; //Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalLabCompleted = 0; //Счетчик пройденных лабиринтов
var totalAttempts = 0; //Счетчик попыток прохождения уровня
//ПАРАМЕТРИЗУЕМЫЕ ПАРАМЕТРЫ
//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var difficultyLevel = "EASY";
var totalTokensOnMap = 20; //Сколько всего монеток генерится в лабиринте

//var lastClickedIndx = -1; //Номер элемента лабиринта по которому кликнул пользователь
var lastClickedElement = undefined; //Последний элемент карты по которому кликал пользователь(нужно для построения карты кода)
var choosenCommandInElement = undefined; //Индекс команды в массиве команд которую редактирует игрок
var lastCommandToRedact = undefined; //Ссылка на последний редактируемый обьект. Нужно для рекурсивного добавления команд в сложные команды
var menuStatesArr = new Array();
var isBackGroundDrawed = false;
var isEntried = false;//Флаг для обозначения того, что игра уже была инициализирована и не нужно пересоздавать всю игру при перезагрузке
var isStarted = false;//Флаг для старта/стопа игры
var isChooseCommandShow = false;//Флаг - показывать интерфейс выбора команд или нет
//Переменная для хранения состояний меню ввода команд:
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - counter или repeat
// 4 - commandBlock или count
// 5 - elseBlock
var inputCommandStates = 0;
var labView, codeView;
//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
    //Код для старта игры
    this.entry = function () {
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
        totalTimeTimer();
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
        userData.save(isGameSpaseUp, totalSeconds, field, playerInventory, gameObjects, entrySide);
    }
    setTimeout("saveTimer()", saveTimeout);
}

function totalTimeTimer() {
    totalSeconds++;
    setTimeout("totalTimeTimer()", 1000);
}

//Инициализация лабиринта
function initializeGame(isInit) {
    game.clear();
    menuStatesArr = null;
    menuStatesArr = new Array();
    //Создаем новое поле
    if (isInit) {
        if (userData) {
            field = userData.load(isGameSpaseUp, gameObjects, playerInventory, initGUI)
            if (field.length <= 0)
                generateMap(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
        } else {
            initLabirint();
        }
    } else {
        initLabirint();
    }

    //Рассчитываем сколько команд можно поставить на этом поле для прохождения
    totalCommandsAllowed = (totalWidth + totalHeight) * 2;
    //Создаем игрока
    playerSetStart();
    totalAttempts = 0;
    //mainbackGround = new mainBackGroundDrow();
    //Инициализируем обьекты для вывода графики лабиринта
    labView = new LabyrinthView(field, gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH, "white");
    //Инициализируем обьект для вывода карты кода
    codeView = new CodeMapView(codeMapBG.x,codeMapBG.y,codeMapBG.w,codeMapBG.h, "white");
    allButtons = new Buttons();
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
        processButtonClick({
            x: startB.x + 1,
            y: startB.y + 1
        });
    }
}

function initGameSpace() {
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

    } else {

        if (isGameSpaseUp) {
            gameSpaceX = height / 100 * 15;
            gameSpaceY = ( height / 100 * 15)/5;
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
function resizeAllElements() {
    Scrolls = new Array();
    //Инициализируем элементы интерфейса
    initGUI();
    //Пересчитываем параметры существующего лабиринта
    calcField(gameSpaceW, gameSpaceH, gameSpaceX, gameSpaceY, totalWidth, totalHeight);
    //Пересчитываем позицию игрока
    movePlayerToFieldElement(field[playerPozition]);
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
    //Инициализируем левый скролл
    initLeftScroll(field[lastClickedIndx].getCommandsImagesArr());
    initRightScroll([]);
    codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
    //Выделяем в рамку объект по которому нажали
    field[indx].setStroke(true);
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
            initLeftScroll(getCommandsImgArr(choosenCommandInElement));
        } else if (inputCommandStates == 2) { //Если выбираем blockA
            var comm = getCopyOfObj(COMMANDS[10]); //Инициализируем команду whatisit
            comm.lookCommand = commandImg.command; //Инитим параметр lookCommand
            choosenCommandInElement.blockA = comm;
            inputCommandStates = 0;
            initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
        } else if (inputCommandStates == 3){ //Если выбираем blockB
            choosenCommandInElement.blockB = commandImg.command;
            inputCommandStates = 0;
            initLeftScroll([]);
            initRightScroll([]);
            codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
        }
        return;
    }
    //Меняем состояние меню в зависимости от типа команды
    var name = commandImg.name ? commandImg.name : commandImg.command.name;
    changeMenuState(name);
}

//Задает состояние меню в зависимости от типа команды
// 0 - обычный ввод
// 1 - blockA или if или repeatif
// 2 - blockB
// 3 - blockC
// 4 - commandBlock или count
// 5 - elseBlock
function changeMenuState(commName) {

    //Скрываем текстовое поле ввода итераций в цикле, если оно не скрыто
    if (inputCounterText && inputCounterText.visible && choosenCommandInElement.name != "repeat") inputCounterText.visible = false;
    
    if(commName == "plus"){
        inputCommandStates = 1;
        initRightScroll(getAllCommandsMenu(true));
    }
    else if (commName == "blockA" || commName == "whatisit") {
        inputCommandStates = 2;
        initRightScroll(getAllDirections());

    } else if (commName == "blockB") {
        inputCommandStates = 3;
        initRightScroll(getAllInteractGameObjects());

    } else if (commName == "counter") {
        inputCommandStates = 4;
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
        totalWidth += 2;
        totalHeight += 2;
        /*if (totalWidth > 10) {
            totalWidth = 11;
            totalHeight = 11;
        }*/
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
        totalLabCompleted++;
        //Перезагружаем уровень с новым лабиринтом
        initializeGame();
    } else if (res == "stop") {
        alert("Робот остановился и ждет дальнейших команд");
        isStarted = false;
        allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    } else if (res != "") //Если у робота возникли проблемы
    {
        if (isStarted) alert(res); //Выводим их на экран
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
    } else if (isStarted) setTimeout("processRobotMove()", robotMoveDelay);
    //camera.follow( playerImageObj, 1 );
}

//game.startLoop('Labyrinth');
game.startLoop('menu');
