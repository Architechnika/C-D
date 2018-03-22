function GameObject(NAME, TYPE, LOCATION, IMAGE) { // основной класс, который наследуеться от ImageObject
    //внем описаны все общие методы для игровых объектов

    //Индекс элемента field к которому обьект привязан
    this.position = LOCATION;
    //Название объекта
    this.name = NAME;
    //Его код для логической части игры
    this.code = TYPE;
    //Указываем в качестве родителя ImageObject
    this.__proto__ = game.newImageObject({
        file: IMAGE,
        x: field[this.position].x + field[this.position].w / 4,
        y: field[this.position].y + field[this.position].h / 4,
        w: field[this.position].w / 2,
        h: field[this.position].h / 2,
    });

    this.setImage = function (img) {
        this.file = img;
    }
    this.setNewPosition = function (pos) {
        this.position = pos;
        this.setSize(field[this.position]);
        this.setVisible(field[this.position].visible);
    };
    this.getPositionInField = function () {
        if (this.position !== undefined)
            return this.position;
    }
    
    this.getImageObj = function(){
        return this.__proto__;
    }
    
    this.setSize = function (imgObj) {
        this.x = imgObj.x + imgObj.w / 4,
        this.y = imgObj.y + imgObj.h / 4,
        this.w = imgObj.w / 2
        this.h = imgObj.h / 2
    }

}

function CoinBattery(NAME, TYPE, LOCATION, IMAGE, isROTATE) {
    var isRotate = isROTATE;
    var parent = new GameObject(NAME, TYPE, LOCATION, IMAGE);
    this.__proto__ = parent;

    this.startRotation = function () {
        this.startRotating(50, 2);
    }
    //Запускает анимацию вращения монетки
    this.startRotating = function (speed, angle) {
        isRotate = true;
        setTimeout(rotate, speed, angle, this, speed);
    };
    
    this.stopRotating = function(){
        isRotate = false;
    }

    function rotate(angle, obj, speed) {
        if (isRotate) {
            obj.angle += angle;
            setTimeout(rotate, speed, angle, obj, speed);
        }
    }
    this.startRotation();
}
