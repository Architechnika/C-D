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

var allAchievements = [
    lang[selectLang]['achievement_all_boxes'],
    lang[selectLang]['achievement_optimal_route'],
    lang[selectLang]['achievement_no_errors']
];

//Интерфейс доступа к элементам странички-----------------------------------
function setAchivText(i, text) {
    var achv = document.getElementsByTagName("label")[i];
    achv.textContent = text;
}

function setTime(val) {
    var time = document.getElementById("time");
    time.innerHTML += val;
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
    
    for (var i = 0; i < data.achievements.length; i++) {
        setAchivText(i, data.achievements[i]);
    }
    setTime(data.tSecs);
    setLabCount(data.totalLabs);
    setLevel(data.pLvl);
    setBarProgress(data.cExp / ((data.nExp - data.pExp) / 100));
    buff = data.buff;
}
