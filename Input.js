/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false;//Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isDowned = false;//Флаг того, что пользователь нажал на один из скролов и держит
var isScrollMove = false;//Флаг для того, чтобы отличать скролл от тапа
var clickCoord = new point(0,0);

//Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var yMovedItem = new point(-1,-1);
//Отменяем вывод контестного меню на страничке
document.oncontextmenu = function (){return false};

//Функция инициализации обработчиков ввода пользователя
function initInputEvents(){
    addEventListener("mouseup",onMouseUP);
    addEventListener("wheel",onWheel);
    addEventListener("touchstart",onTouchStart);
    addEventListener("touchend",onTouchEnd);
    addEventListener("touchmove",onTouchMove);
}

//Удаляем обработчики ввода пользователя со странички
function removeInputEvents(){
    removeEventListener("mouseup",onMouseUP);
    removeEventListener("wheel",onWheel);
    removeEventListener("touchstart",onTouchStart);
    removeEventListener("touchend",onTouchEnd);
    removeEventListener("touchmove",onTouchMove);
}

//Обработчики для событий ввода --------------------
function onMouseUP(e){
    e.cancelBubble = true;
    onUp(e);
}
function onWheel(e){
    onMove(e);
}
function onTouchStart(e){
    clickCoord.x = e.changedTouches[0].clientX;
    clickCoord.y = e.changedTouches[0].clientY;
}
function onTouchEnd(e){
    clickCoord.x = 0;
    clickCoord.y = 0;
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    onUp(e);
}
function onTouchMove(e){
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    onMove(e);
    clickCoord.x = e.x;
    clickCoord.y = e.y;
}
//------------------------------------------------
//Обработчик клика тачем или мышкой
function onUp(e){
    var canProcessOther = true;//Флаг для регулирования обработки(только скролл или все остальное)
    //ЕСЛИ ОТКРЫТ ИНТЕРФЕЙС ВВОДА КОМАНД(ОБРАБАТЫВАЕМ СКРОЛЫ)
    if(lastClickedIndx !== -1){
        OOP.forArr(Scrolls, function(scroll){
            if(isMobile){//Если есть тач
                //Если пользователь начал сдвигать элемент из нижнего скрола чтобы удалить
                if(scroll.name == "DOWN" && yMovedItem.x != -1){
                  //Если элемент вытащили за пределы фона скрола, то удаляем его из списка
                  if(!scroll.getItem(yMovedItem.x).isIntersect(scroll.GetBackGround())){
                    //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД(ПОКА ВСЕГДА 0ой массив команд в стеке, потом их будет несколько)
                    removeCommandFromCell(0,yMovedItem.x);
                  }
                  else{//ВОЗВРАЩАЕМ ЕГО К ИСХОДНОМУ СОСТОЯНИЮ
                    var elem = scroll.getItem(yMovedItem.x)
                    elem.y = yMovedItem.y;
                    elem.setAlpha(1)
                  }
                  //Очищаем буфер для объекта который сдвигали
                  yMovedItem = new point(-1,-1);
                  canProcessOther = false;
                }//ЭТО ЕСЛИ НАЖАЛИ НА НИЖНИЙ СКРОЛЛ, ЧТОБЫ ВЫБРАТЬ КОМАНДУ
                else if(scroll.name == "DOWN" && clickIsInObj(e.x,e.y,scroll.GetBackGround()) && scrollSpeed.y == 0 && (inputCommandStates == 0 || inputCommandStates == 4)){
                  var itm = scroll.getArrayItems();
                    if(itm !== undefined){
                    OOP.forArr(itm,function(el,i){
                        if (clickIsInObj(e.x,e.y,el)) {
                            if (el.command.name == "repeatif" || el.command.name == "repeat") {
                                var elL = field[lastClickedIndx].getTopCommands().length;
                                if (menuStatesArr.length !== 0) {
                                    elL = el.command.name == "repeat" ? menuStatesArr[0].commandsBlock.length : menuStatesArr[0].ifBlock.commandsBlock.length;
                                }
                                choosenCommandInElement = elL - 1 - i;
                                addCommandToCell(el, true, true);
                            }
                      }
                    })
                    }
                }

                //ОРАБОТКА СКРОЛЛА ВЫБОРА КОМАНД
                if(clickIsInObj(e.x,e.y,scroll.GetBackGround())){
                  if(scroll.name == "RIGHT"){//ПРАВЫЙ СКРОЛЛ ВВОДА ПРОСТЫХ КОМАНД
                    //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
                    if(true){//!isScrollMove){
                      //var pos = touch.getPosition();
                      //Определяем на какой элемент он КЛИКНУЛ
                      OOP.forArr(scroll.getArrayItems(), function(el){
                          if(clickIsInObj(e.x,e.y,el)){
                            //ОБРАБАТЫВАЕМ КЛИК 
                            addCommandToCell(el);
                          }
                      });
                    }
                    //По дефолту считаем что пользователь не будет скролить
                    isScrollMove = false;
                    return;
                  }
                }

                //ОБРАБОТЧИК ЛЕВОГО СКРОЛА - РЕДАКТОР СЛОЖНЫХ КОМАНД
                if(scroll.name == "LEFT" && clickIsInObj(e.x,e.y,scroll.GetBackGround())){
                  var elems = scroll.getArrayItems();
                  if(elems !== undefined && elems.length > 0){
                    if(!isScrollMove){
                      //var pos = touch.getPosition();
                      //Определяем на какой элемент он КЛИКНУЛ
                      OOP.forArr(elems, function(el){
                          if(clickIsInObj(e.x,e.y,el)){
                            //ОБРАБАТЫВАЕМ КЛИК 
                            leftScrollBarItemsClick(el);
                          }
                      });
                    }
                    isScrollMove = false;
                    return;
                  }
                }
            }
            else{//Если МЫШКА

                if(e.which == 1){//ЛЕВАЯ КНОПКА МЫШИ
                    if(scroll.name == "RIGHT"){//ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
                        //Определяем на какой элемент он КЛИКНУЛ
                        OOP.forArr(scroll.getArrayItems(), function(el){
                          if(clickIsInObj(e.x,e.y,el)){
                            //ОБРАБАТЫВАЕМ КЛИК 
                            addCommandToCell(el);
                          }
                        });        
                    }
                    else if(scroll.name == "DOWN"){
                     var itm = scroll.getArrayItems();
                     if (itm !== undefined) {
                         OOP.forArr(itm, function (el, i) {
                             if (clickIsInObj(e.x,e.y,el)) {
                                 choosenCommandInElement = field[lastClickedIndx].getTopCommands().length - 1 - i;
                                 addCommandToCell(el, true, true);
                             }
                         })
                     }
                    }
                    else if(scroll.name == "LEFT"){
                        var itms = scroll.getArrayItems();
                          if(itms !== undefined && itms.length > 0){
                          //Определяем на какой элемент он КЛИКНУЛ
                          OOP.forArr(itms, function(el){
                            if(clickIsInObj(e.x,e.y,el)){
                              //ОБРАБАТЫВАЕМ КЛИК 
                              leftScrollBarItemsClick(el);
                            }
                          });
                        }
                    }
                }
                else if(e.which == 3){//ПРАВАЯ КНОПКА МЫШИ
                    if(scroll.name == "DOWN" && scroll.getArrayItems()){
                        //Определяем на какой элемент он КЛИКНУЛ
                        OOP.forArr(scroll.getArrayItems(), function(el,index){
                          if(clickIsInObj(e.x,e.y,el)){
                            //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД(ПОКА ВСЕГДА 0ой массив команд в стеке, потом их будет несколько)
                            removeCommandFromCell(0,index);
                            return;
                          }
                        });
                    }
                }
            }
        });
    }
    else{
    }
    
    if((isMobile && canProcessOther) || (!isMobile && e.which == 1)){
        if(!processGuiClick(e))//Если пользователь не нажал на GUI выбора команд
            processButtonClick(e);//Если пользователь не нажал на кнопки
        processFieldClick(e);//Проверяем нажал ли пользователь на поле
    }
}

//Обработчик свайпов и скролов колесиком мышки
function onMove(e){
        
    if(lastClickedIndx != -1){
        var scrollSpeed = new point((e.x - clickCoord.x) / 1,(e.y - clickCoord.y) / 1);
        OOP.forArr(Scrolls, function(scroll){
            if(isMobile){//Если мобильное устройство то обрабатываем сенсорный экран
                //ОПРЕДЕЛЯЕМ ЖЕСТ УДАЛЕНИЯ
                if(scroll.name == "DOWN" && Math.abs(scrollSpeed.y) > Math.abs(scrollSpeed.x) && clickIsInObj(e.x,e.y,scroll.GetActivityArea())){
                  var itms = scroll.getArrayItems();
                  if(itms !== undefined && itms.length !== 0){
                    //ОПРЕДЕЛЯЕМ НА КАКОМ ЭЛЕМЕНТЕ ЗАЖАЛ ПОЛЬЗОВАТЕЛЬ
                    OOP.forArr(itms, function(el,i){
                        if(clickIsInObj(e.x,e.y,el)){
                          //ОБРАБАТЫВАЕМ КЛИК 
                          var itm = scroll.getItem(i);
                          //Запоминаем первоначальный Y этого элемента
                          if(yMovedItem.x == -1) {
                            itm.setAlpha(0.7)
                            yMovedItem.x = i;
                            yMovedItem.y = itm.y;
                          }
                          //Если элемент вытащили ещё не слишком далеко, то продолжаем его вытаскивать
                          if(yMovedItem.x == i){
                            //Сдвигаем элемент туда куда двигают  
                            itm.y += scrollSpeed.y; 
                          }
                          return;
                        }
                    });
                  }
                }
                else if(clickIsInObj(e.x,e.y,scroll.GetBackGround())) 
                  scrollDynamic(scrollSpeed,scroll); //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
            }
            else{//ЕСЛИ МЫШКА
                if(clickIsInObj(e.x,e.y,scroll.GetBackGround()))
                scrollDynamic(new point(e.deltaY,e.deltaY),scroll);
            }
        });
    }
}

//Обработчик нажатий нвсе кнопки интерфейса
function processButtonClick(e){
  
  if(clickIsInObj(e.x,e.y,startB)){//КНОПКА СТАРТА/СТОПА
    startB.isPlay = !startB.isPlay;
    if(startB.isPlay){
      //Запоминаем время начала движения робота
      startPlayerMoveTime = totalSeconds;
      //Увеличиваем счетчик попыток для прохождения
      totalAttempts++;
      setTimeout("processRobotMove()", robotMoveDelay);
    }
    return true;
  }
  else if(clickIsInObj(e.x,e.y,reloadB)){//КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
    if(!startB.isPlay)
      initializeGame();
    return true;
  }
  else if(clickIsInObj(e.x,e.y,menuB)){//КНОПКА МЕНЮ
    return true;
  }
  return false;
}

//Возвращает true если пользователь нажал на отображенный элемент GUI
function processGuiClick(e){
  //Если не выбран ввод команд
  if(lastClickedIndx == -1) return false;
  //Обрабатываем кнопку ok
  if(clickIsInObj(e.x,e.y,okB)){//Если на кнопку нажали, то скрываем весь интерфейс ввода
      if (menuStatesArr.length != 0) {
          //Удаляем верхний элемент из стека команд
          menuStatesArr.shift();
          //Если в стеке состояний не осталось больше команд, то очищаем скролы
          if (menuStatesArr.length == 0) {
              inputCommandStates = 0;
              initLeftScroll(undefined, undefined);
              initRightScroll(getAllCommandsMenu());
              initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
          }
          else if (menuStatesArr[0].name == "repeatif" || menuStatesArr[0].name == "repeat") {//Иначе инициализируем скролл в соответствии с последней командой в стеке
              inputCommandStates = 4;
              // Инициализируем правый скролл
              initRightScroll(getAllCommandsMenu());
              //Инициализируем нижний скролл командами из поля команд в команде
              if (menuStatesArr[0].name == "repeatif") leftScrollBarItemsClick({ command: menuStatesArr[0].ifBlock.commandsBlock });
              else if (menuStatesArr[0].name == "repeat") leftScrollBarItemsClick({ command: menuStatesArr[0].commandsBlock });//initDownScroll(getCommandsImgArr(menuStatesArr[0].commandsBlock.actions));
              
          }
      }
      else {
          field[lastClickedIndx].setStroke(false);//Убираем выделение с поля
          //initDownScroll([]);//Очищаем интерфейс вывода введенных команд
          lastClickedIndx = -1;//Очищаем индекс выбранной клетки поля
          choosenCommandInElement = -1;
          isScrollMove = true;//ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)
          guiLayer.clear();//Очищаем слой с интерфейса
          startB.setVisible(true);//Показывае кнопку старт/стоп
          menuB.setVisible(true);
          inputCommandStates = 0;
      }
    return true;
  }
  return true;
}

//Функция обеспечивающая динамический скролл
function scrollDynamic(speed,scrollElement){
  if(Math.abs(speed.x) > 5 || Math.abs(speed.y) > 5){
    if(isMobile){speed.x *= 3;speed.y *= 3;}
    //ИНИЦИАЛИЗИРУЕМ ФЛАГ СКРОЛА
    isScrollMove = true;
    scrollElement.scrollUpdate(speed);
  }
}

//Обработка кликов на элемент поля
function processFieldClick(e){
  if(field === null || field.length === 0) return false;
  //Проходим по полю и проверяем кликнули ли мы на элемент поля
  for(var i = 0 ; i < field.length; i++){
       //Обрабатываем клики мышкой
    	if(clickIsInObj(e.x,e.y,field[i].getImageObject()) && field[i].code == roadCode){
    	  //Перерисовываем кликнутый элемент
            setFocused(field[i],i);
            return true;
    	}
  }
  return false;
}


//Вернет true если клик был внутри координат прямоугольника obj
function clickIsInObj(x,y,obj){
    if(x >= obj.x && y >= obj.y)
      if(x <= obj.x + obj.w && y <= obj.y + obj.h)
          return true;
    return false;
}