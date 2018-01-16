function UserAccaunt(login,pass,summ)
{
    this.userLogin = login;
    this.userPass = pass;
    this.checkSumm = summ;
    this.labyrinth = ""; //текущий лаберинт
    this.gameTime = 0;  //игровое время
    this.gameCoin = "";  // очки
    this.coinsArray = ""; //массив призовых объектов
    this.entrySide = "NONE";
    this.totalWH = 0;
    this.isSaved = false;
    this.gameSpasePos = "";

    this.copy = function(obj)
    {
        this.userLogin = obj.userLogin;
        this.userPass = obj.userPass;
        this.checkSumm = obj.checkSumm;
        this.labyrinth = obj.labyrinth; //текущий лаберинт
        this.gameTime = obj.gameTime;  //игровое время
        this.gameCoin = obj.gameCoin;  // очки
        this.coinsArray = obj.coinsArray; //массив призовых объектов
        this.entrySide = obj.entrySide;
        this.totalWH = obj.totalWH;
        this.gameSpasePos = obj.gameSpasePos;
        this.isSaved = obj.isSaved;
        
    }
    this.save = function(isGameSpaseUp,totalSeconds,field,playerInventory,gameObjects,entrySide,totalWidth)
    {
            this.labyrinth = JSON.stringify(field);
            this.gameTime = totalSeconds;
            this.gameCoin = JSON.stringify(playerInventory);
            this.coinsArray = JSON.stringify(gameObjects);
            this.isSaved = true;
            this.entrySide = entrySide;
            this.totalWH = totalWidth;
            if (isGameSpaseUp)
                this.gameSpasePos = "Up";
            else
                this.gameSpasePos = "Down";
            localMemory.saveAsObject(this.checkSumm, this)
    }
    this.load = function(isGameSpaseUp,gameObjects,playerInventory,totalHeight,totalWidth,totalSeconds,initGUI)
    {
            field = new Array();
        if(this.isSaved) 
         {
            tmpField = JSON.parse(userData.labyrinth)
            tmpGameObjects = JSON.parse(userData.coinsArray);
            tmpPlayerInventary = JSON.parse(userData.gameCoin);
            var roadEl = Array();
            for (var i = 0; i < tmpField.length; i++) {
                var img = tmpField[i].imgSrc;
                var comm = tmpField[i].commands;
                var S = tmpField[i].code;
                var tx = tmpField[i].X;
                var ty = tmpField[i].Y;
                var tw = tmpField[i].W;
                var th = tmpField[i].H;
                if (isGameSpaseUp && this.gameSpasePos != "Up") {
                    ty -= (height / 100 * 15)
                }
                if (!isGameSpaseUp && this.gameSpasePos == "Up") {
                    ty += (height / 100 * 15)
                }
                field.push(new fieldElement(img, comm, S, tx, ty, tw, th))
            }

            for (var i = 0; i < tmpGameObjects.length; i++) {
                var obj = new gameObject("coin", coinCode, tmpGameObjects[i].position, coinPath, true);
                gameObjects.push(obj)
            }
            for (var i = 0; i < tmpPlayerInventary.length; i++) {
                playerInventory.push(tmpPlayerInventary[i]);
            }
                entrySide = this.entrySide;
                totalHeight = totalWidth = this.totalWH;
                totalSeconds = this.gameTime;
                oneTileWidth = field[0].W;
                oneTileHeight = field[0].H;
        }else{totalSeconds = 0;}
        initGUI();
        return field;

    }
}