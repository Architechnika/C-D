/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false;//Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)

//Метод в котором обрабатываются клики на все элементы игры
function processClick(){
  
  if(!processGuiClick())//Если пользователь не нажал на GUI
    if(!processButtonClick())//Если пользователь не нажал на кнопки
      processFieldClick();//Проверяем нажал ли пользователь на поле
}

//Обработчик нажатий нвсе кнопки интерфейса
function processButtonClick(){
  
  if(isLeftClicked(startB)){//КНОПКА СТАРТА/СТОПА
    startB.isPlay = !startB.isPlay;
    if(startB.isPlay)
      setTimeout("processRobotMove()", robotMoveDelay);
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
  //Отрисовываем скролы
  showCommandsMenu();
  //Обрабатываем кнопку ok
  if(isLeftClicked(okB)){//Если на кнопку нажали, то скрываем весь интерфейс ввода
    lastClickedIndx = -1;
    guiLayer.clear();
    return true;
  }
  return true;
}

//Возвращает скорость скрола(либо с тача, либо с мышки)
function processScrolls(){
  
  if(lastClickedIndx == -1) return;
  
  if(isMobile){//Если мобильное устройство то обрабатываем сенсорный экран
    //Обходим все скролы которые инициализированы
    OOP.forArr(Scrolls, function(scroll){
       if(touch.isDown() && touch.isInObject(scroll.getBackGround())){//Если игрок скролит
         scroll.scrollUpdate(touch.getSpeed());
       } 
    });
  }
  else{//Иначе колесико мышки
    //Обходим все скролы которые инициализированы
    OOP.forArr(Scrolls, function(scroll){
      if(mouse.isInObject(scroll.backGround)){
        if(mouse.isWheel("UP"))//Колесико вверх
          scroll.scrollUpdate(point(-10,-10));
        if(mouse.isWheel("DOWN"))//Колесико вниз
          scroll.scrollUpdate(point(10,10));
      } 
    });
  }
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
    	else if(isRightClicked(field[i].getImageObject())){
    	  if(field[i].code == roadCode)
    	    field[i].commands.pop(); 
    	   return true;
    	} 
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