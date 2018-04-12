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
    this.myScriptsArray = ""; // массив для скриптов сохраненных пользователем
    this.playerOptimalRoute = "" // что то связанное с опытом игрока
    this.playerLocalEXP = 0 // локальный опыт игрока
    this.playerGlobalEXP = 0 // глобальный опыт игркоа
    this.playerNextLvlEXP = 0 //количество опыта необходимое для перехода на следующий уровень
    this.playerPrevLvlEXP = 0
    this.playerCurrentLevel = 0 // текущий уровень игрока
    this.copy = function (obj, isNewGame) {
        if (obj && isNewGame != "NewGame") {
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
            this.gameObjsPos = obj.gameObjsPos;
            this.playerOptimalRoute = obj.playerOptimalRoute;
            this.playerLocalEXP = obj.playerLocalEXP;
            this.playerGlobalEXP = obj.playerGlobalEXP;
            this.playerNextLvlEXP = obj.playerNextLvlEXP;
            this.playerPrevLvlEXP = obj.playerPrevLvlEXP;
            this.playerCurrentLevel = obj.playerCurrentLevel;
        }
        this.myScriptsArray = obj.myScriptsArray;
    }
    this.save = function (isGameSpaseUp, totalSeconds, field, playerInventory, gameObjects, entrySide) {
        this.labyrinth = JSON.stringify(field, function (key, value) {
            return value
        }, 4);

        this.playerOptimalRoute = JSON.stringify(optimalRoute);
        this.myScriptsArray = JSON.stringify(myScripts);
        this.playerLocalEXP = localEXP;
        this.playerGlobalEXP = globalEXP;
        this.playerNextLvlEXP = nextLevelEXP;
        this.playerNextLvlEXP = prevLevelEXP;
        this.playerCurrentLevel = currentPlayerLevel;
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
            if (userData.playerOptimalRoute != undefined)
                optimalRoute = JSON.parse(userData.playerOptimalRoute);
            if (userData.playerLocalEXP != undefined)
                localEXP = userData.playerLocalEXP;
            if (userData.playerGlobalEXP != undefined)
                globalEXP = userData.playerGlobalEXP;
            if (userData.playerNextLvlEXP != undefined)
                nextLevelEXP = userData.playerNextLvlEXP;
            if (userData.playerPrevLvlEXP != undefined)
                prevLevelEXP = userData.playerPrevLvlEXP;
            if (userData.playerCurrentLevel != undefined)
                currentPlayerLevel = userData.playerCurrentLevel;
            if (userData.labyrinth != undefined)
                tmpField = JSON.parse(userData.labyrinth)
            if (userData.gameObjsPos != undefined)
                tmpGameObjsPos = JSON.parse(userData.gameObjsPos);
            if (userData.coinsArray != undefined)
                tmpGameObjects = JSON.parse(userData.coinsArray);
            if (userData.gameCoin != undefined)
                tmpPlayerInventary = JSON.parse(userData.gameCoin);
            if (userData.myScriptsArray != undefined)
                myScripts = JSON.parse(userData.myScriptsArray);
            var roadEl = Array();
            for (var i = 0; i < tmpField.length; i++) {
                var img = tmpField[i].parent.file;
                var comm = tmpField[i].commands;
                var S = tmpField[i].code;
                var tx = tmpField[i].parent.x;
                var ty = tmpField[i].parent.y;
                var tw = tmpField[i].parent.w;
                var th = tmpField[i].parent.h;
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
            labyrinthSize = totalWidth;
            totalSeconds = this.gameTime;
            oneTileWidth = field[0].W;
            oneTileHeight = field[0].H;
        } else {
            totalSeconds = 0;
            if (userData.myScriptsArray != undefined)
                myScripts = JSON.parse(userData.myScriptsArray);
        }
        sortSaveScripts();
        initGUI();
        return field;

    }

    function sortSaveScripts() { //сортируем сохраненные пользователем скрипты в правый скрол, для того чтобы при клике на пустую дорогу можно было туда выгрузить скрипт 
        var onlyScripts = [] //массив для харнение скриптов без названия, для того чтобы влить в правый скрол
        var item = undefined;
        if (myScripts && myScripts.length > 0) {
            for (var i = 0; i < myScripts.length; i++) {
                if (i % 2 == 0) { //заходим сюда когда работает с именем сохраненных данных
                    item = new SaveItem(myScripts[i]);
                } else { //заходим сюда когда работаем с массивом скрипта сохраненных данных
                    item.setScriptArray(myScripts[i]);
                    saveItems.push(item);
                }
            }
        }
    }
}
