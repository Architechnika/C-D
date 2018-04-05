var tupAnimation = game.newAnimationObject(   { 
     animation : pjs.tiles.newImage("animations/tup.png").getAnimation(0, 0, 128, 128, 10), 
     x : 100, 
     y : 100, 
     w : 25, 
     h : 25, 
     angle : 0, 
     alpha : 1, 
     visible : false 
   });
tupAnimation.setDelay(2)

var animationsArray = [];
animationsArray.push(tupAnimation);

function animationsControl()
{
    if(tupAnimation.getFrame()== tupAnimation.getLastFrame())
        {//если анимация закончилась, то обнуляем его и скрывет до следующего клика
            tupAnimation.setVisible(false)
            tupAnimation.setFrame(0);
        }
}