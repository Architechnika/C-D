/*Содержит методы и данные для работы с картой лабиринта и его генерации.
 */

var roadCode = '7'; //Представление элемента дороги в виде числа
var borderCode = '0'; //Представление элемента внешних стенок в виде числа
var entryCode = '8'; //Представление элемента входа в лаюиринт в виде числа
var exitCode = '9'; //Представление элемента выхода из лабиринта в виде числа
var wallCode = '1'; //Всего доступно 3 типа стенок внутри игры КОДЫ 1,2,3
//Коды игровых предметов
var coinCode = '4'; //КОД МОНЕТКИ

//Массив содержащий игровые код всех игровых элементов
var allGameItemsCode = [roadCode, borderCode, coinCode, exitCode, entryCode, wallCode];

//Разрешение одного тайла на поле
var oneTileWidth = 100;
var oneTileHeight = 100;
//Переменная для хранения бинарного представления поля
var binMap = null;
//Массив хранящий игровые объекты(монетки)
var gameObjects = new Array();
var myScripts = new Array(); //массив сохраненных пользователем скриптов
var saveItems = [] //сохраненные скрипты как итемы
var optimalRoute = [];

var entrySide = "NONE" //Хранит местоположение входа в лабиринте - необходимо для инициализации робота

var field = new Array(); //Массив хранящий экземпляры fieldElement, представляющие элементы поля

//Класс описывающий элемент поля. Содержит в себе элементы для графической части, и массив команд.
function fieldElement(imgSource, comm, elemcode, fx, fy, fw, fh) {
    //Параметры элемента
    this.code = elemcode;
    this.commands = comm;
    this.commandsImgs = undefined;
    this.isCommandsReaded = false;
    this.isStroke = false;

    //Объекты изображений
    //Объект который хранит графическое представление элемента с исходным изображением
    //var this.__proto__ = newImageObj(this.imgSrc, fx, fy, fw, fh);
    this.__proto__ = newImageObj(imgSource, fx, fy, fw, fh);
    this.parent = this.__proto__;

    //Добавляем обработчик на клик если этот элемент дорога либо вход
    if (this.code == roadCode || this.code == entryCode) {
        this.setUserData({
            onClick: function (index) { //index - индекс элемента в массиве где он хранится
                audio_field_click.play();
                return labyrinthRoadClick(index)
            }
        });
    }

    //Задает полностью новое изображение для элемента
    this.setNewImageSrc = function (src) {
        this.__proto__.file = imgPath;
    }

    //Задает файл с картинкой элемента
    this.setNewSourceImage = function (imgPath) {
        this.imgSrc = imgPath;
        this.__proto__ = newImageObj(this.imgSrc, this.__proto__.x, this.__proto__.y, this.__proto__.w, this.__proto__.h);
    }

    //Задает размер элемента
    this.setNewSize = function (x, y, w, h) {
        this.__proto__.x = x;
        this.__proto__.y = y;
        this.__proto__.w = w;
        this.__proto__.h = h;
    }

    //Возвращает текущее графическое представление элемента по исходному изображению
    this.getImageObject = function () {
        return this.__proto__;
    }

    //Отрисовывает элемент на экране
    this.draw = function () {
        this.__proto__.draw();
        if (this.__proto__.strokeWidth !== 0) {
            this.__proto__.drawStaticBox();
        }
    }

    //Задает наличие выделения элемента.(Нужно для отображения когда добавляем команды на поле)
    this.setStroke = function (isStroke) {
        this.isStroke = isStroke;
        if (this.isStroke) {
            //this.__proto__.strokeWidth = 100;
            this.__proto__.setAlpha(0.8)
        } else {
            this.__proto__.setAlpha(1)
            //this.__proto__.strokeWidth = 0;
        }
    }
    //Возвращает массив ImageObject-ов элементов команд по заданному index из стека
    this.getCommandsImagesArr = function () {
        var result = [];
        OOP.forArr(this.commands, function (comm) {

            var obj = game.newImageObject({
                file: comm.imgSource,
                x: 0,
                y: 0,
                w: 15,
                h: 15
            });

            obj.setUserData({
                command: comm
            });
            result.push(obj);
        });
        return result;
    }

    //Возвращает общее число команд в этом элементе
    this.getTotalCommands = function () {
        return this.commands.length;
    }

    //Удаляем indexElem элемент из indexMass массива
    this.removeCommand = function (indexElem) {
        //Потому что индексация в графике идет с начала списка, а тут - с конца
        var indx = this.commands.length - 1 - indexElem;
        //log("Индекс в командах : " + indx);
        //Удаляем элемент
        this.commands.splice(indx, 1);
    }

    //Полностью очищает стек команд элемента
    this.commandsClear = function () {
        this.commands = new Array();
    }

    this.getTopCommand = function (isRead) {
        if (this.commands[0]) {
            var result = this.commands.length - 1;
            if (isRead !== undefined && isRead)
                if (isRead !== undefined && isRead) {
                    if (this.isCommandsReaded && this.code != entryCode) return undefined;
                    this.isCommandsReaded = true;
                }
            return result;
        }
    }

    //Если isDelete = true - то он удаляется
    this.getCommands = function (isRead) {
        //Если флаг не поставлен то просто возвращаем команды
        if (!isRead) return this.commands;
        //Если читаем команды с флагом, то надо пометить что они уже были считаны
        if (this.isCommandsReaded) return [];
        //Помечаем считанные команды
        this.isCommandsReaded = true;
        return this.commands;
    }

    //Добавляет elem в массив комманд
    this.addCommand = function (elem) {
        if (this.commands) {
            this.commands.push(elem);
        }
    }

    //comms - массив ImageObjectов с данными в commands
    this.addCommands = function (comms, isClear) {
        if (isClear) //Если удаляем предыдущие элементы
            this.commands = new Array();
        for (var i = 0; i < comms.length; i++)
            this.commands.unshift(comms[i].command);
    }

    //Создает новый ImageObject этого элемента - приватный метод
    function newImageObj(src, X, Y, W, H) {
        var res = game.newImageObject({
            file: src,
            x: X,
            y: Y,
            w: W,
            h: H
        });
        res.file = src;
        return res;
    }
}

//Перерасчитывает размеры существующего поля
function calcField(w, h, x, y, elemsInLine, elemsInColumn) {

    oneTileWidth = w / elemsInLine; //Расчет ширины одного элемента
    oneTileHeight = h / elemsInColumn; //Расчет высоты одного элемента
    //Обходим все элементы лабиринта
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: binMap
        },
        function (S, X, Y, W, H) {
            //Извлекаем старый элемент
            var element = field.shift();
            var img = element.imgSrc;
            var comm = element.commands;
            //На его место добавляем новый
            var newElem = new fieldElement(img, comm, S, X + x, Y + y, oneTileWidth, oneTileHeight);
            if (element.this.__proto__ectSource.strokeWidth != 0)
                newElem.setStroke(true);
            field.push(newElem);
        });
    if (gameObjects !== undefined)
        for (var i = 0; i < gameObjects.length; i++)
            gameObjects[i].setSize(field[gameObjects[i].position]);
}

//Смещает всю карту в нужный размер
function calcMapPosition() {
    oneTileWidth = gameSpaceW / totalWidth; //Расчет ширины одного элемента
    oneTileHeight = gameSpaceH / totalHeight; //Расчет высоты одного элемента
    var poz = new point(gameSpaceX, gameSpaceY);
    var counter = 0;
    //Обходим все элементы поля
    for (var i = field.length - 1; i > -1; i--) {
        field[i].setNewSize(poz.x, poz.y, oneTileWidth, oneTileHeight);
        counter++;
        //Если надо сместить координаты на строку вниз
        if (counter == totalWidth) {
            poz.x = gameSpaceX;
            poz.y += oneTileHeight;
            counter = 0;
        } else poz.x += oneTileWidth; //Если это следующий элемент в строке поля
    }
}

function generateMap(w, h, x, y, elemsInLine, elemsInColumn, isNewGraphic) {
    isNewGraphic = isNewGraphicLab;
    oneTileWidth = w / elemsInLine; //Расчет ширины одного элемента
    oneTileHeight = h / elemsInColumn; //Расчет высоты одного элемента
    //Получаем массив сгенерированного поля
    binMap = genBin(elemsInColumn, elemsInLine, [], [], [0, 0]);
    var newGraphicMap = undefined;
    if(isNewGraphic){
        //log(binMap);
        newGraphicMap = graphicsMapSort(binMap);
        //log(newGraphicMap);
    }
    var codes = new Array();
    var indx = 0;
    //Обходим каждый элемент сгенерированного поля и создаем объекты характеризующие элементы поля
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: binMap
        },
        function (S, X, Y, W, H) {
            codes.push(S);
        }
    );
    //Обходим каждый элемент сгенерированного поля и создаем объекты характеризующие элементы поля
    pjs.levels.forStringArray({
            w: oneTileWidth,
            h: oneTileHeight,
            source: isNewGraphic ? newGraphicMap : binMap
        },
        function (S, X, Y, W, H) {
            var img = "";
            var comm = new Array();
            if (codes[indx] == entryCode) {
                if (entrySide == "DOWN") comm.push(COMMANDS[1]);
                else if (entrySide == "UP") comm.push(COMMANDS[2]);
                else if (entrySide == "LEFT") comm.push(COMMANDS[4]);
                else if (entrySide == "RIGHT") comm.push(COMMANDS[3]);
                comm[0].undeletable = true; //Делаем эту команду неудаляемой
            }
            for (var i = 0; i < graphicsImgs.length; i++) {
                if (S == graphicsImgs[i].code.toString()) {
                    img = graphicsImgs[i].value;
                }
            }
            var fEl = new fieldElement(img, comm, codes[indx], X + x, Y + y, oneTileWidth, oneTileHeight);
            indx++;
            //Заполняем массив элементов лабиринта
            field.push(fEl);
        });
    //Рассчитываем оптимальный маршрут для прохождения
    optimalRoute = getOptimalLabRoute(field, binMap);
    //ГЕНЕРИМ МЕСТОПОЛОЖЕНИЕ ИГРОВЫХ ОБЪЕКТОВ ЕСЛИ НАДО
    if (totalTokensOnMap !== 0) {
        gameObjects = new Array();
        var roadElems = new Array();
        //Индексируем все элементы дороги на поле
        OOP.forArr(field, function (el, i) {
            if (el.code == roadCode)
                roadElems.push(i);
        });
        //Защита от того, чтобы вдруг не случилось так чтобы все боле было усыпано монетками
        var total = totalTokensOnMap > (roadElems.length / 3) ? roadElems.length / 3 : totalTokensOnMap;
        //Ставим в случайных точках карты монетки
        for (var i = 0; i < total; i++) {
            var rndIndx = getRandomInt(0, roadElems.length);
            var obj = new CoinBattery("coin", coinCode, roadElems[rndIndx], coinPath, true);
            roadElems.splice(rndIndx, 1);
            gameObjects.push(obj);
        }
    }
}

//Генерит лабиринт в виде строк с кодами элементов поля
function genBin(hate, width, maze, walls, currentPosition) {
    //7 - дорога, 0 - стена, 1,2,3 другие стены, 8 - вход, 9 - выход
    hate = hate % 2 == 0 ? hate + 1 : hate;
    width = width % 2 == 0 ? width + 1 : width;
    hate -= 2;
    width -= 2;

    var mazeTmp = [];
    for (var y = 0; y < hate + 2; y++) {
        maze[y] = [];
        mazeTmp[y] = [];
        for (var x = 0; x < width + 2; maze[y][x++] = borderCode) {
            mazeTmp[y][x] = borderCode;
        }
    }

    function amaze(y, x, addBlockWalls) {
        maze[y][x] = roadCode;
        //log(y + " " + x);
        if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x] == borderCode)) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x] == borderCode)) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1] == borderCode)) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1] == borderCode)) walls.push([y, x - 1, [y, x]]);
    }

    function valid(a, b) {
        return (a < hate && a >= 0 && b < width && b >= 0) ? true : false;
    };
    amaze(currentPosition[0], currentPosition[1], true);

    while (walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
        if (valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]] == roadCode) walls.splice(walls.indexOf(randomWall), 1);
            else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);
        } else walls.splice(walls.indexOf(randomWall), 1);
    }

    for (var i = 1; i < mazeTmp.length - 1; i++) {
        for (var j = 1; j < mazeTmp.length - 1; j++) {
            mazeTmp[i][j] = maze[i - 1][j - 1];
            if (mazeTmp[i][j] == borderCode) {
                mazeTmp[i][j] = wallCode; //Генерит случайную стенку внутри лабиринта КОДЫ 1 2 3
            }
        }
    }

    //Генерим местоположение входа и выхода из лабиринта
    var indx = 0;
    //Рэндомим вход или выход
    var isEntry = getRandomInt(0, 2) == 1;
    //Если вход/выход будет на левой и правой стенке
    if (getRandomInt(0, 2) == 1) {

        //Инициализируем местоположение входа
        if (isEntry) entrySide = "LEFT";
        else entrySide = "RIGHT";

        //Генерим рэндомный индекс из левой стенки для входа
        indx = getRandomInt(1, mazeTmp.length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[indx][1] != roadCode) indx++;
        //Ставим вход или выход на левую стенку
        mazeTmp[indx][0] = isEntry ? entryCode : exitCode;

        //Генерим рэндомный индекс из правой стенки для входа
        indx = getRandomInt(1, mazeTmp.length - 2);
        //Проверяем, чтобы прямо пере элементом не было стены
        if (mazeTmp[indx][mazeTmp[0].length - 2] != roadCode) indx++;
        //Ставим вход или выход на правую стенку
        mazeTmp[indx][mazeTmp[0].length - 1] = isEntry ? exitCode : entryCode;
    } else { //Если вход и выход будет на верхней и нижней стенке

        //Инициализируем местоположение входа
        if (isEntry) entrySide = "UP";
        else entrySide = "DOWN";

        //Генерим рэндомный индекс из верхней стенки для входа
        indx = getRandomInt(1, mazeTmp[0].length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[1][indx] != roadCode) indx++;
        //Ставим вход или выход на верхней стенке
        mazeTmp[0][indx] = isEntry ? entryCode : exitCode;

        //Генерим рэндомный индекс из нижней стенки для выходв
        indx = getRandomInt(1, mazeTmp[mazeTmp.length - 1].length - 2);
        //Проверяем, чтобы прямо перед элементом не было стены
        if (mazeTmp[mazeTmp.length - 2][indx] != roadCode) indx++;
        //Ставим вход или выход на нижней стенке
        mazeTmp[mazeTmp.length - 1][indx] = isEntry ? exitCode : entryCode;
    }
    return mazeTmp;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function graphicsMapSort(arr) {
    // 1 - стена обычная, 2- стена с двойным округлением вниз, 3- стена с двойным окружением вверх, 4- стена с двойным окружением вправо
    // 5- стена с двойным окружением влево, 6- стена с одним окружением право-верх, 7-стена с одним окружением лево-верх, 8- стена с одной стеной лево-низ
    // 9- стена с одним окружением право-низ, 10- дорога прамая-вертикальная, 11- дорога Т-образная на право, 12- дорога перекресток, 13- дорога угловая правый верхний угол
    //14- дорога прямая-горизонтальная, 15- дорога угловая левый-нижний, 16- дорога угловая левый верхний угол, 17- дорога угловая правый нижний угол, 18- дорога Т-образная вверх,
    //19- дорога Т-образная вниз, 20- дорога Т-образная влево, 21 -внешняя стена левый верхний угол, 22- внешняя стена правый нижний угол, 23- внешняя стена правый верхний угол
    // 24- внешняя стена левый нижний угол, 25- внешняя стена верхняя часть, 26-внешняя стена нижняя часть, 27- внешняя стена правая часть, 28- внешняя стена левая часть
    // 29- внешняя стена Т-образный право, 30- внешная стена Т-образный лево, 31- внешнаняя стена Т-образный вверх, 32-внешняя стена Т-образный вниз
    // 33- дорога конечная точка право, 34-дорога конечная точка влево, 35-дорога конечная точка верх, 36-дорога конечная точка вниз, 37- внутренная стена Т-образная вниз
    // 38- внутренная стена Т-образная верх, 39-внутренная стена Т-образная-лево, 40-внутренная стена Т-образная-право, 41-внутренная стена прямая вертикальная, 
    // 42-внутренная стена прямая горизонтальная, 43-внутренная стена перекресток
    var rouColCount = labyrinthSize;
    var isLeftWall = false;
    var isRightWall = false;
    var isTopWall = false;
    var isBottomWall = false;

    var isLeftRoad = false;
    var isRightRoad = false;
    var isTopRoad = false;
    var isBottomRoad = false;

    var newArr = getCopyOfObj(arr);
    for (var i = 0; i < rouColCount; i++) {
        for (var j = 0; j < rouColCount; j++) {
            isLeftWall = false;
            isRightWall = false;
            isTopWall = false;
            isBottomWall = false;
            isLeftRoad = false;
            isRightRoad = false;
            isTopRoad = false;
            isBottomRoad = false;

            if (newArr[i][j] == entryCode || newArr[i][j] == exitCode)
                {
                    if(newArr[i][j] == entryCode)
                    {
                    if(i==0)
                        {
                            newArr[i][j] ="44";
                            continue;
                        }
                        if(i== rouColCount-1)
                        {
                            newArr[i][j] ="45";
                            continue;
                        }
                        if(j==0)
                        {
                            newArr[i][j] ="47";
                            continue;
                        }
                       if(j== rouColCount-1)
                        {
                            newArr[i][j] ="46";
                            continue;
                        }
                            
                    }
                if(newArr[i][j] == exitCode)
                    {
                    if(i==0)
                        {
                            newArr[i][j] ="48";
                            continue;
                        }
                        if(i== rouColCount-1)
                        {
                            newArr[i][j] ="49";
                            continue;
                        }
                        if(j==0)
                        {
                            newArr[i][j] ="51";
                            continue;
                        }
                       if(j== rouColCount-1)
                        {
                            newArr[i][j] ="50";
                            continue;
                        }
                            
                    }
                }
               
            //внешние стены
            if (j == 0) { //картинка для левого верхнего угла внешних стен
                if (i == 0) {
                    //картинка 20
                    newArr[i][j] = "21";
                    continue;
                }
                if (i == rouColCount - 1) {
                    //картинка 23
                    newArr[i][j] = "24";
                    continue;
                }
                if (arr[i][j + 1] == "1") {
                    newArr[i][j] = "29";
                    continue;
                }
                //картинка 27
                newArr[i][j] = "28";
                continue;
            }
            if (j == rouColCount - 1) { //картинка для правого верхнего угла внешних стен
                if (i == 0) {
                    //картинка 21
                    newArr[i][j] = "23";
                    continue;
                }
                if (i == rouColCount - 1) {
                    //картинка 22
                    newArr[i][j] = "22";
                    continue;
                }
                if (arr[i][j - 1] == "1") {
                    newArr[i][j] = "30";
                    continue;
                }
                //картинка 26
                newArr[i][j] = "27";
                continue;
            }
            if (i == rouColCount - 1) {
                if (arr[i - 1][j] == "1") {
                    newArr[i][j] = "31";
                    continue;
                }
                newArr[i][j] = "26";
                continue;
            }
            //
            if (i == 0 && j != 0 && j != rouColCount - 1) {
                if (arr[i + 1][j] == "1") {
                    newArr[i][j] = "32";
                    continue;
                }
                //картинка 24
                newArr[i][j] = "25";
                continue;
            }
            //если дорога
            if (arr[i][j] == "7") {
                //определяем наличие стен посторонам дороги
                // если справо стена любого типа
                if (arr[i][j + 1] != "7" && arr[i][j + 1] != entryCode && arr[i][j + 1] != exitCode) {
                    isRightWall = true;
                }
                //если слева стена
                if (arr[i][j - 1] != "7" && arr[i][j - 1] != entryCode && arr[i][j - 1] != exitCode) {
                    isLeftWall = true;
                }
                //если снизу стена
                if (arr[i + 1][j] != "7" && arr[i + 1][j] != entryCode && arr[i + 1][j] != exitCode) {
                    isBottomWall = true;
                }
                //если сверху стена
                if (arr[i - 1][j] != "7" && arr[i - 1][j] != entryCode && arr[i - 1][j] != exitCode) {
                    isTopWall = true;
                }
                //

                if (isLeftWall && isRightWall && !isTopWall && !isBottomWall) {
                    //картинка 1) из бумажки
                    newArr[i][j] = "10";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isRightWall && isBottomWall) {
                    //картинка 9)
                    newArr[i][j] = "18";
                    continue;
                }
                if (isTopWall && isBottomWall && !isLeftWall && !isRightWall) {
                    //картинка 5)
                    newArr[i][j] = "14";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isBottomWall && isRightWall) {
                    //картинка 11)
                    newArr[i][j] = "20";
                    continue;
                }
                if (!isTopWall && isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 2)
                    newArr[i][j] = "11";
                    continue;
                }
                if (!isTopWall && !isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 3)
                    newArr[i][j] = "12";
                    continue;
                }
                if (isTopWall && !isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 10)
                    newArr[i][j] = "19";
                    continue;
                }
                if (isTopWall && !isLeftWall && !isBottomWall && isRightWall) {
                    //картинка 4)
                    newArr[i][j] = "13";
                    continue;
                }
                if (!isTopWall && isLeftWall && isBottomWall && !isRightWall) {
                    //картинка 6)
                    newArr[i][j] = "15";
                    continue;
                }
                if (isTopWall && isLeftWall && !isBottomWall && !isRightWall) {
                    //картинка 7)
                    newArr[i][j] = "16";
                    continue;
                }
                if (!isTopWall && !isLeftWall && isBottomWall && isRightWall) {
                    //картинка 8)
                    newArr[i][j] = "17";
                    continue;
                }
                if (isTopWall && !isLeftWall && isBottomWall && isRightWall) {
                    newArr[i][j] = "33";
                    continue;
                }
                if (isTopWall && isLeftWall && isBottomWall && !isRightWall) {
                    newArr[i][j] = "34";
                    continue;
                }
                if (isTopWall && isLeftWall && !isBottomWall && isRightWall) {
                    newArr[i][j] = "35";
                    continue;
                }
                if (!isTopWall && isLeftWall && isBottomWall && isRightWall) {
                    newArr[i][j] = "36";
                    continue;
                }
            }
            if (arr[i][j] == "1") {
                // если справо дорога любого типа
                if (arr[i][j + 1] == "7" || arr[i][j + 1] == entryCode || arr[i][j + 1] == exitCode) {
                    isRightRoad = true;
                }
                //если слева дорога
                if (arr[i][j - 1] == "7" || arr[i][j - 1] == entryCode || arr[i][j - 1] == exitCode) {
                    isLeftRoad = true;
                }
                //если снизу дорога
                if (arr[i + 1][j] == "7" || arr[i + 1][j] == entryCode || arr[i + 1][j] == exitCode) {
                    isBottomRoad = true;
                }
                //если сверху дорога
                if (arr[i - 1][j] == "7" || arr[i - 1][j] == entryCode || arr[i - 1][j] == exitCode) {
                    isTopRoad = true;
                }
                //

                if (isLeftRoad && isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 12
                    newArr[i][j] = "2";
                    continue;
                }
                if (isLeftRoad && isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 13
                    newArr[i][j] = "3";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && isBottomRoad && isTopRoad) {
                    //картинка 14
                    newArr[i][j] = "4";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && isBottomRoad && isTopRoad) {
                    //картинка 15
                    newArr[i][j] = "5";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 16
                    newArr[i][j] = "6";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && !isBottomRoad && isTopRoad) {
                    //картинка 17
                    newArr[i][j] = "777";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 18
                    newArr[i][j] = "888";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && isBottomRoad && !isTopRoad) {
                    //картинка 19
                    newArr[i][j] = "999";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && !isBottomRoad && isTopRoad) {
                    newArr[i][j] = "37";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "38";
                    continue;
                }
                if (!isLeftRoad && isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "39";
                    continue;
                }
                if (isLeftRoad && !isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "40";
                    continue;
                }
                if (isLeftRoad && isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "41";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && isBottomRoad && isTopRoad) {
                    newArr[i][j] = "42";
                    continue;
                }
                if (!isLeftRoad && !isRightRoad && !isBottomRoad && !isTopRoad) {
                    newArr[i][j] = "43";
                    continue;
                }
            }

        }
    }
    return newArr;
}

//Производит поиск оптимального маршрута для прохождения лабиринта
//Возвращает последовательность элементов массива field по которым надо двигаться чтобы дойти от входа до выхода
function getOptimalLabRoute(f,bM){
    var route = [];
    var matrix = [];
    var entryP = undefined;
    var exitP = undefined;
    for(var i = 0 ; i < bM.length; i++) {
        matrix.push([]);
        for(var j = 0; j < bM[i].length;j++){

            if(bM[i][j] == entryCode)
                entryP = new point(j,i);
            if(bM[i][j] == exitCode)
                exitP = new point(j,i);

            var d = parseInt(bM[i][j]);
            if(bM[i][j] == roadCode || bM[i][j] == exitCode || bM[i][j] == entryCode) d = 0;//0 - проход
            else d = 1;//1 - барьер
            matrix[i].push(d);

        }
    }
    var grid = new PF.Grid(matrix);
    var finder = new PF.AStarFinder();
    //Cодержит массив с точками по которым надо перемещаться чтобы дойти до выхода
    var path = finder.findPath(entryP.x, entryP.y, exitP.x, exitP.y, grid);
    //Реализовать конвертер этих точек в конкретные элементы массива field и вернуть этот массив
    var indx = 0;
    var isBr = false;
    for(var z = 0; z < path.length; z++){
        isBr = false;
        for(var i = matrix.length - 1 ; i >= 0;i--){
            for(var j = matrix[i].length - 1 ; j >= 0;j--){
                if(path[z][0] == j && path[z][1] == i){
                    route.push({
                        isActive : true,
                        id : indx
                    });
                    isBr = true;
                    break;
                }
                indx++;
            }
            if(isBr) break;
        }
        indx = 0;
    }

    return route;
}
