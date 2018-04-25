var key = "settings";
var leng = = "ru";
var cont = document.getElementsByClassName("cont")[0];
//if(screen.width > screen.height)
// {
cont.style.width = "60%";
cont.style.marginLeft = '20%'
// }else
// {

//}

if (localStorage.getItem(key)) {
    var sett = localStorage.getItem(key);
    var allSettings = JSON.parse(sett);
    document.getElementById("audio").checked = allSettings.isAudio;

}

function SettingsAtributs() {
    this.isAudio = document.getElementById("audio").checked;
    this.language = leng;
}

function clickReady() {

    var allSettings = new SettingsAtributs();
    var tmp = JSON.stringify(allSettings);
    localStorage.setItem(key, tmp);

    window.location.href = '../index.html'
}

function clickCancel() {
    window.location.href = '../index.html'
}

function lengR() {
    var rus = document.getElementsByClassName("ru")[0];
    leng = rus.className;
}

function lengE() {
    var eng = document.getElementsByClassName("en")[0];
    leng = eng.className;
}
