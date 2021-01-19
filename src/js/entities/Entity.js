import 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }

  explode(canExplode, explosionKey, sfxKey) {
    if (!this.getData("isDead")) {
      // Set the texture to the explosion image, then play the animation
      this.setTexture(explosionKey);  // this refers to the same animation key we used when we added this.anims.create previously
      this.play(explosionKey); // play the animation

      // pick a random explosion sound within the array we defined in this.sfx in SceneMain
      this.scene.sfx.explosions[sfxKey].play();

      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', function() {

        if (canExplode) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }

      }, this);

      this.setData("isDead", true);
    }
  }
}