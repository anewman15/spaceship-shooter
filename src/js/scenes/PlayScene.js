import 'phaser';
import AlienShip from '../entities/AlienShip';
import PlayerShip from '../entities/PlayerShip';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super('Play');
  }

  preload() {
    this.load.spritesheet("sprExplosion", "content/play-scene/sprExplosion.png", {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.image("playerShip", "content/play-scene/playerShip.png");
    this.load.image("playerLaser", "content/play-scene/playerLaser.png");
    this.load.image("alienShip", "content/play-scene/alienShip.png");
    this.load.image("alienLaser", "content/play-scene/alienLaser.png");

    this.load.image("sprEnemy1", "content/play-scene/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "content/play-scene/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.audio("sndExplode0", "content/play-scene/sndExplode0.wav");
    this.load.audio("sndExplode1", "content/play-scene/sndExplode1.wav");
    this.load.audio("sfxPlayerLaser", "content/play-scene/sfxPlayerLaser.ogg");
  }

  create() {
    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sfxPlayerLaser")
    };

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
        delay: 2000,
        callback: () => {
          const alienShip = new AlienShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        },
      })

    // this.time.addEvent({
    //   delay: 2000,
    //   callback: function() {
    //     var enemy = null;
    //     if (Phaser.Math.Between(0, 10) >= 3) {
    //       enemy = new GunShip(
    //         this,
    //         Phaser.Math.Between(0, this.game.config.width),
    //         0
    //       );
    //     }
    //     else if (Phaser.Math.Between(0, 10) >= 5) {
    //       if (this.getEnemiesByType("ChaserShip").length < 5) {

    //         enemy = new ChaserShip(
    //           this,
    //           Phaser.Math.Between(0, this.game.config.width),
    //           0
    //         );
    //       }
    //     }
    //     else {
    //       enemy = new CarrierShip(
    //         this,
    //         Phaser.Math.Between(0, this.game.config.width),
    //         0
    //       );
    //     }

    //     if (enemy !== null) {
    //       enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
    //       this.enemies.add(enemy);
    //     }
    //   },
    //   callbackScope: this,
    //   loop: true
    // });

    // this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
    //   if (enemy) {
    //     if (enemy.onDestroy !== undefined) {
    //       enemy.onDestroy();
    //     }

    //     enemy.explode(true);
    //     playerLaser.destroy();
    //   }
    // });

    // this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
    //   if (!player.getData("isDead") &&
    //       !laser.getData("isDead")) {
    //     player.explode(false);
    //     laser.destroy();
    //     player.onDestroy();
    //   }
    // });
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
      var alienShip = this.alienShips.getChildren()[i];

      alienShip.update();

      // if (enemy.x < -enemy.displayWidth ||
      //   enemy.x > this.game.config.width + enemy.displayWidth ||
      //   enemy.y < -enemy.displayHeight * 4 ||
      //   enemy.y > this.game.config.height + enemy.displayHeight) {

      //   if (enemy) {
      //     if (enemy.onDestroy !== undefined) {
      //       enemy.onDestroy();
      //     }

      //     enemy.destroy();
      //   }
      // }
    }

    // for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
    //   var laser = this.enemyLasers.getChildren()[i];
    //   laser.update();

    //   if (laser.x < -laser.displayWidth ||
    //     laser.x > this.game.config.width + laser.displayWidth ||
    //     laser.y < -laser.displayHeight * 4 ||
    //     laser.y > this.game.config.height + laser.displayHeight) {
    //     if (laser) {
    //       laser.destroy();
    //     }
    //   }
    // }

    // for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
    //   var laser = this.playerLasers.getChildren()[i];
    //   laser.update();

    //   if (laser.x < -laser.displayWidth ||
    //     laser.x > this.game.config.width + laser.displayWidth ||
    //     laser.y < -laser.displayHeight * 4 ||
    //     laser.y > this.game.config.height + laser.displayHeight) {
    //     if (laser) {
    //       laser.destroy();
    //     }
    //   }
    // }

    // if (this.keySpace.isDown) {
    //   this.player.setData("isShooting", true);
    // }
    // else {
    //   this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
    //   this.player.setData("isShooting", false);
    // }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}