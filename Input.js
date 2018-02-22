/*
Скрипт для функций ввода. Обрабатывает touch и мышку. Клики тапы скролы и тд.
*/

var isMobile = false; //Флаг того, мобильное ли у нас устройство или ПК(инициализируется в Logic)
var isDowned = false; //Флаг того, что пользователь нажал на один из скролов и держит
var isScrollMove = false; //Флаг для того, чтобы отличать скролл от тапа
var scrolled = false; //Флаг того, что пользовател зажал тач и начал скролить
var clickCoord = new point(0, 0);
var isTup = false;
var selectedItem = undefined;
var swapedItem = undefined;
var selItemPos = new point(-1, -1);
var touchTapTimeStamp = undefined;
var touchTapTimeSpan = 100; //Промежуток времени который должен пройти в миллисекундах для перемещения предмета в скроле
var touchTapTimeFlag = false;
var touchedScroll = undefined;
var touchMovement = "NONE";
var labIsMove = false,
    codeMapIsMoved = false;
//Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var yMovedItem = new point(-1, -1);
var xMovedItem = new point(-1, -1);
var scrollStep = 20; //Шаг скрола в пикселях
//Отменяем вывод контестного меню на страничке
document.oncontextmenu = function () {
    return false
};

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
    e.cancelBubble = true;
    labIsMove = false;
    codeMapIsMoved = false;
    onUp(e);
}

function onMouseDOWN(e) {
    clickCoord.x = e.x;
    clickCoord.y = e.y;
    if (e.which == 1 && inputCommandStates == 1) {
        //Инитим нажатый элемент если находим его
        OOP.forArr(Scrolls, function (scroll) {
            if (scroll.name == "LEFT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
                var itms = scroll.getArrayItems();
                if (itms && itms.length > 0) {
                    OOP.forArr(itms, function (el, i) {
                        if (clickIsInObj(clickCoord.x, clickCoord.y, el)) {
                            //Запоминаем время начала тапа
                            touchTapTimeStamp = Date.now();
                            touchTapTimeFlag = false;
                            touchedScroll = undefined;
                            selectedItem = scroll.getItem(i);
                            selItemPos = selectedItem.getPositionC();
                            touchedScroll = scroll;
                            //Отсчитываем время чтобы отделить нажатие от скрола
                            onTouchTimeTimer();
                            return;
                        }
                    });
                }
            }
        });
    }
    if (e.which == 3) { //Если нажали правой кнопкой мышки и указатель в области лабиринта
        OOP.forArr(field, function (el) {
            if (clickIsInObj(e.x, e.y, el.getImageObject())) {
                labIsMove = true;
                return;
            }
        });
        if (clickIsInObj(e.x, e.y, codeView.backGround)) {
            codeMapIsMoved = true;
            return;
        }
    }
}

function onWheel(e) {
    var isInLab = true;
    //Инитим нажатый элемент если находим его
    OOP.forArr(Scrolls, function (scroll) {
        if ((scroll.name == "LEFT" || scroll.name == "RIGHT") && clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            OOP.forArr(itms, function (el, i) {
                if (clickIsInObj(e.x, e.y, el)) {
                    touchedScroll = scroll;
                    return;
                }
            });
        }
    });
    if (clickIsInObj(e.x, e.y, labView.getBackGround())) {
        labView.resizeView(e.deltaY < 0 ? -1 * scrollStep : scrollStep);
        return;
    }
    if (clickIsInObj(e.x, e.y, codeView.getBackGround()) && inputCommandStates == 0) {
        codeView.resizeView(e.deltaY < 0 ? -1 * scrollStep : scrollStep);
        return;
    }
    onMove(e);
}

function onMouseMove(e) {
    if (codeMapIsMoved || labIsMove || touchTapTimeFlag) { //Если нажата клавиша мышки в области НИЖНЕГО скрола и пользователь передвигает там элементы
        onMove(e);
    }
    clickCoord.x = e.x;
    clickCoord.y = e.y;
}

function onTouchStart(e) {
    isMobile = true;
    var arrs = touch.getTouches();
    log(arrs.length)
    clickCoord.x = e.changedTouches[0].clientX;
    clickCoord.y = e.changedTouches[0].clientY;
    if (lastClickedIndx != -1) {
        touchedScroll = undefined;
        //Инитим нажатый элемент если находим его
        OOP.forArr(Scrolls, function (scroll) {
            if (scroll.name == "DOWN" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
                var itms = scroll.getArrayItems();
                if (itms && itms.length > 0) {
                    OOP.forArr(itms, function (el, i) {
                        if (clickIsInObj(clickCoord.x, clickCoord.y, el)) {
                            //Запоминаем время начала тапа
                            touchTapTimeStamp = Date.now();
                            selectedItem = scroll.getItem(i);
                            selItemPos = selectedItem.getPositionC();
                            touchedScroll = scroll;
                            //Отсчитываем время чтобы отделить нажатие от скрола
                            onTouchTimeTimer();
                            return;
                        }
                    });
                }
            } else if (scroll.name == "RIGHT" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
                touchedScroll = scroll;
            }
        });
    }
}

function onTouchEnd(e) {
    clickCoord.x = 0;
    clickCoord.y = 0;
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    onUp(e);
    selectedItem = undefined;
}

function onTouchMove(e) {
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    onMove(e);
    clickCoord.x = e.x;
    clickCoord.y = e.y;
}

function onUp(e) {
    var clicked = false;
    OOP.forArr(Scrolls, function (scroll) {
        if (isMobile) { //Если есть тач
            //Если пользователь начал сдвигать элемент из нижнего скрола чтобы удалить
            if (scroll.name == "DOWN" && yMovedItem.x != -1 && touchTapTimeFlag) {
                //Если элемент вытащили за пределы фона скрола, то удаляем его из списка
                if (!selectedItem.isIntersect(scroll.GetBackGround())) {
                    //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД(ПОКА ВСЕГДА 0ой массив команд в стеке, потом их будет несколько)
                    removeCommandFromCell(0, yMovedItem.x);
                } else { //ВОЗВРАЩАЕМ ЕГО К ИСХОДНОМУ СОСТОЯНИЮ
                    selectedItem.y = yMovedItem.y;
                    selectedItem.setAlpha(1)
                }
                //Очищаем буфер для объекта который сдвигали
                yMovedItem = new point(-1, -1);
                scrolled = true;
            }
            if (scroll.name == "DOWN" && selectedItem !== undefined && touchTapTimeFlag) {
                scroll.swapItemPosition(false, selectedItem, undefined, selItemPos)
                if (swapedItem !== undefined) {
                    scroll.swapItems(selectedItem, swapedItem);
                    //Реинициализации команд в текущем выбранном элемента
                    if (menuStatesArr.length > 0) {
                        //menuStatesArr[0].addCommands(scroll.getArrayItems(), true, 0)
                        var mass = [];
                        OOP.forArr(scroll.getArrayItems(), function (el) {
                            mass.push(el.command);
                        })
                        if (menuStatesArr[0].name == "if" && menuStatesArr[0].redacted == "else")
                            menuStatesArr[0].elseBlock.actions = mass;
                        else menuStatesArr[0].commandsBlock.actions = mass;
                    } else field[lastClickedIndx].addCommands(scroll.getArrayItems(), true);

                    swapedItem = undefined;
                }
            } else if (scroll.name == "DOWN" && clickIsInObj(e.x, e.y, scroll.GetBackGround()) && (inputCommandStates == 0 || inputCommandStates == 4 || inputCommandStates == 5) && !scrolled) { //ЭТО ЕСЛИ НАЖАЛИ НА НИЖНИЙ СКРОЛЛ, ЧТОБЫ ВЫБРАТЬ КОМАНДУ
                var itm = scroll.getArrayItems();
                if (itm !== undefined && itm.length > 0) {
                    OOP.forArr(itm, function (el, i) {
                        if (clickIsInObj(e.x, e.y, el)) {
                            if (el.command.name == "repeatif" || el.command.name == "repeat" || el.command.name == "if") {
                                var elL = field[lastClickedIndx].getCommands().length;
                                if (menuStatesArr.length !== 0) {
                                    if (menuStatesArr[0].name == "if" && menuStatesArr[0].redacted == "else")
                                        elL = menuStatesArr[0].elseBlock.actions.length;
                                    else elL = menuStatesArr[0].commandsBlock.actions.length;
                                }
                                choosenCommandInElement = elL - 1 - i;
                                addCommandToCell(el, true);
                            }
                        }
                    })
                }
            }

            //ОРАБОТКА СКРОЛЛА ВЫБОРА КОМАНД
            if (clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
                if (scroll.name == "RIGHT") { //ПРАВЫЙ СКРОЛЛ ВВОДА ПРОСТЫХ КОМАНД
                    //ЕСЛИ МЫ ОПРЕДЕЛИЛИ ЧТО ПОЛЬЗОВАТЕЛЬ КЛИКНУЛ ПО ЭЛЕМЕНТУ
                    if (!isScrollMove) {
                        //var pos = touch.getPosition();
                        //Определяем на какой элемент он КЛИКНУЛ
                        OOP.forArr(scroll.getArrayItems(), function (el) {
                            if (clickIsInObj(e.x, e.y, el)) {
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
            if (scroll.name == "LEFT" && clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
                var elems = scroll.getArrayItems();
                if (elems !== undefined && elems.length > 0) {
                    if (!isScrollMove) {
                        //var pos = touch.getPosition();
                        //Определяем на какой элемент он КЛИКНУЛ
                        OOP.forArr(elems, function (el) {
                            if (clickIsInObj(e.x, e.y, el)) {
                                //ОБРАБАТЫВАЕМ КЛИК
                                //leftScrollBarItemsClick(el);
                                addCommandToCell(el, true);
                            }
                        });
                    }
                    isScrollMove = false;
                    return;
                }
            }
        } else { //Если МЫШКА

            if (e.which == 1) { //ЛЕВАЯ КНОПКА МЫШИ
                if (scroll.name == "RIGHT") { //ОБРАБОТКА КЛИКОВ ПО СКРОЛ БАРУ СО СПИСКОМ КОММАНД
                    //Определяем на какой элемент он КЛИКНУЛ
                    OOP.forArr(scroll.getArrayItems(), function (el) {
                        if (clickIsInObj(e.x, e.y, el)) {
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
                        if (touchTapTimeFlag) { //Если перемещаем итем
                            scroll.swapItemPosition(false, selectedItem, undefined, selItemPos)
                            if (swapedItem !== undefined) {
                                scroll.swapItems(selectedItem, swapedItem);
                                swapedItem = undefined;
                            }
                        }
                    }
                }
            }
        }
    });

    if (!clicked && e.which == 1) { //Если клик не был обнаружен выше
        if (!allButtons.checkButtonsClicked(e))
            if (!codeView.isClicked(e))
                processFieldClick(e);
    }
    scrolled = false;
    touchTapTimeFlag = false;
    touchMovement = "NONE";
}

//Обработчик свайпов и скролов колесиком мышки
function onMove(e) {
    var scrollSpeed = new point((e.x - clickCoord.x) / 1, (e.y - clickCoord.y) / 1);
    if (isMobile) {
        //Если перетаскиваем элементы
        if (touchTapTimeFlag && touchedScroll) {
            if (Math.abs(scrollSpeed.y) > Math.abs(scrollSpeed.x) && touchMovement != "HOR") { //Обработка удаления
                //Запоминаем первоначальный Y этого элемента
                if (yMovedItem.x == -1) {
                    yMovedItem.x = touchedScroll.getArrayItems().indexOf(selectedItem);
                    yMovedItem.y = selectedItem.y;
                }
                //Сдвигаем элемент туда куда двигают
                //Если элемент вытащили ещё не слишком далеко, то продолжаем его вытаскивать
                if (selectedItem.isIntersect(touchedScroll.GetActivityArea())) {
                    selectedItem.y += scrollSpeed.y;
                    log(selectedItem.y);
                }
                touchMovement = "VERT";
            } else if (touchMovement != "VERT") { //Обработка перетаскивания
                var item = touchedScroll.objectEntryC(selectedItem)
                if (selectedItem.isIntersect(touchedScroll.GetBackGround())) {
                    if (touchedScroll.isItemWhollyInGB(selectedItem.x + scrollSpeed.x, selectedItem.w) && selectedItem.getAlpha() < 1) {
                        touchedScroll.swapItemPosition(true, selectedItem, item, selItemPos)
                        if (item !== undefined)
                            swapedItem = item;
                        selectedItem.x += (scrollSpeed.x);
                    }
                }
                touchMovement = "HOR";
            }
        } else if (lastClickedIndx != -1 && touchedScroll && (touchedScroll.name == "LEFT" || touchedScroll.name == "RIGHT")) { //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
            scrollDynamic(scrollSpeed, touchedScroll);
            scrolled = true;
        }
    } else if (touchTapTimeFlag && touchedScroll) { //ЕСЛИ МЫШКА И ПОЛЬЗОВАТЕЛЬ ПЕРЕДВИГАЕТ ЭЛЕМЕНТЫ
        var item = touchedScroll.objectEntryC(selectedItem)
        if (selectedItem.isIntersect(touchedScroll.GetBackGround())) {
            if (touchedScroll.isItemWhollyInGB(selectedItem.y + scrollSpeed.y, selectedItem.h) && selectedItem.getAlpha() < 1) {
                touchedScroll.swapItemPosition(true, selectedItem, item, selItemPos)
                if (item !== undefined)
                    swapedItem = item;
                selectedItem.y += (scrollSpeed.y);
            }
        }
    } else if (touchedScroll) { //ЕСЛИ МЫШКА И ПОЛЬЗОВАТЕЛЬ СКРОЛИТ КОЛЕСИКОМ
        scrollDynamic(new point(e.deltaY * -1, e.deltaY * -1), touchedScroll);
    }
    //Если пользователь скролит игровое поле
    if (labIsMove) {
        labView.elementsMove(scrollSpeed.x, scrollSpeed.y);
    }
    //Если пользователь скролит карту кода
    if (codeMapIsMoved) {
        codeView.elementsMove(scrollSpeed.x, scrollSpeed.y);
    }
}

function onTouchTimeTimer() {
    if (Date.now() - touchTapTimeStamp > touchTapTimeSpan) {
        touchTapTimeFlag = true;
        if (selectedItem !== undefined)
            selectedItem.setAlpha(0.7)
        return;
    } else if (scrolled) return;
    setTimeout("onTouchTimeTimer()", 40);
}

//Обработчики всех кликабельных элементов---------------------------
function onOkBClick() { //Вернет TRUE если надо закрыть кнопку OK
    if(infoText.isVisible()) infoText.close();
    initRightScroll([]);
    //lastClickedIndx = -1; //Очищаем индекс выбранной клетки поля
    choosenCommandInElement = undefined;
    isScrollMove = true; //ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)
    guiLayer.clear(); //Очищаем слой с интерфейса
    //Проверяем надо ли совсем закрывать интерфейс ввода
    if (inputCommandStates > 0) {
        //Инициализируем карту кода
        codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
        //field[lastClickedIndx].setStroke(false); //Убираем выделение с поля
        inputCommandStates = 0;
        return false;
    }
    initLeftScroll([]);
    //Инициализируем карту кода
    codeView.createCodeMap(0, 0, lastClickedElement.commands, false, false);
    field[lastClickedIndx].setStroke(false); //Убираем выделение с поля
    return true;
}

//КНОПКА СТАРТА/СТОПА
function startBClick() {
    isStarted = !isStarted;
    if (isStarted) {
        //Запоминаем время начала движения робота
        startPlayerMoveTime = totalSeconds;
        //Увеличиваем счетчик попыток для прохождения
        totalAttempts++;
        setTimeout("processRobotMove()", robotMoveDelay);
    }
    return true;
}

//КНОПКА МЕНЮ
function menuBClick() {
    clearAllLayers();
    game.setLoop('menu');
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

function onCodeMapElementClick(element) {

    if (element.name && element.name == "plus") {
        choosenCommandInElement = element.command;
        addCommandToCell(element, true);
        return;
    }

    choosenCommandInElement = findObjStorage(lastClickedElement.commands, element.command);
    if (!choosenCommandInElement) return;

    if (element.command.name == "blockA" || element.command.name == "whatisit" || element.command.name == "blockB" || element.command.name == "counter") {
        addCommandToCell(element, true);
        codeView.menu.closeMenu(element);
    } else {
        codeView.menu.openMenu(element);
    }
}

function onChooseCommandClick(el) {
    //ОБРАБАТЫВАЕМ КЛИК
    addCommandToCell(el);
}

//Обработчик для ввода с цифр
function onKeyboardClick(el){
    var count = el.command.name != "backspace" ? el.command.value : -1;
    var text = choosenCommandInElement.countBlock.count == 0 ? "" : choosenCommandInElement.countBlock.count.toString();
    if(count != -1){//Если элемент добавляют        
        if(text.length < 4){
            text = text + count.toString();
        }
    }
    else if(text.length > 0) text = text.substring(0, text.length - 1)//Если стирают
    var parsedInt = parseInt(text);
    parsedInt = isNaN(parsedInt) ? 0 : parsedInt;
    //Инитим текст в блок итераций
    choosenCommandInElement.countBlock.count = parsedInt;
    //Задаем текст в текст бокс
    infoText.setText(text);
}
//------------------------------------------------------------------

//Возвращает true если пользователь нажал на отображенный элемент GUI
function processGuiClick(e) {
    //Обрабатываем кнопку ok
    if (clickIsInObj(e.x, e.y, okB)) { //Если на кнопку нажали, то скрываем весь интерфейс ввода
        return okB.onClick();
    }
    return false;
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


//Вернет true если клик был внутри координат прямоугольника obj
function clickIsInObj(x, y, obj) {
    if (obj && obj.visible != "false") {
        if (x >= obj.x && y >= obj.y)
            if (x <= obj.x + obj.w && y <= obj.y + obj.h)
                return true;
    }
    return false;
}
