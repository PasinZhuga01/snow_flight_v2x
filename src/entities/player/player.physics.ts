import { Bounds, Vector } from 'cyxapiki_engine/geometry';
import { BasePhysicsObject, BasePhysicsObjectState, BasePhysicsObjectStateBuffer } from 'cyxapiki_engine/physics/objects';
import { GravityComponent } from 'cyxapiki_engine/physics/objects/components';

import { PlayerTriggerComponent } from './player.trigger';
import { PlayerEventHandlers } from './player.types';

export class PlayerPhysics extends BasePhysicsObject {
	private readonly _gravity: GravityComponent;

	public constructor(handlers: PlayerEventHandlers, bounds: Bounds) {
		const gravity = new GravityComponent(new Vector({ x: 0, y: 0.2 }));

		super(bounds, [gravity, new PlayerTriggerComponent(handlers)]);

		this._gravity = gravity;
	}

	public jump() {
		this._gravity.velocity.y = -6;
	}

	public reset() {
		this._gravity.velocity.y = 0;
	}

	protected _assignObjectStateBuffer() {}

	protected _createObjectState(state: BasePhysicsObjectState): BasePhysicsObjectState {
		return state;
	}

	protected _createObjectStateBuffer(stateBuffer: BasePhysicsObjectStateBuffer): BasePhysicsObjectStateBuffer {
		return stateBuffer;
	}
}
