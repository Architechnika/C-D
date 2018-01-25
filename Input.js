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
var touchTapTimeSpan = 200; //Промежуток времени который должен пройти в миллисекундах для перемещения предмета в скроле
var touchTapTimeFlag = false;
var touchedScroll = undefined;
var touchMovement = "NONE";

//Буфер для хранения элемента который сдвигают в нижнем скроле(чтобы вернуть его в исходное состояние если что)
var yMovedItem = new point(-1, -1);
var xMovedItem = new point(-1, -1);
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
    onUp(e);
}

function onMouseDOWN(e) {
    if (lastClickedIndx != -1 && e.which == 1) {
        clickCoord.x = e.x;
        clickCoord.y = e.y;
        //Инитим нажатый элемент если находим его
        OOP.forArr(Scrolls, function (scroll) {
            if (scroll.name == "DOWN" && clickIsInObj(clickCoord.x, clickCoord.y, scroll.GetBackGround())) {
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
}

function onWheel(e) {
    //Инитим нажатый элемент если находим его
    OOP.forArr(Scrolls, function (scroll) {
        if ((scroll.name == "DOWN" || scroll.name == "RIGHT") && clickIsInObj(e.x, e.y, scroll.GetBackGround())) {
            var itms = scroll.getArrayItems();
            OOP.forArr(itms, function (el, i) {
                if (clickIsInObj(e.x, e.y, el)) {
                    touchedScroll = scroll;
                    return;
                }
            });
        }
    });
    onMove(e);
}

function onMouseMove(e) {
    if (touchTapTimeFlag) { //Если нажата клавиша мышки в области НИЖНЕГО скрола и пользователь передвигает там элементы
        onMove(e);
        clickCoord.x = e.x;
        clickCoord.y = e.y;
    }
}

function onTouchStart(e) {
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
//------------------------------------------------
//Обработчик клика тачем или мышкой
function onUp(e) {
    //ЕСЛИ ОТКРЫТ ИНТЕРФЕЙС ВВОДА КОМАНД(ОБРАБАТЫВАЕМ СКРОЛЫ)
    if (lastClickedIndx !== -1) {
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
                } else if (scroll.name == "DOWN" && clickIsInObj(e.x, e.y, scroll.GetBackGround()) && (inputCommandStates == 0 || inputCommandStates == 4 || inputCommandStates == 5) && isScrollMove) { //ЭТО ЕСЛИ НАЖАЛИ НА НИЖНИЙ СКРОЛЛ, ЧТОБЫ ВЫБРАТЬ КОМАНДУ
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
                                //ОБРАБАТЫВАЕМ КЛИК 
                                addCommandToCell(el);
                            }
                        });
                    } else if (scroll.name == "DOWN") {
                        var elems = scroll.getArrayItems();
                        if (elems && elems.length > 0) {
                            if (touchTapTimeFlag) { //Если перемещаем итем
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
                            } else {
                                var itm = scroll.getArrayItems();
                                if (itm !== undefined) {
                                    OOP.forArr(itm, function (el, i) {
                                        if (clickIsInObj(e.x, e.y, el)) {
                                            choosenCommandInElement = field[lastClickedIndx].getCommands().length - 1 - i;
                                            addCommandToCell(el, true);
                                        }
                                    })
                                }
                            }
                        }
                    } else if (scroll.name == "LEFT") {
                        var itms = scroll.getArrayItems();
                        if (itms !== undefined && itms.length > 0) {
                            //Определяем на какой элемент он КЛИКНУЛ
                            OOP.forArr(itms, function (el) {
                                if (clickIsInObj(e.x, e.y, el)) {
                                    //ОБРАБАТЫВАЕМ КЛИК 
                                    //leftScrollBarItemsClick(el);
                                    addCommandToCell(el, true);
                                }
                            });
                        }
                    }
                } else if (e.which == 3) { //ПРАВАЯ КНОПКА МЫШИ
                    if (scroll.name == "DOWN" && scroll.getArrayItems()) {
                        //Определяем на какой элемент он КЛИКНУЛ
                        OOP.forArr(scroll.getArrayItems(), function (el, index) {
                            if (clickIsInObj(e.x, e.y, el)) {
                                //УДАЛЯЕМ КОМАНДУ ИЗ СПИСКА КОММАНД(ПОКА ВСЕГДА 0ой массив команд в стеке, потом их будет несколько)
                                removeCommandFromCell(0, index);
                                return;
                            }
                        });
                    }
                }
            }
        });
    } else {}

    if ((isMobile && !scrolled && !touchTapTimeFlag) || (!isMobile && e.which == 1 && !touchTapTimeFlag)) {
        if (!processGuiClick(e)) //Если пользователь не нажал на GUI выбора команд
            processButtonClick(e); //Если пользователь не нажал на кнопки
        processFieldClick(e); //Проверяем нажал ли пользователь на поле
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
        } else if (lastClickedIndx != -1 && touchedScroll && (touchedScroll.name == "DOWN" || touchedScroll.name == "RIGHT")) { //ОБРАБОТКА ПРОКРУТКИ ПО СКРОЛЛУ
            scrollDynamic(scrollSpeed, touchedScroll);
            scrolled = true;
        }
    } else if (touchTapTimeFlag && touchedScroll) { //ЕСЛИ МЫШКА И ПОЛЬЗОВАТЕЛЬ ПЕРЕДВИГАЕТ ЭЛЕМЕНТЫ
        var item = touchedScroll.objectEntryC(selectedItem)
        if (selectedItem.isIntersect(touchedScroll.GetBackGround())) {
            if (touchedScroll.isItemWhollyInGB(selectedItem.x + scrollSpeed.x, selectedItem.w) && selectedItem.getAlpha() < 1) {
                touchedScroll.swapItemPosition(true, selectedItem, item, selItemPos)
                if (item !== undefined)
                    swapedItem = item;
                selectedItem.x += (scrollSpeed.x);
            }
        }
    } else if (touchedScroll) { //ЕСЛИ МЫШКА И ПОЛЬЗОВАТЕЛЬ СКРОЛИТ КОЛЕСИКОМ
        scrollDynamic(new point(e.deltaY, e.deltaY), touchedScroll);
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

//Обработчик нажатий нвсе кнопки интерфейса
function processButtonClick(e) {

    if (clickIsInObj(e.x, e.y, startB)) { //КНОПКА СТАРТА/СТОПА
        startB.isPlay = !startB.isPlay;
        if (startB.isPlay) {
            //Запоминаем время начала движения робота
            startPlayerMoveTime = totalSeconds;
            //Увеличиваем счетчик попыток для прохождения
            totalAttempts++;
            setTimeout("processRobotMove()", robotMoveDelay);
        }
        else playerSetStart();
        return true;
    } else if (clickIsInObj(e.x, e.y, reloadB)) { //КНОПКА ПЕРЕЗАГРУЗКИ УРОВНЯ
        if (!startB.isPlay)
            initializeGame();
        return true;
    } else if (clickIsInObj(e.x, e.y, menuB)) { //КНОПКА МЕНЮ
        return true;
    }
    return false;
}

//Возвращает true если пользователь нажал на отображенный элемент GUI
function processGuiClick(e) {
    //Если не выбран ввод команд
    if (lastClickedIndx == -1) return false;
    //Обрабатываем кнопку ok
    if (clickIsInObj(e.x, e.y, okB)) { //Если на кнопку нажали, то скрываем весь интерфейс ввода
        if (menuStatesArr.length != 0) {
            //Удаляем верхний элемент из стека команд
            menuStatesArr.shift();
            //Если в стеке состояний не осталось больше команд, то очищаем скролы
            if (menuStatesArr.length == 0) {
                inputCommandStates = 0;
                initLeftScroll(undefined, undefined);
                initRightScroll(getAllCommandsMenu());
                initDownScroll(field[lastClickedIndx].getCommandsImagesArr());
            } else {
                //Удаляем первый элемент из стека, чтобы снова его добавить в addCommandToCell. Чутка костыль, да..но хорошо работает:)
                var unShifted = menuStatesArr.shift();
                addCommandToCell({
                    command: unShifted
                }, true);
            }
        } else {
            field[lastClickedIndx].setStroke(false); //Убираем выделение с поля
            //initDownScroll([]);//Очищаем интерфейс вывода введенных команд
            lastClickedIndx = -1; //Очищаем индекс выбранной клетки поля
            choosenCommandInElement = -1;
            isScrollMove = true; //ПО дефолту скролл(чтобы не было срабатываний на клик при первом отображении интерфейса ввода команд)
            guiLayer.clear(); //Очищаем слой с интерфейса
            startB.setVisible(true); //Показывае кнопку старт/стоп
            menuB.setVisible(true);
            inputCommandStates = 0;
        }
        return true;
    }
    return true;
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
        if (clickIsInObj(e.x, e.y, field[i].getImageObject())) {
            if (field[i].code == roadCode || field[i].code == entryCode) {
                //Перерисовываем кликнутый элемент
                setFocused(field[i], i);
                return true;
            }
        }
    }
    return false;
}


//Вернет true если клик был внутри координат прямоугольника obj
function clickIsInObj(x, y, obj) {
    if (x >= obj.x && y >= obj.y)
        if (x <= obj.x + obj.w && y <= obj.y + obj.h)
            return true;
    return false;
}
