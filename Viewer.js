var iEL;
var iEF;

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
    //Центр бэкргаунда
    this.backC = new point(this.backGround.x + this.backGround.w / 2, this.backGround.y + this.backGround.h / 2);
    //Текущее смещение на скроле
    this.currentShift = new point(this.backGround.x, this.backGround.y);
    //Переменная хранящяя величину увеличения
    this.zoomer = 0;

    this.getBackGround = function () {
        return this.backGround;
    }

    var getCenterElemOnScreen = function (elems, background) {
        var buff = [];
        var indx = 0;
        //Центральный элемент
        var centrElem = elems[0];
        //Буфер для разности между центрами
        var diffXBuff = background.w + background.x, diffYBuff = background.h + background.y, diffX = 0, diffY = 0;
        //Центр экрана
        var bCX = (background.x + background.w) / 2;
        var bCY = (background.y + background.h) / 2;
        //log("ЦЕНТР " + bCX + " : " + bCY);
        OOP.forArr(elems, function (el, i) {
            //Если элемент входит в бэкграунд игрового поля
            if (el.isIntersect(background)) {
                //buff.push(el);
                //Рассчитываем удаленность элемента от центра бэкграунда как сумму разностей координат по модулю
                var elC = el.getPositionC();
                diffX = Math.abs(bCX - elC.x);
                diffY = Math.abs(bCY - elC.y);
                if(diffX <= diffXBuff && diffY <= diffYBuff) {
                    indx = i > 0 ? i - 1 : i;
                    centrElem = elems[indx];
                    diffXBuff = diffX;
                    diffYBuff = diffY;
                }
                //log(indx);
            }
        });
        //log("ВСЕГО: " + elems.length + " ЦЕНТР : " + indx);
        return centrElem;
    }

    //Смещает все объекты objects на shiftX и shiftY
    this.elementsMove = function (shiftX, shiftY, dontSave, dontCheck, isCodeView) {

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
        iEL = game.newRectObject({
            x: minX,
            y: minY,
            w: elemWH,
            h: elemWH
        });
        iEF = game.newRectObject({
            x: maxX,
            y: maxY,
            w: elemWH,
            h: elemWH
        });
        if (dontCheck) {
            //Cмещаем все элементы
            OOP.forArr(this.elems, function (el) {
                //el.move(new point(shiftX, shiftY));
                if (el.setNewSize)
                    el.setNewSize(el.x + shiftX, el.y + shiftY, el.w, el.h);
                else
                    el.move(new point(shiftX, shiftY));
                if(el.textObj){
                    el.textObj = getTextObject(el,el.w);
                }
            });
            if (!dontSave) {
                this.currentShift.x = this.elems[0].x;
                this.currentShift.y = this.elems[0].y;
            }
        }
        //Проверяем, выходят ли крайние элементы поля за пределы поля
        else if ((iEL.x < bX || iEL.y < bY) || ((iEF.x + iEF.w > bX + bW) || (iEF.y + iEF.h > bY + bH))) {

            if (iEL.x + shiftX > bX) //Если левый край входит в бэкграунд
                shiftX = bX - iEL.x; //То возвращаем его на место(Он не должен заходить внутрь)
            else if (iEF.x + iEF.w + shiftX < bX + bW)
                shiftX = isCodeView ? 0 : ((bX + bW) - (iEF.x + iEF.w));

            if (iEL.y + shiftY > bY)
                shiftY = bY - iEL.y;
            else if (iEF.y + iEF.h + shiftY < bY + bH)
                shiftY = isCodeView ? 0 : ((bY + bH) - (iEF.y + iEF.h));

            //Cмещаем все элементы
            OOP.forArr(this.elems, function (el) {
                //el.move(new point(shiftX, shiftY));
                if (el.setNewSize)
                    el.setNewSize(el.x + shiftX, el.y + shiftY, el.w, el.h);
                else {
                    //el.move(new point(shiftX, shiftY));
                    el.x += shiftX;
                    el.y += shiftY;
                }
                if(el.textObj){
                    el.textObj = getTextObject(el,el.w);
                }
            });
            if (!dontSave) {
                this.currentShift.x = this.elems[0].x;
                this.currentShift.y = this.elems[0].y;
            }
        }
        //this.backGround.draw();
    }
    //Ресайзит this.elements на величину delta
    this.resizeView = function (delta, dontCheckZoomer, isCodeView) {
        //Если ресайзить нечего
        if (!this.elems || this.elems.length == 0)
            return;
        //Проверяем можно ли зумить
        if (!dontCheckZoomer) {
            //Проверяем на то чтобы не скролить меньше минимального порога
            if (this.zoomer == 0 && delta < 0) return;
            //Проверяем на то чтобы не скролить больше максимального порога
            if (delta > 0){
                //Если высота одного элемента в массиве элементов больше чем одна шестая бэкграунда то не увеличиваем больше
                if(this.elems && this.elems.length > 0 && this.elems[0].h > (this.backGround.h / 6))
                    return;
            }
            var z = this.zoomer + delta;
            if (z < 0) delta = delta + Math.abs(z);
            this.zoomer += delta;
        }
        //Начинаем ЗУМ
        //Запоминаем левую верхнюю точку бэкграунда
        var GSX = this.backGround.x;
        var GSY = this.backGround.y;
        var itemWH;
        var counterX = 0;
        var counterY = 0;
        //Запоминаем нужные параметры для сдвига в центр после ресайза
        //var cIndx = Math.floor(this.elems.length / 2);
        var cEl = getCenterElemOnScreen(this.elems, this.backGround); //this.elems[cIndx];
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
            if (el.setNewSize) {
                el.setNewSize(xl, yl, wl, hl);
            }
            else {
                el.x = xl;
                el.y = yl;
                el.w = wl;
                el.h = hl;
            }
            if(el.textObj){
                el.textObj = getTextObject(el,el.w);
            }
        });
        //log("delta : " + delta + "pozX: " + (cEl.getPositionC().x - oldX) + "pozY: " + (cEl.getPositionC().y - oldY));
        //Смещаем всю карту в центр(чтобы ресайзить в центр текущей области)
        this.elementsMove((cEl.getPositionC().x - this.backC.x) * -1, (cEl.getPositionC().y - this.backC.y) * -1, undefined, undefined, isCodeView);
    }

    //Проверяет, находятся ли объекты objs внутри квадрата области полностью. Если она за пределами - setVisible(false)
    this.checkObjsInArea = function (full) {
        var bg = this.backGround;
        var arr = [];
        var arr1 = []
        OOP.forArr(this.elems, function (el) {
            if (bg !== undefined) {
                var itm = el.getImageObject ? el.getImageObject() : el;
                var iP = itm.getPositionC();
                var bgC = new point((bg.x + bg.w) / 2, (bg.y + bg.h) / 2);
                //Рассчитываем удаленность итема от границ бэкргаунда(Если будет > 0 то итем вышел за границу)
                var d = [(bgC.x - iP.x) - (bgC.x - bg.x),//Удаленность от левой границы 0
                         (bgC.y - iP.y) - (bgC.y - bg.y),//Удаленность от верхней границы 1
                         (iP.x - bgC.x) - ((bg.x + bg.w) - bgC.x),//Удаленность от правой границы 2
                         (iP.y - bgC.y) - ((bg.y + bg.h) - bgC.y)];//Удаленность от нижней границы 3
                //Если этот итем от центра дальше чем границы бэкргаунда то меняем альфу на величину удалённости
                if(d[0] <= 0 && d[1] <= 0 && d[2] <= 0 && d[3] <= 0) {//Если итем НЕ ВЫХОДИТ за границы
                    var max = height * -1;
                    for(var i = 0 ; i < d.length; i++){
                        if(d[i] > max)
                            max = d[i];
                    }
                    //log("MIN : " + max);
                    var alpha = full ? 1 : itm.getAlpha() - max / 100;
                    itm.setAlpha(alpha);
                    if(itm.textObj) itm.textObj.setAlpha(alpha);
                }
                else{//Если вышел за границы
                    for(var i = 0 ; i < d.length; i++){
                        if(d[i] > 0){
                            var alpha = full ? 1 : itm.getAlpha() - d[i] / 100;
                            itm.setAlpha(alpha);
                            if(itm.textObj) itm.textObj.setAlpha(alpha);
                        }
                    }
                }
                if (itm.getAlpha() == 0) {
                    itm.setVisible(false);
                    if(itm.textObj) itm.textObj.setVisible(false);
                }
                else {
                    itm.setVisible(true);
                    if(itm.textObj) itm.textObj.setVisible(true);
                }
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
        allButtons.deleteButton.setVisible(false);
    }

    //Добавляет элемент с плюсиком в кодмап
    var addPlusComm = function (X, Y, WH, comm, images, commName) {
        images.push(game.newImageObject({
            x: X,
            y: Y,
            w: WH,
            h: WH,
            file: itemPlusSrc
        }));
        images[images.length - 1].setUserData({
            command: comm,
            commandName : commName,
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

            //Добавляем линии
            addLinesToMap(lX, lY, elemWH, images);
            //Позиционируем текущий элемент
            addUsualCommand(lX, lY, elemWH, images, el.imgSource, el, isOnClick);

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
                    images[images.length - 1].setUserData({
                        textObj : getTextObject(images[images.length - 1],images[images.length - 1].w)
                    });
                }
                lY += elemWH;
                if (el.commandsBlock.actions.length > 0) {

                    buildCodeMap(undefined, undefined, el.commandsBlock.actions, images, elemWH, isPlusAdd, isOnClick, true);
                    var comCount = el.commandsBlock.actions.length * elemWH;
                    // lY += comCount
                }

                //Добавляем команду с плюсиком
                if (isPlusAdd) {
                    addPlusComm(lX, lY, elemWH, el.commandsBlock.actions, images, el.name);
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
                        addPlusComm(lX, lY, elemWH, el.elseBlock.actions, images, el.name);
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
            addPlusComm(lX, lY, elemWH, lastClickedElement.commands, images, "empty");
            addLinesToMap(lX, lY, elemWH, images);
            lY += elemWH;
        }
    }

    //Метод располагающий элементы this.elems в правильном порядке
    this.createCodeMap = function (x, y, arr, isPlusAdd, isOnClick, alpha, activeELement) {
        //Если на экран выведен правый скролл то вообще нету смысла создавать кодмап
        for(var i = 0 ; i < Scrolls.length; i++){
            if(Scrolls[i].name == "RIGHT" && Scrolls[i].getArrayItems().length > 0){
                return;
            } 
        }
        
        this.clear();
        
        if(!isVerticalScreen)
            buildCodeMap(codeMapBG.x, codeMapBG.y, arr, parent.elems, this.elemWH, isPlusAdd, isOnClick, false);
        else buildCodeMap(x, y, arr, parent.elems, this.elemWH, isPlusAdd, isOnClick, false);

        if(isPlusAdd){
            allButtons.deleteButton.setVisible(true);
        }
        else allButtons.deleteButton.setVisible(false);

        //Если есть параметр alpha - то присваиваем его всем элементам
        if (alpha && alpha >= 0 && alpha <= 1 && parent.elems.length > 0) {
            //Если alpha - значит необходимо видеть весь код мап в поле видимости - поэтому перерасчитваем размеры элементов
            this.recizeAllElementsToScreen();
            this.setAlphaToElement(alpha,activeELement);
        } else {
            this.elementsMove(parent.currentShift.x - parent.backGround.x, parent.currentShift.y - parent.backGround.y, true, undefined);
        }
        //Если карта не кликабельна, то сбрасываем ресайз(потому что она сразу в максимальном размере отрисуется)
        if(!isOnClick){
            parent.zoomer = 0;
        }
        //addTextFieldsToMap(this.elemWH, parent.elems);
        //Добавляем кнопки меню элемента
        //parent.elems = parent.elems.concat(this.menu.itemsArray);
        if(alpha >= 1)
        parent.checkObjsInArea();
    }

    //Выставляет альфу всем элементам кодмапа равной disactiveAlpha и ставит альфу у activeElement = 1
    this.setAlphaToElement = function(disactiveAlpha, activeELement){
        //Меняем альфу всех элементов
        //Устанавливает alpha у элемента elem из parent.elems равной 1(Чтобы выделить ее во время исполнения команд роботом)
        if (parent.elems) {
            for (var i = 0; i < parent.elems.length; i++) {
                var el = parent.elems[i];
                //Если нашли нужную команду
                if (activeELement && el.command && el.command == activeELement) {
                    el.setAlpha(1);
                    if(el.command.name == "repeat"){
                        i += 1;
                        parent.elems[i].setAlpha(1);
                        parent.elems[i].textObj = getTextObject(parent.elems[i],this.elemWH);
                    }
                    else if(el.command.name == "repeatif" || el.command.name == "if"){
                        i += 1;
                        parent.elems[i].setAlpha(1);
                        i += 1;
                        parent.elems[i].setAlpha(1);
                    }
                }
                else el.setAlpha(disactiveAlpha);
            }
        }
    }

    //ресайзит все элементы так, чтобы они влезли в экран все
    this.recizeAllElementsToScreen = function(){
        var levels = 2;
        var YBuff = parent.elems[0].y;
        OOP.forArr(parent.elems, function (el) {
            if (YBuff != el.y) {
                YBuff = el.y;
                levels++;
            }
        });
        var sz = (parent.backGround.y + parent.backGround.h) / levels;
        if (sz > (height * 0.15)) sz = height * 0.15;
        else if (sz > parent.backGround.w) sz = parent.backGround.w;
        parent.resizeView(sz - this.elemWH, true);
        //запоминаем новый размер для элемента
        this.elemWH = parent.elems[0].w;
    }

    this.resetZoomer = function(){
        parent.zoomer = 0;
    }

    this.resizeView = function (delta, dontAddPlus,dontClick) {
        if(!parent.elems || parent.elems.length == 0) return;
        parent.resizeView(delta, undefined, true);
        //запоминаем новый размер для элемента
        this.elemWH = parent.elems[0].w;

        if (this.menu !== undefined)
            this.menu.setSettings();
        //this.elementsMove(parent.currentShift.x - parent.backGround.x, parent.currentShift.y - parent.backGround.y, true, undefined);
        this.checkObjsInArea(1);
        //Проверяем надо ли смещать код мап после ресайза(Да знаю, что для этого мы и писали универсальную функцию ресайза в родительском классе, но тут особый случай, не могу придумать способа его обрабатывать без специального кода тут)
        //Считаем разность нижней точки кодмапа с нижней точкой последнего элемента
        var lastElemDiff =(codeMapBG.y + codeMapBG.h) - (parent.elems[parent.elems.length - 1].y + parent.elems[parent.elems.length - 1].h);
        var shift = lastElemDiff;
        //Если разность больше 0 то надо сдвигать
        if(lastElemDiff > 0 ){
            //Но если после сдвига верхние жлементы сдвинутся внутрь codeMapBG то это будет неправильно поэтому проверяем
            if(parent.elems[0].y + parent.elems[0].h + lastElemDiff > codeMapBG.y){
                shift = codeMapBG.y - (parent.elems[0].y);
            }
            this.elementsMove(0,shift, true, true);
        }
        //ПАРАМЕТР alpha = -1 КАК ФЛАГ ТОГО ЧТОБЫ НЕ СБРАСЫВАТЬ ZOOMER при этом вызове функции(Исправить)
        //codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, !dontAddPlus, !dontClick, -1);
    }

    this.elementsMove = function (shiftX, shiftY, dontSave, dontCheck) {
        parent.elementsMove(shiftX, shiftY, dontSave, dontCheck, true);
        if (this.menu !== undefined)
            this.menu.setSettings();
        parent.checkObjsInArea();
    }

    this.drawCodeMap = function () {

        if (codeMapBG && isVerticalScreen && isSecondScreen) codeMapBG.draw();
        else if (!isVerticalScreen && codeMapBG) codeMapBG.draw();

        if (parent.elems && parent.elems.length > 0) {
            for(var i=0;i<parent.elems.length;i++)
                {
                    parent.elems[i].draw();
                    if(parent.elems[i].textObj)
                        parent.elems[i].textObj.draw();
                }
            this.menu.draw(); //Отрисовываем дополнительные элементы если нужно
        }
    }

    this.isClicked = function (e) {
        if (!this.menu.isClicked(e)) {
            if (!parent.isClicked(e)){
                this.resizeView(0);
                this.menu.closeMenu();
            }
            else return true;
        } else return true;

        if (clickIsInObj(e.x, e.y, codeMapBG))//clickIsInObj(e.x, e.y, parent.backGround) && parent.elems && parent.elems > 0) return true;
            return true;
        return false;
    }

    //Возврашает элемент по x,y если такого нет то вернет undefined
    this.getCommandAt = function(x,y){
        var r = undefined;
        OOP.forArr(parent.elems, function(el){
            if(clickIsInObj(x,y,el))
                r = el.command;
                return;
        });
        return r;
    }

    //Возвращает выбранный элемент
    this.getChoosenElement = function () {
        return this.menu.getElement();
    }

    this.getBackground = function () {
        return parent.backGround;
    }
}

function LabyrinthView(elements, backX, backY, backW, backH, fillCol) {
    var parent = new GraphicView(elements, backX, backY, backW, backH, fillCol);
    this.__proto__ = parent;

    this.checkGameObjects = function () {
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

    this.resizeView = function (delta) {
        //иницилизируем объекты и плеера в игровом поле
        parent.resizeView(delta);
        this.checkGameObjects();
    }

    this.elementsMove = function (shiftX, shiftY) {
        //иницилизируем объекты и плеера в игровом поле
        parent.elementsMove(shiftX, shiftY);
        this.checkGameObjects();
    }
}

//Вспомогательные функции
//Создает обьект текстового поля и возвращает его
var getTextObject = function (el, elemWH) {
    //ДОБАВИТЬ ТЕКСТОВОЕ ПОЛЕ
    if (el.command && el.command.name == "counter") {
        var count = el.command.count;
        var countStr =  count.toString();
        var obj = game.newTextObject({
            x: el.x,
            y: el.y,
            text: countStr.length > 2 ? "*" : countStr,
            size: elemWH / 2,
            padding : elemWH * 0.3,
            color: textOnCodeMapColor,
        });
        return obj;
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
    //Возвращает элемент к которому привязаны кнопки меню
    this.getElement = function () {
        return element;
    }
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
                    el.onClick();
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
            codeView.createCodeMap(codeMapBG.x, codeMapBG.y, lastClickedElement.commands, true, true);
            if(!isVerticalScreen) 
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
            itemToReplaceInCodeMap = element;
            choosenCommandInElement = findObjStorage(lastClickedElement.commands,itemToReplaceInCodeMap.command);
            initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            //описать клик замена
            initRightScroll(getAllCommandsMenu(true));
            codeView.menu.setMenuVisible(false);
        }
    });
    itemAdd.setUserData({
        onClick: function () {
            //описать клик добавление
            itemToAddAfterInCodeMap = element;
            //описать клик замена
            initRightScroll(getAllCommandsMenu(true));
            initLeftScroll(getCommandsImgArr(choosenCommandInElement));
            codeView.menu.setMenuVisible(false);
        }
    });
    this.getMenuItems = function () {
        if (this.itemsArray !== undefined && this.itemsArray.length > 0)
            return this.itemsArray;
    }

    this.setSettings = function (parent) {
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
        //Если в функцию передали родителя, то проверяем надо ли сместить все элементы вниз или вверх, чтобы меню было видно полностью
        if (parent) {
            var bG = parent.getBackground();
            var minY = bG.y + bG.h;
            var maxY = 0;
            var minX = bG.x + bG.w;
            var maxX = 0;

            OOP.forArr(this.itemsArray, function (el) {
                if (el.y + el.h > maxY) maxY = el.y + el.h;
                if (el.y < minY) minY = el.y;
                if (el.x + el.w > maxX) maxX = el.x + el.w;
                if (el.x < minX) minX = el.x;
            });
            var shiftY = 0;
            var shiftX = 0;

            if (minY < bG.y) shiftY = (minY - bG.y) * -1;
            else if (maxY > bG.y + bG.h) shiftY = (bG.y + bG.h) - maxY;

            if (minX < bG.x) shiftX = bG.x - minX;
            else if (maxX > bG.x + bG.w) shiftX = (bG.x + bG.w) - maxX;

            if (shiftY != 0 || shiftX != 0) parent.elementsMove(shiftX, shiftY, true, true);
        }
    }
    this.openMenu = function (item, parent) { //функция испотльзуеться извне, получает ссылку на элемент по которому кликнули, устанавливает позиции в соответствующих местах и включает видимость элементов
        element = item;
        //var con = findObjStorage(lastClickedElement.commands, item.command);
        this.setSettings(parent);
        this.setMenuVisible(true)
    }
    this.closeMenu = function () { //удаляем ссылку на элемент, отключаем видимость меню
        element = undefined;
        this.setMenuVisible(false);
    }
}
