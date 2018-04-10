//основной задний фон, позицанируем все элементы относительно него
var mainBG = game.newRoundRectObject({x : width*0.01, y : height*0.01,w : width*0.98,h : height*0.98,radius : 50,fillColor : "#01afc8",alpha : 1,});
//прочие переменные
var xPos = mainBG.w*0.25 //позиция отрисовки элементов по X
var yPos = mainBG.h*0.1 ////позиция отрисовки элементов по Y
var textColor = "#e6a700";
var isLevelUp = false;
//
//время прохождение лаберинта
var timeText = new Label(xPos, yPos, "Время прохождения:");
timeText.setTextSize(mainBG.w * 0.04)
timeText.setTextColor(textColor)
//
//количество пройденных лабиринтов
var totalLabCompletedText = new Label(xPos, yPos + mainBG.h * 0.08, "Всего лабиринтов пройдено: " + totalLabCompleted);
totalLabCompletedText.setTextSize(mainBG.w * 0.04)
totalLabCompletedText.setTextColor(textColor)
//
//Часть окна для достижений за уровень
var achivBG = game.newRoundRectObject({x : xPos, y : yPos+mainBG.h*0.24 ,w : mainBG.w*0.5,h : mainBG.h*0.25,radius : 20,fillColor : "#e076fe",alpha : 0.6,});
var achivText = new Label(mainBG.w*0.37,yPos+mainBG.h*0.24,"Достижение");
achivText.setTextSize(mainBG.w*0.04)
achivText.setTextColor(textColor)
//
//элементы опыта
var playerLvl = new PlayerLevelVisualisation(xPos + mainBG.w * 0.22, yPos + mainBG.h * 0.16, mainBG.w * 0.4, mainBG.h * 0.04, true);
playerLvl.setTextSize(mainBG.w * 0.04)
playerLvl.setTextColor(textColor);
playerLvl.setTextPos(xPos, yPos + mainBG.h * 0.16)
//
//медаль
var medalText = new Label(xPos, yPos + mainBG.h*0.5,"Медаль: ");
medalText.setTextSize(mainBG.w*0.06)
medalText.setTextColor(textColor)
var medalStartPosX = xPos + mainBG.w*0.25;
var medalItem = game.newImageObject({ file : medal1ImgSrc, x : medalStartPosX,y : yPos + mainBG.h*0.5, w : mainBG.w*0.04,h : mainBG.h*0.08,});
//
//кнопки
var buttonNext = new PushButton();
buttonNext.setSetting(mainBG.w*0.8, mainBG.h*0.8,mainBG.w*0.2,mainBG.w*0.1)
buttonNext.setButtonImgSrc(nextStepButtonImgSrc)

var buttonReload = new PushButton();
buttonReload.setSetting(mainBG.w*0.02, mainBG.h*0.8,mainBG.w*0.2,mainBG.w*0.1)
buttonReload.setButtonImgSrc(reloadButtonImgSrc)

//
function drawWindow()
{
    mainBG.draw();
        timeText.textDraw();
        totalLabCompletedText.textDraw();
        achivBG.draw();
        achivText.textDraw();
        playerLvl.drawPlayerLevel();
    buttonNext.draw();
    buttonReload.draw();
    medalText.textDraw();
    medalItem.draw();
}
game.newLoopFromConstructor('LastLevelWindow', function () {
    //Код для старта игры
    this.entry = function () 
    {
        addEventListener("mouseup", mouseUpEvent);
        addEventListener("touchend", touchUpEvent);
        showResults();
    }
    //Код для завершения цикла
    this.exit = function () 
    {
        removeEventListener("mouseup", mouseUpEvent);
        removeEventListener("touchend", touchUpEvent);
    };

    //Код для апдейта игры
    this.update = function () 
    {

        drawWindow();
    };
});

function mouseUpEvent(e) {
    if (clickIsInObj(e.x, e.y, buttonNext)) {
        nextLevel();
    }
    else if (clickIsInObj(e.x, e.y, buttonReload)){
        replaylevel();
    }
}

function touchUpEvent(e) {
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    if (clickIsInObj(e.x, e.y, buttonNext)) {
        nextLevel();
    }
    else if (clickIsInObj(e.x, e.y, buttonReload)) {
        replayLevel();
    }
}

function replayLevel() {
    audio_GUI_click.play();

}

function nextLevel() {
    audio_GUI_click.play();
    robotOn = false;
    totalLabCompleted++;
    //Проверка на ачивки
    playerMovesHistory.push(playerPozition);
   // var bonus = checkAchievements();
    //var isGr = calcEXP(bonus);
    if (isLabyrinthGrow && isLevelUp) {
        if (labyrinthMaxSize !== 0 && totalWidth + 2 > labyrinthMaxSize && totalHeight + 2 > labyrinthMaxSize) {
        } else {
            totalWidth += 2;
            totalHeight += 2;
            labyrinthSize = totalWidth;
        }
    }
    isStarted = false;
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    codeView.clear();
    //Перезагружаем уровень с новым лабиринтом
    initializeGame();
    game.setLoop('Labyrinth');
}

function showResults() {
    //Обновляем инфу о времени
    var min = Math.floor(totalSeconds / 60);
    var sec = totalSeconds - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    timeText.setText("Время прохождения: " + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec));
    totalLabCompletedText.setText("Всего лабиринтов пройдено: " + totalLabCompleted);

    calcEXP(checkAchievements());
    playerLvl.setExp();
}

//Производит расчет очков опыта набранных игроком в процессе прохождения лабиринта
function calcEXP(bonus) {
    if (totalSeconds != 0)
        globalEXP += (localEXP / (totalSeconds * 0.5)) + bonus;
    //Очищаем значения которые надо очистить
    playerInventory.splice(0, playerInventory.length);
    localEXP = 0;
    if (globalEXP > nextLevelEXP) {
        isLevelUp = true;
        currentPlayerLevel++;
        nextLevelEXP = nextLevelEXP + (currentPlayerLevel * currentPlayerLevel);
        return true;
    }
    return false;
}

//Возвращает бонусы очков опыта от ачивок:
//"opt" - прохождение лабиринта оптимальным маршрутом
//"noerrors" - прохождение без единой ошибки
function checkAchievements() {
    if (totalWidth < 5) return 0;

    var text = "ПОЛУЧЕНЫ ДОСТИЖЕНИЯ:   ";
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
        if (isOpt) {//АЧИВКА ОПТИМАЛЬНЫЙ МАРШРУТ
            bonus += nextLevelEXP * 0.1;
            text += "ОПИТМАЛЬНЫЙ МАРШРУТ";
        }
    }
    if (achievement_noErrors) {//АЧИВКА - ПРОХОЖДЕНИЕ БЕЗ ОШИБОК
        bonus += nextLevelEXP * 0.1;
        text += ", ПРОХОЖДЕНИЕ БЕЗ ОШИБОК";
    }
    //showMessage(text);
    return bonus;//result;
}
