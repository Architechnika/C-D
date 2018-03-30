var isOne = true;
var isSwaped = false;
item1Pos = new point(-1, -1);
item2Pos = new point(-1, -1);

function ScrollBar(posX, posY, orientation, arr, name) {
    //Локализуем полученные данные внутри класса
    this.name = name;
    var barPositionX = posX;
    var barPositionY = posY;
    var backGroundPosX = barPositionX;
    var backGroundPosY = barPositionY;
    var backGroundW = 0;
    var backGroundH = 0;
    var barOrientation = orientation;
    var arrayForBar = arr;
    var lineCount = 1;
    var backGroundAplha = 0.31;
    var backGround = undefined;
    var indicator = undefined;
    var scrollBarCase = undefined;
    var items = undefined;
    this.itemW = 0
    var caseVisible = false;

    if (orientation == "Vertical") {
        // backGroundH = gameSpaceH - (height - gameSpaceH);
        // backGroundW = (height - gameSpaceH)*lineCount;
        backGroundH = height; // / 100 * 100;
        backGroundW = (height / 100 * 15) * lineCount;
    }
    if (orientation == "Horizontal") {
        // backGroundW = gameSpaceW - (height - gameSpaceH);
        // backGroundH = (height - (gameSpaceY+gameSpaceH))*lineCount;
        backGroundH = (height / 100 * 15) * lineCount;
        backGroundW = height / 100 * 70;
    }
    //методы для установкии получения  координат скролл скроллБара
    this.setPosition = function (x, y) {
        barPositionX = x;
        barPositionY = y;
    }

    this.getScrollBarCase = function () {
        return scrollBarCase;
    }

    this.getPositionX = function () {
        var tmpX = barPositionX;
        return tmpX;
    }

    this.swapItems = function (item1, item2) {
        var items = this.getArrayItems();
        if (items !== undefined) {
            items.move(items.indexOf(item1), items.indexOf(item2));
            //var i =  this.sortElements(this.getArrayItems(),this.GetBackGround());
            // this.setArrayItems(i)
        }
    }

    this.swapItemPosition = function (isTuped, item1, item2, selItemPos) {
        if (isTuped) { //log("тапнули позиция выделенного элемента "+ selItemPos.x)

            if (isOne && item2 !== undefined) { //log("зашли в первый раз")
                item1Pos = selItemPos;
                isOne = false;
            }
            if (item2 !== undefined) { //log("второй элемент не андефайн меняем позиции")
                item2Pos = item2.getPositionC();
                item1.setPositionC(item2Pos);
                item2.setPositionC(item1Pos);

                if (Math.floor(item2.getPositionC().y) == Math.floor(item1Pos.y)) { //log("установили новую позицию выделенному элементу")
                    item1Pos = item1.getPositionC();
                }
                isSwaped = true;
            } //else  log("второй элемент андефайн")

        } else {
            log("отпустили тап")
            if (item1Pos.y < 0) {
                log("item1Pos < 0")
                item1.setPositionC(selItemPos);
            } else {
                if (isSwaped) {
                    item1.setPositionC(item1Pos);
                    isSwaped = false;
                } else item1.setPositionC(selItemPos);
                log("item1Pos > 0 " + item1Pos.x + " selectItemPos " + selItemPos.x)
            }
            isOne = true;
            item1.setAlpha(1);
        }

    }
    this.isItemWhollyInGB = function (itemY, itemH) {
        var bg = this.GetBackGround();
        if (itemY + 10 >= bg.w && ((itemY + itemH) - 10 <= (bg.y + bg.h)))
            return true;
        else return false;
    }
    this.objectEntryC = function (obj1) {
        var item;
        var objX = Math.floor(obj1.getPositionC().y);
        var items = this.getArrayItems();
        if (items !== undefined) {
            var rectW = 20;
            OOP.forArr(items, function (el, i) {
                if (el != obj1) {
                    var elX = Math.floor(el.getPositionC().y);
                    if ((objX < elX + rectW && objX > elX - rectW)) {
                        item = el;
                    }
                }
            });
            return item;
        }
    }
    this.getPositionY = function () {
        var tmpY = barPositionY;
        return tmpY;
    }
    //
    this.setWidthScroll = function (w) {
        backGround.setWidth(w)
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    this.setHeightScroll = function (h) {
        backGround.setHeight(h)
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    //методы для работы с массивом элементов скролл бара
    this.setArrayItems = function (arrayItems) {
        arrayForBar = arrayItems;
    }

    this.initArrayItems = function (arrayToInit) {
        //arrayForBar = arrayToInit;
        items = this.sortElements(arrayToInit, backGround.getBackGround());
        this.setArrayItems(items);
        indicator = new Indicator(backGround.getBackGround());
    }
    this.getArrayItems = function () {
        var tmpArray = arrayForBar;
        return tmpArray;
    }
    this.AddItem = function (item) {
        if (imte.type == "ImageObject()") //проверяем тип объекта, который передали для добавления
        {
            arrayForBar.push(item);
            items = this.sortElements(arrayForBar, backGround.getBackGround());
            this.setArrayItems(items);
        } else
            log("Тип передоваемого объекта не  ImageObject()");
    }
    this.getItem = function (i) {
        if (arrayForBar.length > 0 && (arrayForBar.length - 1) >= i)
            return arrayForBar[i];
        else
            log("Всего элементов в массиве: " + arrayForBar.length + " Вы хотете получить из массива: " + i + " Элемент, правильно?");
    }
    this.removeItem = function (i) {
        if (arrayForBar.length > 0 && (arrayForBar.length - 1) >= i) {
            arrayForBar.splice(i, 1);
            items = this.sortElements(arrayForBar, backGround.getBackGround());
            this.setArrayItems(items);
        } else
            log("Всего элементов в массиве: " + arrayForBar.length + " Вы хотете удалить из массива: " + i + " Элемент, правильно?");
    }
    this.isEmptyBarArray = function () {
        if (arrayForBar === undefined || arrayForBar.length <= 0)
            return true;
        else return false;
    }
    //
    this.getIndicator = function () {
        var tmpInd = indicator;
        return tmpInd;
    }
    //Задний фон скороллбара, кнему будут привязаны элементы движения, изчезнования будут зависить от него, это не просто обычный фон, это основа бара
    function BackGround(x, y, w, h) {
        var bgX = x;
        var bgY = y;
        var bgW = w;
        var bgH = h;
        var alpha = 1;

        //      /e1edeb
        var bgColor = "#000000";
        if (orientation == "Vertical") {
            bgW *= lineCount;
        }
        if (orientation == "Horizontal") {
            bgH *= lineCount;
        }
        var tmpBackGround = game.newRoundRectObject({
            x: bgX,
            y: bgY,
            w: bgW,
            h: bgH,
            radius: 0,
            fillColor: bgColor
        });
        this.setWidth = function (w) {
            tmpBackGround.w = w;
            //       items = sortElements(arrayForBar,this.GetBackGround());
            // indicator = new Indicator(this.GetBackGround());
            // this.setArrayItems(items);
        }
        this.setHeight = function (h) {
            tmpBackGround.h = h;
        }
        this.setX = function (x) {
            tmpBackGround.x = x;
        }
        this.setY = function (y) {
            tmpBackGround.y = y;
        }
        this.setColor = function (color) {
            tmpBackGround.fillColor = color;
        }
        this.setAlphaBG = function (alph) {
            if (alph >= 0 && alph <= 1)
                tmpBackGround.setAlpha(alph);
        }
        this.getBackGround = function () {
            return tmpBackGround;
        }
        this.getActivityArea = function () {
            var area = game.newRoundRectObject({
                x: bgX,
                y: bgY - bgH,
                w: bgW + oneTileWidth,
                h: bgH * 3,
                radius: 20,
                fillColor: bgColor
            });
            return area;
        }
    }
    //кейс для скроллБара на вход получаем задний фон Скролла и левую и правую картинку дальше рисуем кейс соответствующим методом
    //внимание!! рисовать кейс для бара нужно обязательно на слове выше чем сам скроллБар
    function ScrollBarrCase(scrollBackGround, leftImg, rightImg) {
        var X = scrollBackGround.x;
        var Y = scrollBackGround.y;
        var W = scrollBackGround.w;
        var H = scrollBackGround.h;
        var LImg = leftImg;
        var RImg = rightImg;
        var tmpH = 0;
        var tmpX = 0;
        var tmpY = 0;
        var tmpW = 0;
        if (orientation == "Vertical") {
            tmpH = H;
            tmpW = W;
            tmpY = Y + H + W;
        }
        if (orientation == "Horizontal") {
            tmpH = H;
            tmpW = W;
            tmpY = Y;
        }

        this.setLeftImg = function (img) {
            /*if(img === undefined)
              img = game.newImageObject({x: 0, y: 0, h: 0, w: 0, file: nonePath});*/
            img.x = X;
            img.y = Y - tmpW;
            img.h = tmpW;
            img.w = tmpW;
            LImg = img;
        }
        this.setRightImg = function (img) {
            img.x = X;
            //scrollBackGround.h -= tmpW;
            //H = scrollBackGround.h;
            img.y = H + tmpW;
            img.h = tmpW;
            img.w = tmpW;
            RImg = img;
        }
        this.setLeftImgVisible = function (visible) {
            LImg.setVisible(visible);
        }
        this.setRightImgVisible = function (visible) {
            RImg.setVisible(visible);
        }

        this.getLeftImg = function () {
            var tmpLImg = LImg;
            return tmpLImg;
        }
        this.getRightImg = function () {
            var tmpRImg = RImg;
            return tmpRImg;
        }
        this.getImgWidth = function () {
            return tmpH;
        }
        if (LImg == undefined) {
            var tmp = game.newImageObject({
                x: 0,
                y: 0,
                h: 0,
                w: 0,
                file: nonePath
            });
            this.setLeftImg(tmp);
        } else this.setLeftImg(LImg);
        if (RImg == undefined) {
            var tmp = game.newImageObject({
                x: 0,
                y: 0,
                h: 0,
                w: 0,
                file: nonePath
            });
            this.setRightImg(tmp);
        } else this.setRightImg(RImg);

        this.DrawCase = function () {
            if (LImg != undefined)
                LImg.draw();
            if (RImg != undefined)
                RImg.draw();
        }
    }
    //индикатор который показывает сколько в скоролле элементов полоской, на вход получает задний фон скролла и по соответствии него рисует полоску
    function Indicator(scrollBackGround) {
        var X = 0;
        var Y = 0;
        var W = 0;
        var H = 0;
        var barBackGroud = undefined;
        var bar = undefined;
        var tmpW = 0;
        var tmpH = 0;

        if (orientation == "Vertical") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpW = 5;
            tmpH = H;
        }
        if (orientation == "Horizontal") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpW = W;
            tmpH = 5;
        }

        this.setBarAlpha = function (alpha) {
            if (indicator != undefined) {
                if (alpha >= 0 && alpha <= 1)
                    bar.setAlpha(alpha);
            }
        }
        this.setBarBackGroundAlpha = function (alpha) {
            if (barBackGroud != undefined) {
                if (alpha >= 0 && alpha <= 1)
                    barBackGroud.setAlpha(alpha);
            }
        }

        this.setBarReletion = function () {
            if (arrayForBar === undefined || arrayForBar.length == 0) return;
            if (orientation == "Horizontal")
                bar.w *= backGround.getBackGround().w / ((arrayForBar.length * (backGround.getBackGround().h / lineCount)) / lineCount);
            else if (orientation == "Vertical")
                bar.h *= backGround.getBackGround().h / ((arrayForBar.length * (backGround.getBackGround().w / lineCount)) / lineCount);
        }

        this.getBar = function () {
            if (bar != undefined)
                return bar;
        }
        this.setX = function (x) {
            bar.x = x;
            barBackGroud.x = x;
        }

        bar = game.newRoundRectObject({
            x: X,
            y: Y,
            h: H,
            w: W,
            radius: 8,
            fillColor: "red"
        });

        bar.h = tmpH;
        this.setBarReletion();
        //bar.y = Y + H - bar.h;
        if (name == "LEFT")
            bar.y = Y + H - bar.h;
        else bar.y = Y
        bar.w = tmpW;
        bar.x = (scrollBackGround.x + scrollBackGround.w) - bar.w;
        if (orientation == "Horizontal")
            barBackGroud = game.newRoundRectObject({
                x: scrollBackGround.x,
                y: bar.y,
                h: tmpH,
                w: tmpW,
                radius: 8,
                fillColor: "#ffba42"
            });
        else barBackGroud = game.newRoundRectObject({
            x: bar.x,
            y: Y,
            h: tmpH,
            w: tmpW,
            radius: 8,
            fillColor: "#ffba42"
        });

        this.DrawIndicator = function () {
            if (arrayForBar != undefined) {
                if (barOrientation == "Vertical") {
                    var tmp = (backGround.getBackGround().w / lineCount) * arrayForBar.length / lineCount; //видемые элементы, если больше то врубаем скролл
                    if (tmp > backGround.getBackGround().h) {
                        barBackGroud.draw();
                        bar.draw();
                    }
                } else {
                    var tmp = (backGround.getBackGround().h / lineCount) * arrayForBar.length / lineCount; //видемые элементы, если больше то врубаем скролл
                    if (tmp > backGround.getBackGround().w) {
                        barBackGroud.draw();
                        bar.draw();
                    }
                }
            }
        }
    }

    this.setLineCount = function (count) {
        lineCount = count;
        backGround = new BackGround(backGroundPosX, backGroundPosY, backGroundW, backGroundH);
        items = this.sortElements(arrayForBar, backGround.getBackGround());
        indicator = new Indicator(backGround.getBackGround());
        this.setArrayItems(items);
        backGround.setAlphaBG(backGroundAplha);
        this.scrollUpdate(0);
    }
    this.getLineCount = function () {
        var tmpCount = lineCount;
        return tmpCount;
    }
    this.scrollToEnd = function () {
        if (arrayForBar !== undefined) {
            var BGRx = backGround.getBackGround().y + backGround.getBackGround().h;
            var lastItemRx = arrayForBar[0].y + arrayForBar[0].h;
            var dw = 0;
            if (BGRx !== undefined && lastItemRx !== undefined) {
                if (lastItemRx > BGRx) {
                    dw = lastItemRx - BGRx;
                    OOP.forArr(arrayForBar, function (el) {
                        el.move(point(0, -dw));
                        if (el.isIntersect(backGround.getBackGround())) {
                            el.setVisible(true);
                        } else el.setVisible(false)
                    });
                }
            }
        }
    }
    this.sortElements = function (array, scrollBackGround) {
        if (array === undefined || array.length <= 0)
            return;
        var X = 0;
        var Y = 0;
        var W = 0;
        var H = 0;
        var oldX = 0;
        var oldY = 0;
        var tmpH = 0;
        var tmpX = 0;
        var bgW = scrollBackGround.w;
        var bgH = scrollBackGround.h;
        var scrollLineCount = lineCount;
        var sortArr = array;
        var arrMediana = Math.ceil(sortArr.length / scrollLineCount);
        var itemHW = 0;
        if (orientation == "Vertical") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            if (this.name != "LEFT") {
                if (!isVerticalScreen)
                    scrollBackGround.h = (gameSpaceX + gameSpaceH) - 1;
            }
            tmpH = W;
            //  tmpH =  (gameSpaceY+gameSpaceH)- (height / 100 * 15)
            oldX = Y;
            oldY = X;
            tmpX = Y;
        }
        if (orientation == "Horizontal") {
            X = scrollBackGround.x;
            Y = scrollBackGround.y;
            W = scrollBackGround.w;
            H = scrollBackGround.h;
            tmpH = H;
            oldX = X;
            oldY = Y;
            tmpX = X;
        }
        //считываем сколько процентов размер беграунда составляет от общего размера, делим на 10 и берем по меньшей части через floor это и будет количество строк элементов
        if (tmpH >= (height / 100 * 40)) {
            //if(!isVerticalScreen)
            //{
            var d = tmpH * 100 / width;
            if (!isVerticalScreen)
                d = Math.floor(d / 10);
            else d = Math.floor(d / 20);
            scrollLineCount = d;
            lineCount = d;
            //}
            arrMediana = Math.ceil(sortArr.length / scrollLineCount);
        }
        itemHW = tmpH / scrollLineCount;
        this.itemW = itemHW;
        //
        var iter = 0;
        var rowCount = 1;
        OOP.forArr(sortArr, function (el, i) {
            iter++;
            el.w = itemHW;
            el.h = itemHW;
            if (orientation == "Vertical") {
                el.x = oldY;
                el.y = oldX;
                if (iter % scrollLineCount == 0) {
                    rowCount++;
                    oldY = X - itemHW;
                    oldX += itemHW
                    iter = 0;
                }
                oldY += itemHW;
                if (lineCount > 1) {}
            } else {
                el.x = oldX;
                el.y = oldY;
                oldX += itemHW;
            }
            if (el.isIntersect && !el.isIntersect(backGround.getBackGround())) {
                el.setVisible(false);
            }
        });
        return sortArr;
    }
    this.GetBackGround = function () {
        if (backGround != undefined) {
            return backGround.getBackGround();
        }
    }
    //ВОЗВРАЩАЕТ ОБЛАСТЬ ВОКРУГ ЗАДНЕГО ФОНА СКРОЛА
    this.GetActivityArea = function () {
        if (backGround != undefined) {
            return backGround.getActivityArea();
        }
    }

    this.getOrientation = function () {
        var tmpOrin = barOrientation;
        return tmpOrin;
    }

    this.setCaseVisible = function (visible) {
        if (lineCount == 1) {
            if (visible) {
                if (orientation == "Vertical") {
                    backGround.setY(backGroundPosY + backGroundW);
                }
                if (orientation == "Horizontal") {
                    backGround.setX(backGroundPosX + backGroundH);
                }
                scrollBarCase = new ScrollBarrCase(this.GetBackGround());
                items = this.sortElements(arrayForBar, this.GetBackGround());
                indicator = new Indicator(this.GetBackGround());
                this.setArrayItems(items);
                caseVisible = true;
            } else {
                caseVisible = false;
            }
        }
    }

    this.isCaseVisible = function () {
        return caseVisible;
    }

    backGround = new BackGround(backGroundPosX, backGroundPosY, backGroundW, backGroundH);
    if (arrayForBar != undefined) {
        items = this.sortElements(arrayForBar, this.GetBackGround());
        indicator = new Indicator(this.GetBackGround());
        this.setArrayItems(items);
    }
    backGround.setAlphaBG(backGroundAplha);

    this.scrollUpdate = function (scrollVal) {
        if (!this.isEmptyBarArray()) {
            var rXElLast = arrayForBar[0].x + arrayForBar[0].w; // координаты правого верхнего по Х  угла 0 элемент
            var rYElLast = arrayForBar[0].y + arrayForBar[0].w;
            var FrsElemX = arrayForBar[arrayForBar.length - 1].x;
            var FrsElemY = arrayForBar[arrayForBar.length - 1].y;
            var rXBG = backGround.getBackGround().x + backGround.getBackGround().w; // координаты правого верхнегопо Х заднего
            var rYBG = backGround.getBackGround().y + backGround.getBackGround().h;
            var dx = 0;
            var dy = 0;
            var ctxtW = (arrayForBar.length / lineCount) * arrayForBar[0].w;
            var ctxtH = arrayForBar.length / lineCount * arrayForBar[0].w;
            indicator.setBarAlpha(1);
            this.lastElRX = rXElLast;
            this.fristElX = FrsElemX;
            //обход всех дочерных элементов (графические элементы меню)
            OOP.forArr(arrayForBar, function (el) {
                if (barOrientation === "Horizontal") {
                    if (scrollVal.x > 0) {
                        if (FrsElemX < backGround.getBackGround().x) {
                            dx = scrollVal.x * scrollSpeed;
                            if (FrsElemX + dx > backGround.getBackGround().x) {
                                dx = 0;
                            }
                        }
                    } else if (scrollVal.x < 0) {
                        if (rXElLast >= rXBG) {
                            dx = scrollVal.x * scrollSpeed;
                            if (rXElLast + dx < rXBG) {
                                var dSpeed = rXBG - (rXElLast + dx)
                                dx = 0;
                            }
                        }
                    }
                    el.x += dx; // перемещаем элементы по Х с динамической скорость
                    if (el.isIntersect(backGround.getBackGround())) {
                        el.setVisible(true);
                    } else el.setVisible(false)
                } else {
                    if (scrollVal.y > 0) {
                        if (FrsElemY < backGround.getBackGround().y) {
                            dy = scrollVal.y * scrollSpeed;
                            if (FrsElemY + dy > backGround.getBackGround().y) {
                                dy = 0;
                            }
                        }
                    } else if (scrollVal.y < 0) {
                        if (rYElLast >= rYBG) {
                            dy = scrollVal.y * scrollSpeed;
                            if (rYElLast + dy < rYBG) {
                                var dSpeed = rYBG - (rYElLast + dy);
                                dy = 0;
                            }
                        }
                    }
                    el.y += dy;

                    if (el.isIntersect(backGround.getBackGround())) {
                        el.setVisible(true);
                    } else el.setVisible(false)
                    //            if(el.y < backGround.getBackGround().y)
                    //                {
                    //                    el.transparent(-0.1)
                    //                }
                    //            if((el.y+el.h) > backGround.getBackGround().y + backGround.getBackGround().h)
                    //                {
                    //                    el.transparent(-0.1)
                    //                }
                }
            });


            indicator.getBar().x += (this.GetBackGround().w / 100) * -((dx / ctxtW) * 100);
            indicator.getBar().y += (this.GetBackGround().h / 100) * -((dy / ctxtH) * 100);
        }
    }


    this.DrawScrollBar = function () {
        this.GetBackGround().draw();
        if (arrayForBar != undefined) {
            OOP.forArr(arrayForBar, function (el) {
                if(el.isInCameraStatic()) {
                    el.draw();
                }
            });
            indicator.DrawIndicator();
        }
        if (this.isCaseVisible()) {
            scrollBarCase.DrawCase();
        }
    }
}
