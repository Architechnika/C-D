/*
Содержит методы и данные для алгоритмической части игры.
Описание алгоритмических блоков, используемых для построения алгоритма прохождения лабиринта
*/


//ОПИСАНИЕ ВСЕХ ВОЗМОЖНЫХ КОМАНД
 var COMMANDS = new Array();
  //ПРОСТЫЕ КОМАНДЫ ДЛЯ ДЕЙСТВИЙ
   COMMANDS.push({ code : '0', name : "none", imgSource : "img/commands/none.png", undeletable : false});
   COMMANDS.push({ code : '1', name : "up", imgSource : "img/commands/up.png",undeletable : false});
   COMMANDS.push({ code : '2', name : "down", imgSource : "img/commands/down.png", undeletable : false});
   COMMANDS.push({ code : '3', name : "left", imgSource : "img/commands/left.png", undeletable : false});
   COMMANDS.push({ code : '4', name : "right", imgSource : "img/commands/right.png", undeletable : false});
   COMMANDS.push({ code : '5', name : "clockwise", imgSource : "img/commands/clockwise.png", undeletable : false});
   COMMANDS.push({ code : '6', name : "unclockwise", imgSource : "img/commands/unclockwise.png", undeletable : false});
   COMMANDS.push({ code : '8', name : "pickup"     , imgSource: "img/commands/pickup.png", undeletable : false});
   COMMANDS.push({ code : '9', name : "drop", imgSource: "img/commands/drop.png", undeletable : false});
   COMMANDS.push({ code : 'C', name : "commandsblock", imgSource : "img/commands/commandsblock.png", actions : [], undeletable : false});//БЛОК СОДЕРЖАЩИЙ СПИСОК КОМАНД
   
   //БЛОК КОТОРЫЙ ОПРЕДЕЛЯЕТ ЧТО НАХОДИТСЯ ПЕРЕД РОБОТОМ
   COMMANDS.push({ code : 'W', name : "whatisit", imgSource : "img/commands/whatisit.png", //[10]
    //Возвращает объект, находящийся с лицевой стороны робота
    checkWhatIsIt : function(lookCommand,poz,field,fieldW,gameObj, orient){//gameObj - игровой объект на этой клетке(монетка, батарейка и тд)
       var indx = poz;//Если передали неправильное направление, то просто возращаем объект на котором стоим
       switch (orient) {
           case 0://ЕСЛИ ИГРОК СМОТРИТ ВВЕРХ
               if (lookCommand.name == "lookup") indx = poz + fieldW;//Верх
               else if (lookCommand.name == "lookright") indx = poz - 1;//Право
               else if (lookCommand.name == "lookdown") indx = poz - fieldW;//Низ
               else if (lookCommand.name == "lookleft") indx = poz + 1;//Лево
               break;
           case 1://ЕСЛИ ИГРОК СМОТРИТ ВПРАВО
               if (lookCommand.name == "lookleft") indx = poz + fieldW;//Верх
               else if (lookCommand.name == "lookup") indx = poz - 1;//Право
               else if (lookCommand.name == "lookright") indx = poz - fieldW;//Низ
               else if (lookCommand.name == "lookdown") indx = poz + 1;//Лево
               break;
           case 2://ЕСЛИ ИГРОК СМОТРИТ ВНИЗ
               if (lookCommand.name == "lookdown") indx = poz + fieldW;//Верх
               else if (lookCommand.name == "lookleft") indx = poz - 1;//Право
               else if (lookCommand.name == "lookup") indx = poz - fieldW;//Низ
               else if (lookCommand.name == "lookright") indx = poz + 1;//Лево
               break;
           case 3://ЕСЛИ ИГРОК СМОТРИТ НАЛЕВО
               if (lookCommand.name == "lookright") indx = poz + fieldW;//Верх
               else if (lookCommand.name == "lookdown") indx = poz - 1;//Право
               else if (lookCommand.name == "lookleft") indx = poz - fieldW;//Низ
               else if (lookCommand.name == "lookup") indx = poz + 1;//Лево
               break;
       }
       var element = field[indx];
       var item = undefined;
       for (var i = 0; i < gameObj.length; i++)
           if (gameObj[i].position == indx) {
               item = gameObj[i];
               break;
           }

       return new gameFieldElement(element.code,item === undefined ? undefined : item.code);//ВОЗВРЩАЕМ ЭКЗЕМПЛЯР КЛАССА КОТОРЫЙ ПРЕДСТАВЛЯЕТ ЭЛЕМЕНТ
       
    }, lookCommand : undefined, undeletable : false});
      
    //БЛОК УСЛОВИЯ, if(blockA == blockC) {actions}
     COMMANDS.push({ code : 'I', name : "if", imgSource : "img/commands/if.png",//[11]
      blockA : "0", blockB : "0", result : true, commandsBlock : undefined, 
      //Возвращает массив действий если условие выполнилось, или пустой массив, если условие не выполнилось
      checkCondition: function (blockA, blockB, commandsBlock) {
          if (blockA.name == "whatisit") {
              blockA = blockA.checkWhatIsIt(blockA.lookCommand, playerPozition,field,totalWidth,gameObjects, playerFrontSide)
          }
          //У нас стены не только внешние, но и внутренние
         // blockA.code = blockB.code > 0 && blockB.code < 4 ? borderCode : blockB.code;
          if (blockB.code == coinCode) {
              if (blockA.itemCode === undefined) return [];
              else if (blockA.itemCode == blockB.code) return commandsBlock;
          }
          else {
            blockA.fieldCode = blockA.fieldCode > 0 && blockA.fieldCode < 4 ? borderCode : blockA.fieldCode;
            if (blockA.fieldCode == blockB.code) return commandsBlock;
          }
       return new Array();
      }
     , undeletable : false});
     
      //БЛОК ПОВТОРЕНИЯ, ПОВТОРЯЕТ действия actions count раз 
     COMMANDS.push({ code : 'R', name : "repeat", imgSource: "img/commands/repeat.png", countBlock : undefined, commandsBlock : undefined, //[12]
      //Возвращает массив действий если count > 0 иначе - пустой массив
      checkCondition : function(counter,commandsBlock){
        if(counter.count > 0){
          counter.count--;
          return commandsBlock.actions;
        }
        return new Array();
      }
     });
     
     //БЛОК ВЫОЛНЯЮЩИЙ ДЕЙСТВИЕ ЕСЛИ ВЫПОЛНИТСЯ УСЛОВИЕ
     COMMANDS.push({ code : 'E', name : "repeatif", imgSource : "img/commands/repeatif.png", ifBlock : null,//[13]
      //Возвращает массив действий если выполнилось условие ifBlock иначе - пустой массив
      checkCondition : function(ifBlc){
            if(ifBlc !== undefined){
              var actions = ifBlc.checkCondition(ifBlc.blockA,ifBlc.blockB,ifBlc.commandsBlock).actions;
              if(actions !== undefined && actions.length != 0)
                return actions;
            }
            return [];
      },
     undeletable : false});//БЛОК ПОВТОРЯЮЩИЙ actions пока ifBlock.result == true

    //ВСПОМОГАТЕЛЬНЫЕ КОМАНДЫ, ДЛЯ СЛОЖНЫХ КОМАНД
    COMMANDS.push({ code : 'A', name : "blockA", imgSource : "img/commands/blockA.png", undeletable : true});//[14]
    COMMANDS.push({ code : 'B', name : "blockB", imgSource : "img/commands/blockB.png", undeletable : true});//[15]
    COMMANDS.push({ code : 'K', name : "counter", imgSource : "img/commands/counter.png", count : 0, undeletable : true});//[16]
    COMMANDS.push({ code : 'O', name : "ok", imgSource : "img/commands/ok.png", undeletable : true});//[17]
    //Команды для того чтобы определять направление
    COMMANDS.push({ code : 'Z', name : "lookup", imgSource : "img/commands/lookup.png", undeletable : true});//[18]
    COMMANDS.push({ code : 'X', name : "lookdown", imgSource : "img/commands/lookdown.png", undeletable : true});//[19]
    COMMANDS.push({ code : 'L', name : "lookleft", imgSource : "img/commands/lookleft.png", undeletable : true});//[20]
    COMMANDS.push({ code : 'V', name : "lookright", imgSource : "img/commands/lookright.png", undeletable : true});//[21]
	COMMANDS.push({ code : 'Z', name : "lookcenter", imgSource : "img/commands/lookcenter.png", undeletable : true});//[22]
    //ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ IF
    COMMANDS[11].blockA = COMMANDS[14];
    COMMANDS[11].blockB = COMMANDS[15];
    COMMANDS[11].commandsBlock = COMMANDS[9];
    //ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ REPEAT
    COMMANDS[12].countBlock = COMMANDS[16]
    COMMANDS[12].commandsBlock = COMMANDS[9];
    //ИНИЦИАЛИЗИРУЕМ ШАБЛОН КОМАНДЫ repeatIF
    COMMANDS[13].ifBlock = COMMANDS[11];

var wallImgComm = "img/commands/wall.png";
var coinImgComm = "img/commands/coin.png";
var exitImgComm = "img/commands/exit.png";
var entryImgComm = "img/commands/entry.png";
var groundImgComm = "img/commands/road.png";

function gameFieldElement(fCode,iCode){
  this.fieldCode = fCode;
  this.itemCode = iCode;
}

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
function getAllCommandsMenu(OneW,OneH){
  
  var menuItems = [];
  //Генерим структуру меню(по 4 элемента в ряд)
  levels.forStringArray({w : OneW, h : OneH, source : ['129348RE']},//,'456789','CWRIE']},
  function (S,X,Y,W,H)
  {
    for (var comm in COMMANDS){
      
      if(S == COMMANDS[comm].code){ 
        
        var obj = game.newImageObject({
          file : COMMANDS[comm].imgSource,
          x : X, 
          y : Y,
          w : W, 
          h : H
          });
          
          obj.setUserData({
            command : COMMANDS[comm]
          });
          
        menuItems.push(obj);
      }
    }
  });
  return menuItems;
}

function addDataToCommandsBlock(data){
  
  if(lastClickedIndx == -1) return;
  //Получаем последнюю добавленную команду для редактирования
  var itm = field[lastClickedIndx].getTopCommands()[0];
  //Если сейчас редактируется REPEAT или REPEATIF то инициализируем команду COMMANDSBLOCK внутри этой команды массивом DATA
  if(itm.name == "repeat"){
    itm.actions = data;
  }
  if(itm.name == "repeatif"){
    itm.ifBlock.actions = data;
  }
  
}

//ПЕРЕПИСАТЬ ВЕСЬ КОД КАСАЮЩИЙСЯ ИГРОВЫХ ОБЪЕКТОВ. ОБЬЕДИНИТЬ КОДЫ ИГРОВЫХ ЭЛЕМЕНТОВ С ИХ ГРАФИЧЕСКИМ ОТОБРАЖЕНИЕМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Возвращает список всех объектов игры, доступных для взаимодействия с роботом
function getAllInteractGameObjects(){
  var allObj = new Array();
  //СТЕНА
  allObj.push(game.newImageObject({
    file : wallImgComm,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : borderCode,
    imgSource : wallImgComm,
    name : "blockB"
  });
  //МОНЕТКА
  allObj.push(game.newImageObject({
    file : coinImgComm,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : coinCode,
    imgSource : coinImgComm,
    name : "blockB"
  });
  //ВЫХОД
  allObj.push(game.newImageObject({
    file : exitImgComm,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : exitCode,
    imgSource : exitImgComm,
    name : "blockB"
  });
  //ВХОД
  allObj.push(game.newImageObject({
    file : entryImgComm,
    x : 0, y : 0, w : 10, h : 10  
  }));
  allObj[allObj.length - 1].setUserData({
    code : entryCode,
    imgSource : entryImgComm,
    name : "blockB"
  });
  //ДОРОГА
  allObj.push(game.newImageObject({
    file : groundImgComm,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : roadCode,
    imgSource : groundImgComm,
    name : "blockB"
  });
  
  return allObj;
}

//ВОЗВРАЩАЕТ МАССИВ ОБЪЕКТОВ ПРЕДСТАВЛЯЮЩИЙ НАПРАВЛЕНИЕ КУДА СМОТРЕТЬ(ДЛЯ КОМАНДЫ WHATISIT)
function getAllDirections(){
  var allObj = new Array();
  //ВЕРХ
  allObj.push(game.newImageObject({
    file : COMMANDS[18].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    command : COMMANDS[18]
  });
  //НИЗ
  allObj.push(game.newImageObject({
    file : COMMANDS[19].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    command : COMMANDS[19]
  });
  //ЛЕВО
  allObj.push(game.newImageObject({
    file : COMMANDS[20].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    command : COMMANDS[20]
  });
  //ПРАВО
  allObj.push(game.newImageObject({
    file : COMMANDS[21].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    command : COMMANDS[21]
  });
  //ПОД НОГАМИ(ЦЕНТР)
  allObj.push(game.newImageObject({
    file : COMMANDS[22].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    command : COMMANDS[22]
  });
  return allObj;
}

//Возвращает набор изображений для заполнения команды REPEAT
function getRepeatScrollBarPattern(state, currentCountCommand){
  var allObj = new Array();
  //Команда для счетчика
  allObj.unshift(game.newImageObject({
    file : currentCountCommand.countBlock.imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : currentCountCommand.countBlock
  });
  if(state == 3) allObj[0].setAlpha(0.6);//allObj[0].strokeWidth = 100;
  //Блок команд
  allObj.unshift(game.newImageObject({
    file : currentCountCommand.commandsBlock.imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : currentCountCommand.commandsBlock
  });
  if(state == 4) allObj[0].setAlpha(0.6);//allObj[0].strokeWidth = 100;
  /*//Кнопка ОК
  allObj.unshift(game.newImageObject({
    file : COMMANDS[17].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[17]
  });*/
  return allObj;
}

//Возвращает набор изображений для заполнения команды REPEATIF
function getRepeatIFScrollBarPattern(state, currentIFCommand){
  var allObj = new Array();
  //blockA
  allObj.unshift(game.newImageObject({
    file : currentIFCommand.ifBlock.blockA.name == "whatisit" ? currentIFCommand.ifBlock.blockA.lookCommand.imgSource : currentIFCommand.ifBlock.blockA.imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : currentIFCommand.ifBlock.blockA
  });
  if(state == 1) allObj[0].setAlpha(0.6);//allObj[0].strokeWidth = 100;
  //blockB
  allObj.unshift(game.newImageObject({
    file : currentIFCommand.ifBlock.blockB.imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : currentIFCommand.ifBlock.blockB
  });
  if(state == 2) allObj[0].setAlpha(0.6);//allObj[0].strokeWidth = 100;
  //Блок команд
  allObj.unshift(game.newImageObject({
    file : currentIFCommand.ifBlock.commandsBlock.imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : currentIFCommand.ifBlock.commandsBlock
  });
  if(state == 4) allObj[0].setAlpha(0.6);//allObj[0].strokeWidth = 100;
 /* //Кнопка ОК
  allObj.unshift(game.newImageObject({
    file : COMMANDS[17].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[17]
  });*/
  return allObj;
}

function getDigitKeyboardImages(){
  var allObj = new Array();
  //Числа от 1 до 9
  for(var i = 0 ; i < 9; i++){
    allObj.unshift(game.newImageObject({
      file : "img/commands/digit" + (i + 1) + ".png",
      x : 0, y : 0, w : 10, h : 10
    }));
    allObj[0].setUserData({
      command : i + 1
    });
  }
  //0
  allObj.unshift(game.newImageObject({
      file : "img/commands/digit0.png",
      x : 0, y : 0, w : 10, h : 10
    }));
    allObj[0].setUserData({
      command : 0
    });
  //backspace
  allObj.unshift(game.newImageObject({
    file : "img/commands/backspace.png",
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : "backspace"
  });
  return allObj;
}

function getCommandsImgArr(allCommands){
    var result = [];

    OOP.forArr(allCommands,function(comm){
      
      var obj = game.newImageObject({
          file : comm.imgSource,
          x : 0,
          y : 0,
          w : 15, 
          h : 15
          });
          
       obj.setUserData({
          command : comm
       });
       result.push(obj);
    });
    return result;
}

//Возвращает копию обьекта
function getCopyOfObj(obj){
	var factory = FastClone.factory(obj);
	return new factory(obj);
    return obj;
}
