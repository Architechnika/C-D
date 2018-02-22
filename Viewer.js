var lineImg = "img/line.png";
//Базовый класс в иерархии классов View
function GraphicView(elements, backX, backY, backW, backH, fillCol) {
    //Массив графических обьектов
    this.elems = elements;
    //Обьект заднего фона
    this.backGround = game.newRectObject({
        x: backX,
        y: backY,
        w: backW,
        h: backH,
        fillColor: fillCol
    });
    var bgX = this.backGround.x;
    var bgY = this.backGround.y;
    var bgW = this.backGround.w;
    var bgH = this.backGround.h;

    this.currentShift = new point(bgX, bgY);
    this.zoomer = 0;

    this.getBackGround = function () {
        return this.backGround;
    }
    //Смещает все объекты objects на shiftX и shiftY
    this.elementsMove = function (shiftX, shiftY, dontSave) {

        if (!this.elems || this.elems.length == 0 || (shiftX == 0 && shiftY == 0))
            return;
        var bX = this.backGround.x;
        var bY = this.backGround.y;
        var bW = this.backGround.w;
        var bH = this.backGround.h;

        var minX = bX,
            minY = bY,
            maxX = bX,
            maxY = bY,
            elemWH = this.elems[0].w; //Такак как все элементы у нас квадратные и одинаковые по размеру запоминаем размер самого первого
        //Ищем левый верхний и правый нижний элементы
        OOP.forArr(this.elems, function (el) {
            if (el.x < minX) minX = el.x;
            if (el.y < minY) minY = el.y;
            if (el.x > maxX) maxX = el.x;
            if (el.y > maxY) maxY = el.y;
        });
        //iEF - правый нижний элемент квадрата
        //iEL - левый верхний элемент квадрата
        var iEL = game.newRectObject({
            x: minX,
            y: minY,
            w: elemWH,
            h: elemWH
        });
        var iEF = game.newRectObject({
            x: maxX,
            y: maxY,
            w: elemWH,
            h: elemWH
        });

        //Проверяем, выходят ли крайние элементы поля за пределы поля
        if ((iEL.x < bX || iEL.y < bY) || ((iEF.x + iEF.w > bX + bW) || (iEF.y + iEF.h > bY + bH))) {

            if (iEL.x + shiftX > bX) //Если левый край входит в бэкграунд
                shiftX = bX - iEL.x; //То возвращаем его на место(Он не должен заходить внутрь)
            else if (iEF.x + iEF.w + shiftX < bX + bW)
                shiftX = ((bX + bW) - (iEF.x + iEF.w) < 10) ? (bX + bW) - (iEF.x + iEF.w) : 0;
            //shiftX = 0;

            if (iEL.y + shiftY > bY)
                shiftY = bY - iEL.y;
            else if (iEF.y + iEF.h + shiftY < bY + bH)
                shiftY = ((bY + bH) - (iEF.y + iEF.h) < 10) ? (bY + bH) - (iEF.y + iEF.h) : 0;

            //Cмещаем все элементы
            OOP.forArr(this.elems, function (el) {
                //el.move(new point(shiftX, shiftY));
                if (el.setNewSize)
                    el.setNewSize(el.x + shiftX, el.y + shiftY, el.w, el.h);
                else
                    el.move(new point(shiftX, shiftY));
            });
            if (!dontSave) {
                this.currentShift.x = this.elems[0].x;
                this.currentShift.y = this.elems[0].y;
            }
        }
        this.backGround.draw();
    }
    //Ресайзит this.elements на величину delta
    this.resizeView = function (delta) {
        //Если ресайзить нечего
        if (!this.elems || this.elems.length == 0)
            return;
        //Проверяем можно ли зумить
        if (delta > 0 && this.zoomer < 5) {
            this.zoomer++;
        } else if (delta < 0 && this.zoomer > 0) {
            this.zoomer--;
        } else if (this.zoomer == 0 || this.zoomer == 5) return;
        //Начинаем ЗУМ
        //Запоминаем левую верхнюю точку бэкграунда
        var GSX = this.backGround.x;
        var GSY = this.backGround.y;
        var itemWH;
        var counterX = 0;
        var counterY = 0;
        //Запоминаем нужные параметры для сдвига в центр после ресайза
        var cIndx = Math.floor(this.elems.length / 2);
        var cEl = this.elems[cIndx].getImageObject ? this.elems[cIndx].getImageObject() : this.elems[cIndx];
        var oldX = this.backGround.x + this.backGround.w / 2; //cEl.getPositionC().x;
        var oldY = this.backGround.y + this.backGround.h / 2; //cEl.getPositionC().y;
        var xl, yl, wl, hl;
        //Обходим все элементы массива
        OOP.forArr(this.elems, function (el, i) {
            //el = el.getImageObject ? el.getImageObject() : el;
            itemWH = el.w;
            //Увеличиваем ширину и высоту
            wl = el.w + delta;
            hl = el.h + delta;
            //Рассчитываем сдвиг элемента (его расстояние от левого верхнего угла бэкграунда / ширину элемента ДО изменения размера)
            counterX = (el.x - GSX) / itemWH;
            counterY = (el.y - GSY) / itemWH;
            //Сдвигаем элемент на нужное число
            xl = el.x + (counterX * delta);
            yl = el.y + (counterY * delta);
            //Изменяем размер элемента
            if (el.setNewSize)
                el.setNewSize(xl, yl, wl, hl);
            else {
                el.x = xl;
                el.y = yl;
                el.w = wl;
                el.h = hl;
            }
        });
        //Смещаем всю карту в центр(чтобы ресайзить в центр текущей области)
        this.elementsMove((cEl.getPositionC().x - oldX) * -1, (cEl.getPositionC().y - oldY) * -1);
    }

    //Проверяет, находятся ли объекты objs внутри квадрата области полностью. Если она за пределами - setVisible(false)
    this.checkObjsInArea = function () {
        var bg = this.backGround;
        var arr = [];
        var arr1 = []
        OOP.forArr(this.elems, function (el) {
            if (bg !== undefined) {
                var itm = el.getImageObject ? el.getImageObject() : el;
                if ((itm.getPositionC().x < bg.x) || (itm.getPositionC().y < bg.y) || (itm.getPositionC().x > (bg.x + bg.w)) || (itm.getPositionC().y > (bg.y + bg.h)))
                    itm.setAlpha(itm.getAlpha() - 1);
                else itm.setAlpha(itm.getAlpha() + 1);
                if (itm.getAlpha() == 0)
                    itm.setVisible(false)
                else itm.setVisible(true)
            }
        });
    }

    //Проверяет входят ли координаты e.x и e.y в один из элемент в this.elems и вызывает обработчик если входят
    this.isClicked = function (e) {
        var result = false;
        if (this.elems && this.elems.length > 0) {
            OOP.forArr(this.elems, function (el) {
                if (clickIsInObj(e.x, e.y, el)) {
                    if (el.onClick)
                        el.onClick(el);
                    result = true;
                    return;
                }
            });
        }
        return result;
    }
}

//Класс описывающий карту кода
function CodeMapView(backX, backY, backW, backH, fillCol) {
    var parent = new GraphicView([], backX, backY, backW, backH, fillCol);
    this.__proto__ = parent;
    this.elemWH = backW * 0.1;
    var lX = backX;
    var lY = backY;
    this.menu = new ItemMenu();

    this.setElements = function (elements) {
        parent.elems = elements;
    }

    this.clear = function () {
        parent.elems.splice(0, parent.elems.length);
        this.menu.closeMenu();
    }

    //Добавляет элемент с плюсиком в кодмап
    var addPlusComm = function (X, Y, WH, comm, images) {
        images.push(game.newImageObject({
            x: X,
            y: Y,
            w: WH,
            h: WH,
            file: itemPlusSrc
        }));
        images[images.length - 1].setUserData({
            command: comm,
            onClick: function (el) {
                onCodeMapElementClick(el);
            }
        });
        images[images.length - 1].name = "plus";
    }

    //Добавляет линии в строку в кодмап
    var addLinesToMap = function (X, Y, WH, images) {
        //Создаем линии для блоков команд
        for (var j = X; j >= parent.backGround.x + WH; j -= WH) {
            images.push(game.newImageObject({
                x: j - WH,
                y: Y,
                w: WH,
                h: WH,
                file: lineImg
            }));
        }
    }

    //Добавляет команду в код мап
    var addUsualCommand = function (X, Y, WH, images, imgSrc, comm, isOnClick) {
        //Позиционируем текущий элемент
        images.push(game.newImageObject({
            x: X,
            y: Y,
            w: WH,
            h: WH,
            file: imgSrc,
        }));
        images[images.length - 1].setUserData({
            command: comm
        });
        if (isOnClick)
            images[images.length - 1].setUserData({
                onClick: function (el) {
                    onCodeMapElementClick(el);
                }
            });
        images[images.length - 1].strokeWidth = 100;
    }

    var buildCodeMap = function (x, y, arr, images, elemWH, isPlusAdd, isOnClick, isActions) {
        this.images = [];
        if (x !== undefined && y !== undefined) {
            lX = x;
            lY = y
        }
        //Алгоритм построения элементов в виде карты кода
        for (var i = 0; i < arr.length; i++) {

            var el = arr[i];
            if (!el) continue;

            //Позиционируем текущий элемент
            addUsualCommand(lX, lY, elemWH, images, el.imgSource, el, isOnClick);
            //Добавляем линии
            addLinesToMap(lX, lY, elemWH, images);

            //Если сложная команда
            if (el.commandsBlock) {
                //Позиционируем el.img
                if (el.name == "if" || el.name == "repeatif") {
                    lX += elemWH;
                    var imgS = el.blockA.lookCommand ? el.blockA.lookCommand.imgSource : el.blockA.imgSource;
                    //Позиционируем blockA текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, imgS, el.blockA, isOnClick);
                    lX += elemWH;
                    //Позиционируем blockB текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.blockB.imgSource, el.blockB, isOnClick);
                    lX -= elemWH;
                } else if (el.name == "repeat") {
                    lX += elemWH;
                    //Позиционируем countBlock текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.countBlock.imgSource, el.countBlock, isOnClick);
                    //ДОБАВИТЬ ТЕКСТОВОЕ ПОЛЕ
                }
                lY += elemWH;
                if (el.commandsBlock.actions.length > 0) {

                    buildCodeMap(undefined, undefined, el.commandsBlock.actions, images, elemWH, isPlusAdd, isOnClick, true);
                    var comCount = el.commandsBlock.actions.length * elemWH;
                    // lY += comCount
                }

                //Добавляем команду с плюсиком
                if (isPlusAdd) {
                    addPlusComm(lX, lY, elemWH, el.commandsBlock.actions, images);
                    addLinesToMap(lX, lY, elemWH, images);
                    lY += elemWH;
                }

                lX -= elemWH;
                if (el.name == "if") {
                    //Добавляем линии
                    addLinesToMap(lX, lY, elemWH, images);
                    //Позиционируем elseBlock текущего элемента
                    addUsualCommand(lX, lY, elemWH, images, el.elseBlock.imgSource, el.elseBlock, isOnClick);
                    lY += elemWH;
                    lX += elemWH;
                    //Если в elseblock есть команды то добавляем их
                    if (el.elseBlock.actions.length > 0) {
                        buildCodeMap(undefined, undefined, el.elseBlock.actions, images, elemWH, isPlusAdd, isOnClick, true);
                        var elseComCount = el.elseBlock.actions.length * elemWH;
                    }

                    //Добавляем команду с плюсиком
                    if (isPlusAdd) {
                        addPlusComm(lX, lY, elemWH, el.elseBlock.actions, images);
                        addLinesToMap(lX, lY, elemWH, images);
                        lY += elemWH;
                    }

                    lX -= elemWH;

                }
            } else {
                lY += elemWH;
            }
        };
        //Добавляем команду с плюсиком в начало если элементов нету
        if (isPlusAdd && !isActions) {
            addPlusComm(lX, lY, elemWH, lastClickedElement.commands, images);
            addLinesToMap(lX, lY, elemWH, images);
            lY += elemWH;
        }
    }

    //Метод располагающий элементы this.elems в правильном порядке
    this.createCodeMap = function (x, y, arr, isPlusAdd, isOnClick, alpha, activeELement) {
        this.clear();
        log(parent.currentShift.x + " : " + parent.currentShift.y);
        //buildCodeMap(arr, parent.elems, this.lX, this.lY, this.elemWH, isPlusAdd, isOnClick);
        buildCodeMap((gameSpaceX + gameSpaceW), 0, arr, parent.elems, this.elemWH, isPlusAdd, isOnClick, false);
        //Если есть параметр alpha - то присваиваем его всем элементам
        if (alpha && alpha >= 0 && alpha <= 1) {
            OOP.forArr(parent.elems, function (el) {
                el.setAlpha(alpha);
            });
            //Устанавливает alpha у элемента elem из parent.elems равной 1(Чтобы выделить ее во время исполнения команд роботом)
            if (activeELement) {
                if (parent.elems && parent.elems.length > 0) {
                    for (var i = 0; i < parent.elems.length; i++) {
                        var el = parent.elems[i];
                        //Если нашли нужную команду
                        if (el.command && el.command == activeELement) {
                            el.setAlpha(1);
                            return;
                        }
                    }
                }
            }
        } else {
            /*var yMax = 0;
            var xMax = 0;
            OOP.forArr(parent.elems, function(el){
                if(el.y > yMax) yMax = el.y;
                if(el.x > xMax) xMax = el.x;
            });
            var dP = parent.backGround.y + parent.backGround.h;
            var rP = parent.backGround.x + parent.backGround.w;
            var shX=0,shY=0;
            if(xMax > rP) shX = dP - (xMax + this.elemWH);
            if(yMax > dP) shY = dP - (yMax + this.elemWH);
            if(shX != 0 || shY != 0) this.elementsMove(shX,shY);*/
            this.elementsMove(parent.currentShift.x - parent.backGround.x, parent.currentShift.y - parent.backGround.y, true);
        }
        //Добавляем кнопки меню элемента
        //parent.elems = parent.elems.concat(this.menu.itemsArray);
        parent.checkObjsInArea();
    }

    this.resizeView = function (delta) {
        parent.resizeView(delta);
        //запоминаем новый размер для элемента
        this.elemWH = parent.elems[0].w;

        if (this.menu !== undefined)
            this.menu.setSettings();
        parent.checkObjsInArea();
    }

    this.elementsMove = function (shiftX, shiftY) {
        parent.elementsMove(shiftX, shiftY);
        if (this.menu !== undefined)
            this.menu.setSettings();
        parent.checkObjsInArea();
    }

    this.drawCodeMap = function () {
        if (parent.elems && parent.elems.length > 0) {
            OOP.drawArr(parent.elems); //Отрисовываем все команды
            this.menu.draw(); //Отрисовываем дополнительные элементы если нужно
        }
    }

    this.isClicked = function (e) {
        if (clickIsInObj(e.x, e.y, parent.backGround)) {
            if (!this.menu.isClicked(e)) {
                if (!parent.isClicked(e))
                    this.menu.closeMenu();
            }
            return true;
        }
    }
    return false;
}

function LabyrinthView(elements, backX, backY, backW, backH, fillCol) {
    var parent = new GraphicView(elements, backX, backY, backW, backH, fillCol);
    this.__proto__ = parent;

    var checkGameObjects = function () {
        OOP.forArr(gameObjects, function (coin) {
            if (parent.elems[coin.position].visible) {
                coin.setNewPosition(coin.position);
            } else coin.setVisible(false);
        });
        if (parent.elems[playerPozition].visible) {
            playerImageObj.x = parent.elems[playerPozition].x;
            playerImageObj.y = parent.elems[playerPozition].y;
            playerImageObj.w = parent.elems[playerPozition].w;
            playerImageObj.h = parent.elems[playerPozition].h;
            playerImageObj.setVisible(true);
        } else playerImageObj.setVisible(false);
    }

    this.resizeView = function (delta) { //иницилизируем объекты и плеера в игровом поле
        parent.resizeView(delta);
        checkGameObjects();
    }

    this.elementsMove = function (shiftX, shiftY) { //иницилизируем объекты и плеера в игровом поле
        parent.elementsMove(shiftX, shiftY);
        checkGameObjects();
    }
}

//Функция возвращает массив команд в котором находится obj. Из иерархии массивов container
var findObjStorage = function (container, obj) {
    for (var i = 0; i < container.length; i++) {
        var el = container[i];
        //Проверяем на поиск вложения(ситуации когда искомый обьект - blockA,blockB или countBlock)
        if (el == obj) {
            //Если нашли искомый обьект, то возвращаем его
            return container;
        } else if (el.name == "if" || el.name == "repeatif") {
            if (obj.name == "blockA" || obj.name == "whatisit")
                if (el.blockA == obj)
                    return el;
            if (obj.name == "blockB")
                if (el.blockB == obj)
                    return el;
        } else if (el.name == "repeat") {
            if (obj.name == "counter")
                if (el.countBlock == obj)
                    return el;
        }
        //Если в команде есть массив команд то рекурсивно вызваем функцию для этого массива
        if (el.commandsBlock) {
            if (el.commandsBlock.actions.length > 0) {
                //Рекурсивно вызываем функцию поиска
                var res = findObjStorage(el.commandsBlock.actions, obj);
                //Если функция вернет результат, то возвращаем его
                if (res) return res;
            }
            if (el.elseBlock && el.elseBlock.actions.length > 0) {
                //Рекурсивно вызываем функцию поиска
                var res = findObjStorage(el.elseBlock.actions, obj);
                //Если функция вернет результат, то возвращаем его
                if (res) return res;
            }
        }
    }
    //Если обошли все и ненагли искомый обьект то возвращаем undefined
    return undefined;
}

function ItemMenu() {
    //создаем элементы для кнопок
    var itemDelete = game.newImageObject({
        file: itemDeleteSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemMove = game.newImageObject({
        file: itemMoveSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemReplace = game.newImageObject({
        file: itemReplaceSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    var itemAdd = game.newImageObject({
        file: itemAddSrc,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        visible: false
    });
    //
    //массив для хранения всех кнопок, для дальнейшго обхода по ним в поиске клика
    this.itemsArray = [];
    //переменная для хранения ссылки на объект по которому кликнули
    var element = undefined;
    this.itemsArray.push(itemDelete);
    this.itemsArray.push(itemMove);
    this.itemsArray.push(itemReplace);
    this.itemsArray.push(itemAdd);
    //отключаем видимость кнопок
    // this.setMenuVisible(false);
    //рисуем кнопки
    // OOP.drawArr(itemsArray);
    this.setMenuVisible = function (visible) {
        if (this.itemsArray !== undefined) {
            OOP.forArr(this.itemsArray, function (el) {
                el.setVisible(visible)
            })
        }
    }

    this.draw = function () {
        OOP.drawArr(this.itemsArray);
    }

    this.isClicked = function (e) {
        var result = false;
        if (this.itemsArray && this.itemsArray.length > 0) {
            OOP.forArr(this.itemsArray, function (el) {
                if (el.visible && clickIsInObj(e.x, e.y, el)) {
                    el.onClick(el);
                    result = true;
                    return;
                }
            });
        }
        return result;
    }

    itemDelete.setUserData({
        onClick: function () {
            //описать клик удаление
            var stor = findObjStorage(lastClickedElement.commands, element.command);
            OOP.delObject(stor, element.command);
            codeView.menu.setMenuVisible(false);
            codeView.createCodeMap(0, 0, lastClickedElement.commands, true, true);
            initLeftScroll(getCommandsImgArr(stor));
        }
    });
    itemMove.setUserData({
        onClick: function () {
            //описать клик перемещение
        }
    });
    itemReplace.setUserData({
        onClick: function () {
            //описать клие замена
        }
    });
    itemAdd.setUserData({
        onClick: function () {
            //описать клик добавление
        }
    });
    this.getMenuItems = function () {
        if (this.itemsArray !== undefined && this.itemsArray.length > 0)
            return this.itemsArray;
    }

    this.setSettings = function () {
        if (element !== undefined) {
            var x = element.x;
            var y = element.y;
            var WH = element.w;
            OOP.forArr(this.itemsArray, function (el) {
                el.w = WH;
                el.h = WH;
            });
            itemMove.x = x - WH;
            itemMove.y = y - WH;
            itemReplace.x = x + WH;
            itemReplace.y = y - WH;
            itemAdd.x = x - WH;
            itemAdd.y = y + WH;
            itemDelete.x = x + WH;
            itemDelete.y = y + WH;
        }
    }
    this.openMenu = function (item) { //функция испотльзуеться извне, получает ссылку на элемент по которому кликнули, устанавливает позиции в соответствующих местах и включает видимость элементов
        element = item;
        //var con = findObjStorage(lastClickedElement.commands, item.command);
        this.setSettings();
        this.setMenuVisible(true)
    }
    this.closeMenu = function () { //удаляем ссылку на элемент, отключаем видимость меню
        element = undefined;
        this.setMenuVisible(false);
    }
}
