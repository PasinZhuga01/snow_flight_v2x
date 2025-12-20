import { Bounds } from 'cyxapiki_engine/geometry';
import { BasePhysicsObject, BasePhysicsObjectState, BasePhysicsObjectStateBuffer } from 'cyxapiki_engine/physics/objects';

import { SnowGravityComponent } from './snow.gravity';

export class SnowPhysics extends BasePhysicsObject {
	public constructor(bounds: Bounds) {
		super(bounds, [new SnowGravityComponent({ x: -1, y: 2 })]);
	}

	protected _assignObjectStateBuffer() {}

	protected _createObjectState(state: BasePhysicsObjectState): BasePhysicsObjectState {
		return state;
	}

	protected _createObjectStateBuffer(stateBuffer: BasePhysicsObjectStateBuffer): BasePhysicsObjectStateBuffer {
		return stateBuffer;
	}
}
