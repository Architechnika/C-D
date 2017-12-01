/*
Содержит методы и данные для алгоритмической части игры.
Описание алгоритмических блоков, используемых для построения алгоритма прохождения лабиринта
*/

//ОПИСАНИЕ ВСЕХ ВОЗМОЖНЫХ КОМАНД
 var COMMANDS = new Array();
    //ПРОСТЫЕ КОМАНДЫ ДЛЯ ДЕЙСТВИЙ
     COMMANDS.push({ code : '0', name : "none", imgSource : "img/commands/none.png"});
     COMMANDS.push({ code : '1', name : "up", imgSource : "img/commands/up.png",});
     COMMANDS.push({ code : '2', name : "down", imgSource : "img/commands/down.png"});
     COMMANDS.push({ code : '3', name : "left", imgSource : "img/commands/left.png"});
     COMMANDS.push({ code : '4', name : "right", imgSource : "img/commands/right.png"});
     COMMANDS.push({ code : '5', name : "clockwise", imgSource : "img/commands/clockwise.png"});
     COMMANDS.push({ code : '6', name : "unclockwise", imgSource : "img/commands/unclockwise.png"});
     COMMANDS.push({ code : '7', name : "stop", imgSource: "img/commands/stop.png"});
     COMMANDS.push({ code : '8', name : "pickup", imgSource: "img/commands/pickup.png"});
     COMMANDS.push({ code : '9', name : "drop", imgSource: "img/commands/drop.png"});
     COMMANDS.push({ code : 'C', name : "commandsblock", imgSource : "img/commands/commandsblock.png", actions : []});//БЛОК СОДЕРЖАЩИЙ СПИСОК КОМАНД
     
     //БЛОК КОТОРЫЙ ОПРЕДЕЛЯЕТ ЧТО НАХОДИТСЯ ПЕРЕД РОБОТОМ
     COMMANDS.push({ code : 'W', name : "whatisit", imgSource : "img/commands/whatisit.png", 
      //Возвращает объект, находящийся с лицевой стороны робота
      checkWhatIsIt : function(direction,poz,field,fieldW){
         if(direction == 0) return field[poz + fieldW];//Верх
         else if(direction == 1) return field[poz - 1];//Право
         else if(direction == 2) return field[poz - fieldW];//Низ
         else if(direction == 3) return field[poz + 1];//Лево
         return field[poz];//Если передали неправильное направление, то просто возращаем объект на котором стоим
      }});
      
     //БЛОК ПОВТОРЕНИЯ, ПОВТОРЯЕТ действия actions count раз 
     COMMANDS.push({ code : 'R', name : "repeat", imgSource: "img/commands/repeat.png", count : 0, actions : [], 
      //Возвращает массив блоков действия, actions count раз
      getAllActions : function(){
        var allActions = [];
        for(var i = 0 ; i < count; i++){
          for(var j = 0; j < actions.length; j++){
            allActions.push(actions[j]);
          }
        }
      }});
      
    //БЛОК УСЛОВИЯ, if(blockA condition blockC) {actions}
     COMMANDS.push({ code : 'I', name : "if", imgSource : "img/commands/if.png",
      ALLCONDITIONS : { 
        EQUAL : {  name : "equal", imgSource : "img/commands/equal.png" }, 
        NOEQUAL : { name : "noequal", imgSource : "img/commands/noequal.png"} },//МАССИВ ЭЛЕМЕНТОВ ДЛЯ ОПЕРАЦИЙ
      blockA : "0", condition : null, blockC : "0", result : true, actions : [], 
      //Возвращает результат выполнения условия
      checkCondition : function(){
        if((condition.name == this.ALLCONDITIONS.EQUAL.name) &&  (blockA == blockC)) return true;// ==
        else if((condition.name == this.ALLCONDITIONS.NOEQUAL.name) && (blockA != blockC)) return true;// !=
        return false;
      },
      //Возвращает массив действий если условие выполнилось, или пустой массив, если условие не выполнилось
      doIfStatement : function(){
        if(this.checkCondition()) return actions;
       return [];
      }
     });
     
     //БЛОК ВЫОЛНЯЮЩИЙ ДЕЙСТВИЕ ЕСЛИ ВЫПОЛНИТСЯ УСЛОВИЕ
     COMMANDS.push({ code : 'E', name : "repeatif", imgSource : "img/commands/repeatif.png", ifBlock : null, actions : []});//БЛОК ПОВТОРЯЮЩИЙ actions пока ifBlock.result == true


/*function getCommandByString(commStr){
  for (var comm in COMMANDS){
    if(comm == commStr)
      return comm;
  }
}*/

//Возвращает массив классов oneCommandMenuElement, содержащий картинку команды и её код
function getAllCommandsMenu(OneW,OneH){
  
  var menuItems = [];
  //Генерим структуру меню(по 4 элемента в ряд)
  levels.forStringArray({w : OneW, h : OneH, source : ['123489CW','5670RIE']},//,'456789','CWRIE']},
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