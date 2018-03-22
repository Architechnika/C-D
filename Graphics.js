/*
Содержит методы и данные для отрисовки графики(Графическая часть игры)
*/

var playerImageObj = null;//Картинка характеризующая игрока в графике игры

var width = game.getWH().w; // Ширина всего экрана
var height = game.getWH().h; // Высота всего экрана

//ПЕРЕМЕННЫЕ ГРАФИЧЕСКИХ СЛОЕВ
/*var guiLayer = layers.newLayer(5, {
    alpha: 1,
    backgroundColor: "transparent"
}); //СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИЧЕСКИХ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА
var commandsMenuLayer = layers.newLayer(5, {
    alpha: 1,
    backgroundColor: "transparent"
}); //СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ВЫБОРА КОМАНД ПОЛЬЗОВАТЕЛЕМ
var playerLayer = layers.newLayer(4, {
    alpha: 1,
    backgroundColor: "transparent"
}); //СЛОЙ ДЛЯ ОТБРАЖЕНИЯ ГРАФИКИ ИГРОКА
var commandsLayer = layers.newLayer(3, {
    alpha: 1,
    backgroundColor: "transparent"
}); //СЛОЙ ДЛЯ ОТОБРАЖЕНИЯ ГРАФИКИ НАЗНАЧЕННЫХ ЭЛЕМЕНТАМ КОММАНДЕ
var codeViewLayer = layers.newLayer(5, {
    alpha: 1,
    backgroundColor: "transparent"
});*/

pjs.system.setTitle('Лабиринт'); // Set Title for Tab or Window

//Обновление графики на экране
function updateScreen() {
    game.clear();
    //Отрисовываем игровое поле
    for (var i = 0; i < field.length; i++) {
        field[i].draw();
    }
    //Отрисовываем обьекты на поле
    OOP.forArr(gameObjects, function (el) {
        el.draw();
    });
    //Отрисовываем команды на поле
    drawCommandsOnField();
    //Отрисовываем игрока
    playerImageObj.draw();
    //Отрисовываем скролы
    showCommandsMenu();
    //Отрисовываем карту кода
    if(isVerticalScreen) {
        if (isSecondScreen)
            codeView.drawCodeMap();
    }
    else if (inputCommandStates == 0)
        codeView.drawCodeMap();
    //Отрисовываем гуи
    drawGUI();
}

function clearAllLayers() {
    allButtons.mainButton.setButtonImgSrc(buttonStartImgSrc);
    game.clear();
}

//Отрисовывает команды на слое команд
function drawCommandsOnField() {
    OOP.forArr(field, function (el) {
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
    });
}

//Рисует на экране меню команд
function showCommandsMenu() {
    //Отображаем скролл бары для выбора команд в клетке
    OOP.forArr(Scrolls, function (scroll) {
        scroll.DrawScrollBar();
    });
}
