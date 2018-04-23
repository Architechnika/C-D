var key = "settings";
var cont = document.getElementsByClassName("cont")[0];
//if(screen.width > screen.height)
   // {
        cont.style.width = "60%";
        cont.style.marginLeft = '20%'
   // }else
   // {
        
    //}

function SettingsAtributs() 
{
    this.isAudio = document.getElementById("audio").value;
}

function clickReady() 
{
    var sett = new SettingsAtributs();
    var tmp = JSON.stringify(sett);
    localStorage.setItem(key, tmp);
    window.location.href = '../index.html'
}

function clickCancel() {
     window.location.href = '../index.html'
}
