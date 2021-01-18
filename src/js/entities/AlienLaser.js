import 'phaser';
import Entity from './Entity';

export default class AlienLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'alienLaser');
    this.body.velocity.y = 200;
  }
}