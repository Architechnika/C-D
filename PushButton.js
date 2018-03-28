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
    //
    //создание и заполнение массива для хранения кнопок, нужен для того чтобы в дальнейшем рисовать эти кнопки или обходить их для вылавливание событий
    this.buttonsArr = [];
    this.buttonsArr.push(this.mainButton);
    this.buttonsArr.push(this.stepDownButton);
    this.buttonsArr.push(this.stepUpButton);
    this.buttonsArr.push(this.backToStartButton);
    this.buttonsArr.push(this.menuButton);
    this.buttonsArr.push(this.deleteButton);
    //
    var n = 1 // число кнопок, которые расположаны в отдельным местах экрана, а не рядом с кнопками снизу лабиринта
    //получаем количество кнопок в массиве для того чтобы автоматический определить ширину кнопок на экране
    var buttonsCount = this.buttonsArr.length - n; //!!!если кнопка будет создана для того чтобы разместить в другом места, а не снизу, то обратите внимание на эту строку
    //выполняем настройки позиции, размеров картинки для кнопок
    this.mainButton.setSetting(gameSpaceX, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.mainButton.setButtonImgSrc(buttonStartImgSrc)

    this.stepDownButton.setSetting(this.mainButton.x + this.mainButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepDownButton.setButtonImgSrc(prevStepButtonImgSrc);

    this.stepUpButton.setSetting(this.stepDownButton.x + this.stepDownButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.stepUpButton.setButtonImgSrc(nextStepButtonImgSrc);

    this.backToStartButton.setSetting(this.stepUpButton.x + this.stepUpButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.backToStartButton.setButtonImgSrc(reloadButtonImgSrc);

    this.menuButton.setSetting(this.backToStartButton.x + this.backToStartButton.w, height - (gameSpaceW / 100 * 14), (gameSpaceW) / buttonsCount, gameSpaceW / 100 * 14)
    this.menuButton.setButtonImgSrc(menuButtonImgSrc);
    
    this.deleteButton.setSetting(width -(gameSpaceW/100 * 5) ,0, gameSpaceW/100 * 5, gameSpaceW / 100 * 5)
    this.deleteButton.setButtonImgSrc(buttonDeleteImgSrc);
    this.deleteButton.setVisible(false);
    //
    //описывает обработчик onClick для кнопок
    this.mainButton.setUserData({
        onClick: function (el) {
            if (el.file == okButtonImgSrc) isOkClose = onOkBClick(); //Обрабатываем на нажатие по ОК
            else startBClick(); //Обрабатываем клик по СТАРТ/СТОП
            //Задаем картинку кнопке в соответствии с ее состоянием
            if (isOkClose) el.setButtonImgSrc(isStarted ? buttonStopImgSrc : buttonStartImgSrc);
        }
    });
    this.stepDownButton.setUserData({
        onClick: function (el) {
            if (!isOkClose || isStarted || isSecondScreen) return;
            setPreviousStateToPlayer();
        }
    });
    this.deleteButton.setUserData({
        onClick: function (el) {
                if(lastClickedElement.commands && lastClickedElement.commands.length >0)
                    dialog.setShowDialog(true);
        }
    });
    this.stepUpButton.setUserData({
        onClick: function (el) {
            if (!isOkClose || isStarted || isSecondScreen) return;
            processRobotMove();
        }
    });
    this.backToStartButton.setUserData({
        onClick: function (el) {
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
    this.checkButtonsClicked = function (e) {
        if (this.buttonsArr) {
            for (var i = 0; i < this.buttonsArr.length; i++) {
                if (clickIsInObj(e.x, e.y, this.buttonsArr[i])) {
                    this.buttonsArr[i].onClick(this.buttonsArr[i]);
                    return true;
                }
            }
        }
        return false;
    }
}
