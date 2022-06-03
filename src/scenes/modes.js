import Phaser from "phaser";

class modes extends Phaser.Scene {
    constructor() {
        super("chooseGame");
    }


    create(){
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        // create 3 buttons
        var singleBtn = this.add.image(500,200, "SinglePlayer");
        var DuelBtn = this.add.image(500,400, "DuelBtn");
        var BackBtn = this.add.image(50,25, "Back");

        singleBtn.setInteractive({useHandCursor: true});
        DuelBtn.setInteractive({useHandCursor: true});
        BackBtn.setInteractive({useHandCursor: true});

        singleBtn.on('pointerdown', () => this.clickSingleButton());
        DuelBtn.on('pointerdown', () => this.clickDuelButton());
        BackBtn.on('pointerdown', () => this.clickBackButton());
    }

    clickSingleButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('singlePlayer');
    }

    clickDuelButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('DuelPrep');
    }

    clickBackButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('playGame');
    }



}

export default modes;