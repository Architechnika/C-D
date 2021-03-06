var isOkClose = true;

function PushButton() { //Класс наследуеться от newImageObject, экзепляры класса это кнопки
    var parent = game.newImageObject({
        x: 0,
        y: 0,
        w: 50,
        h: 100,
        file: nonePath
    })
    this.__proto__ = parent;

    this.setImage = function (img) {
        this.__proto__.setImage(img);
    }
    //функция вызываеться извне и позволяеть установить  настройки позиции и размеров кнопки
    this.setSetting = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    //функция установки картинки для кнопки, получает на вход путь к картинке
    this.setButtonImgSrc = function (img) {
        //this.file = img
        this.__proto__ = new game.newImageObject({
            x: parent.x,
            x: parent.y,
            x: parent.w,
            x: parent.h,
            file: img
        });
    }
}

function Buttons() { //класс для работы совсеми кнопками, внутри этого класса объявляються новые экзепляры кнопок и их настройки, а так же обработчики данных кнопок
    //из вне создаеться один экземпляр этого класса для того чтобы объявить все кнопки описанные в этом классе

    //создание объектов кнопок
    this.mainButton = new PushButton(); //Кнопка описывающая логику СТАРТ/СТОП/ОК
    this.stepDownButton = new PushButton();
    this.stepUpButton = new PushButton();
    this.backToStartButton = new PushButton();
    this.menuButton = new PushButton();
    this.deleteButton = new PushButton();
    this.saveButton = new PushButton();
    //
    //создание и заполнение массива для хранения кнопок, нужен для того чтобы в дальнейшем рисовать эти кнопки или обходить их для вылавливание событий
    this.buttonsArr = [];
    this.buttonsArr.push(this.mainButton);
    this.buttonsArr.push(this.stepDownButton);
    this.buttonsArr.push(this.stepUpButton);
    this.buttonsArr.push(this.backToStartButton);
    this.buttonsArr.push(this.menuButton);
    this.buttonsArr.push(this.deleteButton);
    this.buttonsArr.push(this.saveButton);
    //
    var n = 2 // число кнопок, которые расположаны в отдельным местах экрана, а не рядом с кнопками снизу лабиринта
    //получаем количество кнопок в массиве для того чтобы автоматический определить ширину кнопок на экране
    var buttonsCount = this.buttonsArr.length - n; //!!!если кнопка будет создана для того чтобы разместить в другом места, а не снизу, то обратите внимание на эту строку
    //выполняем настройки позиции, размеров картинки для кнопок
    this.mainButton.setSetting(gameSpaceX, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.mainButton.setButtonImgSrc(buttonStartImgSrc);
    this.mainButton.setUserData({value : "start"});

    this.stepDownButton.setSetting(this.mainButton.x + this.mainButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepDownButton.setButtonImgSrc(prevStepButtonImgSrc);

    this.stepUpButton.setSetting(this.stepDownButton.x + this.stepDownButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepUpButton.setButtonImgSrc(nextStepButtonImgSrc);

    this.backToStartButton.setSetting(this.stepUpButton.x + this.stepUpButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.backToStartButton.setButtonImgSrc(reloadButtonImgSrc);

    this.menuButton.setSetting(this.backToStartButton.x + this.backToStartButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.menuButton.setButtonImgSrc(menuButtonImgSrc);

    //кнопка удаление кодмапа
    var delButtY = 0;
    if(isVerticalScreen)
        delButtY = gameSpaceW / 100 * 4;
    if (height < 450 || width<450) {
        this.deleteButton.setSetting(width - (gameSpaceW / 100 * 10), delButtY, gameSpaceW / 100 * 10, gameSpaceW / 100 * 10)
    } else {
        this.deleteButton.setSetting(width - (gameSpaceW / 100 * 5), delButtY, gameSpaceW / 100 * 5, gameSpaceW / 100 * 5)
    }
    this.deleteButton.setButtonImgSrc(buttonDeleteImgSrc);
    this.deleteButton.setVisible(false);
    //
    //кнопка сохранения скрипта в профиль
    var savButtY = 0;
    if(isVerticalScreen)
        delButtY = gameSpaceW / 100 * 4;
    if (height < 450 || width<450) {
        this.saveButton.setSetting(width - (gameSpaceW / 100 * 10)-this.deleteButton.w, delButtY, gameSpaceW / 100 * 10, gameSpaceW / 100 * 10)
    } else {
        this.saveButton.setSetting(width - (gameSpaceW / 100 * 5)-this.deleteButton.w, delButtY, gameSpaceW / 100 * 5, gameSpaceW / 100 * 5)
    }
    this.saveButton.setButtonImgSrc(buttonSaveImgSrc);
    this.saveButton.setVisible(false);
    //
    //
    //описывает обработчик onClick для кнопок
    this.mainButton.setUserData({
        onClick: function (el) {
            if(soundIsOn) audio_GUI_click.play();
            if (el.value == "ok") {
                if (onOkBClick()) {
                    el.value = isStarted ? "stop" : "start";
                    el.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
                }
            }
            else if (el.value == "start") {
                startBClick();
                el.value = "stop";
                el.setButtonImgSrc(buttonStopImgSrc);
            }
            else if (el.value == "stop") {
                startBClick();
                el.value = "start";
                el.setButtonImgSrc(buttonStartImgSrc);
            }
        },
        reset: function (el) {
            el.value = isStarted ? "stop" : "start";
            el.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
        }
    });
    this.stepDownButton.setUserData({
        onClick: function (el) {
            if(soundIsOn) audio_GUI_click.play();
            if (!isOkClose || isStarted || isSecondScreen) return;
            setPreviousStateToPlayer();
        }
    });
    this.deleteButton.setUserData({
        onClick: function (el) {
            if (codeView.isElementMove) return;
            if(soundIsOn) audio_GUI_click.play();
            if (lastClickedElement.commands && lastClickedElement.commands.length > 0)
                dialog.setHidden(false);
        }
    });
    this.saveButton.setUserData({
        onClick: function (el) {
            if (codeView.isElementMove) return;
            if(soundIsOn) audio_GUI_click.play();
            if (lastClickedElement.commands && lastClickedElement.commands.length > 0)
                {
                   // myScripts.push( lastClickedElement.commands);
                    //showMessage("Скрипт успешно сохранен");
                    saveInput.setHidden(false);
                }
        }
    });
    this.stepUpButton.setUserData({
        onClick: function (el) {
            if(soundIsOn) audio_GUI_click.play();
            if (!isOkClose || isStarted || isSecondScreen) return;
            processRobotMove();
        }
    });
    this.backToStartButton.setUserData({
        onClick: function (el) {
            if(soundIsOn) audio_GUI_click.play();
            if (!isOkClose || isSecondScreen) return;
            if (!isStarted) {
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
            }
        }
    });
    this.menuButton.setUserData({
        onClick: function (el) {
            if(soundIsOn) audio_GUI_click.play();
            sleep(80);
            //сохраняем состояние игры
            if (userData !== undefined) {
                userData.save(true, totalSeconds, field, playerInventory, gameObjects, entrySide);
            }
            menuBClick();
        }
    });

    this.getPosition = function () {
        return this.mainButton.getPosition();
    }
    //
    //Функция вызывается извне для обрисовки кнопок
    this.ButtonsDraw = function () {
        if (this.buttonsArr) {
            OOP.drawArr(this.buttonsArr)
        }
    }
    //Проверка на клик по кнопке и запуск обработчика кнопки если клик есть
    this.checkButtonsClicked = function (e, dontprocess) {
        if (this.buttonsArr) {
            for (var i = 0; i < this.buttonsArr.length; i++) {
                if (clickIsInObj(e.x, e.y, this.buttonsArr[i])) {
                    if (!dontprocess)
                        this.buttonsArr[i].onClick(this.buttonsArr[i]);
                    return true;
                }
            }
        }
        return false;
    }
}
