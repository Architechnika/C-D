function Label(x,y,text)
{
    var X = x;
    var Y = y;
    var textLoc = text;
    var wl=10;
    var hl=10;
    var sizel;
    var colorl = guiTextColor;
    var textObj = game.newTextObject({x : X,y : Y,h : hl, w: wl, text : textLoc, size: sizel, color : colorl, font:textFont});

    this.getTextObject = function()
    {
        if(textObj !== undefined)
            return textObj;
        else return -1;
    }
    this.setText= function(textl)
    {
        textObj.text = textl;
    }
    this.setTextSize = function(sizel)
    {
        size = sizel;
        textObj.size = sizel;
    }
    this.setTextColor = function(colorll)
    {
        textObj.color = colorll;
    }
    this.setTextPosition = function(x,y)
    {
        X = x;
        Y = y;
        textObj.x = X;
        textObj.y = Y;
    }
    this.textDraw = function()
    {
        if(textObj !== undefined)
            textObj.draw();
        else return -1;
    }
    this.getObj = function()
    {
        return textObj;
    }
    this.getText = function()
    {
        return text;
    }
    this.setWAndH = function(w,h)
    {
        wl =w;
        hl = h;
        textObj.w = wl;
        textObj.h = hl;
    }
}
