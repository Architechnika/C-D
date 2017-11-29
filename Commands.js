/*
Содержит методы и данные для алгоритмической части игры.
Описание алгоритмических блоков, используемых для построения алгоритма прохождения лабиринта
*/

//Описание всех возможных комманд для прохождения лабиринта
 var COMMANDS = {
     NONE : { code : '0', name : "none", imgSource : "img/commands/none.png"},
     UP : { code : '1', name : "up", imgSource : "img/commands/up.png"},
     DOWN : { code : '2', name : "down", imgSource : "img/commands/down.png"},
     LEFT : { code : '3', name : "left", imgSource : "img/commands/left.png"},
     RIGHT : { code : '4', name : "right", imgSource : "img/commands/right.png"},
     CLOCKWISE : { code : '5', name : "clockwise", imgSource : "img/commands/clockwise.png"},
     UNCLOCKWISE : { code : '6', name : "unclockwise", imgSource : "img/commands/unclockwise.png"},
     STOP : { code : '7', name : "stop", imgSource: "img/commands/stop.png"},
     PICKUP : { code : '8', name : "pickup", imgSource: "img/commands/pickup.png"},
     DROP : { code : '9', name : "drop", imgSource: "img/commands/drop.png"}
};

function getCommandByString(commStr){
  for (var comm in COMMANDS){
    if(comm == commStr)
      return comm;
  }
}

//Программное представление команд
function oneCommand(imageSource, currCommand){
  this.image = imageSource;
  this.command = currCommand;
}

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
function getAllCommandsMenu(OneW,OneH){
  
  var menuItems = [];
  //Генерим структуру меню(по 4 элемента в ряд)
  levels.forStringArray({w : OneW, h : OneH, source : ['1234','5670']},
  function (S,X,Y,W,H)
  {
    for (var comm in COMMANDS){
      
      if(S == COMMANDS[comm].code){
        //alert("INcommands we have: " + COMMANDS[comm].imgSource + " with code: " + COMMANDS[comm].code)
        menuItems.push(new oneCommand(game.newImageObject({
          file : COMMANDS[comm].imgSource,
          x : X, 
          y : Y,
          w : W, 
          h : H
          }),COMMANDS[comm]));
      }
    }
  }); 
  return menuItems;
}