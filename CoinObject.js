function CoinObject(NAME, TYPE, LOCATION, IMAGE) { // основной класс, который наследуеться от ImageObject
    //внем описаны все общие методы для игровых объектов 

    //Индекс элемента field к которому обьект привязан
    this.position = LOCATION;
    //Название объекта
    this.name = NAME;
    //Его код для логической части игры
    this.code = TYPE;
    var IO = game.newImageObject({
        file: IMAGE,
        x: field[this.position].X + field[this.position].W / 4,
        y: field[this.position].Y + field[this.position].H / 4,
        w: field[this.position].W / 2,
    });
    this.__proto__ = IO;

    this.setImage = function (img) {
        this.file = img;
    }
    this.setNewPosition = function (pos) {
        this.position = pos;
        this.setSize(field[this.position]);
    };
    this.getPositionInField = function () {
        if (this.position !== undefined)
            return this.position;
    }
    this.setSize = function (imgObj) {
        this.x = imgObj.X;
        this.y = imgObj.Y;
        this.w = imgObj.W;
        this.h = imgObj.H;
    }

}

function CoinBattery(NAME, TYPE, LOCATION, IMAGE, isROTATE) {
    var isRotate = isROTATE;
    var parent = new CoinObject(NAME, TYPE, LOCATION, IMAGE);
    this.__proto__ = parent;

    this.startRotation = function () {
        if (isRotate) this.startRotating(50, 2);
    }
    //Запускает анимацию вращения монетки
    this.startRotating = function (speed, angle) {
        isRotate = true;
        setTimeout(rotate, speed, angle, this, speed);
    };

    function rotate(angle, obj, speed) {
        if (isRotate) {
            obj.angle += angle;
            setTimeout(rotate, speed, angle, obj, speed);
        }
    }
    this.startRotation();
}