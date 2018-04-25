var key = "settings";
var cont = document.getElementsByClassName("cont")[0];
var dropListLang = document.getElementById("butDropdown")
var lang = "ru";
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
    if(allSettings.language)
    dropListLang.textContent = document.getElementsByClassName(allSettings.language)[0].textContent;

}

function SettingsAtributs() {
    this.isAudio = document.getElementById("audio").checked;
    this.language = lang;
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

function langR() {
    var rus = document.getElementsByClassName("ru")[0];
    lang = rus.className;
    dropListLang.textContent = document.getElementsByClassName(lang)[0].textContent;
}

function langE() {
    var eng = document.getElementsByClassName("en")[0];
    lang = eng.className;
    dropListLang.textContent = document.getElementsByClassName(lang)[0].textContent;
}
