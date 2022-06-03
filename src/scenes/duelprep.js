import Phaser from "phaser";

class DuelPrep extends Phaser.Scene {
    constructor() {
        super("DuelPrep");
    }

    create(){
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);

        var text = this.add.text(100,100, 'prepping for battle');

        // back button
        var BackBtn = this.add.image(50,25, "Back");
        BackBtn.setInteractive({useHandCursor: true});
        BackBtn.on('pointerdown', () => this.clickBackButton());

        // match button
        var MatchBtn = this.add.image(800,500, "MatchBtn").setOrigin(0,0);
        MatchBtn.setInteractive({useHandCursor: true});
        MatchBtn.on('pointerdown', () => this.clickMatchButton());
        
        
    }

    update(){

    }

    clickBackButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('chooseGame');
    }

    clickMatchButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('Duel');
    }
}

export default DuelPrep;