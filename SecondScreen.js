var back = undefined;
game.newLoopFromConstructor('SecondScreen', function () {
    //Код для старта игры
    this.entry = function () {
        initInputEvents();
        isSecondScreen = true;
        codeMapBackGroundInit("#000000", 0.4);
        codeView = new CodeMapView(codeMapBG.x, codeMapBG.y, codeMapBG.w, codeMapBG.h, "white");
        initRightScroll([]);
        codeView.resetZoomer();
        codeView.createCodeMap(0, textbackGroundItem.h, lastClickedElement.commands, true, true, 1, true);
        if(lastClickedElement.commands.length == 0){
            onCodeMapElementClick(codeView.getAllElems()[0]);
            initLeftScroll(saveItems);
        }
    }
    //Код для завершения цикла
    this.exit = function () {
        removeInputEvents();
        codeView.clear();
    };

    //Код для апдейта игры
    this.update = function () {
        if (inputCommandStates == 0)
            codeView.drawCodeMap();
        showCommandsMenu();
        //Отрисовываем элементы интерфейса
        drawGUI();
        if(isDrawFPS) {
            brush.drawTextS({
                x:width / 2,
                text: system.getFPS(),
                color: "lawngreen",
                size: 30
            });
        }
    };
});
