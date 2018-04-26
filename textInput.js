function Input(inputName, buttonName, cancelButtName) {
    var base;
    var text = "test";
    //saveInput.onClick()
    base = pjs.system.newDOM('div', true);
    base.innerHTML = `
                <!DOCTYPE HTML>
                <html>
                 <head>
                  <meta charset="utf-8">
                    <link rel="stylesheet" type="text/css" href="input/css/style.css" />
                 </head>
                 <body>
    <div class="content1" id="log">
        <div class="form-wrapper1">
            <div class="linker">
                <span class="ring"></span>
                <span class="ring"></span>
                <span class="ring"></span>
                <span class="ring"></span>
                <span class="ring"></span>
            </div>
            <form class="login-form1" action="#" method="post">
                <input id="userName" type="text" name="username" placeholder="Введите логин" />
                <button onclick="saveInput.onClick()" type="button">Название</button>
                <button onclick="saveInput.onClickCancel()" type="button">Название</button>
            </form>
        </div>
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
            showMessage(lang[selectLang]['script_saved']);
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
    var p = base.getElementsByTagName('input')[0]; //название поля ввода
    p.placeholder = inputName;
    var inputButton = base.getElementsByTagName('button')[0]; //название поля ввода
    inputButton.textContent = buttonName;
    var cancelButtom = base.getElementsByTagName('button')[1]; //название поля ввода
    cancelButtom.textContent = cancelButtName;
    this.setHidden(true)
    //
}
