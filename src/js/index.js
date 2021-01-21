import 'phaser';
import config from './config';
import User from  './user-data/User';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TitleScene from './scenes/TitleScene';
import CreditsScene from './scenes/CreditsScene';
import LeaderboardScene from './scenes/LeaderboardScene';
import GameOverScene from './scenes/GameOverScene';
import PlayScene from './scenes/PlayScene';
import formEventListener from './user-data/form';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		const user = new User();
		this.globals = { user };
		this.scene.add('Boot', BootScene);
		this.scene.add('Preloader', PreloaderScene);
		this.scene.add('Title', TitleScene);
		this.scene.add('Credits', CreditsScene);
		this.scene.add('Leaderboard', LeaderboardScene);
		this.scene.add('Play', PlayScene);
		this.scene.add('GameOver', GameOverScene);
		this.scene.start('Boot');
	}
}

window.game = new Game();