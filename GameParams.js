//-----------------------------------------------------------------------ЛОГИЧЕСКИЕ ПАРАМЕТРЫ--------------------------------------------------------------------
//Переменные для системы ВВОДА----------------------------------------------------------------------------------
var touchTapTimeOut = 100;//Параметр указывающий сколько миллисекунд надо держать пользователю на элементе в скроле чтобы его переместить(НУЖНО ЧТОБЫ ОТДЕЛЯТЬ ПРОКРУТКУ СКРОЛА ОТ ПЕРЕМЕЩЕНИЙ ЭЛЕМЕНТОВ В СКРОЛЕ)
var distanceOfScroll = 5; //Параметр указывающий на каком расстоянии от точки тапа при движении по экрану начинать отрабатывать события скрола
var scrollStep = 20; //Шаг скрола в пикселях(Когда крутишь колесиком мыши)
var touchScrollVal = 2;//Шаг скрола когда пальцами ресайзишь
var toolTipDelay = 1000;//Задержка в миллисекундах после которой всплывают тултипы если держать мышку на элементе
//Игровые параметры---------------------------------------------------------------------------------------------
var labyrinthSize = 3;//Стартовый размер лабиринта(Например если 5, тогда при старте игры сгенерится лабиринт размером 5x5). ДЛЯ АЛГОРИТМА ГЕНЕРАЦИИ ЭТО ДОЛЖНО БЫТЬ НЕЧЕТНОЕ ЧИСЛО
var labyrinthMaxSize = 0;//Ограничение на максимальный размер лабиринта. Если = 0, то максимума нет.
var isLabyrinthGrow = true;//Переключение возможности увеличения лабиринта при прохождении(Увеличивается лабиринт или нет при выходе из него)
var robotMoveDelay = 450; //Задержка при движении робота в милисекундах(ЧЕМ МЕНЬШЕ ТЕМ БЫСТРЕЕ)
var saveTimeout = 1000; //Таймаут для метода который следит за изменениями размера экрана
var difficultyLevel = "EASY";//Уровень сложности(если EASY - робот сам поворачивается куда нужно при движении)
var totalTokensOnMap = 5; //Сколько всего монеток генерится в лабиринте
var inactiveItemsAlpha = 0.5;//Альфа канал неактивных элементов интерфейса(кнопок и тд)
//ГЛОБАЛЬНЫЕ ПЕРМЕННЫЕ КОТОРЫЕ СОДЕРЖАТ ОБЩЕИГРОВЫЕ ДАННЫЕ(МЕНЯЮТСЯ НА ПРОТЯЖЕНИИ ИГРЫ)-------------------------
var totalSeconds = 0; //Для хранения колличества секунд которые прошли с начала прохождения уровня
var playerInventory = new Array();//Инвентарь робота. На карте он может собирать и перетаскивать элементы
var playerMoveCount = 0;//Счетчик ходов робота
var selectLang = 'ru';
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------ГРАФИЧЕСКИЕ ПАРАМЕТРЫ-----------------------------------------------------------------
//Путь к файлам отображения лабиринта---------------------------------------
var wallPaths = [ //Стенки внутри лабиринта(В виде массива, потому что так удобнее для алгоритма генерации
    "img/field_wall1.png",
    "img/field_wall2.png",
    "img/field_wall3.png"
];
var bordersPath = "img/field_border.png"; //Крайние стенки(те что вокруг лабиринта)
var nonePath = "img/command_none.png";//Картинка пустой команды
var groundPath = "img/field_ground.png"; //Картинка для дороги
var exitPath = "img/field_exit.png"; //Картинка для выхода из лабиринта
var entryPath = "img/field_entry.png"; //Картинка для входа в лабиринт
var coinPath = "img/object_battery.png"; //Картинка для отображения монетки
//Пути до файлов с изображениями для интерфейса-------------------------------
var backgroundImgPath = "img/interface_font.png"; //Картинка для фона за либиринтом
var clockPath = "img/interface_clock.png";
var buttonStartImgSrc = "img/interface_button_start.png";
var buttonStopImgSrc = "img/interface_button_pause.png";
var menuButtonImgSrc = "img/interface_button_menu.png";
var reloadButtonImgSrc = "img/interface_button_reload.png";
var okButtonImgSrc = "img/interface_button_ok.png";
var nextStepButtonImgSrc = "img/interface_button_nextstep.png";
var prevStepButtonImgSrc = "img/interface_button_prevstep.png";
var guiTextColor = "red";//ЦВЕТ ТЕКСТА ДЛЯ GUI
//Пути для файлов для карты кода------------------------------------------------
var itemDeleteSrc = "img/interface_codeview_delete.png";
var itemReplaceSrc = "img/interface_codeview_replace.png";
var itemAddSrc = "img/interface_codeview_add.png";
var itemMoveSrc = "img/interface_codeview_move.png";
var itemPlusSrc = "img/interface_codeview_plus.png";
//Файлы команд для карты кода---------------------------------------------------
var wallImgComm = "img/command_interact_wall.png";
var coinImgComm = "img/command_interact_coin.png";
var exitImgComm = "img/command_interact_exit.png";
var entryImgComm = "img/command_interact_entry.png";
var groundImgComm = "img/command_interact_road.png";
var lineImg = "img/command_line.png";
//Пути до файлов с изображением робота--------------------------------------------
var playerImgSrc = "img/object_player.png";
//Пути до файлов с изображением команд--------------------------------------------
var commandNoneImgSrc = "img/command_none.png";
var commandUpImgSrc = "img/command_up.png";
var commandDownImgSrc = "img/command_down.png";
var commandLeftImgSrc = "img/command_left.png";
var commandRightImgSrc = "img/command_right.png";
var commandClockwiseImgSrc = "img/command_clockwise.png";
var commandUnClockwiseImgSrc = "img/command_unclockwise.png";
var commandPickUpImgSrc = "img/command_pickup.png";
var commandDropImgSrc = "img/command_drop.png";
var commandCommandsBlockImgSrc = "img/command_block_commands.png";
var commandWhatIsItImgSrc = "img/command_whatisit.png";
var commandIfImgSrc = "img/command_block_if.png";
var commandRepeatImgSrc = "img/command_block_repeat.png";
var commandRepeatIfImgSrc = "img/command_block_repeatif.png";
var commandBlockAImgSrc = "img/command_block_a.png";
var commandBlockBImgSrc = "img/command_block_b.png";
var commandCounterImgSrc = "img/command_counter.png";
var commandOkImgSrc = "img/command_ok.png";
var commandLookUpImgSrc = "img/command_look_up.png";
var commandLookDownImgSrc = "img/command_look_down.png";
var commandLookLeftImgSrc = "img/command_look_left.png";
var commandLookRightImgSrc = "img/command_look_right.png";
var commandLookCenterImgSrc = "img/command_look_center.png";
var commandElseBlockImgSrc = "img/command_block_else.png";
var commandForwardImgSrc = "img/command_forward.png";
var commandOnLeftImgSrc = "img/command_onleft.png";
var commandOnRightImgSrc = "img/command_onright.png";
var commandBackwardImgSrc = "img/command_backward.png";
var commandDigitsImgSrc = ["img/command_digit_0.png",//Массив изображений для цифровой клавиатуры
"img/command_digit_1.png",
"img/command_digit_2.png",
"img/command_digit_3.png",
"img/command_digit_4.png",
"img/command_digit_5.png",
"img/command_digit_6.png",
"img/command_digit_7.png",
"img/command_digit_8.png",
"img/command_digit_9.png"];
var commandBackspaceImgSrc = "img/command_backspace.png";
//---------------------------------------------------------------------------------------------------------------------------------------------------------------
//Предзагрузка ВСЕХ КАРТИНОК-------------------------------------------------------------------------------------------------------------------------------------
var arrImagesForLoad = [
    'img/field_wall1.png',
    'img/field_wall2.png',
    'img/field_wall3.png',
    'img/field_border.png',
    'img/command_none.png',
    'img/field_ground.png',
    'img/field_exit.png',
    'img/field_entry.png',
    'img/object_battery.png',
    'img/interface_font.png',
    'img/interface_clock.png',
    'img/interface_button_start.png',
    'img/interface_button_pause.png',
    'img/interface_button_menu.png',
    'img/interface_button_reload.png',
    'img/interface_button_ok.png',
    'img/interface_button_nextstep.png',
    'img/interface_button_prevstep.png',
    'img/interface_codeview_delete.png',
    'img/interface_codeview_replace.png',
    'img/interface_codeview_add.png',
    'img/interface_codeview_move.png',
    'img/interface_codeview_plus.png',
    'img/command_interact_wall.png',
    'img/command_interact_coin.png',
    'img/command_interact_exit.png',
    'img/command_interact_entry.png',
    'img/command_interact_road.png',
    'img/command_line.png',
    'img/object_player.png',
    'img/command_none.png',
    'img/command_up.png',
    'img/command_down.png',
    'img/command_left.png',
    'img/command_right.png',
    'img/command_clockwise.png',
    'img/command_unclockwise.png',
    'img/command_pickup.png',
    'img/command_drop.png',
    'img/command_block_commands.png',
    'img/command_whatisit.png',
    'img/command_block_if.png',
    'img/command_block_repeat.png',
    'img/command_block_repeatif.png',
    'img/command_block_a.png',
    'img/command_block_b.png',
    'img/command_counter.png',
    'img/command_ok.png',
    'img/command_look_up.png',
    'img/command_look_down.png',
    'img/command_look_left.png',
    'img/command_look_right.png',
    'img/command_look_center.png',
    'img/command_block_else.png',
    'img/command_forward.png',
    'img/command_onleft.png',
    'img/command_onright.png',
    'img/command_backward.png',
    'img/command_digit_0.png',
    "img/command_digit_1.png",
    "img/command_digit_2.png",
    "img/command_digit_3.png",
    "img/command_digit_4.png",
    "img/command_digit_5.png",
    "img/command_digit_6.png",
    "img/command_digit_7.png",
    "img/command_digit_8.png",
    "img/command_digit_9.png"
]
arrImagesForLoad.forEach(function(e){
    new Image().src = e;
})