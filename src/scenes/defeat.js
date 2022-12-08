import Phaser from "phaser";

class defeat extends Phaser.Scene {
    constructor() {
        super("Defeat");
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
        var text = this.add.text(300, 300, "DEFEAT! Practice more to improve your skills!");
    }

    update(){

    }

    clickBackButton(){
        this.scene.switch('chooseGame');
    }




}

export default defeat;