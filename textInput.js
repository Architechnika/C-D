function Input(inputName, buttonName, cancelButtName) {
    var base;
    var text = "test";
    base = pjs.system.newDOM('div', true);
    base.innerHTML = `
                <!DOCTYPE HTML>
                <html>
                 <head>
                  <meta charset="utf-8">
                    <link rel="stylesheet" type="text/css" href="input/css/style.css" />
                 </head>
                 <body>
                <div class="mainBG" >
                   <input class="line" type="text" placeholder="Какой то текст" maxlength="5">
                    </br>
                  <button class="send" onclick="saveInput.onClick()" id ="click">Название </button>
                  <button class="cancel" onclick="saveInput.onClickCancel()" id ="clickCancel">Название </button>
                    </div>
                 </body>
                </html>
        `


    this.onClick = function () {
        this.setHidden(true)
        if (lastClickedElement.commands && lastClickedElement.commands.length > 0) {
            myScripts.push(this.getText());
            myScripts.push(getCopyOfObj(lastClickedElement.commands));
            var item = new SaveItem(this.getText(), getCopyOfObj(lastClickedElement.commands));
            saveItems.push(item);
            showMessage("Скрипт успешно сохранен");
        }
    }
    this.onClickCancel = function () {
        if(soundIsOn) audio_GUI_click.play();
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
        var mainDiv = base.getElementsByTagName('div')[0];
        if (isVerticalScreen) {
            mainDiv.style.width = '90%';
            mainDiv.style.height = '15%';
            mainDiv.style.left = '5%';
            mainDiv.style.bottom = '45%';
            if (width > 420)
                mainDiv.style.fontSize = '200%'
            else mainDiv.style.fontSize = '100%'
        } else {
            mainDiv.style.width = '45%';
            mainDiv.style.height = '20%';
            mainDiv.style.left = '30%';
            mainDiv.style.bottom = '45%';
            if (height > 420)
                mainDiv.style.fontSize = '200%'
        }

    }

    //Начальные настройки окна ввода
    var p = base.getElementsByTagName('input')[0]; //название поля ввода
    p.placeholder = inputName;
    var inputButton = base.getElementsByTagName('button')[0]; //название поля ввода
    inputButton.textContent = buttonName;
    var cancelButtom = base.getElementsByTagName('button')[1]; //название поля ввода
    cancelButtom.textContent = cancelButtName;
    this.setHidden(true)
    //
}
