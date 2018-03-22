function ToolTip()
{
    var bgH = height/100*4;
    var toolTipBG = game.newRoundRectObject({x:0,y:0,w:100,h:bgH,radius:5,fillColor:"green",visible : false});
    var toolTipText = game.newTextObject({x:toolTipBG.x,y:toolTipBG.y,text:"test",size: toolTipBG.h,color:"#ff9900",visible: false});
    
    this.setToolTip = function(x,y,toolText)
    {
        var charCOunt = toolText.toString().length;
        toolTipBG.w = charCOunt*(height/100*1.45);
        toolTipBG.x = x;
        toolTipBG.y = y;
        toolTipText.x = x;
        toolTipText.y = y;
        toolTipText.text = toolText;
        toolTipBG.setVisible(true);
        toolTipText.setVisible(true);
    }
    this.hideToolTip = function()
    {
        toolTipBG.setVisible(false);
        toolTipText.setVisible(false);
        toolTipText.text = "test";
    }
    this.isVisible = function(){
        return toolTipText.visible;
    }
    this.draw = function()
    {
        toolTipBG.draw();
        toolTipText.draw();
    }
}