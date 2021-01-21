import 'phaser';
import AlienShip from '../entities/AlienShip';
import PlayerShip from '../entities/PlayerShip';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super('Play');
  }

  preload() {
    this.load.spritesheet('explosion', 'content/play-scene/explosion.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.image("playerShip", "content/play-scene/playerShip.png");
    this.load.image("playerLaser", "content/play-scene/playerLaser.png");
    this.load.image("alienShip", "content/play-scene/alienShip.png");
    this.load.image("alienLaser", "content/play-scene/alienLaser.png");

    this.load.audio("sfxPlayerLaser", "content/play-scene/sfxPlayerLaser.ogg");
    this.load.audio('sfxPlayerShipExplosion', "content/play-scene/sfxPlayerShipExplosion.wav");
    this.load.audio('sfxAlienShipExplosion', "content/play-scene/sfxAlienShipExplosion.wav");
  }

  create() {
    this.anims.create({
      key: 'alienShipExplosion',
      frames: this.anims.generateFrameNames('explosion', { start: 30, end: 52 }),
      frameRate: 40,
      repeat: 0
    });

    this.anims.create({
      key: 'playerShipExplosion',
      frames: this.anims.generateFrameNumbers('explosion', { start: 25, end: 56 }),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add('sfxPlayerShipExplosion'),
        this.sound.add("sfxAlienShipExplosion")
      ],
      laser: this.sound.add("sfxPlayerLaser")
    };

    this.user = this.sys.game.globals.user;
    this.usernameText = this.add.text(16, 16, `${this.user.username}`, { fontSize: '18px', fill: '#fff' });

    this.user.score = 0;
    this.scoreText = this.add.text(660, 16, `Score: ${this.user.score}`, { fontSize: '18px', fill: '#fff' });
    this.updateScore = () => {
      this.user.score += 10;
      this.scoreText.setText('Score: ' + this.user.score);
    }

    this.player = new PlayerShip(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
      "playerShip"
    );

    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.alienShips = this.add.group();
    this.alienLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const alienShip = new AlienShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        this.alienShips.add(alienShip);
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.alienShips, (playerLaser, alienShip) => {
      if (alienShip) {
        if (alienShip.onDestroy !== undefined) {
          alienShip.onDestroy();
          this.updateScore();
        }

        alienShip.explode(true, 'alienShipExplosion', 1);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.alienLasers, (playerShip, alienLaser) => {
      if (!playerShip.getData("isDead") &&
          !alienLaser.getData("isDead")) {
        playerShip.explode(false, 'playerShipExplosion', 0);
        alienLaser.destroy();
        playerShip.onDestroy();
      }
    });
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyE.isDown) {
        this.player.moveUp();
      }
      else if (this.keyX.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyF.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (let i = 0; i < this.alienShips.getChildren().length; i++) {
      const alienShip = this.alienShips.getChildren()[i];

      alienShip.update();

      if (alienShip.x < -alienShip.displayWidth ||
        alienShip.x > this.game.config.width + alienShip.displayWidth ||
        alienShip.y < -alienShip.displayHeight * 4 ||
        alienShip.y > this.game.config.height + alienShip.displayHeight) {

        if (alienShip) {
          if (alienShip.onDestroy !== undefined) {
            alienShip.onDestroy();
          }
          alienShip.destroy();
        }
      }
    }

    for (let i = 0; i < this.alienLasers.getChildren().length; i++) {
      const alienLaser = this.alienLasers.getChildren()[i];
      alienLaser.update();

      if (alienLaser.x < -alienLaser.displayWidth ||
        alienLaser.x > this.game.config.width + alienLaser.displayWidth ||
        alienLaser.y < -alienLaser.displayHeight * 4 ||
        alienLaser.y > this.game.config.height + alienLaser.displayHeight) {
        if (alienLaser) {
          alienLaser.destroy();
        }
      }
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
      var playerLaser = this.playerLasers.getChildren()[i];
      playerLaser.update();

      if (playerLaser.x < -playerLaser.displayWidth ||
        playerLaser.x > this.game.config.width + playerLaser.displayWidth ||
        playerLaser.y < -playerLaser.displayHeight * 4 ||
        playerLaser.y > this.game.config.height + playerLaser.displayHeight) {
        if (playerLaser) {
          playerLaser.destroy();
        }
      }
    }

    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    }
    else {
      this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
      this.player.setData("isShooting", false);
    }
  }
}