function MessageBox()
{
        var base;
        base = pjs.system.newDOM('div',true);
        base.innerHTML = `
            <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 

                <link rel="stylesheet" type="text/css" href="MessageBox/css/style.css" />


            </head>
            <body>
                    <input type="checkbox" class="fire-check" />
                    <section>

                        <div class="tn-box tn-box-color-1">
                            <p class="text" >Ваши персональные настройки были успешно сохранены!</p>
                            <div class="tn-progress"></div>
                        </div>

                    </section>
            </body>
        </html>
        `
        
    this.setText = function(text)
    {
        var div = base.getElementsByTagName('p')[0];
        audio_object_messeng.play();
        div.textContent = text;
    }
    this.setShow = function(isShow)
    {
        var div = base.getElementsByTagName('input')[0];
        div.checked = isShow;
    }
    this.isShow = function()
    {
        var div = base.getElementsByTagName('input')[0];
        return div.checked;
    }
    this.setColor = function(color)
    {
        var div = base.getElementsByTagName('div')[0];
        div.style.background = 'red';
    }
}