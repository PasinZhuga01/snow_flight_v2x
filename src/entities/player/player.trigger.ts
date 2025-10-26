import { BasePhysicsObject } from 'cyxapiki_engine/physics/objects';
import { BaseTriggerComponent } from 'cyxapiki_engine/physics/objects/components';

import { PlayerEventHandlers } from './player.types';

import { BlockPhysics } from '../block/block.physics';
import { CheckpointPhysics } from '../checkpoint/checkpoint.physics';

export class PlayerTriggerComponent extends BaseTriggerComponent<BlockPhysics | CheckpointPhysics> {
	private readonly _actions: PlayerEventHandlers;

	public constructor(actions: PlayerEventHandlers) {
		super();

		this._actions = actions;
	}

	protected _getTrigger(target: BasePhysicsObject): BlockPhysics | CheckpointPhysics | null {
		return target instanceof BlockPhysics || target instanceof CheckpointPhysics ? target : null;
	}

	protected _onEnter(target: BlockPhysics | CheckpointPhysics) {
		if (target instanceof BlockPhysics) {
			return this._actions.collideblock();
		}

		this._actions.pickupcheckpoint();
	}

	protected _onStay() {}

	protected _onExit() {}
}
