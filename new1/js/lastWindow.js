var data = undefined;
if(sessionStorage.getItem("dataForLastWindow"))
    {
        var d =sessionStorage.getItem("dataForLastWindow");
        data = JSON.parse(d);
    }


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
    window.location.href = '../../game.html'

}

function reloadClick() {
    window.location.href = '../../game.html'
}
