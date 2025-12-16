import { Bounds } from 'cyxapiki_engine/geometry';
import { Scene, SceneObject } from 'cyxapiki_engine/render';
import { PhysicsManager } from 'cyxapiki_engine/physics';
import { Sprite } from 'cyxapiki_engine/render/graphics';

import { PlayerPhysics } from './player.physics';
import { PlayerEventHandlers } from './player.types';

import { BaseEntity } from '../base-entity/base-entity';
import { sprites } from '../sprites';

export class Player extends BaseEntity<SceneObject<Sprite>, PlayerPhysics> {
	public constructor(handlers: PlayerEventHandlers, bounds: Bounds) {
		super(bounds, new SceneObject(bounds, sprites.player), new PlayerPhysics(handlers, bounds));
	}

	public override insertTo(scene: Scene, physics: PhysicsManager) {
		super.insertTo(scene, physics);

		physics.insertImportant(this._physicsObject.bounds);
	}

	public jump() {
		this._physicsObject.jump();
	}

	public physicsReset() {
		this._physicsObject.reset();
	}

	public setY(y: number) {
		this._bounds.y = y;
	}
}
