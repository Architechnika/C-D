function SaveItem(name, script) {

    this.scriptArray = script;
    this.name = "saveItem";
    var parent = game.newImageObject({
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        file: saveCommandsSrc
    })
    this.__proto__ = parent;

    var saveFileName = game.newTextObject({
        x: parent.x + parent.w*0.5,
        y: parent.y + parent.h / 2,
        text: name,
        size: parent.h * 0.18,
        color: "#05ae21",
        font: textFont,
    });
    
    this.parent = function()
    {
        return this.__proto__;
    }

    this.setFileName = function (name) {
        saveFileName.text = name;
    }
    this.setScriptArray = function (arr) {
        this.scriptArray = arr;
    }
        this.setX = function (X) {
            parent.x = X;
            saveFileName.x = X + parent.w * 0.20;
        }
        this.setY = function (Y) {
            parent.y = Y;
            saveFileName.y = Y + parent.h * 0.20;
        }
        this.setW = function (W) {
            parent.w = W;
        }
        this.setH = function (H) {
            parent.h = H;
            saveFileName.size = H * 0.2;
        }
        
        this.setImg = function(val)
        {
            this.__proto__.setImage(val);
        }
        this.getImg = function()
        {
            return this.getImage();
        }

    Object.defineProperty(this, "x", {

        get: function () {
            return this.__proto__.x;
        },

        set: function (value) {
            this.__proto__.x = value;
            saveFileName.x = value + this.__proto__.w * 0.20;
        }
    });
    
        Object.defineProperty(this, "y", {

        get: function () {
            return this.__proto__.y;
        },

        set: function (value) {
            this.__proto__.y = value;
            saveFileName.y = value + this.__proto__.h * 0.20;
        }
    });
    Object.defineProperty(this, "file", {

        get: function () {
            return this.__proto__.file;
        },

        set: function (value) {
            this.__proto__.file = value;
        }
    });
    

    this.onClick = function (el) {
        //обработчик загрузки на поле
        audio_GUI_click.play();
        lastClickedElement.commands = getCopyOfObj(el.scriptArray);
        allButtons.mainButton.onClick(allButtons.mainButton);
    }

    this.draw = function () {
        parent.draw();
        saveFileName.draw();
    }
} //
