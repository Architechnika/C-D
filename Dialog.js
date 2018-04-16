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
            <div class="mainBG" >
               <center>Название</center>
              <button class="send" onclick="dialog.onClick()" id ="click">Название </button>
              <button class="cancel" onclick="dialog.onClickCancel()" id ="clickCancel">Название </button>
                </div>
             </body>
            </html>
    `


this.onClick = function () {
    this.setHidden(true)
    if (pur == "delete") {
        // if (this.visible) {
        audio_GUI_click.play();
        lastClickedElement.commands.splice(0);
        setFocused(field[lastClickedIndx], lastClickedIndx);
        dialog.setHidden(true);
        // }
    }
}
this.onClickCancel = function () {
    audio_GUI_click.play();
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
        mainDiv.style.width = '36%';
        mainDiv.style.height = '12%';
        mainDiv.style.left = '38%';
        mainDiv.style.bottom = '45%';
        if (width > 420) {
            mainDiv.style.fontSize = '200%'
        } else {
            mainDiv.style.fontSize = '100%'
            mainDiv.style.height = '12%';
        }
    } else {
        mainDiv.style.width = '20%';
        mainDiv.style.height = '12%';
        mainDiv.style.left = '30%';
        mainDiv.style.bottom = '45%';
        if (height > 420)
            mainDiv.style.fontSize = '200%'
    }

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
