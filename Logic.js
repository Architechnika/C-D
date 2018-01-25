/*
Главный скрипт игры. Содержит логику игрового процесса.
Методы и данные для работы игровой логики
*/
//Переменные для хранения размера области игрbы(Области где будет отображаться игра)
var gameSpaceX = 0,
    gameSpaceY = 0;
var gameSpaceW = 0,
    gameSpaceH = 0;

var totalWidth = 5; //Колличество блоков в строку
var totalHeight = 5; //Колличество блоков в стлобец
var robotMoveDelay = 200; //Задержка при движении робота в милисекундах
var saveTimeout = 1000; //Таймаут для метода который следит за изменениями размера экрана
var totalSeconds = 0; //Для зранения колличества секунд которые прошли с начала прохождения уровня
var secBuff = 0; //Буфер для хранения времени старта
var totalCommandsAllowed = 0; //Колличество команд, которое разрешено поставить на данном поле(рассчитывается при генерации лабиринта)
var totalLabCompleted = 0;//Счетчик пройденных лабиринтов
var totalAttempts = 0; //Счетчик попыток прохождения уровня
//ПАРАМЕТРИЗУЕМЫЕ ПАРАМЕТРЫ
//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var difficultyLevel = "EASY";
var totalTokensOnMap = 20; //Сколько всего монеток генерится в лабиринте

var lastClickedIndx = -1; //Номер элемента лабиринта по которому кликнул пользователь
var choosenCommandInElement = -1; //Индекс команды в массиве команд которую редактирует игрок
var lastCommandToRedact = undefined; //Ссылка на последний редактируемый обьект. Нужно для рекурсивного добавления команд в сложные команды
var menuStatesArr = new Array();
var isBackGroundDrawed = false;

//Переменная для хранения состояний меню ввода команд:
//0 - ввод команд в клетку поля
//1 - ввод if комманды
//2 - ввод count цикла
//3 - ввод repeatif цикла
var inputCommandStates = 0;

//Игровой цикл
game.newLoopFromConstructor('Labyrinth', function () {
    //Код для старта игры
    this.entry = function () {
        //Смотрим смартфон или ПК у нас
        isMobile = touch.isMobileDevice();
        //Создаем все объекты для игры
        initializeGame(true);
        //Запускаем таймер который сохраняет состояние игры
        saveTimer();
        //Инициализируем таймер времени
        totalTimeTimer();
        //Инициализируем события для перехвата ввода
        initInputEvents();
        mainbackGround = new mainBackGroundDrow();
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
        userData.save(isGameSpaseUp, totalSeconds, field, playerInventory, gameObjects, entrySide, totalWidth);
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
            field = userData.load(isGameSpaseUp, gameObjects, playerInventory, totalHeight, totalWidth, totalSeconds, initGUI)
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
    mainbackGround = new mainBackGroundDrow();
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
        processButtonClick({x : startB.x + 1, y : startB.y + 1});
    }
}

//Расчет глобальных параметров игровой области
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

        if (lastClickedIndx != -1) {
            lastClickedIndx = -1;
        }
        return;
    }

    if (lastClickedIndx != -1) {
        //Если все ок, то убираем выделение с предыдущего объекта
        field[lastClickedIndx].setStroke(false);
    }
    //Cохраняем номер текущего
    lastClickedIndx = indx;
    inputCommandStates = 0;
    //Инициализируем верхний скролл
    initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
    //Инициализируем левый скролл
    initLeftScroll(undefined, undefined);
    //Инициализируем правый скролл
    initRightScroll(getAllCommandsMenu());
    //Выделяем в рамку объект по которому нажали
    field[indx].setStroke(true);
    //Скрываем кнопку старт/стоп
    startB.setVisible(false);
    menuB.setVisible(false);
}

//Функция обработчик для добавления команды в клетку
//CommandImg - ImgObj по которому кликнули
//dontAdd - флаг для того чтобы не добавлять элемент а выбирать как активный
function addCommandToCell(commandImg, dontAdd) {

    if (!dontAdd) { //Если добавляем команду

        if (inputCommandStates == 0) { //Если у нас простая команда и мы добавляем ее тупо в клетку
            field[lastClickedIndx].addCommand(commandImg.command);
            initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
        } else if (inputCommandStates == 1) { //Если выбираем blockA
            var comm = getCopyOfObj(COMMANDS[10]); //Инициализируем команду whatisit
            comm.lookCommand = commandImg.command; //Инитим параметр lookCommand
            menuStatesArr[0].blockA = comm;
        } else if (inputCommandStates == 2) //Если выбираем blockB
            menuStatesArr[0].blockB = commandImg.command;
        else if (inputCommandStates == 3) { //Если выбираем число итераций в repeat
            if (commandImg.command.name == "digit") {
                if (inputCounterText.text.length < 2)
                    inputCounterText.text += commandImg.command.value
                var parsed = parseInt(inputCounterText.text);
                menuStatesArr[0].countBlock.count = isNaN(parsed) ? 0 : parsed;
            } else if (commandImg.command.name == "backspace") {
                inputCounterText.text = inputCounterText.text.slice(0, inputCounterText.text.length - 1);
                var parsed = parseInt(inputCounterText.text);
                menuStatesArr[0].countBlock.count = isNaN(parsed) ? 0 : parsed;
            }
        } else if (inputCommandStates == 4) { //Если мы добавляем в commandsBlock последней команды из стека состояний меню
            menuStatesArr[0].commandsBlock.actions.push(commandImg.command);
            initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
        } else if (inputCommandStates == 5) { //Если мы добавляем в elseBlock последней команды из стека состояний меню
            menuStatesArr[0].elseBlock.actions.push(commandImg.command);
            initDownScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
        }
    }
    //Если добавляемая команда сложная, то добавляем ее в стек состояний меню и далее работаем с ней
    if (commandImg.command.name == "if" || commandImg.command.name == "repeatif" || commandImg.command.name == "repeat")
        menuStatesArr.unshift(commandImg.command);
    //Меняем состояние меню в зависимости от типа команды
    changeMenuState(commandImg.command.name);
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
    if (inputCounterText && inputCounterText.visible && menuStatesArr[0].name != "repeat") inputCounterText.visible = false;

    if (commName == "if" || commName == "repeatif" || commName == "blockA" || commName == "whatisit") {
        inputCommandStates = 1;
        initDownScroll(undefined, undefined);

        if (menuStatesArr[0].name == "if")
            initLeftScroll(menuStatesArr[0], getIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        else if (menuStatesArr[0].name == "repeatif")
            initLeftScroll(menuStatesArr[0], getRepeatIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));

        initRightScroll(getAllDirections());

    } else if (commName == "blockB") {
        inputCommandStates = 2;
        initDownScroll(undefined, undefined);

        if (menuStatesArr[0].name == "if")
            initLeftScroll("SAME", getIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        else if (menuStatesArr[0].name == "repeatif")
            initLeftScroll("SAME", getRepeatIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));

        initRightScroll(getAllInteractGameObjects());

    } else if (commName == "counter" || commName == "repeat") {

        inputCommandStates = 3;

        initLeftScroll(menuStatesArr[0], getRepeatScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        initDownScroll(undefined, undefined);
        //Инициализируем клавиатуру для ввода цифр
        initRightScroll(getDigitKeyboardImages());

        inputCounterTextInit();
        inputCounterText.text = menuStatesArr[0].countBlock.count == 0 ? "" : menuStatesArr[0].countBlock.count + "";
        inputCounterText.visible = true;

    } else if (commName == "commandsblock") {

        inputCommandStates = 4;

        if (menuStatesArr[0].name == "if") {
            menuStatesArr[0].redacted = "commands"; //Запоминаем тот блок который редактируем
            initLeftScroll("SAME", getIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        } else if (menuStatesArr[0].name == "repeatif")
            initLeftScroll("SAME", getRepeatIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        else if (menuStatesArr[0].name == "repeat")
            initLeftScroll(menuStatesArr[0], getRepeatScrollBarPattern(inputCommandStates, menuStatesArr[0]));

        // Инициализируем правый скролл
        initRightScroll(getAllCommandsMenu(true));
        //Инициализируем нижний скролл командами из поля команд в команде
        initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));

    } else if (commName == "elseblock") {
        inputCommandStates = 5;
        if (menuStatesArr[0].name == "if") {
            menuStatesArr[0].redacted = "else"; //Запоминаем тот блок который редактируем
            initLeftScroll("SAME", getIFScrollBarPattern(inputCommandStates, menuStatesArr[0]));
        }
        // Инициализируем правый скролл
        initRightScroll(getAllCommandsMenu(true));
        //Инициализируем нижний скролл командами из поля команд в команде
        initDownScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));

    }
}

//indexArray - индекс массива команд клетки в стеке команд клетки, indexELem - индекс элемента из этого массива команд для удаления
function removeCommandFromCell(indexArray, indexElem) {
    if (inputCommandStates == 0) { //ОБЫЧНЫЙ ЭЛЕМЕНТ НА ПОЛЕ
        //Удаляем команду из списка команд
        field[lastClickedIndx].removeCommand(indexElem);
        //инициазируем скролл новым списком
        initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
    } else if (menuStatesArr.length > 0 && (inputCommandStates == 4 || inputCommandStates == 5)) { //COMMANDSBLOCK        

        if (menuStatesArr[0].name == "if") {
            if (menuStatesArr[0].redacted == "commands") {
                var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
                initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
            } else if (menuStatesArr[0].redacted == "else") {
                var indx = menuStatesArr[0].elseBlock.actions.length - 1 - indexElem;
                menuStatesArr[0].elseBlock.actions.splice(indx, 1);
                initDownScroll(getCommandsImgArr(menuStatesArr[0].elseBlock.actions));
            }
        } else if (menuStatesArr[0].name == "repeatif" || menuStatesArr[0].name == "repeat") {
            var indx = menuStatesArr[0].commandsBlock.actions.length - 1 - indexElem;
            menuStatesArr[0].commandsBlock.actions.splice(indx, 1);
            initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
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
        if (totalWidth > 10) {
            totalWidth = 11;
            totalHeight = 11;
        }
        startB.isPlay = false;
        totalLabCompleted++;
        //Перезагружаем уровень с новым лабиринтом
        initializeGame();
    } else if (res == "stop") {
        alert("Робот остановился и ждет дальнейших команд");
        startB.isPlay = false;
    } else if (res != "") //Если у робота возникли проблемы
    {
        if(startB.isPlay) alert(res); //Выводим их на экран
        //Останавливаем цикл движения игры, меняя свойство кнопки
        startB.isPlay = false;
        //СБрасываем флаг для чтения команд
        OOP.forArr(field, function (el) {
            el.isCommandsReaded = false;
        });
        //Ставим робота на вход в лабиринт
        playerSetStart();
    } else if (startB.isPlay) setTimeout("processRobotMove()", robotMoveDelay);
    //camera.follow( playerImageObj, 1 );
}

//game.startLoop('Labyrinth'); 
game.startLoop('menu');
