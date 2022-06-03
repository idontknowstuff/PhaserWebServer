import Phaser from 'phaser';
import load from './scenes/load.js';
import mainscreen from './scenes/mainscreen.js';
import modes from './scenes/modes.js';
import singlePlayer from './scenes/singlePlayer.js';
import Duel from './scenes/duel.js';
import DuelPrep from './scenes/duelprep.js';

var config = {
    width: 1000,
    height: 600,
    backgroundColor: 0x000000,
    scene: [load, mainscreen, modes, singlePlayer, Duel, DuelPrep]
}

var game = new Phaser.Game(config);
console.log("hello");