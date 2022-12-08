import Phaser from 'phaser';
import load from './scenes/load.js';
import mainscreen from './scenes/mainscreen.js';
import modes from './scenes/modes.js';
import singlePlayer from './scenes/singlePlayer.js';
import Duel from './scenes/duel.js';
import DuelPrep from './scenes/duelprep.js';
import victory from './scenes/victory.js';
import defeat from './scenes/defeat.js';


var config = {
    width: 1000,
    height: 600,
    backgroundColor: 0x000000,
    autoCenter: true,
    scene: [load, mainscreen, modes, singlePlayer, Duel, DuelPrep, victory, defeat]
}

var game = new Phaser.Game(config);
