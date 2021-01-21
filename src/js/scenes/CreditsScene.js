import 'phaser';
import config from '../config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.thanks1Text = this.add.text(0, 0, 'Kenney Vleugels (https://opengameart.org/users/kenney)', { fontSize: '16px', fill: '#fff' });
    this.thanks2Text = this.add.text(0, 0, 'StumpyStrust (https://opengameart.org/users/stumpystrust)', { fontSize: '16px', fill: '#fff' });
    this.thanks3Text = this.add.text(0, 0, 'Bart (https://opengameart.org/users/bart)', { fontSize: '16px', fill: '#fff' });
    this.thanks4Text = this.add.text(0, 0, 'Phaser 3 (https://phaser.io/phaser3)', { fontSize: '16px', fill: '#fff' });
    this.thanks5Text = this.add.text(0, 0, 'Microverse (https://www.microverse.org/)', { fontSize: '16px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, 'Created By: Abdullah Numan', { fontSize: '24px', fill: '#fff' });

    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.thanks1Text,
      this.zone
    );
    this.thanks1Text.setY(1000);

    Phaser.Display.Align.In.Center(
      this.thanks2Text,
      this.zone
    );
    this.thanks2Text.setY(2000);

    Phaser.Display.Align.In.Center(
      this.thanks3Text,
      this.zone
    );
    this.thanks3Text.setY(3000);

    Phaser.Display.Align.In.Center(
      this.thanks4Text,
      this.zone
    );
    this.thanks4Text.setY(4000);

    Phaser.Display.Align.In.Center(
      this.thanks5Text,
      this.zone
    );
    this.thanks5Text.setY(5000);

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );
    this.madeByText.setY(6000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        this.destroy;
      }
    });

    this.thanks1Tween = this.tweens.add({
      targets: this.thanks1Text,
      y: -100,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        this.destroy;
      }
    });

    this.thanks2Tween = this.tweens.add({
      targets: this.thanks2Text,
      y: -100,
      ease: 'Power1',
      duration: 14000,
      delay: 0,
      onComplete: () => {
        this.destroy;
      }
    });

    this.thanks3Tween = this.tweens.add({
      targets: this.thanks3Text,
      y: -100,
      ease: 'Power1',
      duration: 20000,
      delay: 0,
      onComplete: () => {
        this.destroy;
      }
    });

    this.thanks4Tween = this.tweens.add({
      targets: this.thanks4Text,
      y: -100,
      ease: 'Power1',
      duration: 26000,
      delay: 0,
      onComplete: () => {
        this.destroy;
      }
    });

    this.thanks5Tween = this.tweens.add({
      targets: this.thanks5Text,
      y: -100,
      ease: 'Power1',
      duration: 32000,
      delay: 0,
      onComplete: () => {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -100,
      ease: 'Power1',
      duration: 38000,
      delay: 0,
      onComplete: () => {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }
    });
  }
};