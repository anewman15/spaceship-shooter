import Phaser from 'phaser';

export default {
	type: Phaser.AUTO,
	parent: 'phaser-example',
	width: 800,
	height: 550,
	backgroundColor: 'black',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
		},
	},
	pixelArt: true,
	roundPixels: true,
};