var data = undefined;

var animAchivTimeout = 2000;
var animTimeout = 60;
var animTickCount = Math.floor(animAchivTimeout / animTimeout);
var animTickCounter = 0;

var tSecs = 0;
var tSec = 0;
var gEx = 0;
var gExMax = 0;
var cLvl = 0,
    pLvl = 0,
    nLvl = 0;
var achievements = [];
var achIndx = 0;
var lvlDiscr = 0; //Дискрет на который ковышается уровень при каждой сброшенной секунде
var animCount = 0;
var animTimeoutBuff = animTimeout;
var isAnimNow = false;
var buff;
var medalBronzeImgSrc = "../img/interface/medal_bronze.png"
var medalSilverImgSrc = "../img/interface/medal_silver.png"
var medalGoldImgSrc = "../img/interface/medal_gold.png"


var allAchievements = [
    lang[selectLang]['achievement_all_boxes'],
    lang[selectLang]['achievement_optimal_route'],
    lang[selectLang]['achievement_no_errors']
];


var cont = document.getElementById("log");
if(screen.width < 600)
    cont.style.fontSize = "120%";
else cont.style.fontSize = "200%";

//Интерфейс доступа к элементам странички-----------------------------------
function setAchivText(i, text) {
    var achv = document.getElementsByTagName("label")[i];
    achv.textContent = text;
}
function setAchivItemColor(color,i)
{
    var achv = document.getElementsByTagName("label")[i];
    achv.style.color = color;
}
function setTime(val) {
    var min = Math.floor(val / 60);
    var sec = val - (min * 60); //Math.floor(totalMiliSeconds / 200 - min * 60);
    //Обновляем инфу о времени
    var text = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
    time.innerHTML += text;
}

function setLabCount(val) {
    var lCount = document.getElementById("labCount");
    lCount.innerHTML += val;
}

function setLevel(val) {
    var l = document.getElementById("level");
    l.innerHTML += val;
}

function setBarProgress(val) {
    var bar = document.getElementById("bar");
    bar.style.width = val + "%";
}

function setImgSrc(val) {
    var l = document.getElementById("pic");
    l.src = val;
}

function nextClick() {
    sessionStorage.removeItem("prevState");
    window.location.href = '../game.html'
}

function reloadClick() {
    function Data() {
        this.value = true;
    }
    var d = new Data();
    var obj = JSON.stringify(d)
    sessionStorage.setItem("fromLastWindow", obj);
    window.location.href = '../game.html'
}
//------------------------------------------------------------------------------
if (sessionStorage.getItem("dataForLastWindow")) {
    data = JSON.parse(sessionStorage.getItem("dataForLastWindow"));

    for (var i = 0; i < allAchievements.length; i++) {
        setAchivText(i, allAchievements[i]);
        setAchivItemColor("#A9A9A9",i)
    }
    for (var i = 0; i < data.achievements.length; i++) {

        for (var j = 0; j < allAchievements.length; j++) {
            if( data.achievements[i] == allAchievements[j])
                {
                    setAchivItemColor("red",j)
                }
          //  setAchivText(i, allAchievements[j]);
        }
    }
    setTime(data.tSecs);
    setLabCount(data.totalLabs);
    setLevel(data.pLvl);
    setBarProgress(data.cExp / ((data.nExp - data.pExp) / 100));
    buff = data.buff;
    if (data.achievements.length == 0)
        setImgSrc(medalBronzeImgSrc);
    if (data.achievements.length == 1) 
        setImgSrc(medalSilverImgSrc);
    if (data.achievements.length == 2)
        setImgSrc(medalGoldImgSrc);
}
