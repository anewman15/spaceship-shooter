import 'phaser';
import config from '../config';
import Button from '../entities/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.titleText = this.add.text(config.width/2, config.height/2 - 200, 'SpaceShip Shooter', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5, 0.5);
    this.gameButton = new Button(this, config.width/2, config.height/2 - 20, 'blueButton', 'greenButton', 'Play', 'Play');
    this.gameButton = new Button(this, config.width/2, config.height/2 + 60, 'blueButton', 'greenButton', 'Leaderboard', 'Leaderboard');
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 140, 'blueButton', 'greenButton', 'Credits', 'Credits');
  }
};