/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false;//Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isDowned = false;//Флаг того, что пользователь нажал на один из скролов и держит
var isScrollMove = false;//Флаг для того, чтобы отличать скролл от тапа


//Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var yMovedItem = new point(-1,-1);

//Метод в котором обрабатываются клики на все элементы игры
function processClick(){
  
  if(!processGuiClick())//Если пользователь не нажал на GUI выбора команд
    if(!processButtonClick());//Если пользователь не нажал на кнопки
  
  processFieldClick();//Проверяем нажал ли пользователь на поле
}

//Обработчик нажатий нвсе кнопки интерфейса
function processButtonClick(){
  
  if(isLeftClicked(startB)){//КНОПКА СТАРТА/СТОПА
    startB.isPlay = !startB.isPlay;
    if(startB.isPlay){
      //Запоминаем время начала движения робота
      startPlayerMoveTime = totalMiliSeconds;
      //Увеличиваем счетчик попыток для прохождения
      totalAttempts++;
      setTimeout("processRobotMove()", robotMoveDelay);
    }
    return true;
  }
  else if(isLeftClicked(reloadB)){//КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
    if(!startB.isPlay)
      initializeGame();
    return true;
  }
  else if(isLeftClicked(menuB)){//КНОПКА МЕНЮ
    return true;
  }
  return false;
}

//Возвращает true если пользователь нажал на отображенный элемент GUI
function processGuiClick(){
  //Если не выбран ввод команд
  if(lastClickedIndx == -1) return false;
  //Обрабатываем скролы
  processScrolls();
  //Обрабатываем кнопку ok
  if(isLeftClicked(okB)){//Если на кнопку нажали, то скрываем весь интерфейс ввода
  
    field[lastClickedIndx].setStroke(false);//Убираем выделение с поля
    //initDownScroll([]);//Очищаем интерфейс вывода введенных команд
    lastClickedIndx = -1;//Очищаем индекс выбранной клетки поля
    isScrollMove = true;//ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)
    guiLayer.clear();//Очищаем слой с интерфейса
    startB.setVisible(true);//Показывае кнопку старт/стоп
    return true;
  }
  return true;
}

//Возвращает скорость скрола(либо с тача, либо с мышки)
function processScrolls(){
  
  if(lastClickedIndx == -1) return;
  //Инициализируем скорость скрола(от сенсорного экрана или от колёсика мышки)
  var scrollSpeed = isMobile ? touch.getSpeed() : (mouse.isWheel("UP") ? new point(-100,100) : mouse.isWheel("DOWN") ? new point(100,100) : new point(0,0));
  //Обходим все скролы которые инициализированы
  OOP.forArr(Scrolls, function(scroll){
    if(isMobile){//Если мобильное устройство то обрабатываем сенсорный экран
      //Если игрок зажал в область тача
      if(touch.isDown()){
        //ОПРЕДЕЛЯЕМ ЖЕСТ УДАЛЕНИЯ
        if(scroll.name == "DOWN" && Math.abs(scrollSpeed.y) > Math.abs(scrollSpeed.x) && touch.isInObject(scroll.GetActivityArea())){
          var itms = scroll.getArrayItems();
          if(itms !== undefined && itms.length !== 0){
                //ОПРЕДЕЛЯЕМ НА КАКОМ ЭЛЕМЕНТЕ ЗАЖАЛ ПОЛЬЗОВАТЕЛЬ
                OOP.forArr(itms, function(el,i){
                    if(touch.isInObject(el)){
                      //ОБРАБАТЫВАЕМ КЛИК 
                      var itm = scroll.getItem(i);
                      //Запоминаем первоначальный Y этого элемента
                      if(yMovedItem.x == -1) {
                        itm.setAlpha(0.7)
                        yMovedItem.x = i;
                        yMovedItem.y = itm.y;
                      }
                      //Если элемент вытащили ещё не слишком далеко, то продолжаем его вытаскивать
                      if(itm.isIntersect(scroll.GetBackGround()) && yMovedItem.x == i){
                        //Сдвигаем элемент туда куда двигают  
                        itm.y += scrollSpeed.y; 
                      }
                      return;
                    }
                });
          }
        }
        else if(touch.isInObject(scroll.GetBackGround())) 
          scrollDynamic(scrollSpeed,scroll); //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
      }
      else if(touch.isUp()){
        
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
        }
        
        //ОРАБОТК СКРОЛЛА ВЫБОРА КОМАНД
        if(touch.isInObject(scroll.GetBackGround())){
          if(scroll.name == "RIGHT"){//ПРАВЫЙ СКРОЛЛ ВВОДА ПРОСТЫХ КОМАНД
            //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
            if(!isScrollMove){
              var pos = touch.getPosition();
              //Определяем на какой элемент он КЛИКНУЛ
              OOP.forArr(scroll.getArrayItems(), function(el){
                  if(touch.isInObject(el)){
                    //ОБРАБАТЫВАЕМ КЛИК 
                    addCommandToCell(el);
                  }
              });
            }
            //else scroll.setBarAlpha(0.55);
            //По дефолту считаем что пользователь не будет скролить
            isScrollMove = false;
            return;
          }
        }
        
        //ОБРАБОТЧИК ЛЕВОГО СКРОЛА - РЕДАКТОР СЛОЖНЫХ КОМАНД
        if(scroll.name == "LEFT" && touch.isInObject(scroll.GetBackGround())){
          var elems = scroll.getArrayItems();
          if(elems !== undefined && elems.length > 0){
            if(!isScrollMove){
              var pos = touch.getPosition();
              //Определяем на какой элемент он КЛИКНУЛ
              OOP.forArr(elems, function(el){
                  if(touch.isInObject(el)){
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
    }
    else if(mouse.isInObject(scroll.GetBackGround())){
        
          scrollDynamic(scrollSpeed,scroll);
          
          if(scroll.name == "RIGHT"){//ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
            //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
            if(mouse.isPress("LEFT")){
                //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.getArrayItems(), function(el){
                  if(mouse.isInObject(el)){
                    //ОБРАБАТЫВАЕМ КЛИК 
                    addCommandToCell(el);
                  }
                });
            }
          }
          else if(scroll.name == "DOWN"){//ОБРАБОТКА КЛИКОВ ПО НИЖНЕМУ СКРОЛЛУ С ТЕКУЩИМИ КОМАНДАМИ В КЛЕТКЕ
             if(mouse.isPress("RIGHT")) {
               //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.getArrayItems(), function(el,index){
                  if(mouse.isInObject(el)){
                    //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД(ПОКА ВСЕГДА 0ой массив команд в стеке, потом их будет несколько)
                    removeCommandFromCell(0,index);
                    return;
                  }
                });
             }
          }
          else if(scroll.name == "LEFT"){
            if(mouse.isPress("LEFT")){
                var itms = scroll.getArrayItems();
                  if(itms !== undefined && itms.length > 0){
                  //Определяем на какой элемент он КЛИКНУЛ
                  OOP.forArr(itms, function(el){
                    if(mouse.isInObject(el)){
                      //ОБРАБАТЫВАЕМ КЛИК 
                      leftScrollBarItemsClick(el);
                    }
                  });
                }
            }
          }
      }
  });
}

//Функция обеспечивающая динамический скролл
function scrollDynamic(speed,scrollElement){
  
  if(Math.abs(speed.x) > 10 || Math.abs(speed.y) > 10){
    if(isMobile){speed.x *= 3;speed.y *= 3;}
    //ИНИЦИАЛИЗИРУЕМ ФЛАГ СКРОЛА
    isScrollMove = true;
    scrollElement.scrollUpdate(speed);
  }
  
  /*if(speed.x !== 0){
    if(speed.x < 0) speed.x++;
    else speed.x--;
  }
  if(speed.y !== 0){
    if(speed.y < 0) speed.y++;
    else speed.y--;
  }
  
  if(speed.x !== 0 && speed.y !== 0)
    setTimeout(scrollDynamic, 1, speed, scrollElement);*/
}

//Обработка кликов на элемент поля
function processFieldClick(){
  if(field === null || field.length === 0) return false;
  //Проходим по полю и проверяем кликнули ли мы на элемент поля
  for(var i = 0 ; i < field.length; i++){
       //Обрабатываем клики мышкой
    	if(isLeftClicked(field[i].getImageObject()) && field[i].code == roadCode){
    	  //Перерисовываем кликнутый элемент
        setFocused(field[i],i);
        return true;
    	}
  }
  return false;
}

function inputIsUp(checkObject){
  if(touch.isTouchSupported()){
    if(touch.isUp() && touch.isInObject(checkObject)) return true;
  }
  else{
    if(mouse.isUp("RIGHT") && mouse.isInObject(checkObject)) return true;
    else if(mouse.isUp("LEFT") && mouse.isInObject(checkObject)) return true;
  }
  return false;
}

/*function isClicked(checkObj){
  if(touch.isTouchSupported()){
    
  }
}*/

//Проверка - нажали ли на объект checkObject левой кнопкой мыши
function isLeftClicked(checkObject){
  //Если у нас мобильное устройство
  if(isMobile){
    if(lastClickedIndx == -1)
      return touch.isPeekObject(checkObject);
    else{
      var spd = touch.getSpeed().x;
      if(touch.isPress() && spd == 0)
        return touch.isPeekObject(checkObject);
    }
  }
  //Если пк с мышкой
  if(mouse.isPeekObject('LEFT',checkObject)){
    return true;
  }
  return false;
}

//Проверка - нажали ли на объект checkObject правой кнопкой мыши  
function isRightClicked(checkObject){
  
  //Если у нас мобильное устройство
  if(isMobile){
    return false;
  }
  //Если пк с мышкой
  if(mouse.isPeekObject('RIGHT',checkObject)){
    return true;
  }
  return false;
}

//Возвращает true если пользователь нажал и держит на checkObject
function isDownedOn(checkObject){
  var x=0,y=0;
  if(touch.isTouchSupported()){
    x = touch.getPosition().x;
    y = touch.getPosition().y;
  }
  else{
      x = mouse.getPosition().x;
      y = mouse.getPosition().y;
  }
  if(x >= checkObject.x && y >= checkObject.y)
      if(x <= checkObject.x + checkObject.w && y <= checkObject.y + checkObject.h)
        return true;
  
  return false;
}