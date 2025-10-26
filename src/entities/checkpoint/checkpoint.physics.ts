import { Bounds, Vector } from 'cyxapiki_engine/geometry';
import { BasePhysicsObject, BasePhysicsObjectState, BasePhysicsObjectStateBuffer } from 'cyxapiki_engine/physics/objects';
import { GravityComponent } from 'cyxapiki_engine/physics/objects/components';
import { withReturn } from 'cyxapiki_engine/utils';

export class CheckpointPhysics extends BasePhysicsObject {
	public constructor(bounds: Bounds) {
		super(bounds, [
			withReturn(new GravityComponent(new Vector({ x: -0.1 })), (target) => {
				target.velocity.addEventListener('change', () => (target.velocity.x = -5));
			})
		]);
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
