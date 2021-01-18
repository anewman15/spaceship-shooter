import 'phaser';
import config from '../config';
import Button from '../entities/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.gameButton = new Button(this, config.width/2, config.height/2 - 50, 'blueButton', 'greenButton', 'Play', 'Play');
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 50, 'blueButton', 'greenButton', 'Credits', 'Credits');
  }
};