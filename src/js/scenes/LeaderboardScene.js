import Phaser from 'phaser';
import config from '../config';
import Button from '../entities/Button';
import { getTopScores } from '../user-data/api';

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super('Leaderboard');
	}

	create() {
		this.topScoresText = this.add.text(
			config.width / 2,
			config.height / 2 - 250,
			'Top Scores',
			{ fontSize: '32px', fill: '#fff' },
		).setOrigin(0.5, 0.5);

		const scoresStyle = {
			fontSize: '16px',
			fill: '#fff',
		};

		this.user = this.sys.game.globals.user;
		this.scoreText = this.add.text(
			config.width / 2,
			config.height / 2 - 210,
			`Your Score: ${this.user.score}`,
			scoresStyle,
		).setOrigin(0.5, 0.5);

		getTopScores().then(users => {
			users.forEach((user, index) => {
				const height = config.height / 2 - 180 + index * 40;
				this.add.text(
					config.width / 3,
					height,
					`${index + 1}. ${user.user} -- ${user.score}`, scoresStyle,
				).setOrigin(0, 0.5);
			});
		});

		this.menuButton = new Button(this, config.width / 2, config.height / 2 + 240, 'blueButton', 'greenButton', 'Menu', 'Title');
	}
}