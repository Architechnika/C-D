
var menu = new Menu();
function Menu ()
{
  var pressedPath = "img/menu/pressed.png";
  var noPressedPath = "img/menu/nopressed.png";
  var buttonNewGame = undefined;
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
      bBackGroung = game.newImageObject({x: bX, y: bY, h: bH, w: bW, file: pathImg});
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
      var tmpBG = bBackGroung;
      return tmpBG;
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
  
  buttonNewGame = new Button("Новая игра",(width/2)-(buttonW/2),height/100*30,"newGame");
  buttonLoaded = new Button("Продолжить",(width/2)-(buttonW/2),buttonNewGame.getBackGroundPosition().y+buttonNewGame.getHeight(),"loaded");
  
  this.update = function()
  {
   /* //Проверяем, не изменились ли размеры экрана
    var sizeScreen = game.getWH();
    if(sizeScreen.w != width || sizeScreen.h != height){
      buttonNewGame.setPosition((width/2)-(buttonW/2),height/100*3);
      buttonLoaded.setPosition((width/2)-(buttonW/2),buttonNewGame.getBackGroundPosition().y+buttonNewGame.getHeight());
    }*/
    
    menu.drawMenu();
    if(isDownedOn(buttonNewGame.getObject())  && buttonNewGame.getObject().type === "ImageObject")
    {
      //game.setLoop('Labyrinth');
     buttonNewGame.setButtonImage(pressedPath);
    }
    else
    {
      buttonNewGame.setButtonImage(noPressedPath);
    }
    if(isDownedOn(buttonLoaded.getObject())  && buttonLoaded.getObject().type === "ImageObject")   
    {
     // game.setLoop('Labyrinth');
     buttonLoaded.setButtonImage(pressedPath);
    }
    else
    {
      buttonLoaded.setButtonImage(noPressedPath);
    }
    if(inputIsUp(buttonNewGame.getObject()))
    {
      game.setLoop('Labyrinth');
    }
  };
  
  this.drawMenu = function()
  {
    game.clear();
    buttonNewGame.ButtonDraw();
    buttonLoaded.ButtonDraw();
  };
}


game.newLoop('menu',function()
{
  menu.update();
});