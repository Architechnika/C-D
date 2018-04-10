//СКРИПТ СОДЕРЖИТ ОПИСАНИЕ ВСЕХ ЭЛЕМЕНТОВ GUI ИГРЫ, а также методы для работы с ними

var timerText = null; //текст таймера
var progressText = null; // количество ходов
//var expText = null;//Cколько всего набрано опыта
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
var playerLevelVisual = undefined;
var messageBox = new MessageBox();
pjs.mouseControl.setCursorImage(cursorImgSrc);
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
    dialog.dialogDraw();
    playerLevelVisual.drawPlayerLevel();
    if (toolTip.isVisible()) toolTip.draw();
    if (inputCounterText !== null) inputCounterText.draw();
    //Отрисовываем интерфейс выбора команд
    //showCommandsMenu();
    allButtons.ButtonsDraw();
}


function initGUI() { //поочередность иницилизаии ОБЯЗАТЕЛЬНА для правильного расположения меню
    menuItemH = (height / 100) * 8;
    menuItemW = (width / 100) * 8;
    allButtons = new Buttons();
    dialog = new Dialog();
    infoText = new TextWithBG(gameSpaceX, gameSpaceY, gameSpaceW, gameSpaceH);
    timerTextInit();
    progressTextInit();
    textbackGroundInit("#000000", 0);
    codeMapBackGroundInit("#000000", 0.4)
    playerLevelVisual = new PlayerLevelVisualisation();
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
    var expG = (globalEXP * 100).toFixed();
    var nexp = (nextLevelEXP * 100).toFixed();
    //Обновляем инфу об опыте
    // expText.setText("УРОВЕНЬ: " + currentPlayerLevel + " lvl (" + expG + "/" + nexp + ")");
    playerLevelVisual.setExp();
}


function timerTextInit() {
    var wh = gameSpaceW / 100 * 4;
    clockItem = game.newImageObject({
        x: gameSpaceX,
        y: 0,
        w: wh,
        h: wh,
        file: clockPath
    })
    timerText = new Label(0, 0, "00:00 ");
    timerText.setTextPosition((clockItem.x + clockItem.w) + 5, 0);
    timerText.setTextSize(wh);
    timerText.setTextColor(guiTextColor);
}

function progressTextInit() {
    var wh = gameSpaceW / 100 * 4;
    coinItem = game.newImageObject({
        x: gameSpaceX + gameSpaceW * 0.20,
        y: 0,
        w: wh,
        h: wh,
        file: coinPath
    })
    progressText = new Label(0, 0, "00");
    progressText.setTextPosition(coinItem.x + coinItem.w + 5, 0);
    progressText.setTextSize(wh);
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
        } else {
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
    if (isDel) {
        //inputCommandStates = 0;
        //Показываем кнопку старт или стоп
        if (!isVerticalScreen)
            allButtons.mainButton.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
        return;
    }
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
    //Показываем кнопку ok
    allButtons.mainButton.setButtonImgSrc(okButtonImgSrc);
    allButtons.deleteButton.setVisible(false);
    return Scrolls[found];
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
    var textSize = height / 100 * 30;
    var _radius = 0;
    var alphaBG = 0.7;
    var textColor = "#ffffff"
    var BGcolor = "#000000"
    this.BG = game.newRoundRectObject({
        x: X,
        y: Y,
        w: W,
        h: H,
        radius: _radius,
        fillColor: BGcolor
    })
    var textX = (this.BG.x + this.BG.w / 2) - textSize / 2;
    var textY = (this.BG.y + this.BG.h / 2) - textSize / 2;
    var text = game.newTextObject({
        x: textX,
        y: textY,
        text: "test",
        color: textColor,
        size: textSize,
        alpha: 1,
        font: textFont,
    })
    this.BG.setAlpha(alphaBG)
    this.BG.setVisible(false)
    text.setVisible(false)

    this.isVisible = function () {
        return text.visible;
    }

    this.draw = function () {
        this.BG.draw();
        text.draw();
    }
    this.getText = function () {
        return text.text;
    }
    this.setText = function (t) {
        text.text = t;
        var sz = height / 100 * 23;
        text.size = sz
        if (!isVerticalScreen)
            text.x = (this.BG.x + this.BG.w / 2) - text.w + textSize - text.x / 2;
        else text.x = this.BG.x;
        text.y = (this.BG.y + this.BG.h / 2) - text.h / 2;
        this.BG.setVisible(true)
        text.setVisible(true)
    }
    this.close = function () {
        this.BG.setVisible(false)
        text.setVisible(false)
    }
}

function PlayerLevelVisualisation(X,Y,W,H,LastWindow) {
    var lineW = 50;
    var lvl = currentPlayerLevel;
    var textW = 0;
    if(X == undefined)
        X = gameSpaceX + gameSpaceW - (gameSpaceW * 0.4);
    if(Y == undefined)
        Y = textbackGroundItem.y + (textbackGroundItem.h * 0.2);
    if(W == undefined)
        W = gameSpaceW * 0.4;
    if(H == undefined)
        H = textbackGroundItem.h / 1.5;
    var mainBG = game.newRectObject({
        x: X,
        y: Y,
        w: W,
        h: H,
        fillColor: "#000000",
        alpha: 0,
    });
    var bg = game.newRoundRectObject({
        x: mainBG.x,
        y: mainBG.y,
        w: mainBG.w,
        h: mainBG.h,
        radius: 6,
        fillColor: "#e6e6e6",
    });
    var bgMembrane = game.newRoundRectObject({
        x: mainBG.x,
        y: (bg.y + bg.h/2) - ((mainBG.h/2)/2),
        w: mainBG.w,
        h: mainBG.h/2,
        radius: 6,
        fillColor: "#ffffff",
        alpha : 0.35,
    });

    var lvlLine = game.newRoundRectObject({
        x: mainBG.x,
        y: mainBG.y,
        w: lineW,
        h: mainBG.h,
        radius: 6,
        fillColor: "#eb0000",
    });
    var lvlLineMembrane = game.newRoundRectObject({
        x: mainBG.x,
        y: (lvlLine.y + lvlLine.h/2) - ((mainBG.h/2)/2),
        w: lvlLine.w,
        h: mainBG.h/2,
        radius: 6,
        fillColor: "red",
        alpha: 0.7,
    });
    var expText = new Label(mainBG.x + mainBG.w + 2, mainBG.y, "Уровень: " + lvl);
    expText.setTextSize(mainBG.h * 1.5);
    expText.setTextColor(guiTextColor);
    this.setTextColor = function(color)
    {
        expText.setTextColor(color);
    }
    this.setTextPos = function(x,y)
    {
        expText.setTextPosition(x,y);
    }

    if(!LastWindow)
        {
    textW = expText.getText().toString().length * gameSpaceW * 0.022;
    expText.setTextPosition(mainBG.x - textW)
        }
    this.setTextSize = function(sz)
    {
        expText.setTextSize(sz);
    }
    this.setLevel = function (lvl) {
        expText.setText(lvl);
    }
    this.setExp = function () {
        var expPerc = (globalEXP / nextLevelEXP) * 100;
        var lvlLinePerc = (bg.w / 100) * expPerc;
        lvlLine.w = lvlLinePerc;
        lvlLineMembrane.w = lvlLinePerc
        if (globalEXP > nextLevelEXP) {
            lvlLine.w = 0;
            lvlLineMembrane.w = 0;
        }
        this.setLevel("Уровень: " + currentPlayerLevel)
    }

    this.drawPlayerLevel = function () {
        bg.draw();
        bgMembrane.draw();
        if (lvlLine.w > 3) {
            lvlLine.draw();
             lvlLineMembrane.draw();
        }
        expText.textDraw();
    }
}
