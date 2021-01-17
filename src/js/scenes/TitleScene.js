import 'phaser';
import config from '../config';
import Button from '../Entities/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    
  }
};