/*Содержит методы и данные для работы с картой лабиринта и его генерации.
*/

var roadCode = '7';//Представление элемента длроги в виде числа
var borderCode = '0';//Представление элемента внешних стенок в виде числа
var entryCode = '8';//Представление элемента входа в лаюиринт в виде числа
var exitCode = '9';//Представление элемента выхода из лабиринта в виде числа

//Разрешение одного тайла на поле
var oneTileWidth = 0;
var oneTileHeight = 0;
//Переменная для хранения бинарного представления поля
var binMap = null;

var entrySide = "NONE" //Хранит местоположение входа в лабиринте - необходимо для инициализации робота

var field = new Array();//Массив хранящий экземпляры fieldElement, представляющие элементы поля

function fieldElement(imgSource, comm, elemcode, fx,fy,fw,fh){
  //Параметры элемента
  this.code = elemcode;
  this.commands = comm;
  this.imgSrc = imgSource;
  this.X = fx;
  this.Y = fy;
  this.W = fw;
  this.H = fh;  
  
  //Объекты изображений
  //Объект который хранит графическое представление элемента с исходным изображением
  this.imgObjectSource = newImageObj(this.imgSrc,this.X,this.Y,this.W,this.H);
  
  //СЕТТЕРЫ И ГЕТТЕРЫ
  //Задает полностью новое изображение для элемента
  this.setNewImage = function(src,x,y,w,h){
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;  
    this.imgSrc = imgPath;
    this.imgObjectSource = newImageObj(this.imgSrc,this.X,this.Y,this.W,this.H);
  }
  //Задает файл с картинкой элемента
  this.setNewSourceImage = function(imgPath){
    this.imgSrc = imgPath;
    this.imgObjectSource = newImageObj(this.imgSrc,this.X,this.Y,this.W,this.H);
  }
  //Задает размер элемента
  this.setNewSize = function(x,y,w,h){
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;  
    this.imgObjectSource = newImageObj(this.imgSrc,this.X,this.Y,this.W,this.H);
  }
  
  //Возвращает текущее графическое представление элемента по исходному изображению
  this.getImageObject = function(){
    return this.imgObjectSource;
    }
    
  this.setStroke = function(isStroke){
    if(isStroke){
      this.imgObjectSource.strokeColor = "red";
      this.imgObjectSource.strokeWidth = 30;
    }
    else{
      this.imgObjectSource.strokeColor = "red";
      this.imgObjectSource.strokeWidth = 0;
    }
  }
  
  //Создает новый ImageObject этого элемента - приватный метод
  function newImageObj(src,X,Y,W,H){
    var res = game.newImageObject({
        file : src,
        x : X,
        y : Y,
        w : W,
        h : H
      });
      res.file = src;
    return res;
  }
}

function clearAllCommandsOnField(){
  OOP.forArr(field,function(el){
    if(el.code == entryCode){
      el.commands = new Array(COMMANDS.UP);
    }
    else el.commands = new Array();
  });
}

//isSquare - true - если нужен квадратный лабиринта
//totalInW - всего квадратов в ширину
//totalInH - всего квадратов в высоту
function genMap(totalInW, totalInH, isRegen){
  generateMap(gameSpaceW,gameSpaceH,gameSpaceX,gameSpaceY,totalInW,totalInH);
}

//Перерасчитывает размеры существующего поля
function calcField(w, h, x, y, elemsInLine, elemsInColumn){
  
  oneTileWidth = w / elemsInLine;//Расчет ширины одного элемента
  oneTileHeight = h / elemsInColumn;//Расчет высоты одного элемента
  //Обходим все элементы лабиринта
  pjs.levels.forStringArray({w : oneTileWidth, h : oneTileHeight, source : binMap},
  function(S,X,Y,W,H){
    //Извлекаем старый элемент
    var element = field.shift();
    var img = element.imgSrc;
    var comm = element.commands;
    //На его место добавляем новый
    field.push(new fieldElement(img, comm, S, X+x,Y+y,oneTileWidth,oneTileHeight));
  });
}

function generateMap(w, h, x, y, elemsInLine, elemsInColumn){
  
  oneTileWidth = w / elemsInLine;//Расчет ширины одного элемента
  oneTileHeight = h / elemsInColumn;//Расчет высоты одного элемента
  //Получаем массив сгенерированного поля
  binMap = genBin(elemsInColumn, elemsInLine, [], [], [0, 0]);
  var itersX=0,itersY=0;
  //Обходим каждый элемент сгенерированного поля и создаем объекты характеризующие элементы поля
  pjs.levels.forStringArray({w : oneTileWidth, h : oneTileHeight, source : binMap},
  function(S,X,Y,W,H){
    
   var img = bordersPath;
   var comm = new Array();
   if (S == roadCode || S == entryCode || S == exitCode){
      img = groundPath;
      //Если это клетка входа в лабиринт, инициализируем сразу команду для игрока в ней
      if(S == entryCode) {
        if(entrySide == "DOWN") comm.push(COMMANDS.UP);
        else if(entrySide == "UP") comm.push(COMMANDS.DOWN);
        else if(entrySide == "LEFT") comm.push(COMMANDS.RIGHT);
        else if(entrySide == "RIGHT") comm.push(COMMANDS.LEFT);
        img = entryPath;
      }
      else if(S == exitCode){
        img = exitPath;
        //comm.push(COMMANDS.STOP);
      } 
    }
    else if(S > 0){
      img = wallPaths[S-1];
    }
    //Заполняем массив элементов лабиринта
    field.push(new fieldElement(img, comm, S, X+x,Y+y,oneTileWidth,oneTileHeight));
  });
}

//Генерит лабиринт в виде строк с кодами элементов поля
function genBin(hate, width, maze, walls, currentPosition) 
{
   //7 - дорога, 0 - стена, 1,2,3 другие стены, 8 - вход, 9 - выход
  hate = hate % 2 == 0 ? hate + 1 : hate;
  width = width % 2 == 0 ? width + 1 : width;
  hate -=2;
  width -=2;
  
  var mazeTmp=[];
  for (var y = 0; y < hate+2; y++) 
  {
    maze[y] = [];
    mazeTmp[y] = [];
   for (var x = 0; x < width+2; maze[y][x++] = borderCode) 
   {
     mazeTmp[y][x] = borderCode;
    }
  }
  
  function amaze(y, x, addBlockWalls) 
  {
    maze[y][x] = roadCode;
    if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x] == borderCode)) walls.push([y + 1, x, [y, x]]);
    if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x] == borderCode)) walls.push([y - 1, x, [y, x]]);
    if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1] == borderCode)) walls.push([y, x + 1, [y, x]]);
    if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1] == borderCode)) walls.push([y, x - 1, [y, x]]);
  }

  function valid(a, b) 
  {
    return (a < hate && a >= 0 && b < width && b >= 0) ? true : false;
  };
  amaze(currentPosition[0], currentPosition[1], true);
  
  while (walls.length != 0) 
  {
    var randomWall = walls[Math.floor(Math.random() * walls.length)],
      host = randomWall[2],
      opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
    if (valid(opposite[0], opposite[1])) 
 {
      if (maze[opposite[0]][opposite[1]] == roadCode) walls.splice(walls.indexOf(randomWall), 1);
      else amaze(randomWall[0], randomWall[1], false), amaze(opposite[0], opposite[1], true);
    } else walls.splice(walls.indexOf(randomWall), 1);
  }
  
  for(var i = 1;i<mazeTmp.length-1;i++)
  {
    for(var j =1;j<mazeTmp.length-1;j++)
    {
      mazeTmp[i][j] = maze[i-1][j-1];
      if( mazeTmp[i][j] == borderCode)
      {
        mazeTmp[i][j] = "" + getRandomInt(1,wallPaths.length + 1);
      }
    }
  }
  //Генерим местоположение входа и выхода из лабиринта
  var indx=0;
  //Рэндомим вход или выход
  var isEntry = getRandomInt(0,2) == 1;
  //Если вход/выход будет на левой и правой стенке
  if(getRandomInt(0,2) == 1){
    
    //Инициализируем местоположение входа
    if(isEntry) entrySide = "LEFT";
    else entrySide = "RIGHT";
    
    //Генерим рэндомный индекс из левой стенки для входа
    indx = getRandomInt(1,mazeTmp.length - 2);
    //Проверяем, чтобы прямо перед элементом не было стены
    if(mazeTmp[indx][1] != roadCode) indx++;
    //Ставим вход или выход на левую стенку
    mazeTmp[indx][0] = isEntry ? entryCode : exitCode;
    
    //Генерим рэндомный индекс из правой стенки для входа
    indx = getRandomInt(1,mazeTmp.length - 2);
    //Проверяем, чтобы прямо пере элементом не было стены
    if(mazeTmp[indx][mazeTmp[0].length - 2] != roadCode) indx++;
    //Ставим вход или выход на правую стенку
    mazeTmp[indx][mazeTmp[0].length - 1] = isEntry ? exitCode : entryCode;
  }
  else{//Если вход и выход будет на верхней и нижней стенке
    
    //Инициализируем местоположение входа
    if(isEntry) entrySide = "UP";
    else entrySide = "DOWN";
  
    //Генерим рэндомный индекс из верхней стенки для входа
    indx = getRandomInt(1,mazeTmp[0].length - 2);
    //Проверяем, чтобы прямо перед элементом не было стены
    if(mazeTmp[1][indx] != roadCode) indx++;
    //Ставим вход или выход на верхней стенке
    mazeTmp[0][indx] = isEntry ? entryCode : exitCode;
    
    //Генерим рэндомный индекс из нижней стенки для выходв
    indx = getRandomInt(1,mazeTmp[mazeTmp.length - 1].length - 2);
    //Проверяем, чтобы прямо перед элементом не было стены
    if(mazeTmp[mazeTmp.length - 2][indx] != roadCode) indx++;
    //Ставим вход или выход на нижней стенке
    mazeTmp[mazeTmp.length - 1][indx] = isEntry ? exitCode : entryCode;
  }
  return mazeTmp;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Проверяет, можно ли поставить по этим индексам елемент с типом code
function checkSpawnCode(x,y,code){
  //Если пытаемся поставить вход или выход
  if(code == roadCode){
    
  }
}