import Phaser from "phaser";

import background from '../assets/background.png';
import DuelBtn from '../assets/DuelBtn.png';
import SinglePlayer from '../assets/singlePlayerBtn.png';
import Back from '../assets/back.png';
import WorkPlace from '../assets/workplace.png';
import QuestionPlace from '../assets/questionplace.png';
import MatchBtn from '../assets/match.png';
import title from '../assets/title.png';
import go from '../assets/go.png';
import blocks from '../assets/blocks.png';
import checkBtn from '../assets/checkBtn.png';
class load extends Phaser.Scene {
    constructor() {
        super("loadGame");
    }

    preload(){
        this.load.image("background", background);
        this.load.image("DuelBtn", DuelBtn);
        this.load.image("SinglePlayer", SinglePlayer);
        this.load.image("Back", Back);
        this.load.image("WorkPlace", WorkPlace);
        this.load.image("QuestionPlace", QuestionPlace);
        this.load.image("MatchBtn", MatchBtn);
        this.load.image("title", title);
        this.load.image("go", go);
        this.load.image("blocks", blocks);
        this.load.image("checkBtn", checkBtn);
    }

    create(){
        this.add.text(20, 20, "loading game...");
        this.scene.start("playGame");
    }



}

export default load;