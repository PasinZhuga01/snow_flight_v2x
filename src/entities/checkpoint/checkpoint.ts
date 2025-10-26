import { Bounds } from 'cyxapiki_engine/geometry';

import { CheckpointPhysics } from './checkpoint.physics';

import { BaseEntity } from '../base-entity/base-entity';

export class Checkpoint extends BaseEntity<null, CheckpointPhysics> {
	public constructor(bounds: Bounds) {
		super(bounds, null, new CheckpointPhysics(bounds));
	}
}
