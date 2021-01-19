import 'phaser';
import config from '../config';
import Button from '../entities/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.gameButton = new Button(this, config.width/2, config.height/2 - 80, 'blueButton', 'greenButton', 'Play', 'Play');
    this.gameButton = new Button(this, config.width/2, config.height/2, 'blueButton', 'greenButton', 'Leaderboard', 'Leaderboard');
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 80, 'blueButton', 'greenButton', 'Credits', 'Credits');
  }
};