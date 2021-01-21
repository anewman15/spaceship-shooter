import 'phaser';
import config from '../config';
import Button from '../entities/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.topScoresText = this.add.text(config.width/2, config.height/2 - 250, 'Top Scores', { fontSize: '32px', fill: '#fff' });
    this.topScoresText.setOrigin(0.5, 0.5);

    this.user = this.sys.game.globals.user;
    this.scoreText = this.add.text(config.width/2, config.height/2 - 200, `Your Score: ${this.user.score}`, { fontSize: '16px', fill: '#fff' });
    this.scoreText.setOrigin(0.5, 0.5);

    this.playAgainButton = new Button(this, config.width/2, config.height/2 + 180, 'blueButton', 'greenButton', 'Play Again', 'Play');
    this.menuButton = new Button(this, config.width/2, config.height/2 + 240, 'blueButton', 'greenButton', 'Menu', 'Title');
  }
};