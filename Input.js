/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false; //Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isScrollMove = false; //Флаг для того, чтобы отличать скролл от тапа
var scrolled = false; //Флаг того, что пользовател зажал тач и начал скролить
var clickCoord = new point(0, 0); //Актуальные координаты клика пользователя(даже если скролит то точка где находится палец)
var touchPoint = undefined; //Точка в которой кликнул пользователь(не обновляется как clickCoord и становится = undefined при отпускании)
var selectedItem = undefined; //Обьект в левом скроле, который передвигают или удаляют
var swapedItem = undefined; //Обьект в левом скроле с которым нужно поменять местами передвигаемый
var selItemPos = new point(-1, -1); //Буфер для хранения начальных координат элемента в левом скроле для того чтобы вернуть его обратно если его не поменяют местами с другим элементом
var touchTapTimeFlag = false; //Флаг, для отработки событий сдвига(Если пользователь нажал в точку и двигает мышкой = true)
var touchedScroll = undefined; //Буфер для хранения скрола на котором сдвигает элементы пользователь
var labIsMove = false; //Флаг для того чтобы сдвигать поле
var codeMapIsMoved = false; //Флаг для сдвига карты кода
var multiTouchDelta = -1; //Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var touchTimespan = undefined;
var toolTipTimeCounter = undefined;
var blockBElemIndx = -1;
var pressedItem = undefined;
//Отменяем вывод контестного меню на страничке
document.oncontextmenu = function () {
    return false
};
//
//Функция инициализации обработчиков ввода пользователя
function initInputEvents() {
    addEventListener("mouseup", onMouseUP);
    addEventListener("mousedown", onMouseDOWN);
    addEventListener("mousemove", onMouseMove);
    addEventListener("wheel", onWheel);
    addEventListener("touchstart", onTouchStart);
    addEventListener("touchend", onTouchEnd);
    addEventListener("touchmove", onTouchMove);
}

//Удаляем обработчики ввода пользователя со странички
function removeInputEvents() {
    removeEventListener("mouseup", onMouseUP);
    removeEventListener("mousedown", onMouseDOWN);
    removeEventListener("mousemove", onMouseMove);
    removeEventListener("wheel", onWheel);
    removeEventListener("touchstart", onTouchStart);
    removeEventListener("touchend", onTouchEnd);
    removeEventListener("touchmove", onTouchMove);
}

//Обработчики для событий ввода --------------------
function onMouseUP(e) {
    clickCoord.x = 0;
    clickCoord.y = 0;
    onUp(e);
    selectedItem = undefined;
    touchedScroll = undefined;
    touchPoint = undefined;
    touchTapTimeFlag = false;
    labIsMove = false;
    codeMapIsMoved = false;
    multiTouchDelta = -1;
    touchTimespan = undefined;
    e.cancelBubble = true;
}

function onMouseDOWN(e) {
    findPressed(e);
    clickCoord.x = e.x;
    clickCoord.y = e.y;
    if (allButtons.checkButtonsClicked(clickCoord, true))
        return;
    scrolled = false;
    //Запоминаем точку в которую кликнул пользователь
    touchPoint = new point(clickCoord.x, clickCoord.y);
    //Запоминаем время начала тапа
    touchTimespan = Date.now();
    e.cancelBubble = true;
}

function onWheel(e) {
    if (!isVerticalScreen && clickIsInObj(e.x, e.y, codeView.getBackGround())) {
        if (!key.isDown("SHIFT")) {
            codeView.resizeView((e.deltaY * -1) < 0 ? -1 * scrollStep : scrollStep);
        } else codeView.elementsMove(0, e.deltaY * 0.5 * -1);
        return;
    }
    onRecize(e, e.deltaY * -1, scrollStep);
    e.cancelBubble = true;
}

function onMouseMove(e) {
    onMove(e);

    if (toolTip.isVisible())
        toolTip.hideToolTip();
    toolTipTimeCounter = 0;

    clickCoord.x = e.x;
    clickCoord.y = e.y;
    e.cancelBubble = true;
}

function onTouchStart(e) {
    //isMobile = true;
    clickCoord.x = e.changedTouches[0].clientX;
    clickCoord.y = e.changedTouches[0].clientY;
    findPressed(clickCoord);
    scrolled = false;
    if (allButtons.checkButtonsClicked(clickCoord, true))
        return;
    for (var i = 0; i < Scrolls.length; i++) {
        var scroll = Scrolls[i];
        //Ищем клик по левому скролу
        if (clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            touchedScroll = scroll;
        }
    }
    //Запоминаем точку в которую кликнул пользователь
    touchPoint = new point(clickCoord.x, clickCoord.y);
    //Запоминаем время начала тапа
    touchTimespan = Date.now();
}

function onTouchEnd(e) {
    clickCoord.x = 0;
    clickCoord.y = 0;
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    if (touch.getTouches().length == 1)
        onUp(e);
    selectedItem = undefined;
    touchedScroll = undefined;
    touchPoint = undefined;
    touchTapTimeFlag = false;
    labIsMove = false;
    codeMapIsMoved = false;
    multiTouchDelta = -1;
    touchTimespan = undefined;
}

function onTouchMove(e) {
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;

    //Если точек тача одна, то вызываем обработчик
    if (touch.getTouches().length == 1)
        onMove(e);
    else { //Если находимся в режиме ресайза тачпадом(ЕСЛИ ПОЛЬЗОВАТЕЛЬ ДВУМЯ ПАЛЬЦАМИ РЕСАЙЗИТ)
        //Получаем координаты 
        var fP = new point(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        var sP = new point(e.changedTouches[1].clientX, e.changedTouches[1].clientY);
        //Просчитываем дельту двух точек
        var delta = Math.abs(fP.y - sP.y); //Math.abs((fP.y + fP.x) - (sP.y + sP.x));
        //Если это первая итерация то просто запоминаем эту дельту, если нет - делаем ресайз
        if (multiTouchDelta == -1) multiTouchDelta = delta;
        else {
            onRecize(e, delta - multiTouchDelta, touchScrollVal);
        }
        scrolled = true;
        multiTouchDelta = delta;
        return;
    }
    clickCoord.x = e.x;
    clickCoord.y = e.y;
}

function onRecize(e, delta, step) {
    //Инитим нажатый элемент если находим его
    OOP.forArr(Scrolls, function (scroll) {
        if ((scroll.name == "LEFT" || scroll.name == "RIGHT") && clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            for (var i = 0; i < itms.length; i++) {
                var el = itms[i];
                if (clickIsInObj(e.x, e.y, el)) {
                    touchedScroll = scroll;
                    scrollDynamic(new point(delta * -1, delta * -1), touchedScroll);
                    return;
                }
            }
        }
    });
    if (!isSecondScreen && clickIsInObj(e.x, e.y, labView.getBackGround())) {
        labView.resizeView(delta < 0 ? -1 * step : step);
        return;
    } else if (clickIsInObj(e.x, e.y, codeView.getBackGround())) {
        codeView.resizeView(delta < 0 ? -1 * step : step);
        return;
    }
}

function onUp(e) {
    if (pressedItem) {
        var spl = pressedItem.file.split("_pressed");
        pressedItem.setImage(spl[0] + spl[1]);
        pressedItem = undefined;
    }
    if (messageBox.isShow()) {
        messageBox.setShow(false);
        return true;
    }
    var clicked = false;
    //log(touchTapTimeFlag);
    if (!scrolled) {
        OOP.forArr(Scrolls, function (scroll) {
            if (scroll.name == "RIGHT") { //ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
                //Определяем на какой элемент он КЛИКНУЛ
                OOP.forArr(scroll.getArrayItems(), function (el) {
                    if (clickIsInObj(e.x, e.y, el) && selectedItem == undefined) {
                        //alert("touchOn: " + touchedOnClick.toString() + " touch: " + touched.toString())
                        el.onClick(el);
                        clicked = true;
                        return;
                    }
                });
            } else if (scroll.name == "LEFT") {
                var elems = scroll.getArrayItems();
                if (clickIsInObj(e.x, e.y, scroll.GetBackGround()))
                    clicked = true;
                if (elems && elems.length > 0) {
                    if (touchTapTimeFlag && selectedItem) { //Если перемещаем итем
                        var selitemCX = selectedItem.getPositionC().x;
                        scroll.swapItemPosition(false, selectedItem, undefined, selItemPos)
                        var stor = findObjStorage(lastClickedElement.commands, selectedItem.command);
                        if (swapedItem !== undefined) {

                            //var stor = findObjStorage(lastClickedElement.commands, selectedItem.command);
                            var indx1 = -1,
                                indx2 = -1;
                            OOP.forArr(stor, function (el, i) {
                                if (el == selectedItem.command)
                                    indx1 = i;
                                else if (el == swapedItem.command)
                                    indx2 = i;
                            });
                            if (indx1 != -1 && indx2 != -1) {
                                stor.move(indx1, indx2);
                                //Инициализируем карту кода
                                codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
                            }

                            scroll.swapItems(selectedItem, swapedItem);
                            swapedItem = undefined;
                        } else {
                            if (selitemCX > scroll.GetBackGround().x + scroll.GetBackGround().w) {
                                if (selectedItem.command) { //если выделенный элемент команда
                                    var i = stor.indexOf(selectedItem.command);
                                    var scrolItemsi = scroll.getArrayItems().indexOf(selectedItem);
                                    scroll.getArrayItems().splice(scrolItemsi, 1);
                                    scroll.initArrayItems(scroll.getArrayItems())
                                    stor.splice(i, 1);
                                    codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
                                } else { // в противном случаи если выделенный элемент сохраненка
                                    var scrolItemsi = scroll.getArrayItems().indexOf(selectedItem);
                                    scroll.getArrayItems().splice(scrolItemsi, 1);
                                    scroll.initArrayItems(scroll.getArrayItems())
                                    var i = myScripts.indexOf(selectedItem.scriptArray) - 1;
                                    myScripts.splice(i, 2);
                                }
                            }
                        }
                    } else {
                        OOP.forArr(scroll.getArrayItems(), function (el) {
                            if (clickIsInObj(e.x, e.y, el)) {
                                if (el.onClick) {
                                    el.onClick(el);
                                    clicked = true;
                                    return;
                                }
                            }
                        });
                    }
                }
            }
        });
        if (!clicked && !touchTapTimeFlag) { //Если клик не был обнаружен выше
            if (allButtons && !allButtons.checkButtonsClicked(e))
                if (isVerticalScreen) {
                    //Если ориентация вертикальная то проверяем клики по полю только когда находимся на экране с полем
                    if (!isSecondScreen)
                        processFieldClick(e);
                    else codeView.isClicked(e);
                }
            else if (!codeView.isClicked(e)) {
                tupAnimation.setVisible(true);
                tupAnimation.setPositionC(pjs.vector.point(e.x, e.y))
                processFieldClick(e);
            }
        }
    }
}

//Обработчик свайпов и скролов колесиком мышки
function onMove(e) {
    //Если точка куда пользователь кликнул отсутствует, то событие сработало ошибочно(ну вдруг)
    if (!touchPoint) return;
    var scrollSpeed = new point((e.x - clickCoord.x), (e.y - clickCoord.y));
    var scrSpMax = Math.abs(scrollSpeed.x) > Math.abs(scrollSpeed.y) ? Math.abs(scrollSpeed.x) : Math.abs(scrollSpeed.y);
    //Рассчитываем удаленность текущей точки тапа от точки старта нажатия
    var diffY = Math.abs(touchPoint.x) > Math.abs(touchPoint.y) ? Math.abs(e.x - touchPoint.x) : Math.abs(e.y - touchPoint.y);
    var diffX = Math.abs(touchPoint.x) > Math.abs(touchPoint.y) ? Math.abs(e.y - touchPoint.y) : Math.abs(e.x - touchPoint.x);
    if ((diffY < distanceOfScroll) && (diffX < distanceOfScroll)) return;
    //Если область в которой пользователь двигает ещё не была определено, то определеяем ее
    if (!touchTapTimeFlag) onTouchCheckMove();
    //Если пользователь двигает игровое поле
    if (labIsMove) {
        labView.elementsMove(scrollSpeed.x, scrollSpeed.y);
        return;
    }
    //Если пользователь двигает карту кода
    if (codeMapIsMoved) {
        codeView.elementsMove(scrollSpeed.x, scrollSpeed.y);
        return;
    }

    if (scrolled && touchTapTimeFlag && touchedScroll && scrSpMax > 3) { //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
        scrollDynamic(scrollSpeed, touchedScroll);
    } else if (!scrolled && touchTapTimeFlag && touchedScroll && touchedScroll.name == "LEFT") { //ЕСЛИ ПОЛЬЗОВАТЕЛЬ ПЕРЕДВИГАЕТ ЭЛЕМЕНТЫ
        var item = touchedScroll.objectEntryC(selectedItem)
        if (selectedItem.isIntersect(touchedScroll.GetBackGround())) {
            touchedScroll.swapItemPosition(true, selectedItem, item, selItemPos)
            if (item !== undefined)
                swapedItem = item;
            //Определяем в какую сторону тащить элемент(Вверх/вниз или вправо/влево)
            if (Math.abs(scrollSpeed.y) > Math.abs(scrollSpeed.x) && selectedItem.getPositionC().x == selItemPos.x) {
                if (selectedItem.command)
                    selectedItem.y += (scrollSpeed.y);
            } else if (Math.abs(scrollSpeed.x) > Math.abs(scrollSpeed.y) && selectedItem.getPositionC().y == selItemPos.y) {
                selectedItem.x += (scrollSpeed.x);
            }
        }
    }
}

function onTouchCheckMove() {
    //Обходим скролы
    for (var i = 0; i < Scrolls.length; i++) {
        var scroll = Scrolls[i];
        //Ищем клик по левому скролу
        if (scroll.name == "LEFT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            if (itms && itms.length > 0) {
                for (var j = 0; j < itms.length; j++) {
                    if (clickIsInObj(clickCoord.x, clickCoord.y, itms[j])) {
                        if (Date.now() - touchTimespan < touchTapTimeOut) { //Если время не вышло то вопринимаем сдвиг как прокрутку скрола
                            scrolled = true;
                        } else { //Если время вышло, то сдвиг воспринимаем как перемещение элемента
                            selectedItem = scroll.getItem(j);
                            selectedItem.setAlpha(0.7);
                            selItemPos = selectedItem.getPositionC();
                        }
                        touchedScroll = scroll;
                        touchTapTimeFlag = true;
                        return;
                    }
                }
            }
        } else if (scroll.name == "RIGHT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
            if (Date.now() - touchTimespan < touchTapTimeOut) { //Если время не вышло то вопринимаем сдвиг как прокрутку скрола
                scrolled = true;
            }
            touchedScroll = scroll;
            touchTapTimeFlag = true;
            return;
        }
    };
    var check = true;
    if (isVerticalScreen)
        if (!isSecondScreen)
            check = false;
    //Обходим codeMap
    if (clickIsInObj(clickCoord.x, clickCoord.y, codeView.backGround) && check) {
        codeMapIsMoved = true;
        touchTapTimeFlag = true;
        return;
    }
    //Если указатель в области лабиринта
    for (var i = 0; i < field.length; i++) {
        if (clickIsInObj(clickCoord.x, clickCoord.y, field[i])) {
            labIsMove = true;
            touchTapTimeFlag = true;
            return;
        }
    };
}

//Обработчики всех кликабельных элементов---------------------------
function onOkBClick() { //Вернет TRUE если надо закрыть кнопку OK
    if (infoText.isVisible()) infoText.close();
    initRightScroll([]);
    if (!isVerticalScreen) {
        inputCommandStates = 0;
        codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
        return true;
    }
    //lastClickedIndx = -1; //Очищаем индекс выбранной клетки поля
    choosenCommandInElement = undefined;
    isScrollMove = true; //ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)

    //Если находимся в режиме добавления после определенной команды
    if (itemToAddAfterInCodeMap || itemToReplaceInCodeMap) {
        itemToAddAfterInCodeMap = undefined;
        itemToReplaceInCodeMap = undefined;
        //codeView.resetZoomer();
        inputCommandStates = 1;
    }
    //Проверяем надо ли совсем закрывать интерфейс ввода
    if (inputCommandStates > 0) {
        inputCommandStates = 0;
        OOP.forArr(Scrolls, function (el, i) {
            if (el.name == "LEFT")
                Scrolls.splice(i, 1);
        });
        //Инициализируем карту кода
        if (lastClickedElement)
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
        return false;
    }
    if (!isVerticalScreen) {
        initLeftScroll([]);
        //Инициализируем карту кода без возможности добавления элементов
        codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, false, false, 1, undefined, true);
        field[lastClickedIndx].setStroke(false); //Убираем выделение с поля
    } else {
        allButtons.backToStartButton.setAlpha(1);
        allButtons.stepDownButton.setAlpha(1);
        allButtons.stepUpButton.setAlpha(1);
        isSecondScreen = false;
        game.setLoop("Labyrinth");
    }
    codeView.clear();
    return true;
}

//КНОПКА СТАРТА/СТОПА
function startBClick() {
    isStarted = !isStarted;
    if (isStarted) {
        if (!isVisualizeCodeMap && codeView) {
            codeView.clear();
        }
        //Запоминаем время начала движения робота
        startPlayerMoveTime = totalSeconds;
        if (!isVerticalScreen)
            initLeftScroll([]);
        //Увеличиваем счетчик попыток для прохождения
        totalAttempts++;
        if (!isVerticalScreen && isVisualizeCodeMap) {
            var comms = playerCommands && playerCommands.length > 0 ? playerCommands : field[playerPozition].commands;
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, comms, undefined, undefined, passiveItemsAlpha, playerCommands[0]);
        }
        setTimeout("processRobotMove()", robotMoveDelay);
    }
    return true;
}

//КНОПКА МЕНЮ
function menuBClick() {
    clearAllLayers();
    window.location.href = 'index.html'
    return true;
}
//КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
function reloadBClick() {
    if (!isStarted)
        initializeGame();
    return true;
}

function labyrinthRoadClick(index) {
    //Перерисовываем кликнутый элемент
    setFocused(field[index], index);
    return true;
}

//Обработчик события показать тултип 
function toolTipShowEvent(x, y) {
    for (var i = 0; i < field.length; i++) {
        if (clickIsInObj(x, y, field[i])) {
            if (i == playerPozition) {
                toolTip.setToolTip(x, y, lang[selectLang]['tooltip_robot']);
            }
        } else if (clickIsInObj(x, y, gameObjects[i])) {
            toolTip.setToolTip(x, y, "Собирай батарейки");
        }
    }
    var codeViewImages = codeView.getAllElems();
    for (var i = 0; i < codeViewImages.length; i++) {
        if (clickIsInObj(x, y, codeViewImages[i])) {
            toolTip.setToolTip(x, y, codeViewImages[i].command.name);
        }
    }
}

function onCodeMapElementClick(element) {

    if (codeView.isElementMove) {
        var el = codeView.menu.getElement();
        var stor1 = findObjStorage(lastClickedElement.commands, el.command);//Ищем места хранения меняемых команд
        var ind1 = stor1.indexOf(el.command);
        //Если нажали на один из элементов на которых ничего не должно происходить
        if (element.command.name == "blockA" || element.command.name == "whatisit" || element.command.name == "blockB" || element.command.name == "counter") 
            return;
        if (el.command.commandsBlock && el.command.commandsBlock.actions) {
            var check = findObjStorage(el.command.commandsBlock.actions, element.command);
            if (check)
                return;
        }
        if (el.command.elseBlock && el.command.elseBlock.actions) {
            var check = findObjStorage(el.command.elseBlock.actions, element.command);
            if (check)
                return;
        }
        //Если нажали на какой то из плюсиков
        if (element.name && element.name == "plus") {
            element.command.push(getCopyOfObj(stor1[ind1]));
        }
        else {//Если на любую из команд
            var stor2 = findObjStorage(lastClickedElement.commands, element.command);
            
            if (el.command.commandsBlock && el.command.commandsBlock.actions == stor2)
                return;
            var ind2 = stor2.indexOf(element.command);
            //Ставим выбранный элемент на место после указанного, а из прошлого хранилища удаляем
            stor2.splice(ind2 + 1, 0, getCopyOfObj(stor1[ind1]));
        }
        //Убираем элемент из старого хранилища
        stor1.splice(stor1.indexOf(el.command), 1);
        codeView.isElementMove = false;
        initLeftScroll(getCommandsImgArr(stor2 ? stor2 : stor1));
        //Перегенерим код мап
        codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
        return;
    }
    if (element.name && element.name == "plus") {
        choosenCommandInElement = element.command;
        codeView.resetZoomer();
        addCommandToCell(element, true);
        return;
    }

    choosenCommandInElement = findObjStorage(lastClickedElement.commands, element.command);
    if (!choosenCommandInElement) return;

    if (element.command.name == "blockA" || element.command.name == "whatisit" || element.command.name == "blockB" || element.command.name == "counter") {
        addCommandToCell(element, true);
        codeView.menu.closeMenu(element);
    } else {
        codeView.menu.openMenu(element, codeView);
    }
}

//Удаляет элемент из массива blockB выбранного элемента
function onBlockBDeleteElem(elem) {
    choosenCommandInElement.blockB.splice(choosenCommandInElement.blockB.indexOf(elem.command), 1);
    lastAddedCommand = undefined;
    blockBElemIndx = -1;
    inputCommandStates = 0;
    if (isVerticalScreen) initLeftScroll();
    else initLeftScroll([]);
    initRightScroll([]);
    codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
}

function onChooseCommandClick(el) {
    //ОБРАБАТЫВАЕМ КЛИК
    addCommandToCell(el);
}

//Обработчик для ввода с цифр
function onKeyboardClick(el) {
    var count = el.command.name != "backspace" ? el.command.value : -1;
    var text = choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count.toString();
    if (count != -1) { //Если элемент добавляют        
        if (text.length < 4) {
            text = text + count.toString();
        }
    } else if (text.length > 0) text = text.substring(0, text.length - 1) //Если стирают
    var parsedInt = parseInt(text);
    parsedInt = isNaN(parsedInt) ? 0 : parsedInt;
    //Инитим текст в блок итераций
    choosenCommandInElement.countBlock.count = parsedInt;
    //Задаем текст в текст бокс
    infoText.setText(text);
    // messengBox.setShow(true);
    // messengBox.setText(text);
}

//Функция обеспечивающая динамический скролл
function scrollDynamic(speed, scrollElement) {
    if (Math.abs(speed.x) > 5 || Math.abs(speed.y) > 5) {
        if (isMobile) {
            speed.x *= 3;
            speed.y *= 3;
        }
        //ИНИЦИАЛИЗИРУЕМ ФЛАГ СКРОЛА
        isScrollMove = true;
        scrollElement.scrollUpdate(speed);
    }
}

//Обработка кликов на элемент поля
function processFieldClick(e) {
    if (field === null || field.length === 0) return false;
    //Проходим по полю и проверяем кликнули ли мы на элемент поля
    for (var i = 0; i < field.length; i++) {
        //Обрабатываем клики мышкой
        if (field[i].onClick && clickIsInObj(e.x, e.y, field[i])) {
            field[i].onClick(i);
        }
    }
    return false;
}

function findPressed(e) {
    var el;
    if (allButtons && allButtons.buttonsArr.length > 0) {
        var scrlitems = allButtons.buttonsArr;
        for (var i = 0; i < scrlitems.length; i++) {
            el = scrlitems[i];
            if (clickIsInObj(e.x, e.y, el)) {
                if (el.file) {
                    el.setImage(getPressedImg(el));
                    pressedItem = el;
                    return;
                }
            }
        }
    }
    if (Scrolls && Scrolls.length > 0) {
        for (var j = 0; j < Scrolls.length; j++) {
            var scrlitems = Scrolls[j].getArrayItems();
            if (scrlitems) {
                for (var i = 0; i < scrlitems.length; i++) {
                    el = scrlitems[i];
                    if (clickIsInObj(e.x, e.y, el)) {
                        if (el.file) {
                            if (el.name != "saveItem") {
                                el.setImage(getPressedImg(el));
                            }else{ 
                                /*log(el.getImg())
                                el.setImg(el.getImg().split(".png")[0] + "_pressed.png");*/
                            }
                            pressedItem = el;
                            return;
                        }
                    }
                }
            }
        }
    }
    if (codeView && codeView.elems.length > 0) {
        var scrlitems = codeView.elems;
        for (var i = 0; i < scrlitems.length; i++) {
            el = scrlitems[i];
            if (clickIsInObj(e.x, e.y, el)) {
                if (el.file) {
                    el.setImage(getPressedImg(el));
                    pressedItem = el;
                    return;
                }
            }
        }
    }
}

function getPressedImg(el) {
    var img = el.getImage();
    if (img.split("pressed").length > 1) return img;
    var pr_img = img.split(".png")[0] + "_pressed.png";
    return pr_img;
}


//Вернет true если клик был внутри координат прямоугольника obj
function clickIsInObj(x, y, obj) {
    if (obj && obj.visible != false) {
        if (x >= obj.x && y >= obj.y)
            if (x <= obj.x + obj.w && y <= obj.y + obj.h)
                return true;
    }
    return false;
}
