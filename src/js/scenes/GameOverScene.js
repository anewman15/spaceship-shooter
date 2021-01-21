import 'phaser';
import config from '../config';
import Button from '../entities/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.gameOverText = this.add.text(config.width/2, config.height/2 - 200, 'Game Over', { fontSize: '48px', fill: '#fff' });
    this.gameOverText.setOrigin(0.5, 0.5);

    this.user = this.sys.game.globals.user;
    this.scoreText = this.add.text(config.width/2, config.height/2 - 100, `Your Score: ${this.user.score}`, { fontSize: '32px', fill: '#fff' });
    this.scoreText.setOrigin(0.5, 0.5);

    this.playAgainButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton', 'greenButton', 'Play Again', 'Play');
    this.gameButton = new Button(this, config.width/2, config.height/2 + 120, 'blueButton', 'greenButton', 'Leaderboard', 'Leaderboard');
  }
};