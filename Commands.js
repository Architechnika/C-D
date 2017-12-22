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
   COMMANDS.push({ code : 'W', name : "whatisit", imgSource : "img/commands/whatisit.png", 
    //Возвращает объект, находящийся с лицевой стороны робота
    checkWhatIsIt : function(direction,poz,field,fieldW,gameObj){
       var indx = poz;//Если передали неправильное направление, то просто возращаем объект на котором стоим
       if(direction == 0) indx = poz + fieldW;//Верх
       else if(direction == 1) indx = poz - 1;//Право
       else if(direction == 2) indx = poz - fieldW;//Низ
       else if(direction == 3) indx = poz + 1;//Лево
       var element = field[indx];
       var item = gameObj !== undefined && gameObj.length > indx ? gameObj[indx] : undefined;
       
       return new gameFieldElement(element.code,item.code);//ВОЗВРЩАЕМ ЭКЗЕМПЛЯР КЛАССА КОТОРЫЙ ПРЕДСТАВЛЯЕТ ЭЛЕМЕНТ
       
    }, undeletable : false});
      
    //БЛОК УСЛОВИЯ, if(blockA == blockC) {actions}
     COMMANDS.push({ code : 'I', name : "if", imgSource : "img/commands/if.png",
      blockA : "0", blockB : "0", result : true, actions : [], 
      //Возвращает массив действий если условие выполнилось, или пустой массив, если условие не выполнилось
      checkCondition : function(){
        if(blockA == blockB) return actions;
       return [];
      }
     , undeletable : false});
     
      //БЛОК ПОВТОРЕНИЯ, ПОВТОРЯЕТ действия actions count раз 
     COMMANDS.push({ code : 'R', name : "repeat", imgSource: "img/commands/repeat.png", count : 0, actions : [], 
      //Возвращает массив действий если count > 0 иначе - пустой массив
      checkCondition : function(){
        if(count > 0){
          count--;
          return action;
        }
        return [];
      }
     });
     
     //БЛОК ВЫОЛНЯЮЩИЙ ДЕЙСТВИЕ ЕСЛИ ВЫПОЛНИТСЯ УСЛОВИЕ
     COMMANDS.push({ code : 'E', name : "repeatif", imgSource : "img/commands/repeatif.png", ifBlock : null,
      //Возвращает массив действий если выполнилось условие ifBlock иначе - пустой массив
      checkCondition : function(){
            if(ifBlock !== undefined){
              var actions = ifBlock.checkCondition();
              if(actions.length == 0) return [];
              return actions;
            }
      },
     undeletable : false});//БЛОК ПОВТОРЯЮЩИЙ actions пока ifBlock.result == true

    //ВСПОМОГАТЕЛЬНЫЕ КОМАНДЫ, ДЛЯ СЛОЖНЫХ КОМАНД
    COMMANDS.push({ code : 'A', name : "blockA", imgSource : "img/commands/blockA.png", undeletable : true});
    COMMANDS.push({ code : 'B', name : "blockB", imgSource : "img/commands/blockB.png", undeletable : true});
    COMMANDS.push({ code : 'K', name : "counter", imgSource : "img/commands/counter.png", undeletable : true});
    COMMANDS.push({ code : 'O', name : "ok", imgSource : "img/commands/ok.png", undeletable : true});

function gameFieldElement(fCode,iCode){
  this.fieldCode = fCode;
  this.itemCode = iCode;
}

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
function getAllCommandsMenu(OneW,OneH){
  
  var menuItems = [];
  //Генерим структуру меню(по 4 элемента в ряд)
  levels.forStringArray({w : OneW, h : OneH, source : ['12956348RE']},//,'456789','CWRIE']},
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
    file : bordersPath,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : borderCode
  });
  //МОНЕТКА
  allObj.push(game.newImageObject({
    file : coinPath,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : coinCode
  });
  //ВЫХОД
  allObj.push(game.newImageObject({
    file : exitPath,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : exitCode
  });
  //ВХОД
  allObj.push(game.newImageObject({
    file : entryPath,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : entryCode
  });
  //ДОРОГА
  allObj.push(game.newImageObject({
    file : roadPath,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : roadCode
  });
  
  return allObj;
}

//ВОЗВРАЩАЕТ МАССИВ ОБЪЕКТОВ ПРЕДСТАВЛЯЮЩИЙ НАПРАВЛЕНИЕ КУДА СМОТРЕТЬ(ДЛЯ КОМАНДЫ WHATISIT)
function getAllDirections(){
  var allObj = new Array();
  //ВЕРХ
  allObj.push(game.newImageObject({
    file : COMMANDS[1].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : 0
  });
  //НИЗ
  allObj.push(game.newImageObject({
    file : COMMANDS[2].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : 2
  });
  //ЛЕВО
  allObj.push(game.newImageObject({
    file : COMMANDS[3].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : 3
  });
  //ПРАВО
  allObj.push(game.newImageObject({
    file : COMMANDS[4].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[allObj.length - 1].setUserData({
    code : 1
  });
  return allObj;
}

//Возвращает набор изображений для заполнения команды REPEAT
function getRepeatScrollBarPattern(state){
  var allObj = new Array();
  //Команда для счетчика
  allObj.unshift(game.newImageObject({
    file : COMMANDS[16].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[16]
  });
  if(state == 1) allObj[0].strokeWidth = 100;
  //Блок команд
  allObj.unshift(game.newImageObject({
    file : COMMANDS[9].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[9]
  });
  if(state == 2) allObj[0].strokeWidth = 100;
  //Кнопка ОК
  allObj.unshift(game.newImageObject({
    file : COMMANDS[17].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[17]
  });
  return allObj;
}

//Возвращает набор изображений для заполнения команды REPEATIF
function getIFScrollBarPattern(state){
  var allObj = new Array();
  //blockA
  allObj.unshift(game.newImageObject({
    file : COMMANDS[14].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[14]
  });
  if(state == 1) allObj[0].strokeWidth = 100;
  //blockB
  allObj.unshift(game.newImageObject({
    file : COMMANDS[15].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[15]
  });
  if(state == 2) allObj[0].strokeWidth = 100;
  //Блок команд
  allObj.unshift(game.newImageObject({
    file : COMMANDS[9].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[9]
  });
  if(state == 3) allObj[0].strokeWidth = 100;
  //Кнопка ОК
  allObj.unshift(game.newImageObject({
    file : COMMANDS[17].imgSource,
    x : 0, y : 0, w : 10, h : 10
  }));
  allObj[0].setUserData({
    command : COMMANDS[17]
  });
  return allObj;
}



