function SaveItem(name, script) {

    this.scriptArray = script;
    this.name = "saveItem";
    var parent = game.newImageObject({
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        file: commandDropImgSrc
    })
    this.__proto__ = parent;

    var saveFileName = game.newTextObject({
        x: parent.x + parent.w / 2,
        y: parent.y + parent.h / 2,
        text: name,
        size: parent.h * 0.2,
        color: "#000000",
    });

    this.setFileName = function (name) {
        saveFileName.text = name;
    }
    this.setScriptArray = function (arr) {
        this.scriptArray = arr;
    }
    this.setX = function (X) {
        parent.x = X;
        saveFileName.x = X + parent.w * 0.38;
    }
    this.setY = function (Y) {
        parent.y = Y;
        saveFileName.y = Y;
    }
    this.setW = function (W) {
        parent.w = W;
    }
    this.setH = function (H) {
        parent.h = H;
        saveFileName.size = H * 0.2;
    }
    this.onClick = function (el) {
        //обработчик загрузки на поле
        audio_GUI_click.play();
    }

    this.draw = function () {
        parent.draw();
        saveFileName.draw();  
    }
} //
