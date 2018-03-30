/*
Содержит методы и данные для отрисовки графики(Графическая часть игры)
*/

var playerImageObj = null;//Картинка характеризующая игрока в графике игры

var width = game.getWH().w; // Ширина всего экрана
var height = game.getWH().h; // Высота всего экрана

pjs.system.setTitle(lang[selectLang]['game_title']); // Set Title for Tab or Window

//Обновление графики на экране
function updateScreen() {
    game.clear();
    //Отрисовываем игровое поле
    for (var i = 0; i < field.length; i++) {
        if(field[i].isInCameraStatic())
            field[i].draw();
    }
    //Отрисовываем команды на поле
    drawCommandsOnField();
    //Отрисовываем обьекты на поле
    OOP.forArr(gameObjects, function (el) {
        if(el.isInCameraStatic()) {
            el.draw();
        }
    });
    //Отрисовываем игрока
    if(playerImageObj.isInCameraStatic()) {
        playerImageObj.draw();
    }
    //Отрисовываем карту кода
    if(isVerticalScreen) {
        if (isSecondScreen) {
            codeView.drawCodeMap();
        }
    }
    else if (inputCommandStates == 0) {
        codeView.drawCodeMap();
    }
    //Отрисовываем скролы
    showCommandsMenu();
    //Отрисовываем гуи
    drawGUI();
    if(isDrawFPS) {
        brush.drawTextS({
            y:20,
            text: system.getFPS(),
            color: "lawngreen",
            size: 50
        });
    }
}

function clearAllLayers() {
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    game.clear();
}

//Отрисовывает команды на слое команд
function drawCommandsOnField() {
    OOP.forArr(field, function (el) {
        if(el.isInCameraStatic()) {
            //Если это дорога
            if (el.code == roadCode || el.code == entryCode) {
                //Если команда назначена
                if (el.getTotalCommands() > 0 && el.visible) {
                    var img = game.newImageObject({
                        file: COMMANDS[0].imgSource,
                        x: el.x,
                        y: el.y,
                        w: el.w,
                        h: el.h
                    });
                    img.draw();
                }
            }
        }
    });
}

//Рисует на экране меню команд
function showCommandsMenu() {
    //Отображаем скролл бары для выбора команд в клетке
    OOP.forArr(Scrolls, function (scroll) {
        scroll.DrawScrollBar();
    });
}
