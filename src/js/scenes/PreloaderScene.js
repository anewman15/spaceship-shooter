/*
  eslint-disable no-plusplus
*/

import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
	constructor() {
		super('Preloader');
	}

	init() {
		this.readyCount = 0;
	}

	preload() {
		this.add.image(400, 200, 'logo');

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(240, 405, 320, 50);

		const { width } = this.cameras.main;
		const { height } = this.cameras.main;
		const loadingText = this.make.text({
			x: width / 2,
			y: height / 2 + 80,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff',
			},
		});
		loadingText.setOrigin(0.5, 0.5);

		const percentText = this.make.text({
			x: width / 2,
			y: height / 2 + 110,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff',
			},
		});
		percentText.setOrigin(0.5, 0.5);

		const assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 210,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff',
			},
		});
		assetText.setOrigin(0.5, 0.5);

		this.load.on('progress', (value) => {
			percentText.setText(`${parseInt(value * 100, 10)}%`);
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 415, 300 * value, 30);
		});

		this.load.on('fileprogress', (file) => {
			assetText.setText(`Loading asset: ${file.key}`);
		});

		this.load.on('complete', () => {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
			this.ready();
		});

		this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

		this.load.image('blueButton', 'content/ui/buttonBlue.png');
		this.load.image('greenButton', 'content/ui/buttonGreen.png');
		this.load.image('phaserLogo', 'content/logo.png');
		this.load.audio('bgMusic', ['content/TownTheme.mp3']);
	}

	ready() {
		this.scene.start('Title');
		this.readyCount++;
		if (this.readyCount === 2) {
			this.scene.start('Title');
		}
	}
}