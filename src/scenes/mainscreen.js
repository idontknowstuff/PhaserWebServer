import Phaser from "phaser";

class mainscreen extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create(){
        // Background stuff
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0,0);
        this.add.image(500, 150, "title");
        
        // Go Button
        var GoBtn = this.add.image(700,400, "go");
        GoBtn.setInteractive({useHandCursor: true});
        GoBtn.on('pointerdown', () => this.clickGoButton());

        // Show Email/Username
        var text = this.add.text(700, 25, 'USER:');
        let user = this.getCookie('email');
        var Username = this.add.text(750, 25, user);
    }

    update(){

    }

    clickGoButton(){
        // input.manager.resetCursor({ cursor: true });
        this.scene.switch('chooseGame');
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }



}

export default mainscreen;