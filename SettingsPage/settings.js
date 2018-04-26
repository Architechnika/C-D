var key = "settings";
var langS = "ru";
var cont = document.getElementsByClassName("cont")[0];
var dropListlang = document.getElementById("butDropdown")

cont.style.width = "60%";
cont.style.marginLeft = '20%'

if (localStorage.getItem(key)) {
    var sett = localStorage.getItem(key);
    var allSettings = JSON.parse(sett);
    document.getElementById("audio").checked = allSettings.isAudio;

    if (allSettings.language) {
        dropListlang.textContent = document.getElementsByClassName(allSettings.language)[0].textContent;
        langS = allSettings.language;
    }

}

function SettingsAtributs() {
    this.isAudio = document.getElementById("audio").checked;
    this.language = langS;
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
    langS = rus.className;
    dropListlang.textContent = document.getElementsByClassName(langS)[0].textContent;
}

function langE() {
    var eng = document.getElementsByClassName("en")[0];
    langS = eng.className;
    dropListlang.textContent = document.getElementsByClassName(langS)[0].textContent;
}

function langAM() {
    var am = document.getElementsByClassName("am")[0];
    langS = am.className;
    dropListlang.textContent = document.getElementsByClassName(langS)[0].textContent;
}

function setLang() {
    //установка языка
    document.getElementsByTagName("title")[0].textContent = lang[selectLang]['mainmenu_settings'];
    document.getElementById("butOK").textContent = lang[selectLang]['mainmenu_settings_accept'];
    document.getElementById("butCanc").textContent = lang[selectLang]['mainmenu_settings_cancel'];
    document.getElementById("labelAudio").textContent = lang[selectLang]['mainmenu_settings_sound'];
    document.getElementById("labelAudio").innerHTML += '<input type="checkbox" checked id="audio">'
    document.getElementById("audio").checked = allSettings.isAudio;
    //var k = document.getElementById("labelAudio");
    //
}
setLang()
