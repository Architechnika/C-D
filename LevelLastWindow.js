//основной задний фон, позицанируем все элементы относительно него
var mainBG = undefined;
//прочие переменные
var xPos = undefined; //позиция отрисовки элементов по X
var yPos = undefined; ////позиция отрисовки элементов по Y
var textColor = "#e6a700";
var isLevelUp = undefined;
//
//время прохождение лаберинта
var timeText = undefined;
//
//количество пройденных лабиринтов
var totalLabCompletedText = undefined;
//
//Часть окна для достижений за уровень
var achivBG = undefined;
var achivText = undefined;
var achivTextCont = undefined;
//элементы опыта
var playerLvl = undefined;
//
//медаль
var medalText = undefined;
var medalStartPosX = undefined;
var medalItem = undefined;
//
//кнопки
var buttonNext = undefined;
var buttonReload = undefined;

var animAchivTimeout = 2000;
var animTimeout = 60;
var animTickCount = Math.floor(animAchivTimeout / animTimeout);
var animTickCounter = 0;

var tSecs = 0;
var tSec = 0;
var gEx = 0;
var gExMax = 0;
var cLvl = 0,
    pLvl = 0,
    nLvl = 0;
var achievements = [];
var achIndx = 0;
var lvlDiscr = 0; //Дискрет на который ковышается уровень при каждой сброшенной секунде
var animCount = 0;
var animTimeoutBuff = animTimeout;
var isAnimNow = false;

var allAchievements = [
    lang[selectLang]['achievement_all_boxes'],
    lang[selectLang]['achievement_optimal_route'],
    lang[selectLang]['achievement_no_errors']
];

function initParams() {
    animTickCounter = animTickCount;
    tSecs = totalSeconds;
    tSec = 0;
    gEx = 0;
    pLvl = nLvl = cLvl = 0;
    achievements = [];
    achIndx = 0;
    lvlDiscr = 0; //Дискрет на который ковышается уровень при каждой сброшенной секунде
    animCount = 0;
    gExMax = 0;
    animTimeoutBuff = animTimeout;
}

function initLastWindow() {
    //основной задний фон, позицанируем все элементы относительно него
    mainBG = game.newRoundRectObject({
        x: width * 0.01,
        y: height * 0.01,
        w: width * 0.98,
        h: height * 0.98,
        radius: 50,
        fillColor: "#01afc8",
        alpha: 1,
    });
    //прочие переменные
    xPos = mainBG.w * 0.25 //позиция отрисовки элементов по X
    yPos = mainBG.h * 0.02 ////позиция отрисовки элементов по Y
    isLevelUp = false;
    //
    //время прохождение лаберинта
    timeText = new Label(xPos, yPos, "");
    timeText.setTextSize(mainBG.w * 0.03)
    timeText.setTextColor(textColor)
    //Обновляем инфу о времени
    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timeText.setText(lang[selectLang]['gui_total_time'] + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
    //
    //количество пройденных лабиринтов
    totalLabCompletedText = new Label(xPos, yPos + mainBG.h * 0.08, "");
    totalLabCompletedText.setText(lang[selectLang]['gui_total_lab_complete'] + totalLabCompleted);
    totalLabCompletedText.setTextSize(mainBG.w * 0.03)
    totalLabCompletedText.setTextColor(textColor)
    //
    //Часть окна для достижений за уровень
    achivBG = game.newRoundRectObject({
        x: mainBG.x,
        y: yPos + mainBG.h * 0.24,
        w: mainBG.w,
        h: mainBG.h * 0.35,
        radius: 20,
        fillColor: "#e076fe",
        alpha: 0.6,
    });
    achivText = new Label(mainBG.w * 0.37, yPos + mainBG.h * 0.24, lang[selectLang]['gui_achiv']);
    achivText.setTextSize(mainBG.w * 0.03)
    achivText.setTextColor(textColor)
    //
    //элементы опыта
    playerLvl = new PlayerLevelVisualisation(xPos + mainBG.w * 0.22, yPos + mainBG.h * 0.16, mainBG.w * 0.4, mainBG.h * 0.04, true);
    playerLvl.setTextSize(mainBG.w * 0.03)
    playerLvl.setTextColor(textColor);
    playerLvl.setTextPos(xPos, yPos + mainBG.h * 0.16)
    //
    //медаль
    //medalText = new Label(xPos, yPos + mainBG.h * 0.5, "Медаль: ");
    //medalText.setTextSize(mainBG.w * 0.06)
    //medalText.setTextColor(textColor)
    medalStartPosX = mainBG.w * 0.15;
    medalItem = //game.newImageObject({ file: medal1ImgSrc, x: medalStartPosX, y: yPos + mainBG.h * 0.5, w: mainBG.w * 0.04, h: mainBG.h * 0.08, });
        //
        //кнопки
        buttonNext = new PushButton();
    buttonNext.setSetting(mainBG.w * 0.685, mainBG.y + mainBG.h - (mainBG.w * 0.11), mainBG.w * 0.2, mainBG.w * 0.1)
    buttonNext.setButtonImgSrc(nextStepButtonImgSrc)

    buttonReload = new PushButton();
    buttonReload.setSetting(mainBG.w * 0.15, mainBG.y + mainBG.h - (mainBG.w * 0.11), mainBG.w * 0.2, mainBG.w * 0.1)
    buttonReload.setButtonImgSrc(reloadButtonImgSrc)
}

//
function drawWindow() {
    mainBG.draw();
    timeText.textDraw();
    totalLabCompletedText.textDraw();
    achivBG.draw();
    achivText.textDraw();
    if (achivTextCont) {
        if (achivTextCont.length > 0)
            for (var i = 0; i < achivTextCont.length; i++)
                achivTextCont[i].textDraw();
        //achivTextCont.textDraw();
    }
    playerLvl.drawPlayerLevel();
    buttonNext.draw();
    buttonReload.draw();
    // medalText.textDraw();
    medalItem.draw();
} //
game.newLoopFromConstructor('LastLevelWindow', function () {
    //Код для старта игры
    this.entry = function () {
        if (soundIsOn) audio_lastWindow.play();
        addEventListener("mouseup", mouseUpEvent);
        addEventListener("mousedown", mouseDownEvent);
        addEventListener("touchend", touchUpEvent);
        addEventListener("touchstart", touchDownEvent);
        initParams();
        initLastWindow();
        calcEXPResult();
        totalLabCompletedText.setText(lang[selectLang]['gui_total_lab_complete'] + totalLabCompleted);
    }
    //Код для завершения цикла
    this.exit = function () {
        removeEventListener("mouseup", mouseUpEvent);
        removeEventListener("touchend", touchUpEvent);
        removeEventListener("mousedown", onMouseDOWN);
        removeEventListener("touchstart", onTouchStart);
    };

    //Код для апдейта игры
    this.update = function () {
        drawWindow();
    };
});

function touchDownEvent(e) {
    mouseDownEvent(new point(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
}

function mouseDownEvent(e) {
    if (clickIsInObj(e.x, e.y, buttonNext)) {
        buttonNext.setImage(getPressedImg(buttonNext));
    } else if (clickIsInObj(e.x, e.y, buttonReload)) {
        buttonReload.setImage(getPressedImg(buttonReload));
    }
}

function unpressImg(img) {
    var spl = img.getImage().split("_pressed");
    if (spl.length > 1)
        img.setImage(spl[0] + spl[1]);
}

function mouseUpEvent(e) {
    unpressImg(buttonNext);
    unpressImg(buttonReload);
    if (isAnimNow) {
        animTimeoutBuff = 1;
        return;
    }
    if (clickIsInObj(e.x, e.y, buttonNext)) {
        if (buttonNext && buttonNext.getAlpha() != 1) return;
        nextLevel();
    } else if (clickIsInObj(e.x, e.y, buttonReload)) {
        if (buttonReload && buttonReload.getAlpha() != 1) return;
        replayLevel();
    }
}

function touchUpEvent(e) {
    unpressImg(buttonNext);
    unpressImg(buttonReload);
    if (isAnimNow) {
        animTimeoutBuff = 1;
        return;
    }
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    if (clickIsInObj(e.x, e.y, buttonNext)) {
        if (buttonNext && buttonNext.getAlpha() != 1) return;
        nextLevel();
    } else if (clickIsInObj(e.x, e.y, buttonReload)) {
        if (buttonReload && buttonReload.getAlpha() != 1) return;
        replayLevel();
    }
}

function calcEXPResult() {
    //Рассчитываем опыт
    calcEXP(checkAchievements());
    initNextLvl();
    isAnimNow = true;
    animLvl();
}

//Функция обеспечивающая анимацю прироста уровня
function animLvl() {
    buttonNext.setAlpha(0.1);
    buttonReload.setAlpha(0.1);
    if (tSec > 0) {
        var k = tSec > 10 ? tSec / 2 : 1;
        tSec -= Math.floor(k); //= k;
        gEx += lvlDiscr; // * k);
        if (gEx > nLvl) {
            isLevelUp = true;
            cLvl++;
            pLvl = nLvl;
            nLvl += cLvl * cLvl;
        }
        //Отображаем на экран изменения
        {
            setTextTime(tSec);
            //Обновляем опыт
            playerLvl.setExp(gEx, pLvl, nLvl, cLvl);
        }
        setTimeout("animLvl()", animTimeoutBuff);
    } else {
        setTextTime(tSecs);
        totalLabCompleted++;
        totalLabCompletedText.setText(lang[selectLang]['gui_total_lab_complete'] + totalLabCompleted);
        animAchiv()
    }
}

function animAchiv() {
    if (achIndx < achievements.length) {
        if (animTickCounter % animTickCount == 0) {
            setAchivText(achievements, achIndx);
            achIndx++;
        }
        animTickCounter++;
        setTimeout("animAchiv()", animTimeoutBuff);
    } else {
        var wM = mainBG.w * 0.7;
        var hM = mainBG.w * 0.14;
        var yM = buttonNext.y - (((yPos + mainBG.h * 0.22) + mainBG.h * 0.24) / 2)
        if (achievements.length == 0) {
            medalItem = game.newImageObject({
                file: medalBronzeImgSrc,
                x: medalStartPosX,
                y: yM,
                w: wM,
                h: hM
            });
        } else if (achievements.length == 1) {
            medalItem = game.newImageObject({
                file: medalSilverImgSrc,
                x: medalStartPosX,
                y: yM,
                w: wM,
                h: hM
            });
        } else if (achievements.length > 1) {
            medalItem = game.newImageObject({
                file: medalGoldImgSrc,
                x: medalStartPosX,
                y: yM,
                w: wM,
                h: hM
            });
        }
        animTickCounter = 0;
        isAnimNow = false;
        setTextTime(tSecs);
        buttonNext.setAlpha(1);
        buttonReload.setAlpha(1);
    }
}

//Производит расчет очков опыта набранных игроком в процессе прохождения лабиринта
function calcEXP(bonus) {
    var s = totalSeconds;
    gExMax = gEx = globalEXP;
    if (totalSeconds != 0)
        gExMax += (localEXP / (totalSeconds * 0.5)) + bonus;
    //Инитим переменные буферы для отработки анимации на окошке
    cLvl = currentPlayerLevel;
    tSec = totalSeconds;
    pLvl = prevLevelEXP;
    nLvl = nextLevelEXP;
    //Инитим рассчитанный опыт
    globalEXP = gExMax;
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
    animCount = 0;
    while (s > 0) {
        var k = s > 10 ? s / 2 : 1;
        s -= Math.floor(k); //= k;
        animCount++;
    }
    lvlDiscr = (gExMax - gEx) / animCount;
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
    if (totalWidth < 5) {
        achievements.push(lang[selectLang]['achievement_optimal_route']);
        bonus += nextLevelEXP * 0.1;
        achievements.push(lang[selectLang]['achievement_no_errors']);
        bonus += nextLevelEXP * 0.1;
        return 0;
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

function setAchivText(achievements, indx) {
    var text = achievements[indx];
    var size = (mainBG.w * 0.8) / text.length;
    var x = achivBG.x + (achivBG.w / 2) - ((size * text.length) / 3.5);
    var y = achivBG.y + (achivBG.h / 2) - (size / 1.8);
    achivTextCont = [new Label(x, y, text)];
    achivTextCont[0].setTextSize(size)
    achivTextCont[0].setTextColor("#FFF8DC");
}

function setTextTime(secs) {
    //Обновляем инфу о времени
    var min = Math.floor(secs / 60);
    var sec = secs - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timeText.setText(lang[selectLang]['gui_total_time'] + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
}

initLastWindow();


function DataForLastWindow() {

    function Data() 
    {
        var test = "sss"
        this.test = test;
    }
    var d = new Data();
    var obj = JSON.stringify(d)
    sessionStorage.setItem("dataForLastWindow", obj);
    window.location.href = 'new1/lastwindow.html'
}
//DataForLastWindow();
