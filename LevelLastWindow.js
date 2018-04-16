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
var cLvl = 0;
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
    cLvl = 0;
    achievements = [];
    achIndx = 0;
    lvlDiscr = 0; //Дискрет на который ковышается уровень при каждой сброшенной секунде
    animCount = 0;
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
    yPos = mainBG.h * 0.1 ////позиция отрисовки элементов по Y
    isLevelUp = false;
    //
    //время прохождение лаберинта
    timeText = new Label(xPos, yPos, "");
    timeText.setTextSize(mainBG.w * 0.04)
    timeText.setTextColor(textColor)
    //Обновляем инфу о времени
    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timeText.setText("Время прохождения: " + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
    //
    //количество пройденных лабиринтов
    totalLabCompletedText = new Label(xPos, yPos + mainBG.h * 0.08, "");
    totalLabCompletedText.setText("Всего лабиринтов пройдено: " + totalLabCompleted);
    totalLabCompletedText.setTextSize(mainBG.w * 0.04)
    totalLabCompletedText.setTextColor(textColor)
    //
    //Часть окна для достижений за уровень
    achivBG = game.newRoundRectObject({
        x: xPos,
        y: yPos + mainBG.h * 0.24,
        w: mainBG.w * 0.5,
        h: mainBG.h * 0.25,
        radius: 20,
        fillColor: "#e076fe",
        alpha: 0.6,
    });
    achivText = new Label(mainBG.w * 0.37, yPos + mainBG.h * 0.24, "Достижения:");
    achivText.setTextSize(mainBG.w * 0.04)
    achivText.setTextColor(textColor)
    //
    //элементы опыта
    playerLvl = new PlayerLevelVisualisation(xPos + mainBG.w * 0.22, yPos + mainBG.h * 0.16, mainBG.w * 0.4, mainBG.h * 0.04, true);
    playerLvl.setTextSize(mainBG.w * 0.04)
    playerLvl.setTextColor(textColor);
    playerLvl.setTextPos(xPos, yPos + mainBG.h * 0.16)
    //
    //медаль
    medalText = new Label(xPos, yPos + mainBG.h * 0.5, "Медаль: ");
    medalText.setTextSize(mainBG.w * 0.06)
    medalText.setTextColor(textColor)
    medalStartPosX = xPos + mainBG.w * 0.25;
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
    if (achivTextCont) achivTextCont.textDraw();
    playerLvl.drawPlayerLevel();
    buttonNext.draw();
    buttonReload.draw();
    medalText.textDraw();
    medalItem.draw();
}
game.newLoopFromConstructor('LastLevelWindow', function () {
    //Код для старта игры
    this.entry = function () {
        addEventListener("mouseup", mouseUpEvent);
        addEventListener("touchend", touchUpEvent);
        initParams();
        initLastWindow();
        calcEXPResult();
        totalLabCompletedText.setText("Всего лабиринтов пройдено: " + totalLabCompleted);
    }
    //Код для завершения цикла
    this.exit = function () {
        removeEventListener("mouseup", mouseUpEvent);
        removeEventListener("touchend", touchUpEvent);
    };

    //Код для апдейта игры
    this.update = function () {
        drawWindow();
    };
});

function mouseUpEvent(e) {
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

function replayLevel() {
    totalLabCompleted--;
    totalSeconds = 0;

    field = getCopyOfObj(buffGameCondition.map);
    gameObjects = getCopyOfObj(buffGameCondition.gObjs);
    OOP.forArr(gameObjects, function (el) {
        el.setNewPosition(el.position);
        el.startRotation();
    });
    buffGameCondition.opRoute = getCopyOfObj(optimalRoute);
    OOP.forArr(optimalRoute, function (el) {
        el.isActive = true;
    });
    globalEXP = getCopyOfObj(buffGameCondition.gExp);
    currentPlayerLevel = buffGameCondition.cLvl;
    nextLevelEXP = buffGameCondition.nLvl;
    prevLevelEXP = buffGameCondition.pLvl;

    playerSetStart();
    goToLab();
}

function calcEXPResult() {
    //Рассчитываем опыт
    calcEXP(checkAchievements());
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
        globalEXP += lvlDiscr; // * k);
        if (globalEXP > nextLevelEXP) {
            isLevelUp = true;
            currentPlayerLevel++;
            prevLevelEXP = nextLevelEXP;
            nextLevelEXP = nextLevelEXP + (currentPlayerLevel * currentPlayerLevel);
        }
        playerLvl.setExp();
        //Отображаем на экран изменения
        {
            setTextTime(tSec);
            //Обновляем опыт
            playerLvl.setExp();
        }
        setTimeout("animLvl()", animTimeoutBuff);
    } else {
        setTextTime(tSecs);
        totalLabCompleted++;
        totalLabCompletedText.setText("Всего лабиринтов пройдено: " + totalLabCompleted);
        animAchiv()
    }
}

function animAchiv() {
    if (achIndx < achievements.length) {
        if (animTickCounter % animTickCount == 0) {
            setAchivText(achievements[achIndx]);
            achIndx++;
        }
        animTickCounter++;
        setTimeout("animAchiv()", animTimeoutBuff);
    } else {
        var wM = mainBG.w * 0.2;
        if (achievements.length == 0) {
            medalItem = game.newImageObject({
                file: medalBronzeImgSrc,
                x: medalStartPosX,
                y: yPos + mainBG.h * 0.5,
                w: wM,
                h: wM
            });
        } else if (achievements.length == 1) {
            medalItem = game.newImageObject({
                file: medalSilverImgSrc,
                x: medalStartPosX,
                y: yPos + mainBG.h * 0.5,
                w: wM,
                h: wM
            });
        } else if (achievements.length > 1) {
            medalItem = game.newImageObject({
                file: medalGoldImgSrc,
                x: medalStartPosX,
                y: yPos + mainBG.h * 0.5,
                w: wM,
                h: wM
            });
        }
        animTickCounter = 0;
        isAnimNow = false;
        setTextTime(tSecs);
        buttonNext.setAlpha(1);
        buttonReload.setAlpha(1);
    }
}

function initNextLvl() {
    codeView.clear();
    if (isLabyrinthGrow && isLevelUp) {
        if (labyrinthMaxSize !== 0 && totalWidth + 2 > labyrinthMaxSize && totalHeight + 2 > labyrinthMaxSize) { } else {
            totalWidth += 2;
            totalHeight += 2;
            labyrinthSize = totalWidth;
        }
    }
    //Перезагружаем уровень с новым лабиринтом
    initializeGame();
}

function nextLevel() {
    initNextLvl();
    goToLab();
}

//Переходит в игровой цикл лабиринта
function goToLab() {
    audio_GUI_click.play();
    robotOn = false;
    isStarted = false;
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    timeTimerLaunched = true;
    totalTimeTimer();
    codeView.clear();
    achivTextCont = undefined;
    achievements = [];
    achIndx = 0;
    game.setLoop('Labyrinth');
}

//Производит расчет очков опыта набранных игроком в процессе прохождения лабиринта
function calcEXP(bonus) {
    var s = totalSeconds;
    gEx = globalEXP
    if (totalSeconds != 0)
        gEx += (localEXP / (totalSeconds * 0.5)) + bonus;
    //Очищаем значения которые надо очистить
    for (var i = 0; i < playerInventory.length; i++) {
        gameObjects.push(playerInventory[i]);
    }
    playerInventory.splice(0, playerInventory.length);
    localEXP = 0;
    cLvl = currentPlayerLevel;
    tSec = totalSeconds;
    animCount = 0;
    while (s > 0) {
        var k = s > 10 ? s / 2 : 1;
        s -= Math.floor(k); //= k;
        animCount++;
    }
    lvlDiscr = (gEx - globalEXP) / animCount;
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

function setAchivText(text, indx) {
    var size = (mainBG.w * 0.8) / text.length;
    var x = achivBG.x + (achivBG.w / 2) - ((size * text.length) / 3.5);
    var y = achivBG.y + (achivBG.h / 2) - (size / 1.8);
    achivTextCont = new Label(x, y, text);
    achivTextCont.setTextSize(size)
    achivTextCont.setTextColor("#FFF8DC");
}

function setTextTime(secs) {
    //Обновляем инфу о времени
    var min = Math.floor(secs / 60);
    var sec = secs - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timeText.setText("Время прохождения: " + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
}

initLastWindow();
