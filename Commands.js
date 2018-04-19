/*
Содержит методы и данные для алгоритмической части игры.
Описание алгоритмических блоков, используемых для построения алгоритма прохождения лабиринта
*/

//ОПИСАНИЕ ВСЕХ ВОЗМОЖНЫХ КОМАНД
var COMMANDS = new Array();
//ПРОСТЫЕ КОМАНДЫ ДЛЯ ДЕЙСТВИЙ
COMMANDS.push({
    code: '0',
    name: "none",
    imgSource: commandNoneImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '1',
    name: "up",
    imgSource: commandUpImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '2',
    name: "down",
    imgSource: commandDownImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '3',
    name: "left",
    imgSource: commandLeftImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '4',
    name: "right",
    imgSource: commandRightImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '5',
    name: "clockwise",
    imgSource: commandClockwiseImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '6',
    name: "unclockwise",
    imgSource: commandUnClockwiseImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '8',
    name: "pickup",
    imgSource: commandPickUpImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '9',
    name: "drop",
    imgSource: commandDropImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: 'C',
    name: "commandsblock",
    imgSource: commandCommandsBlockImgSrc,
    actions: [],
    undeletable: false
}); //БЛОК СОДЕРЖАЩИЙ СПИСОК КОМАНД

//БЛОК КОТОРЫЙ ОПРЕДЕЛЯЕТ ЧТО НАХОДИТСЯ ПЕРЕД РОБОТОМ
COMMANDS.push({
    code: 'W',
    name: "whatisit",
    imgSource: commandWhatIsItImgSrc, //[10]
    lookCommand: undefined,
    undeletable: false
});

//БЛОК УСЛОВИЯ, if(blockA == blockC) {actions}
COMMANDS.push({
    code: 'I',
    name: "if",
    imgSource: commandIfImgSrc, //[11]
    blockA: "0",
    blockB: "0",
    redacted: "commands", //Переменная для хранения последнего редактируемого блока(commands или else block)
    commandsBlock: undefined,
    elseBlock: undefined
});

//БЛОК ПОВТОРЕНИЯ, ПОВТОРЯЕТ действия actions count раз
COMMANDS.push({
    code: 'R',
    name: "repeat",
    imgSource: commandRepeatImgSrc,
    countBlock: undefined,
    commandsBlock: undefined, //[12]
});

//БЛОК ВЫОЛНЯЮЩИЙ ДЕЙСТВИЕ ЕСЛИ ВЫПОЛНИТСЯ УСЛОВИЕ
COMMANDS.push({
    code: 'E',
    name: "repeatif",
    imgSource: commandRepeatIfImgSrc,
    blockA: undefined,
    blockB: undefined,
    commandsBlock: undefined, //[13]
    undeletable: false
}); //БЛОК ПОВТОРЯЮЩИЙ actions пока ifBlock.result == true

//ВСПОМОГАТЕЛЬНЫЕ КОМАНДЫ, ДЛЯ СЛОЖНЫХ КОМАНД
COMMANDS.push({
    code: 'A',
    name: "blockA",
    imgSource: commandBlockAImgSrc,
    undeletable: true
}); //[14]
COMMANDS.push({
    code: 'B',
    name: "blockB",
    imgSource: commandBlockBImgSrc,
    undeletable: true
}); //[15]
COMMANDS.push({
    code: 'K',
    name: "counter",
    imgSource: commandCounterImgSrc,
    count: 0,
    undeletable: true
}); //[16]
COMMANDS.push({
    code: 'O',
    name: "ok",
    imgSource: commandOkImgSrc,
    undeletable: true
}); //[17]
//Команды для того чтобы определять направление
COMMANDS.push({
    code: 'Z',
    name: "blockA",
    dir: "lookup",
    imgSource: commandLookUpImgSrc,
    undeletable: true
}); //[18]
COMMANDS.push({
    code: 'X',
    name: "blockA",
    dir: "lookdown",
    imgSource: commandLookDownImgSrc,
    undeletable: true
}); //[19]
COMMANDS.push({
    code: 'L',
    name: "blockA",
    dir: "lookleft",
    imgSource: commandLookLeftImgSrc,
    undeletable: true
}); //[20]
COMMANDS.push({
    code: 'V',
    name: "blockA",
    dir: "lookright",
    imgSource: commandLookRightImgSrc,
    undeletable: true
}); //[21]
COMMANDS.push({
    code: 'Z',
    name: "blockA",
    dir: "lookcenter",
    imgSource: commandLookCenterImgSrc,
    undeletable: true
}); //[22]
COMMANDS.push({
    code: 'Q',
    name: "elseblock",
    imgSource: commandElseBlockImgSrc,
    actions: [],
    undeletable: true
}); //[23]
COMMANDS.push({
    code: '{',
    name: "forward",
    imgSource: commandForwardImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '}',
    name: "onleft",
    imgSource: commandOnLeftImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: '[',
    name: "onright",
    imgSource: commandOnRightImgSrc,
    undeletable: false
});
COMMANDS.push({
    code: ']',
    name: "back",
    imgSource: commandBackwardImgSrc,
    undeletable: false
});
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ IF
COMMANDS[11].blockA = COMMANDS[14];
COMMANDS[11].blockB = [COMMANDS[15]];
COMMANDS[11].commandsBlock = COMMANDS[9];
COMMANDS[11].elseBlock = COMMANDS[23];
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ REPEAT
COMMANDS[12].countBlock = COMMANDS[16]
COMMANDS[12].commandsBlock = COMMANDS[9];
//ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ repeatIF
COMMANDS[13].blockA = COMMANDS[14];
COMMANDS[13].blockB = [COMMANDS[15]];
COMMANDS[13].commandsBlock = COMMANDS[9];

function gameFieldElement(fCode, iCode) {
    this.fieldCode = fCode;
    this.itemCode = iCode;
}

//Возвращает объект, находящийся с лицевой стороны робота
function checkWhatIsIt(lookCommand, poz, field, fieldW, gameObj, orient) { //gameObj - игровой объект на этой клетке(монетка, батарейка и тд)
    var indx = poz; //Если передали неправильное направление, то просто возращаем объект на котором стоим
    switch (orient) {
        case 0: //ЕСЛИ ИГРОК СМОТРИТ ВВЕРХ
            if (lookCommand.dir == "lookup") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookright") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookdown") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookleft") indx = poz + 1; //Лево
            break;
        case 1: //ЕСЛИ ИГРОК СМОТРИТ ВПРАВО
            if (lookCommand.dir == "lookleft") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookup") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookright") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookdown") indx = poz + 1; //Лево
            break;
        case 2: //ЕСЛИ ИГРОК СМОТРИТ ВНИЗ
            if (lookCommand.dir == "lookdown") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookleft") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookup") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookright") indx = poz + 1; //Лево
            break;
        case 3: //ЕСЛИ ИГРОК СМОТРИТ НАЛЕВО
            if (lookCommand.dir == "lookright") indx = poz + fieldW; //Верх
            else if (lookCommand.dir == "lookdown") indx = poz - 1; //Право
            else if (lookCommand.dir == "lookleft") indx = poz - fieldW; //Низ
            else if (lookCommand.dir == "lookup") indx = poz + 1; //Лево
            break;
    }
    var element = field[indx];
    var code = element ? element.code : -1;
    var item = undefined;
    for (var i = 0; i < gameObj.length; i++)
        if (gameObj[i].position == indx) {
            item = gameObj[i];
            break;
        }

    return new gameFieldElement(code, item === undefined ? undefined : item.code); //ВОЗВРЩАЕМ ЭКЗЕМПЛЯР КЛАССА КОТОРЫЙ ПРЕДСТАВЛЯЕТ ЭЛЕМЕНТ
}

//Возвращает массив действий если count > 0 иначе - пустой массив
function checkConditionREPEAT(countBlock, commandsBlock) {
    if (countBlock.count > 0) {
        countBlock.count--;
        return commandsBlock.actions;
    }
    return new Array();
}

//Возвращает массив действий если условие выполнилось, или пустой массив, если условие не выполнилось
function checkConditionIF(blockA, blockB, commandsBlock, elseBlock) {
    if (blockA.name == "whatisit") {
        blockA = checkWhatIsIt(blockA.lookCommand, playerPozition, field, totalWidth, gameObjects, playerFrontSide)
    }
    if (blockB && blockB.length && blockB.length > 0) {//Если условий несколько
        for (var i = 0; i < blockB.length; i++){
            if (blockB[i].code == coinCode) {//Если в условии выбран игровой обьект(монетка и тд)
                if (blockA.itemCode && blockA.itemCode == blockB[i].code)
                    return commandsBlock.actions;
            } else {//Если выбран обьект ландшафта(стены, вход или выход)
                //Парсим в int
                var val = parseInt(blockA.fieldCode);
                val = isNaN(val) ? 0 : val;
                //Если стены внутренние то код элемента 0(Любые стены для нас пока равнозначны)
                if (val > 0 && val < 4)
                    blockA.fieldCode = borderCode;
                if (blockA.fieldCode == blockB[i].code)
                    return commandsBlock.actions;
            }
        }
    }
   
    return elseBlock ? elseBlock.actions : [];
}

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
//isOnComms - флаг для того, чтобы получить команды с передвижением по направлению взгляда
function getAllCommandsMenu(isOnComms) {
    var src = "";
    if(commandsViewMode == "simple"){
        src = ['12348'];
    }
    else if(commandsViewMode == "medium"){
        src = ['12348{}[]'];
    }
    else if(commandsViewMode == "all") {
        src = isOnComms ? ['{}[]12348REI'] : ['12348REI'];
    }
    return getCommandsMenu(src);
}

var getCommandsMenu = function(src){
    var menuItems = [];
    //Генерим структуру меню(по 4 элемента в ряд)
    levels.forStringArray({
            source: src
        },
        function (S, X, Y, W, H) {
            for (var comm in COMMANDS) {

                if (S == COMMANDS[comm].code) {

                    var obj = game.newImageObject({
                        file: COMMANDS[comm].imgSource,
                        x: X,
                        y: Y,
                        w: W,
                        h: H
                    });

                    obj.setUserData({
                        command: getCopyOfObj(COMMANDS[comm]),
                        onClick: function (el) {
                            audio_scroll_click.play();
                            return onChooseCommandClick(el);
                        }
                    });

                    menuItems.push(obj);
                }
            }
        });
    return menuItems;
}

function addDataToCommandsBlock(data) {

    if (lastClickedIndx == -1) return;
    //Получаем последнюю добавленную команду для редактирования
    var itm = field[lastClickedIndx].getTopCommands()[0];
    //Если сейчас редактируется REPEAT или REPEATIF то инициализируем команду COMMANDSBLOCK внутри этой команды массивом DATA
    if (itm.name == "repeat") {
        itm.actions = data;
    }
    if (itm.name == "repeatif") {
        itm.ifBlock.actions = data;
    }

}

//ПЕРЕПИСАТЬ ВЕСЬ КОД КАСАЮЩИЙСЯ ИГРОВЫХ ОБЪЕКТОВ. ОБЬЕДИНИТЬ КОДЫ ИГРОВЫХ ЭЛЕМЕНТОВ С ИХ ГРАФИЧЕСКИМ ОТОБРАЖЕНИЕМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Возвращает список всех объектов игры, доступных для взаимодействия с роботом
function getAllInteractGameObjects(addDeleteComm, commToDelete) {
    var allObj = new Array();
    if (addDeleteComm) {
        //КОМАНДА УДАЛЕНИЯ ЭЛЕМЕНТА
        allObj.push(game.newImageObject({
            file: commandBlockBDeleteImgSrc,
            x: 0,
            y: 0,
            w: 10,
            h: 10
        }));
        allObj[allObj.length - 1].setUserData({
            command: commToDelete,
            onClick: function (el) {
                audio_scroll_click.play();
                return onBlockBDeleteElem(el);
            }
        });
    }
    //СТЕНА
    allObj.push(game.newImageObject({
        file: wallImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: borderCode,
            imgSource: wallImgComm,
            name: "blockB"
        },
        onClick: function (el) {
             audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //МОНЕТКА
    allObj.push(game.newImageObject({
        file: coinImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: coinCode,
            imgSource: coinImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ВЫХОД
    allObj.push(game.newImageObject({
        file: exitImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: exitCode,
            imgSource: exitImgComm,
            name: "blockB"
        },
        onClick: function (el) {
             audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ВХОД
    allObj.push(game.newImageObject({
        file: entryImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: entryCode,
            imgSource: entryImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ДОРОГА
    allObj.push(game.newImageObject({
        file: groundImgComm,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: {
            code: roadCode,
            imgSource: groundImgComm,
            name: "blockB"
        },
        onClick: function (el) {
            audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    return allObj;
}

//ВОЗВРАЩАЕТ МАССИВ ОБЪЕКТОВ ПРЕДСТАВЛЯЮЩИЙ НАПРАВЛЕНИЕ КУДА СМОТРЕТЬ(ДЛЯ КОМАНДЫ WHATISIT)
function getAllDirections() {
    var allObj = new Array();
    //ВЕРХ
    allObj.push(game.newImageObject({
        file: COMMANDS[18].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[18],
        onClick: function (el) {
             audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //НИЗ
    allObj.push(game.newImageObject({
        file: COMMANDS[19].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[19],
        onClick: function (el) {
             audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ЛЕВО
    allObj.push(game.newImageObject({
        file: COMMANDS[20].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[20],
        onClick: function (el) {
            audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ПРАВО
    allObj.push(game.newImageObject({
        file: COMMANDS[21].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[21],
        onClick: function (el) {
             audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    //ПОД НОГАМИ(ЦЕНТР)
    allObj.push(game.newImageObject({
        file: COMMANDS[22].imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[allObj.length - 1].setUserData({
        command: COMMANDS[22],
        onClick: function (el) {
            audio_scroll_click.play();
            return onChooseCommandClick(el);
        }
    });
    return allObj;
}

//Возвращает набор изображений для заполнения команды REPEAT
function getRepeatScrollBarPattern(state, currentCountCommand) {
    var allObj = new Array();
    //Команда для счетчика
    allObj.unshift(game.newImageObject({
        file: currentCountCommand.countBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentCountCommand.countBlock)
    });
    if (state == 3) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentCountCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentCountCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

//Возвращает набор изображений для заполнения команды REPEATIF
function getRepeatIFScrollBarPattern(state, currentIFCommand) {
    var allObj = new Array();
    //blockA
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockA.name == "whatisit" ? currentIFCommand.blockA.lookCommand.imgSource : currentIFCommand.blockA.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockA)
    });
    if (state == 1) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //blockB
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockB.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockB)
    });
    if (state == 2) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

//Возвращает набор изображений для заполнения команды IF
function getIFScrollBarPattern(state, currentIFCommand) {
    var allObj = new Array();
    //blockA
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockA.name == "whatisit" ? currentIFCommand.blockA.lookCommand.imgSource : currentIFCommand.blockA.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockA)
    });
    if (state == 1) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //blockB
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.blockB.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.blockB)
    });
    if (state == 2) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.commandsBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.commandsBlock)
    });
    if (state == 4) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    //Блок команд ИНАЧЕ
    allObj.unshift(game.newImageObject({
        file: currentIFCommand.elseBlock.imgSource,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: getCopyOfObj(currentIFCommand.elseBlock)
    });
    if (state == 5) allObj[0].setAlpha(0.6); //allObj[0].strokeWidth = 100;
    return allObj;
}

function getDigitKeyboardImages() {
    var allObj = new Array();
    //Числа от 1 до 9
    for (var i = 1; i < 10; i++) {
        allObj.unshift(game.newImageObject({
            file: commandDigitsImgSrc[i],
            x: 0,
            y: 0,
            w: 10,
            h: 10
        }));
        allObj[0].setUserData({
            command: {
                name: "digit",
                value: i
            },
            onClick: function (el) {
                audio_scroll_click.play();
                return onKeyboardClick(el);
            }
        });
    }
    //0
    allObj.unshift(game.newImageObject({
        file: commandDigitsImgSrc[0],
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: {
            name: "digit",
            value: 0
        },
        onClick: function (el) {
             audio_scroll_click.play();
            return onKeyboardClick(el);
        }
    });
    //backspace
    allObj.unshift(game.newImageObject({
        file: commandBackspaceImgSrc,
        x: 0,
        y: 0,
        w: 10,
        h: 10
    }));
    allObj[0].setUserData({
        command: {
            name: "backspace"
        },
        onClick: function (el) {
             audio_scroll_click.play();
            return onKeyboardClick(el);
        }
    });
    return allObj;
}

function getCommandsImgArr(allCommands) {
    var result = [];

    OOP.forArr(allCommands, function (comm) {

        var obj = game.newImageObject({
            file: comm.imgSource,
            x: 0,
            y: 0,
            w: 15,
            h: 15
        });

        obj.setUserData({
            command: comm
        });
        result.push(obj);
    });
    return result;
}

//Возвращает копию обьекта
function getCopyOfObj(obj) {
    return _.cloneDeep(obj);
}
