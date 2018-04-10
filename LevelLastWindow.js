game.newLoopFromConstructor('LastLevelWindow', function () {
    //Код для старта игры
    this.entry = function () 
    {
        initInputEvents();
    }
    //Код для завершения цикла
    this.exit = function () 
    {
        removeInputEvents();
    };

    //Код для апдейта игры
    this.update = function () 
    {

    };
});
