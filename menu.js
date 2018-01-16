
var menu = new Menu();
var accaunt  = undefined;
var charMap = undefined;
var isGoodLogin= false;
var userData = undefined;
var isFiled = false;
var isGameSpaseUp = true; //расположения игрового поля и скролов соответсвтенно
var pressedPath = "img/menu/pressed.png";
var noPressedPath = "img/menu/nopressed.png";
var userNoPressedPath = "img/menu/usernopressed.png";
var userPressedPath = "img/menu/userpressed.png";
var pathGameSpaseUp = "img/gamespaseisup.png";
var pathGameSpaseDown = "img/gamespaseisdown.png";

function Menu ()
{
    var pressedPath = "img/menu/pressed.png";
var noPressedPath = "img/menu/nopressed.png";
var userNoPressedPath = "img/menu/usernopressed.png";
var userPressedPath = "img/menu/userpressed.png";
var pathGameSpaseUp = "img/gamespaseisup.png";
var pathGameSpaseDown = "img/gamespaseisdown.png";

    var buttonNewGame = undefined;
    var isUserBClicked = false;
    var buttonW = width/100*30;
    var buttonH = height/100*15;
    var textSz = buttonH/3.5;
    function Button(text,x,y,id)
    {
        var bText = text;
        var bX = x;
        var bY = y;
        var bID = id;
        var bW = buttonW;
        var bH = buttonH;
        var textSize = textSz;
        var bRadius = 10;
        var textColor = "#3333ff";
        var backGroundColor = "green";
        // var bBackGroung = game.newRoundRectObject({x: bX, y: bY, w: bW, h: bH, radius:  bRadius, fillColor: backGroundColor});
        var bTextItem = game.newTextObject({x: bX,y:bY, text: bText, size: textSize, color: textColor,strokeColorText : "#3333ff",strokeWidthText :3});
        var bBackGroung = game.newImageObject({x: bX, y: bY, h: bH, w: bW, file: noPressedPath});

        this.setPosition = function(x,y)
        {
            bBackGroung.x = x;
            bBackGroung.y = y;
            init();
        }
        this.setWidth = function(w)
        {
            bBackGroung.w = w;
            init();
        }
        this.setHeight = function(h)
        {
            bBackGroung.h = h;
            init();
        }
        this.setSize = function(w,h)
        {
            bBackGroung.w = w;
            bBackGroung.h = h;
            init();
        }
        this.getID = function()
        {
            var impID = bID;
            return impID;
        }
        this.setButtonRadius = function(radius)
        {
            bBackGroung.radius = radius;
            init();
        }
        this.setTextColor = function(color)
        {
            textColor = color;
            bTextItem.color = textColor;
        }
        this.setBackGroundColor = function(color)
        {
            backGroundColor = color;
            bBackGroung.fillColor = backGroundColor;
        }
        this.setButtonImage = function(pathImg)
        {
            bBackGroung = game.newImageObject({x: bBackGroung.x, y: bBackGroung.y, h: bBackGroung.h, w: bBackGroung.w, file: pathImg});
        }
        this.setText = function(text)
        {
            bText = text;
            bTextItem.text = bText;
            init();
        }
        this.setTextAlpha = function(alpha)
        {
            if(alpha >=0 && alpha <=1)
                bTextItem.setAlpha(aplha);
        }
        this.setButtonBackGroundAlpha = function(alpha)
        {
            if(alpha >=0 && alpha <=1)
                bBackGroung.setAlpha(alpha);
        }
        this.getBackGroundPosition = function()
        {
            var tmpPos = bBackGroung.getPosition();
            return tmpPos;
        }
        this.getWidth = function()
        {
            var tmpBGW = bBackGroung.w;
            return tmpBGW;
        }
        this.getHeight = function()
        {
            var tmpBGH = bBackGroung.h;
            return tmpBGH;
        }
        this.ButtonDraw = function()
        {
            bBackGroung.draw();
            bTextItem.draw();
        }
        this.getObject = function()
        {
            return bBackGroung;
        }
        function setTextPosition(x,y)
        {
            bTextItem.x = x;
            bTextItem.y = y;
        }
        function setTextSize(size)
        {
            bTextItem.size = size;
        }
        function init()
        {
            var BGH = bBackGroung.h;
            var textW = bTextItem.w;
            var textH = bTextItem.h;
            var yTextForButtom = bBackGroung.y + (BGH/2-(textH/2))
            var remainWidth = (bBackGroung.w - bTextItem.w);
            setTextPosition(bBackGroung.x +(remainWidth/2),yTextForButtom);
        }
        init();
    }

    
    this.buttonNewGame = new Button("Новая игра",(width/2)-(buttonW/2),height/100*30,"newGame");
    this.buttonLoaded = new Button("Продолжить",(width/2)-(buttonW/2),this.buttonNewGame.getBackGroundPosition().y+this.buttonNewGame.getHeight(),"loaded");
    this.buttonUserAccaunt = new  Button(" ",(width- height/100*10),(height- height/100*10),"userAccaunt");
    this.buttonUserAccaunt.setSize(height/100*10,height/100*10);
    this.buttonUserAccaunt.setButtonImage(userNoPressedPath);
    this.buttonGameSpaseUp = new Button(" ",width/100*2,height/100*20,"GSUp");
    this.buttonGameSpaseUp.setButtonImage(pathGameSpaseUp);
    this.buttonGameSpaseUp.setSize(height/100*30,height/100*25);
    this.buttonGameSpaseUp.setButtonBackGroundAlpha(1);
    this.buttonGameSpaseDown = new Button(" ",this.buttonGameSpaseUp.getObject().x,this.buttonGameSpaseUp.getObject().y + this.buttonGameSpaseUp.getObject().h+2,"GSDown");
    this.buttonGameSpaseDown.setButtonImage(pathGameSpaseDown);
    this.buttonGameSpaseDown.setSize(height/100*30,height/100*25);
    
    this.update = function()
    {
        menu.drawMenu();
    };

    this.drawMenu = function()
    {
        game.clear();
        this.buttonNewGame.ButtonDraw();
        this.buttonLoaded.ButtonDraw();
        this.buttonUserAccaunt.ButtonDraw();
        this.buttonGameSpaseDown.ButtonDraw();
        this.buttonGameSpaseUp.ButtonDraw();
    };
}

var onMenuMouseUp = function(e){
    menuOnUp(e);
}
var onMenuMouseDown = function(e){
    menuOnDown(e)
}

var onMenuTouchStart = function(e){
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    menuOnDown(e);
}
var onMenuTouchEnd = function(e){
    e.x = e.changedTouches[0].clientX;
    e.y = e.changedTouches[0].clientY;
    menuOnUp(e);
}

game.newLoopFromConstructor('menu', function () {
	//Код для старта игры
	this.entry = function(){
        addEventListener("mouseup",onMenuMouseUp)
        addEventListener("mousedown",onMenuMouseDown);
        addEventListener("touchend",onMenuTouchEnd);
        addEventListener("touchstart",onMenuTouchStart);
        menu.buttonGameSpaseUp.setButtonBackGroundAlpha(0.5)
    }
	//Код для завершения цикла
	this.exit = function(){
	    removeEventListener("mouseup",onMenuMouseUp)
        removeEventListener("mousedown",onMenuMouseDown);
        removeEventListener("touchend",onMenuTouchEnd);
        removeEventListener("touchstart",onMenuTouchStart);
	};
	//Код для апдейта игры
	this.update = function(){
	  //Обновляем графику
      menu.update();
	};
});

function menuOnDown(e){
    if(clickIsInObj(e.x,e.y,menu.buttonNewGame.getObject())  && menu.buttonNewGame.getObject().type === "ImageObject")
    {
        menu.buttonNewGame.setButtonImage(pressedPath);
    }
    else
    {
        menu.buttonNewGame.setButtonImage(noPressedPath);
    }
    if(clickIsInObj(e.x,e.y,menu.buttonLoaded.getObject())  && menu.buttonLoaded.getObject().type === "ImageObject")
    {
        menu.buttonLoaded.setButtonImage(pressedPath);
    }
    else
    {
        menu.buttonLoaded.setButtonImage(noPressedPath);
    }
    if(clickIsInObj(e.x,e.y,menu.buttonUserAccaunt.getObject())  && menu.buttonUserAccaunt.getObject().type === "ImageObject")
    {
        menu.buttonUserAccaunt.setButtonImage(userPressedPath);
    }
    else
    {
        menu.buttonUserAccaunt.setButtonImage(userNoPressedPath);
    }
    if(clickIsInObj(e.x,e.y,menu.buttonGameSpaseUp.getObject())  && menu.buttonGameSpaseUp.getObject().type === "ImageObject")
    {
        menu.buttonGameSpaseUp.setButtonBackGroundAlpha(1)
    }
    else
    {
        menu.buttonGameSpaseUp.setButtonBackGroundAlpha(0.5)
    }
    if(clickIsInObj(e.x,e.y,menu.buttonGameSpaseDown.getObject())  && menu.buttonGameSpaseDown.getObject().type === "ImageObject")
    {
        menu.buttonGameSpaseDown.setButtonBackGroundAlpha(1)
    }
    else
    {
        menu.buttonGameSpaseDown.setButtonBackGroundAlpha(0.5)
    }
}

function menuOnUp(e){
    if(clickIsInObj(e.x,e.y,menu.buttonNewGame.getObject()))
    {
        if(userData !== undefined && userData.isSaved !== false)
        {
            userData.isSaved = false;
            localMemory.saveAsObject(userData.checkSumm,userData);
        }
        game.setLoop('Labyrinth');
    }
    if(clickIsInObj(e.x,e.y,menu.buttonLoaded.getObject()))
    {
        if(userData !== undefined)
        {log(isGameSpaseUp)
            game.setLoop('Labyrinth');
        }
    }
    if(clickIsInObj(e.x,e.y,menu.buttonGameSpaseUp.getObject()))
    {
        isGameSpaseUp = false;
    }
    if(clickIsInObj(e.x,e.y,menu.buttonGameSpaseDown.getObject()))
    {
        isGameSpaseUp = true;  
    }
    if(clickIsInObj(e.x,e.y,menu.buttonUserAccaunt.getObject()))
    {isUserBClicked = true;
        game.setLoop('userAccaunt');
    }
}

var d = false
var login;
var pass;
var base;
game.newLoop('userAccaunt',function()
{
    if(!d)
    {
        base = system.newDOM('dev',true);
        base.className = 'base';
        base.innerHTML =
                `
                <link rel="stylesheet" href="UserAccauntPageStyle.css" type="text/css"/>
                <b>Аккаунт существует</b>
                <div id="accauntBG">
                <input type="text" id="login"  placeholder="Введите логин"/>
                <input type="text" id="passw" placeholder="Введите пароль"/>
                <br>
                <button onclick="entry()"  id ="buttGo">Вход </button>
                <button onclick="registration()" id="buttRegistr">Регистрация </button>
                <br>
                </div>
                <div id="butMineMenu">
                <button onclick="goMainMenu()" id="buttMainMenu"></button>
                </div>

                `
    }
    d = true;
});



function MyMap()
{
    var mapForKey = new Map();
    var mapForValue = new Map();
    
     this.setValue = function(key,val)
     {
         mapForKey.set(val,key);
         mapForValue.set(key,val);
     }
     this.getKey = function(value)
     {
         if(mapForKey !==undefined && mapForKey.size > 0)
            return mapForKey.get(value);
     }
    this.getValue = function(key)
    {
        if(mapForValue !==undefined && mapForValue.size > 0)
            return mapForValue.get(key);
    }
}
function setASCII()
{
    var map = new MyMap();
    map.setValue("48","0");
    map.setValue("49","1");
    map.setValue("50","2");
    map.setValue("51","3");
    map.setValue("52","4");
    map.setValue("53","5");
    map.setValue("54","6");
    map.setValue("55","7");
    map.setValue("56","8");
    map.setValue("57","9");
    map.setValue("64","@");
    map.setValue("65","A");
    map.setValue("66","B");
    map.setValue("67","C");
    map.setValue("68","D");
    map.setValue("69","E");
    map.setValue("70","F");
    map.setValue("71","G");
    map.setValue("72","H");
    map.setValue("73","I");
    map.setValue("74","J");
    map.setValue("75","K");
    map.setValue("76","L");
    map.setValue("77","M");
    map.setValue("78","N");
    map.setValue("79","O");
    map.setValue("80","P");
    map.setValue("81","Q");
    map.setValue("82","R");
    map.setValue("83","S");
    map.setValue("84","T");
    map.setValue("85","U");
    map.setValue("86","V");
    map.setValue("87","W");
    map.setValue("88","X");
    map.setValue("89","Y");
    map.setValue("90","Z");
    map.setValue("95","_");
    map.setValue("97","a");
    map.setValue("98","b");
    map.setValue("99","c");
    map.setValue("100","d");
    map.setValue("101","e");
    map.setValue("102","f");
    map.setValue("103","g");
    map.setValue("104","h");
    map.setValue("105","i");
    map.setValue("106","j");
    map.setValue("107","k");
    map.setValue("108","l");
    map.setValue("109","m");
    map.setValue("110","n");
    map.setValue("111","o");
    map.setValue("112","p");
    map.setValue("113","q");
    map.setValue("114","r");
    map.setValue("115","s");
    map.setValue("116","t");
    map.setValue("117","u");
    map.setValue("118","v");
    map.setValue("119","w");
    map.setValue("120","x");
    map.setValue("121","y");
    map.setValue("122","z");
    map.setValue("46",".");
    return map;
}
function getNumForChar(char)
{
    if(charMap === undefined)
        charMap = setASCII();
    return charMap.getKey(char)
}
function getCharForNum(num)
{
    if(charMap === undefined)
        charMap = setASCII();
    return charMap.getValue(num);
}
function registration()
{
    login = base.getElementsByTagName('input')[0].value;
    pass =  base.getElementsByTagName('input')[1].value;
    
    var sum ="";
    if(login !== undefined && pass !== undefined && login.length>0 && pass.length>0)
     {
        for(var i=0;i< login.length;i++)
        {
            var tmp = getNumForChar(login[i])
            if(tmp == undefined)
                {
                     var div = base.getElementsByTagName('input')[0];
                     div.style.color = 'red';
                     div.style.fontSize = "1.5em";
                     div.style.transition = "0.4s";
                    function textColor()
                    {
                         div.style.color = '#56007c';
                         div.style.fontSize = "1.3em";
                         div.style.transition = "0.4s";   
                    }setTimeout(textColor,400);
                    isFiled = true;
                    break;
                }
            sum+=tmp;
        }
        for(var i=0;i< pass.length;i++)
        {
            var tmp = getNumForChar(pass[i])
            if(tmp == undefined)
                {
                     var div = base.getElementsByTagName('input')[1];
                     div.style.color = 'red';
                     div.style.fontSize = "1.5em";
                     div.style.transition = "0.4s";
                    function textColor()
                    {
                         div.style.color = '#56007c';
                         div.style.fontSize = "1.3em";
                         div.style.transition = "0.4s";   
                    }setTimeout(textColor,400);
                    isFiled = true;
                    break;
                }
            sum+=tmp;
        }
         if(localMemory.loadAsObject(Number(sum)/10000000) && !isFiled)
         {
            log("аккаунт существует");
             var div = base.getElementsByTagName('b')[0];

             div.style.fontSize = "30px";
             div.style.transition = "0.4s";   
            function textColor()
            {
             div.style.fontSize = "0px";
             div.style.transition = "0.4s"; 
            }setTimeout(textColor,1500);
         }else if(!localMemory.loadAsObject(Number(sum)/10000000) && !isFiled)
         {
            var accaunt = new UserAccaunt(login,pass,(Number(sum)/10000000));
            localMemory.saveAsObject(Number(sum)/10000000,accaunt);
         }
     }

}
function entry()
{
    login = base.getElementsByTagName('input')[0].value;
    pass =  base.getElementsByTagName('input')[1].value;
    var sum ="";
    if(login !== undefined && pass !== undefined && login.length>0 && pass.length>0)
     {
        for(var i=0;i< login.length;i++)
        {
            var tmp = getNumForChar(login[i]);
            if(tmp == undefined)
                {
                     var div = base.getElementsByTagName('input')[0];
                     div.style.color = 'red';
                     div.style.fontSize = "1.5em";
                     div.style.transition = "0.4s";
                    function textColor()
                    {
                         div.style.color = '#56007c';
                         div.style.fontSize = "1.3em";
                         div.style.transition = "0.4s";   
                    }setTimeout(textColor,400);
                    isFiled = true;
                    break;
                }
            sum+=tmp;
        }
        for(var i=0;i< pass.length;i++)
        {
            var tmp = getNumForChar(pass[i]);
            if(tmp == undefined)
                {
                    var div = base.getElementsByTagName('input')[1];
                     div.style.color = 'red';
                     div.style.fontSize = "1.5em";
                     div.style.transition = "0.4s";
                    function textColor()
                    {
                         div.style.color = '#56007c';
                         div.style.fontSize = "1.3em";
                         div.style.transition = "0.4s";   
                    }setTimeout(textColor,400);
                    isFiled = true;
                    break;
                }
            sum+=tmp;
        }
       // localMemory.saveAsObject(sum,accaunt);
     }
  if(sum !="")
  {
       var buf  = localMemory.loadAsObject(Number(sum)/10000000);
       userData =  new UserAccaunt();
       userData.copy(buf);
      if(userData)
      {
        base.innerHTML = '';
        d = false;
        game.setLoop('menu')
      }
      else
      {//не зашли

      }
  }

}

function goMainMenu()
{
    base.innerHTML = '';
    d = false;
    game.setLoop('menu')
}


