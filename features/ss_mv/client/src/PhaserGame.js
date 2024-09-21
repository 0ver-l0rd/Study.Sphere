import Phaser from 'phaser';
import Game from './scenes/Game';
import Background from './scenes/Background';
import Bootstrap from './scenes/Bootstrap';
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    backgroundColor: '#93cbee',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    autoFocus: true,
    scene: [Bootstrap, Background, Game],
};
const phaserGame = new Phaser.Game(config);
window.game = phaserGame;
export default phaserGame;
