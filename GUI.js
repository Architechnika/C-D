//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними

var timerText = null; //текст таймера
var progressText = null; // количество ходов
var inputCounterText = null; //Текстовое поле для ввода чисел

var menuItemH = 0; // стандартная высота элемента меню
var menuItemW = 0; // стандартная ширина элемента меню
var textbackGroundItem = null; //задний фон текстов
var codeMapBG = undefined;
var scrollSpeed = 0.5;
var clockItem = undefined;
var coinItem = undefined;
var allButtons = undefined; //Класс для всех кнопок
var Scrolls = new Array(); // массив всех скролбаров
var infoText = undefined;
var toolTip = new ToolTip();
var messengBox = new MessengBox();

//Отрисовывает элементы интерфейса
function drawGUI() {
    //Отрисовываем кнопки
    //Отрисовываем текстовые поля
    textbackGroundItem.draw();
    updateTextOnGui();
    timerText.textDraw();
    progressText.textDraw();
    coinItem.draw();
    clockItem.draw();
    infoText.draw();

    if(toolTip.isVisible()) toolTip.draw();
    if (inputCounterText !== null) inputCounterText.draw();
    //Отрисовываем интерфейс выбора команд
    //showCommandsMenu();
    allButtons.ButtonsDraw();
}


function initGUI() { //поочередность иницилизаии ОБЯЗАТЕЛЬНА для правильного расположения меню
    menuItemH = (height / 100) * 8;
    menuItemW = (width / 100) * 8;
    allButtons = new Buttons();
    infoText = new TextWithBG(gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH);
    timerTextInit();
    progressTextInit();
    textbackGroundInit("#000000", 0.4);
    codeMapBackGroundInit("#000000", 0.4)
    if (!isVerticalScreen) {
        //ИНИЦИАЛИЗИРУЕМ ИНТЕРФЕЙС РЕДАКТОРА КОМАНД
        if (Scrolls.length == 0) {
            Scrolls = new Array();
            initLeftScroll([]);
        }
    }
}

//Обновляет запись об общем колличестве команд на поле
function updateTextOnGui() {
    //Смотрим сколько комманл уже есть на поле
    var totalCommands = getTotalCommandsOnField();
    //Обновляем текст об этом
    progressText.setText(playerInventory.length);
    //Обновляем инфу о времени
    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timerText.setText((min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec))
}


function timerTextInit() {
    clockItem = game.newImageObject({
        x: gameSpaceX,
        y: 0,
        w: gameSpaceW / 100 * 4,
        h: gameSpaceW / 100 * 4,
        file: clockPath
    })
    timerText = new Label(0, 0, "00:00");
    timerText.setTextPosition((clockItem.x + clockItem.w) + 5, 0);
    timerText.setTextSize(clockItem.w);
    timerText.setTextColor(guiTextColor);
}

function progressTextInit() {
    coinItem = game.newImageObject({
        x: timerText.getObj().x + timerText.getObj().w * 4,
        y: 0,
        w: gameSpaceW / 100 * 4,
        h: gameSpaceW / 100 * 4,
        file: coinPath
    })
    progressText = new Label(0, 0, "00");
    progressText.setTextPosition(coinItem.x + coinItem.w + 5, 0);
    progressText.setTextSize(coinItem.w);
    progressText.setTextColor(guiTextColor);
}

function textbackGroundInit(color, alpha) {
    textbackGroundItem = game.newRoundRectObject({
        x: gameSpaceX,
        y: 0,
        w: (gameSpaceW),
        h: gameSpaceW / 100 * 4,
        radius: 0,
        fillColor: color
    });
    textbackGroundItem.setAlpha(alpha);
}

function codeMapBackGroundInit(color, alpha) {
    if (!isVerticalScreen) {
        codeMapBG = game.newRoundRectObject({
            x: (gameSpaceX + gameSpaceW),
            y: 0,
            w: (width - (gameSpaceX + gameSpaceW)),
            h: height,
            radius: 0,
            fillColor: color
        });
        codeMapBG.setAlpha(alpha);
    } else if (isSecondScreen) {
        gameSpaceH = gameSpaceW;
        if (inputCommandStates > 0) {
            codeMapBG = game.newRoundRectObject({
                x: height / 100 * 15,
                y: textbackGroundItem.h,
                w: width - (height / 100 * 15),
                h: allButtons.getPosition().y - textbackGroundItem.h,
                radius: 0,
                fillColor: color
            });
        }
        else{
            codeMapBG = game.newRoundRectObject({
                x: 0,
                y: textbackGroundItem.h,
                w: width,
                h: allButtons.getPosition().y - textbackGroundItem.h,
                radius: 0,
                fillColor: color
            });
        }
        codeMapBG.setAlpha(alpha);
    }
}

function initRightScroll(initArray) {
    var isDel = false;
    if (!initArray || initArray.length == 0) {
        isDel = true;
    }
    var found = -1;
    OOP.forArr(Scrolls, function (scroll, i) {
        //Ищем верхний скролл
        if (scroll.name == "RIGHT") {
            if (isDel)
                Scrolls.splice(i, 1);
            else found = i;
            return;
        }
    });
    if (isDel) return;
    if (found == -1) {
        if (!isVerticalScreen) {
            //Инииализируем скролл БАР ВСЕХ КОМАНД(ПРАВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
            Scrolls.push(new ScrollBar(gameSpaceX + gameSpaceW, 0, "Vertical", initArray, "RIGHT"));
            Scrolls[Scrolls.length - 1].setLineCount(2);
            Scrolls[Scrolls.length - 1].setWidthScroll(width - (gameSpaceX + gameSpaceW))
            Scrolls[Scrolls.length - 1].setHeightScroll(height); //gameSpaceX+gameSpaceH);
        } else {
            Scrolls.push(new ScrollBar(height / 100 * 15, textbackGroundItem.h, "Vertical", initArray, "RIGHT"));
            //Scrolls[Scrolls.length - 1].setLineCount(1);
            Scrolls[Scrolls.length - 1].setWidthScroll(width - Scrolls[Scrolls.length - 1].GetBackGround().x)
            Scrolls[Scrolls.length - 1].setHeightScroll(allButtons.getPosition().y - textbackGroundItem.h); //gameSpaceX+gameSpaceH);
        }
        found = Scrolls.length - 1;
    }
    Scrolls[found].initArrayItems(initArray);
    Scrolls[found].scrollUpdate(0);
    //Очищаем массив codeView при инициализиации скрола
    if (codeView && codeView.elems.length > 0) codeView.clear();
    if(initArray && initArray.length > 0) inputCommandStates = 1;
    //Показываем кнопку ok
    allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
}

//Возвращает графическое представление ЛЕВОГО БОКОВОГО СКРОЛА которое соответствует текущему состоянию в интерфейсе
function initLeftScroll(initMass) {
    //Берем верхнюю команду из стека редактора вложенных комманд
    //Если стек пуст - инициализируем меню редактором скриптов в клетке
    //ИНИЦИАЛИЗИРУЕМ СКРОЛЛ БАР СТЕКА ВЛОЖЕННЫХ КОМАНД(ЛЕВЫЙ ВЕРТИКАЛЬНЫЙ СКРОЛЛ)
    var isDel = false;
    if (!initMass)
        isDel = true;
    var found = -1;
    OOP.forArr(Scrolls, function (el, i) {
        if (el.name == "LEFT") {
            if (isDel) {
                Scrolls.splice(i, 1);
            } else {
                el.initArrayItems(initMass);
                found = i;
                el.scrollToEnd();
                if (initMass.length == 0)
                    isDel = true;
            }
            return;
        }
    });
    if (isDel) return;
    if (found == -1) {
        if (isVerticalScreen) {
            Scrolls.push(new ScrollBar(0, textbackGroundItem.h, "Vertical", initMass, "LEFT"));
            found = Scrolls.length - 1;
            Scrolls[found].setHeightScroll(allButtons.getPosition().y - textbackGroundItem.h);
        } else {
            Scrolls.push(new ScrollBar(0, 0, "Vertical", initMass, "LEFT"));
        }
    }
}

function TextWithBG(X, Y, W, H) { //класс для рисования текста с задним фоном, первоначально была разработана для того чтобы над лаберинтом выводить цифры введенные в блоки цикла по количеству
    var textSize = height/100*30;
    var _radius = 0;
    var alphaBG = 0.7;
    var textColor = "#ffffff"
    var BGcolor = "#000000"
    var BG = game.newRoundRectObject({
        x: X,
        y: Y,
        w: W,
        h: H,
        radius: _radius,
        fillColor: BGcolor
    })
    var textX = (BG.x + BG.w / 2) - textSize / 2;
    var textY = (BG.y + BG.h / 2) - textSize / 2;
    var text = game.newTextObject({
        x: textX,
        y: textY,
        text: "test",
        color: textColor,
        size: textSize,
        alpha: 1
    })
    BG.setAlpha(alphaBG)
    BG.setVisible(false)
    text.setVisible(false)

    this.isVisible = function () {
        return text.visible;
    }

    this.draw = function () {
        BG.draw();
        text.draw();
    }
    this.getText = function () {
        return text.text;
    }
    this.setText = function (t) {
        text.text = t;
        var sz = height/100*30;
        text.size = sz
        text.x = (BG.x + BG.w / 2) - text.w + textSize - text.x / 2;
        text.y = (BG.y + BG.h / 2) - text.h / 2;
        BG.setVisible(true)
        text.setVisible(true)
    }
    this.close = function () {
        BG.setVisible(false)
        text.setVisible(false)
    }
}
