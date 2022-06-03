import Phaser from "phaser";

class singlePlayer extends Phaser.Scene {
    constructor() {
        super("singlePlayer");
    }

    create(){
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);

        var text = this.add.text(100,100, 'THIS IS SINGLEPLAYER!');
        
        var BackBtn = this.add.image(50,25, "Back");
        BackBtn.setInteractive({useHandCursor: true});
        BackBtn.on('pointerdown', () => this.clickBackButton());

    }

    update(){

    }

    clickBackButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('chooseGame');
    }



}

export default singlePlayer;