function UserAccaunt(login, pass, summ) {
    this.userLogin = login;
    this.userPass = pass;
    this.checkSumm = summ;
    this.labyrinth = ""; //текущий лаберинт
    this.gameTime = 0; //игровое время
    this.gameCoin = ""; // очки
    this.coinsArray = ""; //массив призовых объектов
    this.entrySide = "NONE";
    this.totalWH = 0;
    this.isSaved = false;
    this.gameSpasePos = "";
    this.gameObjsPos = "";
    this.copy = function (obj) {
        this.userLogin = obj.userLogin;
        this.userPass = obj.userPass;
        this.checkSumm = obj.checkSumm;
        this.labyrinth = obj.labyrinth; //текущий лаберинт
        this.gameTime = obj.gameTime; //игровое время
        this.gameCoin = obj.gameCoin; // очки
        this.coinsArray = obj.coinsArray; //массив призовых объектов
        this.entrySide = obj.entrySide;
        this.totalWH = obj.totalWH;
        this.gameSpasePos = obj.gameSpasePos;
        this.isSaved = obj.isSaved;
        this.gameObjsPos = obj.gameObjsPos

    }
    this.save = function (isGameSpaseUp, totalSeconds, field, playerInventory, gameObjects, entrySide) {
        this.labyrinth = JSON.stringify(field,function(key, value){
            return value
        },4);
        this.gameTime = totalSeconds;
        this.gameCoin = JSON.stringify(playerInventory);
        this.coinsArray = JSON.stringify(gameObjects);
        var tmpArr = [];
        for (var i = 0; i < gameObjects.length; i++) {
            tmpArr.push(gameObjects[i].__proto__.position);
        }
        this.gameObjsPos = JSON.stringify(tmpArr);
        this.isSaved = true;
        this.entrySide = entrySide;
        this.totalWH = totalWidth;
        var userID = sessionStorage.getItem("userdata")
        localMemory.saveAsObject(userID, this)
    }
    this.load = function (isGameSpaseUp, gameObjects, playerInventory, initGUI) {
        field = new Array();
        if (this.isSaved) {
            tmpField = JSON.parse(userData.labyrinth)
            tmpGameObjsPos = JSON.parse(userData.gameObjsPos);
            tmpGameObjects = JSON.parse(userData.coinsArray);
            tmpPlayerInventary = JSON.parse(userData.gameCoin);
            var roadEl = Array();
            for (var i = 0; i < tmpField.length; i++) {
                var img = tmpField[i].parent.file;
                var comm = tmpField[i].commands;
                var S = tmpField[i].code;
                var tx = tmpField[i].parent.x;
                var ty = tmpField[i].parent.y;
                var tw = tmpField[i].parent.w;
                var th = tmpField[i].parent.h;
//                if (isGameSpaseUp && this.gameSpasePos != "Up") {
//                    ty -= (height / 100 * 15)
//                }
//                if (!isGameSpaseUp && this.gameSpasePos == "Up") {
//                    ty += (height / 100 * 15)
//                }
                field.push(new fieldElement(img, comm, S, tx, ty, tw, th))
            }

            for (var i = 0; i < tmpGameObjects.length; i++) {
                var obj = new CoinBattery("coin", coinCode, tmpGameObjsPos[i], coinPath, true);
                gameObjects.push(obj)
            }
            for (var i = 0; i < tmpPlayerInventary.length; i++) {
                playerInventory.push(tmpPlayerInventary[i]);
            }
            entrySide = this.entrySide;
            totalHeight = this.totalWH;
            totalWidth = this.totalWH;
            totalSeconds = this.gameTime;
            oneTileWidth = field[0].W;
            oneTileHeight = field[0].H;
        } else {
            totalSeconds = 0;
        }
        initGUI();
        return field;

    }
}
