/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false;//Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isDowned = false;//Флаг того, что пользователь нажал на один из скролов и держит
var isScrollMove = false;//Флаг для того, чтобы отличать скролл от тапа

//Метод в котором обрабатываются клики на все элементы игры
function processClick(){
  
  if(!processGuiClick())//Если пользователь не нажал на GUI выбора команд
    if(!processButtonClick())//Если пользователь не нажал на кнопки
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
    initUpScroll([]);//Очищаем интерфейс вывода введенных команд
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
      if(touch.isDown() && touch.isInObject(scroll.getBackGround())){
        //Если он скролит то обрабатываем скрол
        scrollDynamic(scrollSpeed,scroll);
      }
      else if(touch.isUp()){
        if(touch.isInObject(scroll.getBackGround())){
          if(scroll.locationBar == "DOWN"){
                //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
                if(!isScrollMove){
                  var pos = touch.getPosition();
                  //Определяем на какой элемент он КЛИКНУЛ
                  OOP.forArr(scroll.allItems, function(el){
                      if(touch.isInObject(el)){
                        //ОБРАБАТЫВАЕМ КЛИК 
                        addCommandToCell(el);
                      }
                  });
                }
                else scroll.setBarAlpha(0.55);
                //По дефолту считаем что пользователь не будет скролить
                isScrollMove = false;
                return;
              }
          if(scroll.locationBar == "UP"){
            if(isScrollMove) scroll.setBarAlpha(0.55);
          }
        }
      }
    }
    else if(mouse.isInObject(scroll.getBackGround())){
        
          scrollDynamic(scrollSpeed,scroll);
          
          if(scroll.locationBar == "DOWN"){//ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
            //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
            if(mouse.isPress("LEFT")){
                //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.allItems, function(el){
                  if(mouse.isInObject(el)){
                    //ОБРАБАТЫВАЕМ КЛИК 
                    addCommandToCell(el);
                  }
                });
            }
          }
          else if(scroll.locationBar == "UP"){//ОБРАБОТКА КЛИКОВ ПО СКРОЛЛБАРУ СО КОМАНДАМИ В КЛЕТКЕ
             if(mouse.isPress("RIGHT")) {
               //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.allItems, function(el,index){
                  if(mouse.isInObject(el)){
                    //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД
                    removeCommandFromCell(index);
                  }
                });
             }
          }
      }
  });
}

//Функция обеспечивающая динамический скролл
function scrollDynamic(speed,scrollElement){
  
  if(Math.abs(speed.x) > 10 || Math.abs(speed.y) > 10){
    if(isMobile){speed.x *= 3;speed.y *= 3;}
    scrollElement.scrollUpdate(speed);
    //ИНИЦИАЛИЗИРУЕМ ФЛАГ СКРОЛА
    isScrollMove = true;
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
    	if(isLeftClicked(field[i].getImageObject())){
    	  //Перерисовываем кликнутый элемент
        setFocused(field[i],i);
        return true;
    	}
    	/*else if(isRightClicked(field[i].getImageObject())){
    	  if(field[i].code == roadCode)
    	    field[i].commands.pop(); 
    	   return true;
    	} */
  }
  return false;
}

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