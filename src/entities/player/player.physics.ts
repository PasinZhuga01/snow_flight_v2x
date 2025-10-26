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

	protected _assignStateBuffer(stateBuffer: BasePhysicsObjectStateBuffer) {
		this._assignBaseStateBuffer(stateBuffer);
	}

	protected _createStateObject(neighbours: Iterable<BasePhysicsObject>): BasePhysicsObjectState {
		return this._createBaseStateObject(neighbours);
	}

	protected _createStateBuffer(): BasePhysicsObjectStateBuffer {
		return this._createBaseStateBuffer();
	}
}
