function Dialog() {

    var bgW = width / 100 * 20;
    var bgH = height / 100 * 10;
    if (height < 450) {
        bgW = width / 100 * 30;
        bgH = height / 100 * 20;
    }
    var bgX = width / 2 - (bgW / 2);
    var bgY = height / 2 - (bgH / 2);
    var text = lang[selectLang]['dialog_delete'];
    var bg = game.newRoundRectObject({
        x: bgX,
        y: bgY,
        w: bgW,
        h: bgH,
        radius: 5,
        fillColor: "#f6db7b",
        visible: false,
    });
    //bgX+bgW/2 - (bgH/100*50)
    var dialogText = game.newTextObject({
        x: bgX + 2,
        y: bgY + 2,
        text: text,
        size: bgH / 100 * 28,
        color: "#000000",
        visible: false,
        font: textFont,
    });

    this.dialogOkButton = new PushButton();
    this.dialogCancelButton = new PushButton();

    allButtons.buttonsArr.push(this.dialogOkButton);
    allButtons.buttonsArr.push(this.dialogCancelButton);

    this.dialogOkButton.setSetting(bgX + bgW - (bgH / 100 * 60 * 2), bgY + bgH - (bgH / 100 * 60), bgH / 100 * 60, bgH / 100 * 60)
    this.dialogOkButton.setButtonImgSrc(buttonDialogImgSrc);
    this.dialogOkButton.setVisible(false);

    this.dialogCancelButton.setSetting(this.dialogOkButton.x + this.dialogOkButton.w, bgY + bgH - (bgH / 100 * 60), bgH / 100 * 60, bgH / 100 * 60)
    this.dialogCancelButton.setButtonImgSrc(buttonDeleteImgSrc);
    this.dialogCancelButton.setVisible(false);


    this.dialogOkButton.setUserData({
        onClick: function (el) {
            if (this.visible) {
                audio_GUI_click.play();
                lastClickedElement.commands.splice(0);
                setFocused(field[lastClickedIndx], lastClickedIndx);
                dialog.setShowDialog(false);
            }
        }
    });
    this.dialogCancelButton.setUserData({
        onClick: function (el) {
            if (this.visible) {
                audio_GUI_click.play();
                dialog.setShowDialog(false);
            }
        }
    });



    this.dialogDraw = function () {
        bg.draw();
        dialogText.draw();
    }

    this.setShowDialog = function (isShow) {
        if (isShow)
            audio_object_messeng.play();
        bg.setVisible(isShow);
        dialogText.setVisible(isShow);
        this.dialogCancelButton.setVisible(isShow);
        this.dialogOkButton.setVisible(isShow);
    }
}
