function Dialog(windowName, buttonName, cancelButtName, pur) {
    var base;
    var text = "test";
    base = pjs.system.newDOM('div', true);
    base.innerHTML = `
            <!DOCTYPE HTML>
            <html>
             <head>
              <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="dialog/css/style.css" />
             </head>
             <body>
            <div id="dialog">
        <div class="form-wrapper">

            <center>Вы Уверены? Весь несохраненный прогресс исчезнет</center>
            <button class="send" onclick="dialog.onClick()" id="click" type="button">Да </button>
            <button class="cancel" onclick="dialog.onClickCancel()" id="clickCancel" type="button">Нет </button>
        </div>
    </div>
             </body>
            </html>
    `


    this.onClick = function () {
        this.setHidden(true)
        if (pur == "delete") {
            // if (this.visible) {
            if (soundIsOn) audio_GUI_click.play();
            lastClickedElement.commands.splice(0);
            setFocused(field[lastClickedIndx], lastClickedIndx);
            dialog.setHidden(true);
            // }
        }
    }
    this.onClickCancel = function () {
        if (soundIsOn) audio_GUI_click.play();
        this.setHidden(true);
    }
    this.getText = function () {
        var textTag = base.getElementsByTagName('input')[0]
        var text = textTag.value;
        if (text.toString().length > 0)
            return text;
        else return "noName";
    }
    this.setHidden = function (isHidden) {
        var mainDiv = base.getElementsByTagName('div')[0];
        mainDiv.hidden = isHidden;
    }
    this.setPosture = function () { //установка положение в зависимости от положение экрана
        var mainDiv = base.getElementsByTagName('div')[1];

        var elW = 264;
        var elH = 253;
        var x = width / 2 - (elW / 2);
        var y = height / 2 - (elH / 2);
        mainDiv.style.left = x + 'px';
        mainDiv.style.top = y + 'px';

    }

    //Начальные настройки окна ввода
    var p = base.getElementsByTagName('center')[0]; //название поля ввода
    p.textContent = windowName;
    var inputButton = base.getElementsByTagName('button')[0]; //название поля ввода
    inputButton.textContent = buttonName;
    var cancelButtom = base.getElementsByTagName('button')[1]; //название поля ввода
    cancelButtom.textContent = cancelButtName;
    this.setHidden(true)
    //


}
