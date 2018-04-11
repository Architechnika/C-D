function SaveItem(name,script) {
    this.scriptArray = script;
    var parent = game.newImageObject({
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        file: nonePath
    })
    this.__proto__ = parent;
    
    var saveFileName = game.newTextObject(   { 
     x : parent.x+ parent.w/2, 
     y : parent.y + parent.h/2, 
     text : name, 
     size : parent.h*0.2, 
     color : "#000000", 
   });
    
    this.setFileName = function(name)
    {
        saveFileName.text = name;
    }
    this.setScriptArray = function(arr)
    {
        this.scriptArray = arr;
    }
    
    this.draw = function()
    {
        parent.draw();
        saveFileName.draw();
    }
}
