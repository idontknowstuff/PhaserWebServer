import Phaser from "phaser";

class victory extends Phaser.Scene {
    constructor() {
        super("Victory");
    }

    create(){

        // background
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        
        //Back button
        var BackBtn = this.add.image(50,25, "Back");
        BackBtn.setInteractive({useHandCursor: true});
        BackBtn.on('pointerdown', () => this.clickBackButton());

        // victory
        var text = this.add.text(300, 300, "VICTORY! YOU WON!");
    }

    update(){

    }

    clickBackButton(){
        this.scene.switch('chooseGame');
    }




}

export default victory;