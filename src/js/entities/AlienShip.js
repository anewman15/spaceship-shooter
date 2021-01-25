import Phaser from 'phaser';
import Entity from './Entity';
import AlienLaser from './AlienLaser';

export default class AlienShip extends Entity {
	constructor(scene, x, y) {
		super(scene, x, y, 'alienShip', 'AlienShip');
		this.body.velocity.y = Phaser.Math.Between(50, 100);
		this.shootTimer = this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				const alienLaser = new AlienLaser(
					this.scene,
					this.x,
					this.y,
				);
				alienLaser.setScale(this.scaleX);
				this.scene.alienLasers.add(alienLaser);
			},
			callbackScope: this,
			loop: true,
		});
	}

	onDestroy() {
		if (this.shootTimer !== undefined) {
			if (this.shootTimer) {
				this.shootTimer.remove(false);
			}
		}
	}
}